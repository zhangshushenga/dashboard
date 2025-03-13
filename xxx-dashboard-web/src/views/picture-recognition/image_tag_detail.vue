<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">{{ '标签：' + this.label }}</div>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
      <div v-for="data in currentData" :key="data.id" class="imageCard">
        <DrawRectImage :box-unit-type="1" :image-url="data.imageS3Key" :roi-list="parseAndExtract(data.roiList)" />
        <div class="content">eventId: {{ data.eventId }}</div>
        <div class="content">事件发生时间: {{ data.eventTime }}</div>
        <div class="content">描述: {{ data.label }}</div>
      </div>
    </div>
    <el-pagination
      v-show="currentData.length != 0"
      :current-page.sync="currentPage"
      :page-size="20"
      :total="totalData"
      background
      layout="total,prev,pager,next"
      style="margin: 20px"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getTagImageDetail } from '../../api/event-image'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'

export default {
  components: {
    DrawRectImage
  },
  props: ['id', 'label'],
  data() {
    return {
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: []
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    getList(currentPage) {
      startLoading()
      const param = {
        current: currentPage,
        id: this.id,
        label: this.label
      }
      console.log(param)

      getTagImageDetail(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          this.dataSource[this.currentPage.toString()] = response.data.records
          this.currentPage = response.data.current
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
    parseAndExtract(jsonString) {
      try {
        const parsedData = JSON.parse(jsonString)

        if (Array.isArray(parsedData) && parsedData.length > 0) {
          const extractedData = parsedData.map((item) => item.bbox)
          return JSON.stringify(extractedData)
        } else {
          return '[0,0,0,0]'
        }
      } catch (error) {
        console.error('解析JSON出错:', error.message)
        return '[0,0,0,0]'
      }
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
</style>
