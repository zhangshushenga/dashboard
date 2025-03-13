<template>
  <div class="container">
    <div style="display: flex; flex: 1; flex-direction: row;" class="background-image_nav">
      <div class="currentTime">{{ currentDateTime }}</div>
      <div class="title">华来视觉语言大模型 V15NX</div>
      <div class="currentTime"></div>
    </div>
    <div style="display: flex; flex: 9;">
      <AgentCub ref="agentCub" :currentAgentsCall="currentAgentsCall" :totalAgentsCall="totalAgentsCall" :agentTotalNum="agentTotalNum"
        :currentRequestAgentNum="currentRequestAgentNum" :smallCubRoatSpeed="smallCubRoatSpeed"/>
    </div>
    <div class="GPUList">
      <transition-group name="fly" tag="div" @before-leave="GPUListBeforeLeave" @after-leave="GPUListAfterLeave"
        @before-enter="GPUListBeforeEnter">
        <gpuCard v-for="gpuData in gpuDataShowList1" :key="gpuData.ec2Name" :gpuData="gpuData" />
      </transition-group>
    </div>
    <div class="GPUList2">
      <transition-group name="fly1" tag="div" @before-leave="GPUListBeforeLeave" @after-leave="GPUListAfterLeave"
        @before-enter="GPUListBeforeEnter">
        <gpuCard v-for="gpuData in gpuDataShowList2" :key="gpuData.ec2Name" :gpuData="gpuData" />
      </transition-group>
    </div>
    <div class="legend-div">
      <div style="display: flex; flex-direction: row; flex: 1.5; align-items: center; margin-bottom: 5%;">
        <div class="legend-icon1"></div>
        <div class="legend_context">算力调用</div>
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center; margin-bottom: 8%;">
        <div class="legend-icon2"></div>
        <div class="legend_context">图文对</div>
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center; margin-bottom: 8%;">
        <div class="legend-icon4"></div>
        <div class="legend_context">Agent</div>
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center;">
        <div class="legend-icon3"></div>
        <div class="legend_context">正被访问的Agent</div>
      </div>
    </div>
  </div>
</template>

<script>
import AgentCub from './agentCub.vue';
import gpuCard from './gpuCard.vue';
import { agentDashboardStat, agentDashboardTotal, agentDashboardGpuList } from '@/api/agent-dashBoard'

let showGpuDataIndex1 = 0;
let showGpuDataIndex2 = 0;

//北京时间0点更新（agent总调用数，已上线agent数）
const beijingHour = 0;
const beijingMinute = 0;

//更新频率1（当前agent调用量，当前正在使用的Agent）：单位秒
const frequency1 = 5

//更新频率2（GPU数据）：单位秒
const frequency2 = 3

//更新频率3（GPU展示数据）：单位分钟
const frequency3 = 10

const speedRange = [0.005, 0.01, 0.005, 0.01, 0.005]

let g1 = []
let g2 = []

