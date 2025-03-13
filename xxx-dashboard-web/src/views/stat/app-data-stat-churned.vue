<template>
  <el-card>
    <div ref="chart" style="height: 550px;"></div>
  </el-card>
</template>
<script>
  import * as echarts from 'echarts'

  import { getChurnedUsers } from '@/api/api-stat'

  export default {
    data(){
      return {
        legendData : ['allUsers', 'activateUsers', 'churnedUsers'],
        xAxisData : [],
        seriesData : []
      }
    },
    created() {
      this.getDataFromServer()
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart(){
        const chartDom = this.$refs.chart
        const myChart = echarts.init(chartDom)
        myChart.setOption({
          title: {
            text: '流失用户'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.legendData
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: this.seriesData
        })
      },
      getDataFromServer(){
        getChurnedUsers().then(response => {
          if (response.code === 0) {
            var num_all = []
            var num_activate = []
            var num_churned = []
            for (const d of response.data) {
              console.log(d)
              this.xAxisData.push(d.exactDate)
              num_all.push(d.numAllUsers)
              num_activate.push(d.numActivateUsers)
              num_churned.push(d.numChurnedUsers)
            }
            this.seriesData = [
              {
                name: 'allUsers',
                type: 'line',
                // stack: 'Total',
                data: num_all
              },
              {
                name: 'activateUsers',
                type: 'line',
                // stack: 'Total',
                data: num_activate
              },
              {
                name: 'churnedUsers',
                type: 'line',
                // stack: 'Total',
                data: num_churned
              }
            ]
            console.log(this.seriesData)
            this.initChart()
          }
        })
      }
    }
  }
</script>
