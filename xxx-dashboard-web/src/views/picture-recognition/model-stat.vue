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
    <el-table v-loading="chartLoading" :data="currentData" border style="margin: 10px;">
      <el-table-column label="date" prop="date" />
      <el-table-column label="llava设备数（长描述）" prop="llavaDescDeviceCount" />
      <el-table-column label="llava长描述次数" prop="llavaDescCount" />
      <el-table-column label="llava设备数（短描述）" prop="llavaShortDescDeviceCount" />
      <el-table-column label="llava短描述次数" prop="llavaShortDescCount" />
      <el-table-column label="联汇设备数（长描述）" prop="omDescDeviceCount" />
      <el-table-column label="联汇长描述次数" prop="omDescCount" />
      <el-table-column label="联汇设备数（短描述）" prop="omShortDescDeviceCount" />
      <el-table-column label="联汇短描述次数" prop="omShortDescCount" />
    </el-table>
  </div>

</template>

<script>

import { aggsModelStat } from '@/api/om-stat'
import { dateTransToString } from '@/utils/util-date'

const defaultStartDate = new Date(new Date(new Date()).getTime() - 24 * 60 * 60 * 1000 * 7)
const defaultEndDate = new Date()
export default {
  name: 'ModelStat',
  data() {
    return {
      currentData: [],

      chartLoading: true,
      query: {
        queryDate: [new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate()),
          new Date(new Date(defaultEndDate.getFullYear(), defaultEndDate.getMonth(), defaultEndDate.getDate()).getTime() + 24 * 60 * 60 * 1000 - 1)
        ],
        // queryDate: [],
        startDate: '',
        endDate: '',
        deviceId: '',
        timezone: 'America/Los_Angeles'
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

      statList: []
    }
  },
  mounted() {
    this.getAggsData()
  },
  methods: {
    getAggsData() {
      this.query.startDate = dateTransToString(this.query.queryDate[0])
      this.query.endDate = dateTransToString(this.query.queryDate[1])

      const queryParam = Object.assign({}, this.query)

      // console.log(this.query, dateTransToString(this.query.queryDate[0]))
      this.chartLoading = true

      aggsModelStat(queryParam).then((response) => {
        this.currentData = response.data
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

</style>