export default {
  components: {
    AgentCub,
    gpuCard
  },
  data() {
    return {
      //Timer
      agentTimer: null,

      //Time
      currentDateTime: '',

      //agents
      agentTotalNum: 0,
      totalAgentsCall: 0,
      currentRequestAgentNum: 0,
      currentAgentsCall: 0.0,
      smallCubRoatSpeed: 0.005,

      //gpu
      gpuDataList1: [],
      gpuDataList2: [],
      //展示的数据源
      gpuDataShowList1: [],
      gpuDataShowList2: []

    }
  },
  mounted() {
    this.getCurrentDateTime()
    setInterval(this.getCurrentDateTime, 1000);

    this.agentsData()

    this.gpuData()
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，以防止内存泄漏
    this.clearTimer();
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      this.currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    //获取每天更新数据时间差
    getSpecifiedTime() {
      // 获取当前时间
      const now = new Date();
      // 获取当前时区与UTC时间的时差，单位为分钟
      const offset = now.getTimezoneOffset();
      // 将时差转换为北京时间的时差，北京时间比UTC时间快8小时（480分钟）
      const offsetInBeijing = offset + 480;
      // 计算当前时间到北京时间指定时刻的时间差
      let timeUntilSpecifiedTime = ((beijingHour - now.getHours()) * 60 + (beijingMinute - now.getMinutes())) * 60 * 1000 - now.getSeconds() * 1000;
      // 加上北京时间的时差
      timeUntilSpecifiedTime -= offsetInBeijing * 60 * 1000;
      // 如果结果为负数，表示已经过了今天的指定时间，需要将定时器设置为明天的指定时间
      if (timeUntilSpecifiedTime < 0) {
        timeUntilSpecifiedTime += 24 * 60 * 60 * 1000;
      }
      return timeUntilSpecifiedTime
    },
    agentsData() {
      // 1. 获取数据
      this.agentRequest()

      // 2. 定时刷新数据
      this.agentTimer = setTimeout(() => {
        //执行
        this.agentRequest()

        // 每天指定时间执行完毕后，设置新的定时器，以保证每天都能执行
        setInterval(this.agentRequest, 24 * 60 * 60 * 1000);
      }, this.getSpecifiedTime())

      setInterval(async () => {
        const result = await this.agentStatRequest()

        this.currentRequestAgentNum = result.currentRequestAgentNum == 0 ? 3 : result.currentRequestAgentNum
        this.$refs.agentCub.updateUsingAgent()

      }, frequency1 * 1000);

      setInterval(async () => {
        const result = await this.agentStatRequest()

        const r = (Math.random() * (0.015 - 0.005) + 0.005).toFixed(3)
        const b = this.randomSpeed()
        this.smallCubRoatSpeed = b
        this.currentAgentsCall = b * 10

        console.log(this.currentAgentsCall)
      }, frequency3 * 1000);

    },
    randomSpeed() {
      const a = Math.floor(Math.random() * 5)
      const newSpeed = speedRange[a]
      return newSpeed
    },
    async agentRequest() {
      try {
        const [result1, result2] = await Promise.all([this.totalAgentsCallRequest(), this.agentStatRequest()]);

        this.agentTotalNum = result2.agentTotalNum
        this.currentRequestAgentNum = result2.currentRequestAgentNum == 0 ? 5 : result2.currentRequestAgentNum
        const r = (Math.random() * (0.021 - 0.005) + 0.005).toFixed(3)
        const b = this.randomSpeed()
        this.smallCubRoatSpeed = b
        this.currentAgentsCall = b * 15
        this.totalAgentsCall = result1

        this.$refs.agentCub.updateUsingAgent()

        console.log(result1)
        console.log(result2)

        console.log(this.currentAgentsCall)

      } catch (error) {
        console.error("发生错误：", error);
      }
    },
    async totalAgentsCallRequest() {
      return agentDashboardTotal().then((response) => {
        if (response.code == 0) {
          return response.data
        }
      }).catch((error) => {
        console.log(error)
      })

    },
    async agentStatRequest() {
      return agentDashboardStat().then((response) => {
        if (response.code == 0) {
          return response.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    gpuData() {
      // 1. 获取数据，分开数据
      this.getGpuData()

      // 2. 定时刷新数据
      setInterval(() => {
        this.getGpuData()
      }, frequency2 * 1000);

      // 3. 定时循环展示数据
      setInterval(() => {
        if (this.gpuDataList1 == undefined || (this.gpuDataList1 != undefined && this.gpuDataList1.length <= 3)) {
          return
        }
        this.gpuDataShowList1 = []
        g1 = this.splitShowArray1()


        if (this.gpuDataList2 == undefined || (this.gpuDataList2 != undefined && this.gpuDataList2.length <= 3)) {
          return
        }
        this.gpuDataShowList2 = []
        g2 = this.splitShowArray2()
      }, frequency3 * 60 * 1000);
    },
    async getGpuData() {
      // const randomInt = 28;

      // let gpuDataList = []
      // // 使用这个随机数构建循环
      // for (let i = 0; i < randomInt; i++) {
      //   const gpuData = {
      //     "date": "2024.04.29 12:34:00",
      //     "ec2Name": i.toString(),
      //     "gpuName": "A10",
      //     "smiVersion": "535.54.03",
      //     "driverVersion": "535.54.03",
      //     "cudaVersion": "12.2",
      //     "fan": "0%",
      //     "temp": "25C",
      //     "perf": "P0",
      //     "migMode": "N/A",
      //     "gpuUtilization": "0%",
      //     "memoryUsage": "5209MiB / 15360MiB",
      //     "powerUsage": "55W / 300W",
      //     "computeMode": "default",
      //     "pGpu": "0",
      //     "pGiid": "N/A",
      //     "pCiid": "N/A",
      //     "pType": "C",
      //     "pPid": "118406",
      //     "pProcessName": "/opt/conda/envs/pytorch/bin/python3.10",
      //     "pMemoryUsage": "5206MiB"
      //   }
      //   gpuDataList.push(gpuData)
      // }


      let gpuDataList = await this.gpuDataRequest()
      gpuDataList = gpuDataList.slice(0, 6);

      //分开数据
      this.splitArray(gpuDataList)

    },
    async gpuDataRequest() {
      return agentDashboardGpuList().then((response) => {
        if (response.code == 0) {
          return response.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    splitArray(arr) {
      const midIndex = Math.floor(arr.length / 2);

      let firstHalf, secondHalf;

      if (arr.length % 2 === 0) {
        // 如果数组长度是偶数，直接平分
        firstHalf = arr.slice(0, midIndex);
        secondHalf = arr.slice(midIndex);
      } else {
        // 如果数组长度是奇数，中间的元素放在第一个数组
        firstHalf = arr.slice(0, midIndex + 1);
        secondHalf = arr.slice(midIndex + 1);
      }
      this.gpuDataList1 = firstHalf
      this.gpuDataList2 = secondHalf

      this.gpuDataShowList1 = this.splitShowArray1()
      this.gpuDataShowList2 = this.splitShowArray2()

    },
    splitShowArray1() {
      if (showGpuDataIndex1 >= this.gpuDataList1.length) {
        showGpuDataIndex1 = 0;  // 如果到达数组末尾，重置索引回到初始位置
      }

      // 从数组中取出下一个3个元素，如果不足3个则取出所有剩余元素
      const items = this.gpuDataList1.slice(showGpuDataIndex1, showGpuDataIndex1 + 3);
      showGpuDataIndex1 += 3;  // 更新索引，准备下一次取元素

      // 如果是数组的最后一部分且不足3个，下次循环需要重置
      if (showGpuDataIndex1 >= this.gpuDataList1.length && this.gpuDataList1.length % 3 !== 0) {
        showGpuDataIndex1 = 0;  // 重置索引回到初始位置
      }

      return items;
    },
    splitShowArray2() {
      if (showGpuDataIndex2 >= this.gpuDataList2.length) {
        showGpuDataIndex2 = 0;  // 如果到达数组末尾，重置索引回到初始位置
      }

      // 从数组中取出下一个3个元素，如果不足3个则取出所有剩余元素
      const items = this.gpuDataList2.slice(showGpuDataIndex2, showGpuDataIndex2 + 3);
      showGpuDataIndex2 += 3;  // 更新索引，准备下一次取元素

      // 如果是数组的最后一部分且不足3个，下次循环需要重置
      if (showGpuDataIndex2 >= this.gpuDataList2.length && this.gpuDataList2.length % 3 !== 0) {
        showGpuDataIndex2 = 0;  // 重置索引回到初始位置
      }
      return items
    },
    clearTimer() {
      clearTimeout(this.agentTimer);
    },
    GPUListBeforeLeave(el) {

    },
    GPUListAfterLeave(el) {
      this.gpuDataShowList1 = g1
      this.gpuDataShowList2 = g2
    },
    GPUListBeforeEnter(el) {
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;
  display: flex;
  flex-direction: column
}

.background-image_nav {
  background-image: url('../agentDashboard/assets/nav.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.title {
  flex: 1 0 auto;
  /* 让标题可以根据内容调整大小，但不超过内容的宽度 */
  text-align: center;
  /* 文本居中 */
  color: #fff;
  font-size: calc(40 * 1rem / 14);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  margin-top: 1%;
}

.currentTime {
  color: #fff;
  font-size: calc(20 * 1rem / 14);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 300;
  margin-left: 1%;
  margin-top: 0.5%;
  width: 20%;
}

.GPUList {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 1%;
  top: 8%;
  width: 25%;
  height: 90%;
  overflow: hidden;
}

.GPUList2 {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 1%;
  top: 8%;
  width: 25%;
  height: 90%;
  overflow: hidden;
}

.legend-div {
  position: absolute;
  /* 绝对定位 */
  left: 28%;
  /* 横向偏移屏幕宽度的35% */
  top: 15%;
  /* 纵向偏移屏幕高度的25% */
  width: 7%;
  /* 元素的宽度 */
  height: 11%;
  /* 元素的高度 */
  display: flex;
  flex-direction: column;
}

.legend-icon1 {
  width: 13%;
  height: 100%;
  background-image: url('../agentDashboard/assets/gpuLegend1.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.legend-icon2 {
  width: 13%;
  height: 100%;
  background-image: url('../agentDashboard/assets/gpuLegend2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.legend-icon3 {
  width: 13%;
  height: 100%;
  background-image: url('../agentDashboard/assets/gpuLegend3.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.legend-icon4 {
  width: 13%;
  height: 100%;
  background-image: url('../agentDashboard/assets/gpuLegend4.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}


.legend_context {
  margin-left: 5%;
  color: #FFF9;
  font-size: calc(10 * 1rem / 14);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
}

.fly-enter-active,
.fly-leave-active {
  transition: all 0.5s ease;
}

.fly-enter {
  transform: translateX(-100%);
  opacity: 0;
}

.fly-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fly1-enter-active,
.fly1-leave-active {
  transition: all 0.5s ease;
}

.fly1-enter {
  transform: translateX(100%);
  opacity: 0;
}

.fly1-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>