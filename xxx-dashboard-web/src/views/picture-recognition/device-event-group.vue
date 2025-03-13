<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">设备报警组</div>
    <div style="display: flex; flex-direction: row; margin-bottom: 20px;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="queryDeviceId" class="queryItem" placeholder="请输入deviceId / 设备id进行搜索" />
        <el-input v-model="queryUserId" class="queryItem" placeholder="请输入userId / 用户id进行搜索" />
        <el-date-picker
          v-model="valueTime"
          :picker-options="pickerOptions"
          align="right"
          class="queryItem"
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div style="display: flex; flex-direction: row; flex: 1">
        <el-button class="button-style4" @click="queryAction">查询</el-button>
        <el-button class="button-style1" @click="resetAction">重置</el-button>
      </div>
    </div>
    <el-table :data="currentData" border style="margin: 10px;">
      <el-table-column label="group id" prop="id" />
      <el-table-column label="deviceId" prop="deviceId" />
      <el-table-column label="userId" prop="userId" />
      <el-table-column label="描述" prop="label" />
      <el-table-column label="事件开始时间" prop="eventStartTime" />
      <el-table-column label="事件结束时间" prop="eventEndTime" />
      <el-table-column label="组中报警图数量">
        <template slot-scope="scope">
          <div>{{ JSON.parse(scope.row.imageIdList).length }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="首图">
        <template slot-scope="scope">
          <img
            :key="scope.row.id"
            :src="scope.row.imageS3Key"
            alt="Your Image"
            style="width: 100px; height: 130px;"
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="查看组中报警图">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleClick(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { getEventGroupList } from '../../api/event-image'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'

export default {
  components: {
    DrawRectImage
  },
  data() {
    return {
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: [],

      queryDeviceId: '',
      queryUserId: '',
      valueTime: ''
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
        deviceId: this.queryDeviceId,
        userId: this.queryUserId,
        eventStartTime: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        eventEndTime: this.valueTime[1] === undefined ? '' : this.valueTime[1]
      }

      console.log(param)

      getEventGroupList(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          this.dataSource[currentPage.toString()] = response.data.records
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
    queryAction() {
      this.dataSource = {}
      this.currentData = []
      this.getList(1)
    },
    resetAction() {
      this.dataSource = {}
      this.currentData = []
      this.queryDeviceId = ''
      this.queryUserId = ''
      this.queryEventId = ''
      this.valueTime = ''

      this.getList(1)
    },
    handleClick(index, row) {
      console.log(index)
      console.log(row)

      const routeUrl = this.$router.resolve({
        path: '/device-event-group-image',
        query: {
          group_id: row.id
        }
      })
      window.open(routeUrl.href, '_blank')

      // this.$router.push({ path: '/device-event-group-image', query: { group_id: row.id } });
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
