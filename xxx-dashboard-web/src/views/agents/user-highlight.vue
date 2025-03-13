<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">时光精选</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input
          v-model="queryDeviceId"
          class="queryItem"
          placeholder="请输入deviceId / 设备id"
        />
        <!--        <el-date-picker-->
        <!--          v-model="valueTime"-->
        <!--          :picker-options="pickerOptions"-->
        <!--          align="right"-->
        <!--          class="queryItem"-->
        <!--          end-placeholder="事件结束日期"-->
        <!--          range-separator="至"-->
        <!--          start-placeholder="事件开始日期"-->
        <!--          style="width: 45%"-->
        <!--          type="datetimerange"-->
        <!--          value-format="yyyy-MM-dd HH:mm:ss"-->
        <!--        />-->
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; margin-right: 10px;">
        <el-button
          :disabled="loading"
          class="button-style4"
          style="height: 40px;"
          @click="queryAction"
          v-html="autoText"
        />
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
      <div v-for="(data, index) in currentData" :key="data.id" class="imageCard">
        <DrawRectImage
          :bigger-roi="data.biggerRoi"
          :dynamic-roi-list="data.dynamicRoiList"
          :image-url="data.imageS3Key"
          :roi="data.roi"
          :roi-list="data.roiList"
          :roi-type-list="data.roiTypeList"
        />

        <div class="content">title: {{ data.title }}</div>
        <div class="content">eventId: {{ data.eventId }}</div>
        <div class="content">图片类型: {{ getImageType(data.imageType) }}</div>
        <div class=" content">事件发生时间: {{ data.eventTime }}</div>
        <div class="content">
          描述: {{ data.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { generateUserHighlight, getUserHighlight } from '@/api/agents'

import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'

export default {
  components: {
    DrawRectImage
  },
  data() {
    return {
      timer: [],
      timerFileIdList: [],
      timerCount: [],

      isAddDataSetLoading: false,
      showDropdowns: [], // 控制每个下拉框的显示状态
      dropdownOptions: [],
      loading: false,
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: [],

      autoText: '生成',
      queryDeviceId: 'E4AAEC828CC5',
      queryUserId: '',
      queryEventId: '',
      imageType: false,
      onlyAmericaDevice: false,
      labelSensitive: false,
      labelLikeType: '',
      aiTypeList: [],
      valueTime: ''

    }
  },
  computed: {},
  created() {
  },
  mounted() {
    // this.getList(1)
  },
  methods: {
    getList(currentPage) {
      getUserHighlight(7).then(response => {
        this.totalData = 0
        const data = response.data

        this.dataSource['currentPage'] = data.eventList.map((obj) => {
          return {
            ...obj,
            'dynamicRoiList': null,
            'llamaDescription': ''
          }
        })
        this.currentPage = 1
        this.currentData = this.dataSource['currentPage']
      }).catch(error => {
        // endLoading()
        console.log(error)
      })
    },
    queryAction() {
      this.dataSource = {}
      this.currentData = []

      if (this.queryDeviceId === undefined || this.queryDeviceId.trim() === '') {
        this.$message.error('请输入设备id')
        return
      }
      this.loading = true
      this.autoText = '生成请求中。。。'
      const param = {
        deviceId: this.queryDeviceId
        // eventTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        // eventTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1]
      }
      generateUserHighlight(param).then(response => {
        if (response.code === 0) {
          // todo 获取 requestId
          const requestId = response.data
          const tKey = 'loading'
          this.autoText = '等待获取结果。。。'
          if (requestId === 0) {
            this.autoText = '当前设备当天没有事件可以进行推荐'
          } else {
            this.timerCount[tKey] = 0
            this.timer[tKey] = setInterval(this.checkAndDownloadFile, 1000, requestId, false)
            this.timerFileIdList.push(tKey)
          }
        }
      }).catch(error => {
        console.log(error)
        this.autoText = '生成'
        this.loading = false
      })

      // this.getList(1)
    },
    checkAndDownloadFile: function(requestId, manual = true) {
      // todo 根据 requestId 获取结果
      console.log('checkAndDownloadFile')
      const tKey = 'loading'

      getUserHighlight(requestId).then(response => {
        const timerElement = this.timer[tKey]
        const data = response.data
        if (data.status === 3 || data.status === 4) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          this.autoText = '生成失败，点击重新生成'
          return
        }
        if (timerElement) {
          console.log('当前fileId有定时器')
          this.timerCount[tKey] = ++this.timerCount[tKey]
          const timerCountElement = this.timerCount[tKey]
          console.log(`取消 (已请求${timerCountElement}次)`)
          this.autoText = '等待获取结果。。。已等待约' + timerCountElement + 's'
          // row.autoText = `取消 (已请求${timerCountElement}次)`
          if (timerCountElement > 300) {
            // 最多200次
            clearInterval(timerElement)
            this.autoText = '已超过300s，点击重新生成'
            this.loading = false
            // row.auto = !row.auto
          }
        }

        if (data.status === 2) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          this.loading = false
          // 请求成功
          this.autoText = '此次使用' + data.eventNum + '条事件生成以下结果，点击再次生成'
          if (!data.eventList) {
            this.autoText = '此次使用' + data.eventNum + '条事件生成，此次没有值得推荐的，点击重新生成'
            this.loading = false
          }
          this.totalData = 0
          this.dataSource['currentPage'] = data.eventList.map((obj) => {
            return {
              ...obj,
              'dynamicRoiList': null,
              'llamaDescription': ''
            }
          })
          this.currentPage = 1
          this.currentData = this.dataSource['currentPage']
        }

        // if (data !== undefined) {
        //   // row.upload = true
        //   // row.fileSize = data.size
        //   if (timerElement) {
        //     clearInterval(timerElement)
        //   }
        // }
      }).finally()
    },
    resetAction() {
      this.dataSource = {}
      this.currentData = []
      this.queryDeviceId = ''
      this.queryUserId = ''
      this.queryEventId = ''
      this.valueTime = ''
      this.imageType = false
      this.labelSensitive = false
      this.onlyAmericaDevice = false
      this.labelLikeType = ''
      this.aiTypeList = []

      this.getList(1)
    },
    getImageType(imageType) {
      switch (imageType) {
        case 1:
          return '报警首图'
        case 2:
          return '后续图'
      }
      return '未知'
    }
  }
}
</script>

<style scoped>
.custom-dropdown-item {
  font-size: 12px; /* 设置字体大小为12 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出部分以省略号表示 */
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 100%;
}

.dropdown-content {
  max-height: 200px; /* 固定下拉框高度，根据需要调整 */
  overflow-y: auto; /* 内容超过高度时可滚动 */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.add-icon-button {
  background-color: transparent;
  border: none;
  padding: 0;
  width: auto;
  height: auto;
  text-align: left; /* 将文本左对齐 */
}

.queryItem {
  margin-top: 1%;
  margin-left: 1%;
  width: 22%
}

.imageCard {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 15%;
}

.content {
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}

.label-box {
  background-color: white;
  color: black;
  font-size: 14px;
  padding: 5px;
  margin: 5px;
  border: 2px solid black;
  border-radius: 5px;
}
</style>
