<template>

  <div class="" style="height: 100%">
    <div class="filter-container" style="margin-left: 10px;margin-right: 10px;margin-top: 5px">
      <el-row :gutter="5">
        <el-col :span="13">
          <div class="block">
            <el-date-picker
              v-model="query.queryDate"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              style="width: 100%"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </div>
        </el-col>
        <el-col :span="5">
          <el-select v-model="query.timezone" placeholder="请选择时区" style="width: 100%">
            <el-option
              v-for="item in timeZoneList"
              :key="item.value"
              :label="item.label"
              :seleced="item.seleced"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <!--        <el-col :span="6">-->
        <!--          <el-select v-model="chartType" placeholder="图表类型" style="width: 100%">-->
        <!--            <el-option-->
        <!--              v-for="item in chartTypeList"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :seleced="item.seleced"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-col>-->
        <el-col :span="6">
          <el-button
            icon="el-icon-search"
            style="width: 100%"
            type="primary"
            @click="getAggsData()"
          >搜索
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="5" />
    </div>
    <div id="myChart" v-loading="chartLoading" style="width: 100%; height: calc(100vh - 210px);" />
  </div>

</template>

<script>

import * as echarts from 'echarts'
import { aggsOmStat } from '@/api/om-stat'
import { dateTransToString } from '@/utils/util-date'

