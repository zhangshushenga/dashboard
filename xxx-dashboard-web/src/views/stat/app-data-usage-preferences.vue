<template>
  <span>
    <div style="display: flex; align-content: space-between; margin-top: 20px;">
      <div ref="videoChart" style="width: 50%; height: 400px;"></div>
      <div style="display: flex; flex-direction: row;">
        <div style="margin-top: 5px; margin-right: 10px; font-size: 12px;">是否只查看美区数据</div>
        <el-switch v-model="isAmericaData" @change="changeTimeZone">
        </el-switch>
      </div>
      <div ref="faceChart" style="width: 50%; height: 400px;"></div>
    </div>
    <div style="display: flex; align-content: space-between; margin-top: 20px;">
      <div ref="motionOpenChart" style="width: 50%; height: 400px;"></div>
      <div ref="audioOpenChart" style="width: 50%; height: 400px;"></div>
    </div>
    <div style="display: flex; align-content: space-between; margin-top: 20px;">
      <div ref="motionSpecificChart" style="width: 50%; height: 400px;"></div>
      <div ref="specificTypeChart" style="width: 50%; height: 400px;"></div>
    </div>
  </span>
</template>
<script>

import * as echarts from 'echarts';
import { getVideoFrameData, getFaceTrackData, getAlarmData } from '@/api/api-stat'
import { endLoading, startLoading } from '@/utils/loading'
import { projectChannel } from '@/utils/util-broadcast'


