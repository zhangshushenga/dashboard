<template>
  <el-card>
    <div ref="chart" style="height: 550px;"></div>
  </el-card>
</template>
<script>
  import * as echarts from 'echarts'

  import { getActivateUsers } from '@/api/api-stat'

  export default {
    data(){
      return {
        legendData : ['activateUsers', 'activateUsersAndroid', 'activateUsersiOS'],
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
            text: '活跃用户'
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
        getActivateUsers().then(response => {
          if (response.code === 0) {
            var num_all = []
            var num_android = []
            var num_ios = []
            for (const d of response.data) {
              console.log(d)
              this.xAxisData.push(d.exactDate)
              num_all.push(d.activateNumUser)
              num_android.push(d.activateNumUserAndroid)
              num_ios.push(d.activateNumUserIos)
            }
            this.seriesData = [
              {
                name: 'activateUsers',
                type: 'line',
                // stack: 'Total',
                data: num_all
              },
              {
                name: 'activateUsersAndroid',
                type: 'line',
                // stack: 'Total',
                data: num_android
              },
              {
                name: 'activateUsersiOS',
                type: 'line',
                // stack: 'Total',
                data: num_ios
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
