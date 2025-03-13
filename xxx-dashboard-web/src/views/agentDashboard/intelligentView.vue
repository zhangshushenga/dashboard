<template>
  <div class="fullscreen-mask">
    <div class="backIntelligent">
      <div class="title">参观摘要</div>
      <div class="date">{{ currentDate }}</div>
      <div class="contentBack">
        <intelligentCell v-for="(data, index) in intelligentDataList" :key="index" :intelligentData="data" />
      </div>
    </div>
    <div v-show="showGotoNews" class="gotoNews-div" @click="gotoNews" />
    <div class="touch-div" @click="updateData">
      <!-- <div v-if="loading" class="loader"></div> -->
    </div>
  </div>
</template>

<script>
import intelligentCell from './intelligentCell.vue';

import {
  agentDashboardEventSumaryGenerate,
  agentDashboardEventSumaryResult,
  agentDashboardPressReleaseImageList,
  agentDashboardPressReleaseGenerate,
  agentDashboardPressReleaseResult
} from '../../api/agent-dashBoard'

const intelligentRequestTime = 10

let currentRequestNum = 0
let newsCurrentRequestNum = 0

const ackTime = 120
const ackInterval = 2
const ackMaxNum = ackTime / ackInterval

const newsAckTime = 180
const newsAckInterval = 2
const newsAckMaxNum = newsAckTime / newsAckInterval