export default {

  data() {
    return {
      videoFrameData: [],
      totalPhone: 0,
      totalDevice: 0,
      faceTrackData: [],
      totalAlarmDevice: 0,
      totalMotionOpenDevice: 0,
      totalSpecificDevice: 0,
      motionOpenData: [],
      audioOpenData: [],
      motionSpecificData: [],
      specificTypeData: [],
      channel: new BroadcastChannel(projectChannel.name),
      isAmericaData: false
    }
  },
  // created() {
  //   this.getDataFromServer()
  // },
  mounted() {
    this.getVideoDataFromServer()
    this.getFaceDataFromServer()
    this.getAlarmDataFromServer()
    // 监听通道消息
    this.channel.addEventListener('message', (event) => {
      if (event.data.action === projectChannel.changeAction) {
        this.getVideoDataFromServer()
        this.getFaceDataFromServer()
        this.getAlarmDataFromServer()
      }
    });
  },
  methods: {
    changeTimeZone() {
      this.getFaceDataFromServer()
      this.getAlarmDataFromServer()
    },
    drawPieVideoChart() {
      const chartDom = this.$refs.videoChart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '不同画幅的使用占比',
          subtext: `总手机数: ${this.totalPhone}`,
          left: 'center',
        },
        series: [
          {
            name: '不同画幅的使用占比',
            type: 'pie',
            radius: '50%',
            data: this.videoFrameData,
          },
        ],
      };
      myChart.setOption(option);
    },

    drawPieFaceChart() {
      const chartDom = this.$refs.faceChart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '人脸追踪的使用占比',
          subtext: `总设备数: ${this.totalDevice}`,
          left: 'center',
        },
        series: [
          {
            name: '人脸追踪的使用占比',
            type: 'pie',
            radius: '50%',
            data: this.faceTrackData,
          },
        ],
      };
      myChart.setOption(option);
    },
    drawMotionOpenChart() {
      const chartDom = this.$refs.motionOpenChart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '开启事件报警的占比',
          subtext: `总设备数: ${this.totalAlarmDevice}`,
          left: 'center',
        },
        series: [
          {
            name: '开启事件报警的占比',
            type: 'pie',
            radius: '50%',
            data: this.motionOpenData,
          },
        ],
      };
      myChart.setOption(option);
    },
    drawAudioOpenChart() {
      const chartDom = this.$refs.audioOpenChart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '开启声音报警的占比',
          subtext: `总设备数: ${this.totalAlarmDevice}`,
          left: 'center',
        },
        series: [
          {
            name: '开启声音报警的占比',
            type: 'pie',
            radius: '50%',
            data: this.audioOpenData,
          },
        ],
      };
      myChart.setOption(option);
    },
    drawMotionSpecificChart() {
      const chartDom = this.$refs.motionSpecificChart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '开启事件报警,触发类型All Motion/Specific占比',
          subtext: `All Motion打开设备数: ${this.totalMotionOpenDevice}`,
          left: 'center',
        },
        series: [
          {
            name: '开启事件报警,触发类型All Motion/Specific占比',
            type: 'pie',
            radius: '50%',
            data: this.motionSpecificData,
          },
        ],
      };
      myChart.setOption(option);
    },
    drawSpecificTypeChart() {
      const chartDom = this.$refs.specificTypeChart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: 'Person/Vehicle/Pet占比',
          subtext: '',
          left: 'center',
        },
        series: [
          {
            name: 'Person/Vehicle/Pet占比',
            type: 'pie',
            radius: '50%',
            data: this.specificTypeData,
          },
        ],
      };
      myChart.setOption(option);
    },
    getVideoDataFromServer() {
      startLoading()
      getVideoFrameData().then(response => {
        endLoading()
        console.log('getVideoFrameData response:', response)
        if (response.code === 0) {
          const videoFullCount = response.data.phoneVideoFrameCount - response.data.videoScreenChangeCount
          const noChangeVideoFrame = response.data.countPhone - response.data.phoneVideoFrameCount
          this.totalPhone = response.data.countPhone
          this.videoFrameData = [
            {
              value: response.data.videoScreenChangeCount,
              name: '3:4画幅使用手机数: ' + response.data.videoScreenChangeCount
            },
            {
              value: videoFullCount,
              name: '画幅切换后全屏画幅使用手机数: ' + videoFullCount
            },
            {
              value: noChangeVideoFrame,
              name: '没有做画幅切换的手机数 ' + noChangeVideoFrame
            }
          ]
          this.drawPieVideoChart()
        }
      }).catch(error => {
        endLoading()
      })
    },
    getFaceDataFromServer() {
      startLoading()
      let param = { 'timeZone': this.isAmericaData === false ? '' : 'America' }
      getFaceTrackData(param).then(response => {
        endLoading()
        console.log('getFaceTrackData response:', response)
        if (response.code === 0) {
          const faceCloseCount = response.data.faceDeviceCount - response.data.faceDeviceOpenCount
          const noChangeFaceTrack = response.data.countDevice - response.data.faceDeviceCount
          this.totalDevice = response.data.countDevice
          this.faceTrackData = [
            {
              value: response.data.faceDeviceOpenCount,
              name: '打开人脸跟踪的设备数:' + response.data.faceDeviceOpenCount
            },
            {
              value: faceCloseCount,
              name: '使用功能后人脸跟踪关闭的设备数' + faceCloseCount
            },
            {
              value: noChangeFaceTrack,
              name: '没有使用人脸跟踪的设备数 ' + noChangeFaceTrack
            }
          ]
          this.drawPieFaceChart()
        }
      }).catch(error => {
        endLoading()
      })
    },
    getAlarmDataFromServer() {
      startLoading()
      let param = { 'timeZone': this.isAmericaData === false ? '' : 'America' }
      getAlarmData(param).then(response => {
        endLoading()
        console.log('getAlarmData response:', response)
        if (response.code === 0) {
          this.totalAlarmDevice = response.data.countDevice
          this.totalMotionOpenDevice = response.data.motionAlarmOpenCount
          this.totalSpecificDevice = response.data.typeSpecific
          const noMotionAlarmOpenCount = response.data.countDevice - response.data.motionAlarmOpenCount
          const noAudioAlarmOpenCount = response.data.countDevice - response.data.audioAlarmOpenCount
          this.motionOpenData = [
            {
              value: response.data.motionAlarmOpenCount,
              name: '打开事件报警的设备数:' + response.data.motionAlarmOpenCount
            },
            {
              value: noMotionAlarmOpenCount,
              name: '没有打开事件报警的设备数:' + noMotionAlarmOpenCount
            }
          ]
          this.drawMotionOpenChart()

          this.audioOpenData = [
            {
              value: response.data.audioAlarmOpenCount,
              name: '打开声音报警的设备数:' + response.data.audioAlarmOpenCount
            },
            {
              value: noAudioAlarmOpenCount,
              name: '没有打开声音报警的设备数:' + noAudioAlarmOpenCount
            }
          ]
          this.drawAudioOpenChart()


          this.motionSpecificData = [
            {
              value: response.data.typeAllMotion,
              name: '开启事件报警的设备，触发类型All Motion的数量:' + response.data.typeAllMotion
            },
            {
              value: response.data.typeSpecific,
              name: '开启事件报警的设备，触发类型Specific的数量:' + response.data.typeSpecific
            }
          ]
          this.drawMotionSpecificChart()

          this.specificTypeData = [
            {
              value: response.data.typeSpecificPerson,
              name: 'Specific设置中选择Person的数量:' + response.data.typeSpecificPerson
            },
            {
              value: response.data.typeSpecificVehicle,
              name: 'Specific设置中选择Vehicle的数量::' + response.data.typeSpecificVehicle
            },
            {
              value: response.data.typeSpecificPet,
              name: 'Specific设置中选择Pet的数量::' + response.data.typeSpecificPet
            }
          ]
          this.drawSpecificTypeChart()
        }
      }).catch(error => {
        endLoading()
      })
    },
  },
};
</script>
  