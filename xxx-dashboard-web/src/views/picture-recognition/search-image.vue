<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">模拟app搜索</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="deviceId" class="queryItem" placeholder="请输入deviceId / 设备id进行搜索" />
        <el-input v-model="content" class="queryItem" placeholder="搜索内容" style="width: 50%" />
        <!--        <el-date-picker-->
        <!--          v-model="valueTime"-->
        <!--          :picker-options="pickerOptions"-->
        <!--          align="right"-->
        <!--          class="queryItem"-->
        <!--          end-placeholder="结束日期"-->
        <!--          range-separator="至"-->
        <!--          start-placeholder="开始日期"-->
        <!--          type="datetimerange"-->
        <!--          value-format="yyyy-MM-dd HH:mm:ss"-->
        <!--        />-->
      </div>
      <div style="display: flex; flex-direction: row; flex: 1">
        <el-button class="button-style4" @click="queryAction">查询</el-button>
        <el-button class="button-style1" @click="resetAction">重置</el-button>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
      <div v-for="data in currentData" :key="data.id" class="imageCard">
        <DrawRectImage :image-url="data.imageS3Key" :roi="data.roi" :roi-list="data.roiList" />
        <div class="content">id: {{ data.id }}</div>
        <div class="content">eventId: {{ data.eventId }}</div>
        <div class="content">deviceId: {{ data.deviceId }}</div>
        <div class="content">userId: {{ data.userId }}</div>
        <div v-if="isScoreLow(data.score)" class="content" style="color: red">score: {{ data.score }}</div>
        <div v-else class="content">score: {{ data.score }}</div>
        <div class="content">ai类型: {{ getAiText(data.aiType) }}</div>
        <div class="content">事件发生时间: {{ data.eventTime }}</div>
        <div class="content">描述: {{ data.label }}</div>
        <div class="content" v-if="data.matchResult != undefined">是否符合搜索结果: {{ getMatchResultText(data.matchResult) }}
        </div>
        <div v-if="data.shortLabelInfoList != undefined && data.shortLabelInfoList.length != 0" class="content"
          style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: center;">
          <div>短描述:</div>
          <el-popover v-for="shortLabelInfo in data.shortLabelInfoList" :content="shortLabelInfo.roi"
            placement="top-start" title="坐标" trigger="hover">
            <el-button slot="reference" class="label-box">{{ shortLabelInfo.label }}</el-button>
          </el-popover>
        </div>
      </div>
    </div>
    <el-pagination v-show="currentData.length != 0" :current-page.sync="currentPage" :page-size="20" :total="totalData"
      background layout="total,prev,pager,next" style="margin: 20px" @current-change="handleCurrentChange" />
  </div>
</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getSearchImage } from '../../api/event-image'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'

export default {
  components: {
    DrawRectImage
  },
  props: {
    searchKey: String,
    deviceId: {
      type: String,
      default: ''
    },
    queryUserId: String,
    content: {
      type: String,
      default: ''
    }
  },
  // props: ['searchKey', 'deviceId', 'queryUserId', 'content'],
  data() {
    return {
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: [],
      queryEventId: '',
      valueTime: ''
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    if (this.searchKey !== undefined && this.searchKey !== '') {
      console.log(this.searchKey !== '', this.searchKey)
      this.getList(1)
    }

    // this.getList(1)
  },
  methods: {
    isScoreLow(score) {
      return parseFloat(score) < 0.59
    },
    getList(currentPage) {
      startLoading()
      const param = {
        current: currentPage,
        deviceId: this.deviceId,
        content: this.content,
        searchKey: this.searchKey
        // eventTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        // eventTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1]
      }

      console.log(param)
      getSearchImage(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          this.dataSource[currentPage.toString()] = response.data.records
          this.currentPage = response.data.current
          this.searchKey = response.data.searchKey
          this.currentData = this.dataSource[this.currentPage]
        }
      }).catch(error => {
        endLoading()
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 当前数据已经请求过
      if (this.dataSource.hasOwnProperty(val.toString())) {
        this.currentPage = val
        this.currentData = this.dataSource[this.currentPage]
      } else {
        this.getList(val)
      }
    },
    queryAction() {
      if (!this.deviceId.trim()) {
        this.$message.error('设备id不能为空')
        return
      }
      if (!this.content.trim()) {
        this.$message.error('content不能为空')
        return
      }

      this.searchKey = ''
      this.dataSource = {}
      this.currentData = []
      this.getList(1)
    },
    resetAction() {
      this.dataSource = {}
      this.currentData = []
      this.deviceId = ''
      this.queryUserId = ''
      this.queryEventId = ''
      this.content = ''
      this.searchKey = ''
      this.valueTime = ''

      this.getList(1)
    },
    getAiText(aiType) {
      // 1.联汇 2.华来
      let aiText
      switch (aiType) {
        case 1: {
          aiText = '联汇'
        }
          break
        case 2: {
          aiText = '华来'
        }
          break
        default: {
          aiText = '未知'
        }
      }
      return aiText
    },
    getMatchResultText(matchResult) {
      let matchResultText
      switch (matchResult) {
        case 0: {
          matchResultText = '未评价'
        }
          break
        case 1: {
          matchResultText = '符合'
        }
          break
        case 2: {
          matchResultText = '不符合'
        }
          break
        default: {
          matchResultText = '未知'
        }
      }
      return matchResultText
    }
  }
}
</script>

<style scoped>
.queryItem {
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
  padding: 3px;
  margin: 5px
}
</style>