export default {
  props: {
    showMask: {
      type: Boolean,
      default: false
    }
  },
  components: {
    intelligentCell
  },
  computed: {
    showGotoNews: {
      get() {
        return this.newsImageList.length != 0 && this.newsData != null
      }
    }
  },
  data() {
    return {
      intelligentInterval: null,
      currentDate: '',

      requestId: 0,
      isHandle: false,
      timer: null,

      loading: false,

      intelligentDataList: [
        {
          title: '',
          time: '',
          description: '',
          imageList: []
        }, {
          title: '',
          time: '',
          description: '',
          imageList: []
        }, {
          title: '',
          time: '',
          description: '',
          imageList: []
        }, {
          title: '',
          time: '',
          description: '',
          imageList: []
        }
      ],

      newsImageList: [],

      newsRequestId: 0,
      newsIsHandle: false,
      newsTimer: null,

      newsData: null
    }
  },
  mounted() {
    this.updateDate()

    // 每日凌晨更新日期
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilNextMidnight = nextMidnight - now;
    setTimeout(() => {
      this.updateDate();
      setInterval(this.updateDate, 24 * 60 * 60 * 1000); // 之后每24小时更新一次
    }, timeUntilNextMidnight);

    // this.getData()
    this.createInaval()

    this.getNewsImages()

    this.newsRequest()
    this.newsCreateInaval()

  },
  beforeDestroy() {
    clearTimeout(this.timer);
    clearTimeout(this.newsTimer);
  },
  methods: {
    updateIntelligentData(intelligentData) {
      console.log('updateIntelligentData')
      console.log(intelligentData)
      this.intelligentDataList = intelligentData
    },
    updateNewsData(newsImageList, newsData) {
      this.newsImageList = newsImageList
      this.newsData = newsData
    },
    updateDate() {
      // 获取当前北京时间
      const now = new Date(new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // JavaScript 的月份从 0 开始计数，所以 +1
      const day = now.getDate();
      this.currentDate = `${year}年${month}月${day}日`;
    },
    async getNewsImages() {
      agentDashboardPressReleaseImageList().then((response) => {
        if (response.code == 0) {
          console.log("imageList")
          console.log(response)

          this.preloadAllNewsImages(response.data)
        }
      }).catch((error) => {

      })
    },
    async preloadAllNewsImages(imageList) {
      try {
        // 等待所有图片加载完成
        this.newsImageList = await Promise.all(imageList.map(this.preloadImage));
      } catch (error) {
        console.error('加载图片时出错:', error);
      }
    },
    getData() {
      this.intelligentRequest()

      // setInterval(this.intelligentRequest, intelligentRequestTime * 1000);

    },
    async newsRequest() {
      const newsGenerateResponse = await this.newsGenerateRequest()

      console.log("newsGenerateResponse", newsGenerateResponse)
      if (newsGenerateResponse != undefined && newsGenerateResponse.code === 0 && newsGenerateResponse.data != 0) {

        this.newsRequestId = newsGenerateResponse.data
        this.newsIsHandle = true

      }
    },
    async newsGenerateRequest() {
      return agentDashboardPressReleaseGenerate().then((response) => {
        return response
      }).catch((error) => {
      })
    },
    async newsCreateInaval() {
      if (this.newsIsHandle) {
        this.loading = true
        if (newsCurrentRequestNum === newsAckMaxNum) {
          this.newsIsHandle = false
        } else {
          newsCurrentRequestNum++

          console.log("newsRequestId")
          console.log(this.newsRequestId)
          const newsResultResponse = await this.newsResultRequest({}, this.newsRequestId)
          console.log("newsResultResponse")
          console.log(newsResultResponse)
          if (newsResultResponse != undefined && newsResultResponse.code === 0) {
            if (newsResultResponse.data.status === 0) {

            } else if (newsResultResponse.data.status === 2) {
              //成功
              if (newsResultResponse.data.newspaperList != undefined) {

                this.newsData = this.validateData(newsResultResponse.data)
              }
              this.newsIsHandle = false
            } else {
              this.newsIsHandle = false
            }
          } else {
            this.newsIsHandle = false
          }
        }
      } else {
        this.loading = false
      }

      this.newsTimer = setTimeout(this.newsCreateInaval, newsAckInterval * 1000);
    },
    async newsResultRequest(data, requestId) {
      return agentDashboardPressReleaseResult(data, requestId).then((response) => {
        return response
      }).catch((error) => {
        this.newsIsHandle = false
      })
    },
    async intelligentRequest() {
      // setTimeout(() => {
      //   this.intelligentDataList = [
      //     {
      //       title: '公司历史与成就展示',
      //       time: '10:00 ~ 10:05',
      //       description: '公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示',
      //       imageList: [
      //         'https://t7.baidu.com/it/u=3124693600,356058981&fm=193&f=GIF',
      //         'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
      //         'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF',
      //         'https://t7.baidu.com/it/u=3435942975,1552946865&fm=193&f=GIF']
      //     }, {
      //       title: '公司历史与成就展示',
      //       time: '10:00 ~ 10:05',
      //       description: '公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示',
      //       imageList: ['https://t7.baidu.com/it/u=3124693600,356058981&fm=193&f=GIF',
      //         'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF']
      //     },
      //     {
      //       title: '公司历史与成就展示',
      //       time: '10:00 ~ 10:05',
      //       description: '公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示',
      //       imageList: ['https://t7.baidu.com/it/u=3124693600,356058981&fm=193&f=GIF',
      //         'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF']
      //     },
      //     {
      //       title: '公司历史与成就展示',
      //       time: '10:00 ~ 10:05',
      //       description: '公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示公司历史与成就展示',
      //       imageList: ['https://t7.baidu.com/it/u=3124693600,356058981&fm=193&f=GIF',
      //         'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF']
      //     }
      //   ]
      // }, 3000);


      const generateResponse = await this.generateRequest()

      console.log("generateResponse", generateResponse)
      if (generateResponse != undefined && generateResponse.code === 0 && generateResponse.data != 0) {

        this.requestId = generateResponse.data
        this.isHandle = true

      }
    },
    async createInaval() {
      if (this.isHandle) {
        if (currentRequestNum === ackMaxNum) {
          this.isHandle = false
        } else {
          currentRequestNum++

          // console.log(this.requestId)
          const resultResponse = await this.resultRequest({}, this.requestId)
          // console.log(resultResponse)
          if (resultResponse != undefined && resultResponse.code === 0) {
            if (resultResponse.data.status === 0) {

            } else if (resultResponse.data.status === 2) {
              //成功
              if (resultResponse.data.eventSummaryList != undefined) {

                const eventList = resultResponse.data.eventSummaryList

                this.preloadAllImagesForEvents(eventList).then(() => {
                  this.intelligentDataList = eventList
                  // console.log(eventList)
                }).catch((error) => {

                })
              }
              this.isHandle = false
            } else {
              this.isHandle = false
            }
          } else {
            this.isHandle = false
          }
        }
      } else {
      }

      this.timer = setTimeout(this.createInaval, ackInterval * 1000);
    },
    async preloadAllImagesForEvents(eventList) {
      try {
        // 预加载每个事件对象中的图片
        await Promise.all(eventList.map(this.preloadImagesForEvent));
        // 所有事件的图片均已预加载完成
        this.allImagesLoaded = true;
      } catch (error) {
        console.error('事件图片预加载失败:', error);
      }
    },
    async preloadImagesForEvent(event) {
      try {
        // 使用 Promise.all 预加载当前事件的所有图片
        event.imageList = await Promise.all(event.imageList.map(this.preloadImage));
      } catch (error) {
        console.error('图片预加载失败:', error);
      }
    },
    preloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = reject;
        img.src = url;
      });
    },
    async generateRequest() {
      return agentDashboardEventSumaryGenerate().then((response) => {
        return response
      }).catch((error) => {
      })
    },
    async resultRequest(data, requestId) {
      return agentDashboardEventSumaryResult(data, requestId).then((response) => {
        return response
      }).catch((error) => {
        this.isHandle = false
      })
    },
    gotoNews() {
      console.log("gotoNews")

      // const data = {
      //   subTitle: '深入了解华来科技的创新成果与企业精神',
      //   newspaperList: [
      //     {
      //       title: '',
      //       description: '在春意盎然的五月，天津市领导一行莅临华来科技股份有限公司天开园办公区展厅，进行了一次意义深远的参观考察。此次访问不仅加深了政府对华来科技发展历程和创新成果的了解，也体现了政府对科技创新型企业的高度重视和支持。',
      //     }, {
      //       title: '一、展厅入口的热烈交流',
      //       description: '下午3点22分, 领导们抵达华来公司展厅入口，受到了公司员工的热情接待。入口处的展示台前，访客们正专注地查看资料，交流着对华来科技企业文化的认识。公司使命“华彩视界，智慧未来”和愿景“一人一视界，千家万物联”以及“专注用户 追求极致自我动',
      //     }, {
      //       description: '随后, 领导们步入公司历史介绍区, 详细了解了华来科技自2015年成立以来的发展历程。从成为小米生态链企业, 到跻身美国市场家庭安防产品前三名, 再到发布全世界第一款GPT智能摄像机, 华来科技的每一步成长都凝聚了创新与努力。随后，领导们步入公司历史',
      //     }, {
      //       title: '三、大模型技术的前沿展示',
      //     }, {
      //       title: '四、体验互动区的创新演示',
      //       description: '在大模型展示区, 领导们对华来V15NX大模型的技术能力表现出浓厚兴趣。该模型包含15个基本能力, 为构建智能家居体验提供了强大的多模态支持。领导们与企业负责人和设计人员进行了深入交流，探讨了大模型技术在智能家居领域的应用前景。',
      //     }
      //   ]
      // }

      // this.newsImageList = [
      //   'https://t7.baidu.com/it/u=3124693600,356058981&fm=193&f=GIF',
      //   'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
      //   'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF',
      //   'https://t7.baidu.com/it/u=3435942975,1552946865&fm=193&f=GIF'
      // ]
      // this.newsData = this.validateData(data)

      this.$emit('goNews', this.newsData, this.newsImageList);
    },
    validateData(data) {
      // 确保 title 和 subTitle 不为 undefined
      if (data.title === undefined || data.title === null) {
        data.title = '';  // 可以设置为默认值或抛出错误
      }
      if (data.subTitle === undefined || data.subTitle === null) {
        data.subTitle = '';  // 可以设置为默认值或抛出错误
      }

      // 处理 newspaperList 确保长度为6
      while (data.newspaperList.length < 6) {
        data.newspaperList.push({
          title: '',  // 默认的标题，或根据需要调整
          description: ''  // 默认的描述，或根据需要调整
        });
      }

      // 确保 newspaperList 中的每个对象的 title 和 description 不为 undefined
      data.newspaperList = data.newspaperList.map(item => ({
        title: item.title !== undefined && item.title !== null ? item.title : '',  // 若为 undefined 则设置默认值
        description: item.description !== undefined && item.description !== null ? item.description : ''  // 若为 undefined 则设置默认值
      }));

      console.log(data)
      return data;
    },
    updateData() {
      this.$emit('backToHome');
      // this.getNewsImages()
      // this.intelligentRequest()
      // this.newsRequest()
    }
  }
};
</script>

