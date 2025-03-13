<template>

  <div>

    <div v-if="new Date().getDay() === 1">
      <el-button type="primary" @click="sendWeekReportToSelf">预览 发送给自己</el-button>

      <el-button type="primary" @click="sendWeekReport">发送</el-button>
    </div>
    <div v-else>
      非周一
    </div>

  </div></template>

<script>
import { sendWeekReport, sendWeekReportToSelf } from '@/api/trouble'

export default {
  data() {
    return {
      expandsData: [],
      getRowKeys(row) {
        return row.id
      }

    }
  },
  mounted() {
  },
  methods: {

    sendWeekReport() {
      sendWeekReport()
    },
    sendWeekReportToSelf() {
      sendWeekReportToSelf()
    }
  }
}
</script>

<style scoped>
</style>