const defaultStartDate = new Date(new Date(new Date()).getTime() - 24 * 60 * 60 * 1000 * 30)
const defaultEndDate = new Date()
export default {
  name: 'RangeCleanSize',
  data() {
    return {
      chartLoading: true,
      disableRange: true,
      query: {
        queryDate: [new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate()),
          new Date(new Date(defaultEndDate.getFullYear(), defaultEndDate.getMonth(), defaultEndDate.getDate()).getTime() + 24 * 60 * 60 * 1000 - 1)
        ],
        // queryDate: [],
        startDate: '',
        endDate: '',
        deviceId: '',
        startCleanSize: '',
        endCleanSize: '',
        timezone: 'America/Los_Angeles',
        x: '3',
        y: 1,
        rangeList: [],
        fwList: []
      },
      chartType: 1,
      chartTypeList: [
        {
          value: 1,
          label: '柱状图'
        },
        {
          value: 2,
          label: '折线图'
        },
        {
          value: 3,
          label: '折线图 堆叠'
        }
      ],
      cleanModeNameList: {
        'totalDevice': '设备数',
        'total': '图生文次数',
        'totalQps': '图生文 qps',
        'longQps': '长描述 qps',
        'shortQps': '短描述 qps',
        'longDescTotal': '长描述次数',
        'shortDescTotal': '短描述次数'
      },
      timeZoneList: [{
        value: 'UTC',
        label: 'UTC'
      }, {
        value: 'Asia/Shanghai',
        label: '北京时间'
        // seleced: true
      }, {
        value: 'America/Los_Angeles',
        label: '太平洋时间'
      }],
      legendData: [],
      legendSelectData: {
        '设备数': false,
        '图生文 qps': true,
        '图生文次数': false,
        '长描述 qps': false,
        '短描述 qps': false,
        '长描述次数': false,
        '短描述次数': false
        // totalQps: true,
        // longQps: false,
        // shortQps: false,
        // longDescTotal: false,
        // shortDescTotal: false
      },
      statList: [],
      titleText: '',
      xAxis: [],
      series: [],
      chart: null
    }
  },
  mounted() {
    this.drawChart()
    // this.setFw()
    this.getAggsData()
  },
  methods: {
    yChange(value) {
      // if (value === 3) {
      //   this.query.x = '3'
      // }
    },
    xChange(value) {
      this.disableRange = !(value === '101' || value === '2' || value === '1')
    },
    drawChart() {
    },
    setFw() {
    },
    destroyChart() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    getAggsData() {
      this.query.startDate = dateTransToString(this.query.queryDate[0])
      this.query.endDate = dateTransToString(this.query.queryDate[1])

      const queryParam = Object.assign({}, this.query)
      if (queryParam.endCleanSize !== '') {
        queryParam.endCleanSize = queryParam.endCleanSize * 100
      }
      if (queryParam.startCleanSize !== '') {
        queryParam.startCleanSize = queryParam.startCleanSize * 100
      }

      if (queryParam.x === '1' || queryParam.x === '2' || queryParam.x === '101') {
        var patt = /^[0-9]{0,20}-[0-9]{0,20}$/
        for (let i = 0; i < this.query.rangeList.length; i++) {
          if (!patt.test(this.query.rangeList[i])) {
            this.$message.error('输入的 range 格式有误 应输入类似 10-90 这样的，您输入的是:' + this.query.rangeList[i])
            return
          }
        }
      }

      this.legendData = []
      this.titleText = ''
      this.xAxis = []
      this.series = []
      this.statList = []

      // console.log(this.query, dateTransToString(this.query.queryDate[0]))
      this.chartLoading = true

      let seriesType = 'bar'
      if (this.chartType === 1) {
        seriesType = 'bar'
      } else {
        seriesType = 'line'
      }

      aggsOmStat(queryParam).then((response) => {
        this.destroyChart()

        this.legendData = []
        // }
        const data = response.data

        data.legendData.forEach((subType) => {
          const modeName = this.cleanModeNameList[subType]
          this.legendData.push(modeName)
        })

        this.statList = data.statList
        this.xAxis = data.xaxis
        let maxValues = 0
        data.series.forEach((colData) => {
          const modeName = this.cleanModeNameList[colData.subKey]
          let stack = '清扫次数'
          let seriesData = []
          seriesData = colData.recordCount
          let yAxisIndex = 0
          if (colData.subKey === 'totalQps' || colData.subKey === 'longQps' || colData.subKey === 'shortQps') {
            seriesType = 'line'
            seriesData = seriesData.map(num => num / 10000)
            stack = null
            yAxisIndex = 1
            maxValues = Math.max(Math.max(...seriesData), maxValues)
          }

          // "totalDevice"
          // "total"
          // "totalQps"
          // "longQps"
          // "shortQps"
          // "longDescTotal"
          // "shortDescTotal"
          if (colData.subKey === 'total') {
            stack = '请求次数total'
            seriesType = 'bar'
          }
          if (colData.subKey === 'longDescTotal' || colData.subKey === 'shortDescTotal') {
            stack = '请求次数'
            seriesType = 'bar'
          }

          this.series.push(
            {
              name: modeName,
              yAxisIndex: yAxisIndex,
              type: seriesType,
              stack: this.chartType === 2 ? null : stack,
              // stack: stack,
              emphasis: {
                focus: 'series'
              },
              data: seriesData,
              recordData: seriesData,
              subKey: colData.subKey
            }
          )
        })

        console.log(maxValues)
        // 基于准备好的dom，初始化echarts实例【这里存在一个问题，请看到最后】
        this.chart = echarts.init(document.getElementById('myChart'), this.$store.getters.eChartTheme)
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: this.titleText,
            x: '20',
            top: '20'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
              // console.log(1, params)
              var res = ''
              if (this.query.y === 1 || this.query.y === 2) {
                params.forEach((param, i) => {
                  const marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + param.color + ';"></span>'
                  // eslint-disable-next-line eqeqeq
                  const subData = this.series.find(e => e.name === param.seriesName)
                  // console.log(subData, param)
                  const sweepNum = subData.recordData[param.dataIndex]
                  res += '<br/>' + marker + param.seriesName + ' : ' + sweepNum// 鼠标悬浮显示的字符串内容
                })
                // console.log(dIndex, this.deviceNum)
                // var total = '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:"></span>'
                return params[0].name + res
              } else {
                return ''
              }
            }

          },
          legend: [{
            top: 20,
            icon: 'rect',
            right: '4%',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: this.legendData,
            selected: this.legendSelectData

          }],
          grid: {
            top: 100,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.xAxis
            }
          ],
          yAxis: [
            {
              type: 'value'
            },
            {
              type: 'value',
              position: 'right',
              max: maxValues * 2
              // axisTick: {
              //   show: true // 确保刻度可见
              // },
              // axisLine: {
              //   show: true // 确保轴线可见
              // }
            }
          ],
          series: this.series
        }
        if (this.query.y === 3 || this.query.y === 4 || this.query.y === 5 || this.query.y === 6) {
          delete option.tooltip.formatter
        }
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option)
        // this.chart.on('legendselectchanged', (params) => {
        //   // if (params.selected[v.name]) {
        //   //   // option.legend.selected[v.name] = true
        //   //   if (!option.legend.selected[v.name]) {
        //   //     delete option.legend.selected[v.name]
        //   //   }
        //   // }
        //   this.chart.setOption(option)
        // })
      }
      ).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.chartLoading = false
      })
    }

  }

}
</script>

<style scoped>

.el-col {
  margin-bottom: 5px;
}

</style>