<style scoped>
.fullscreen-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  justify-content: center;
  margin-top: 7%;
}

.backIntelligent {
  background-image: url('../agentDashboard/assets/intelligentBack.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 97%;
  height: 68%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
}

.title {
  color: #fff;
  font-size: calc(40 * 1rem / 14);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  margin-top: 1%;
}

.date {
  color: #fff;
  font-size: calc(18 * 1rem / 14);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  margin-top: 0.7%;
}

.contentBack {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  margin-top: 1%;
  justify-content: space-around;
  padding-left: 3%;
  padding-right: 3%;
}

.touch-div {
  position: absolute;
  /* 绝对定位 */
  left: 0%;
  /* 纵向偏移屏幕高度的25% */
  width: 100%;
  /* 元素的宽度 */
  height: 23%;
  top: 65%;
  background-color: rgba(0, 0, 0, 0.01);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.gotoNews-div {
  position: absolute;
  top: 22%;
  /* 绝对定位 */
  left: 96%;
  /* 纵向偏移屏幕高度的25% */
  width: 4%;
  /* 元素的宽度 */
  height: 30%;
  background-image: url('../agentDashboard/assets/gotoNews.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.loader {
  border: 7px solid #f3f3f3;
  /* Light grey */
  border-top: 7px solid #62FF97;
  /* Blue */
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 2s linear infinite;
}

.animation {
  width: 100vw;
  height: 100vh;
}

.animation-wrapper {
  position: relative;
}

.overlay-content {
  position: absolute;
  top: 0; /* Adjust as necessary */
  left: 0; /* Adjust as necessary */
  /* Ensure the content is visible over the animation */
  z-index: 10;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>