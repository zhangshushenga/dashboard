<template>
  <div>
    <h1>ViewSay</h1>
    <div>
      <el-row :gutter="40" class="panel-group">
        <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon class-name="card-panel-icon" icon-class="peoples" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                开通 ViewSay 用户数
              </div>
              <count-to :duration="2600" :end-val="viewSayUserNum" :start-val="0" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon class-name="card-panel-icon" icon-class="tab" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                开通 ViewSay 设备数
              </div>
              <count-to :duration="2600" :end-val="viewSayDeviceNum" :start-val="0" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <h1>基础数据</h1>
    <div style="display: flex; flex-direction: row;">
      <div style="margin-right: 20px;">时间范围</div>
      <el-date-picker v-model="baseDataTimeRange" type="datetimerange" :picker-options="pickerOptions" range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
        align="right">
      </el-date-picker>
      <el-button class="button-style2" style="height: 40px; margin-left: 20px;" :disabled="baseDataSearchEnable"
        @click="searchDataWithTimeRange">查询</el-button>
      <el-button class="button-style2" style="height: 40px; margin-left: 20px;" :disabled="baseDataSearchEnable"
        @click="resetDataWithTimeRange">重置</el-button>
    </div>
    <div style="margin-bottom: 50px;">
      <el-table :data="rvi_base_data"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%">
        <el-table-column label="用户与激活设备" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.data }}
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="rvi_behavior_data"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%">
        <el-table-column label="用户使用行为" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.data }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h1>每日新增激活设备数</h1>
    <div style="margin-bottom: 50px;">
      <el-table :data="dailyDevice_data"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%">
        <el-table-column label="时间" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="美区设备" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.americaDevice }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="其他设备" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.otherDevice }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="dailyDevice_totalRow != 0" :current-page.sync="dailyDevice_currentPage" :page-size="30"
        :total="dailyDevice_totalRow" @current-change="dailyDevice" background layout="total,prev,pager,next" />
    </div>
    <h1>每日新增用户数</h1>
    <div style="margin-bottom: 50px;">
      <el-table :data="newUsers_data"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%">
        <el-table-column label="时间" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="用户数" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.userCount }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="newUsers_totalRow != 0" :current-page.sync="newUsers_currentPage" :page-size="30"
        :total="newUsers_totalRow" @current-change="dailyNewUsers" background layout="total,prev,pager,next" />
    </div>
    <h1>用户绑定设备数</h1>
    <div style="margin-bottom: 50px;">
      <el-table :data="userBindDevices_data"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%">
        <el-table-column label="注册时间" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="用户" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.userName }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="绑定设备数" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.bindDeviceCount }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="userBindDevices_totalRow != 0" :current-page.sync="userBindDevices_currentPage"
        :page-size="30" :total="userBindDevices_totalRow" @current-change="useBindDevices" background
        layout="total,prev,pager,next" />
    </div>
  </div>
</template>

<script>

import { getViewSayDeviceNum, getViewSayUserNum } from '@/api/om-stat'
import { getDailyFirstActivityDevice, getDailyNewUsers, getUserBindDevices, getRviBaseData, getRviBehaviorData } from '@/api/api-stat'
import CountTo from 'vue-count-to'
import { endLoading, startLoading } from '@/utils/loading'
import { changetime } from '../../utils/util-date'


export default {
  name: 'ViewSayStat',
  components: {
    CountTo
  },
  data() {
    return {
      viewSayUserNum: 0,
      viewSayDeviceNum: 0,

      chartLoading: true,

      dailyDevice_currentPage: 1,
      dailyDevice_totalRow: 0,
      dailyDevice_data: [],

      newUsers_currentPage: 1,
      newUsers_totalRow: 0,
      newUsers_data: [],

      userBindDevices_currentPage: 1,
      userBindDevices_totalRow: 0,
      userBindDevices_data: [],

      rvi_base_data: [],
      rvi_behavior_data: [],

      baseDataTimeRange: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  computed: {
    baseDataSearchEnable: function () {
      return this.baseDataTimeRange === null
    }
  },
  mounted() {
    this.getAggsData()
    this.dailyDevice()
    this.dailyNewUsers()
    this.useBindDevices()
    this.rviBaseData()
    this.rviBehaviorData()
  },
  methods: {
    searchDataWithTimeRange() {
      this.rviBaseData()
      this.rviBehaviorData()
    },
    resetDataWithTimeRange() {
      this.baseDataTimeRange = null
      this.rviBaseData()
      this.rviBehaviorData()
    },
    getAggsData() {
      // this.viewSayUserNum = 10000

      // this.chartLoading = true
      //
      getViewSayUserNum().then((response) => {
        this.viewSayUserNum = response.data
      }
      ).catch((error) => {
        console.log(error)
      }).finally(() => {

      })

      getViewSayDeviceNum().then((response) => {
        this.viewSayDeviceNum = response.data
      }
      ).catch((error) => {
        console.log(error)
      }).finally(() => {

      })
    },
    dailyDevice() {
      startLoading()
      const param = { 'currentPage': this.dailyDevice_currentPage - 1 }
      getDailyFirstActivityDevice(param).then((response) => {
        if (response.code === 0) {
          this.dailyDevice_totalRow = response.data.totalCount
          this.dailyDevice_data = response.data.list
        }
        endLoading()
      }).catch((error) => {
        console.log(error)
        endLoading()
      })
    },
    dailyNewUsers() {
      startLoading()
      const param = { 'currentPage': this.newUsers_currentPage - 1 }
      getDailyNewUsers(param).then((response) => {
        if (response.code === 0) {
          this.newUsers_totalRow = response.data.totalCount
          this.newUsers_data = response.data.list
        }
        endLoading()
      }).catch((error) => {
        console.log(error)
        endLoading()
      })
    },
    useBindDevices() {
      startLoading()
      const param = { 'currentPage': this.userBindDevices_currentPage - 1 }
      getUserBindDevices(param).then((response) => {
        if (response.code === 0) {
          this.userBindDevices_totalRow = response.data.totalCount
          this.userBindDevices_data = response.data.list
        }
        endLoading()
      }).catch((error) => {
        console.log(error)
        endLoading()
      })
    },
    rviBaseData() {
      startLoading()

      let param = null

      if (this.baseDataTimeRange != null) {
        let startTime = this.baseDataTimeRange[0]
        let endTime = this.baseDataTimeRange[1]

        if (startTime != null && endTime != null) {
          param = { 'startTime': startTime, 'endTime': endTime }
        }
      }

      console.log(param)
      getRviBaseData(param).then((response) => {
        endLoading()
        if (response.code === 0) {
          this.rvi_base_data = [
            { 'title': '激活用户数', 'data': `${response.data.americanNewUsers} (${response.data.newUsers})` },
            { 'title': '激活设备数', 'data': `${response.data.americanActivityDevices} (${response.data.activityDevices})` },
            { 'title': '激活设备使用人数（主用户+被分享用户）', 'data': response.data.usersOfUseDevice },
            { 'title': '使用iOS系统的用户数', 'data': response.data.iosUsers },
            { 'title': '使用Android系统的用户数', 'data': response.data.androidUsers }
          ]
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    rviBehaviorData() {
      startLoading()
      let param = null

      if (this.baseDataTimeRange != null) {
        let startTime = this.baseDataTimeRange[0]
        let endTime = this.baseDataTimeRange[1]

        if (startTime != null && endTime != null) {
          param = { 'startTime': startTime, 'endTime': endTime }
        }
      }

      console.log(param)
      getRviBehaviorData(param).then((response) => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.rvi_behavior_data = [
            { 'title': '平均使用APP时长', 'data': changetime(response.data.avgTimeOfUseApp) },
            { 'title': '平均查看直播时长', 'data': changetime(response.data.avgTimeOfLive) },
            { 'title': '平均查看事件数', 'data': response.data.avgEventsOfUser },
            { 'title': '平均每个事件的查看时长', 'data': changetime(response.data.avgTimeOfEvents) },
            { 'title': '平均查看回放数', 'data': response.data.avgPlaybacksOfUser },
            { 'title': '平均每个回放视频的查看时长', 'data': changetime(response.data.avgTimeOfPlaybacks) },
            { 'title': '显示画幅比例(未切换过画幅 : 3:4 : Full)', 'data': `${response.data.totalPhones - response.data.screenChangePhones} : ${response.data.screen3Of4Phones} : ${response.data.screenChangePhones - response.data.screen3Of4Phones}` },
            { 'title': '人脸追踪的设备数(开启 : 关闭)', 'data': `${response.data.openFaceDevices} : ${response.data.totalDevices - response.data.openFaceDevices}` },
            { 'title': '移动侦测(开启 : 关闭)', 'data': `${response.data.openMotionAlarmDevices} : ${response.data.totalDevices - response.data.openMotionAlarmDevices}` },
            { 'title': '检测条件(全部开启 : 人 : 车 : 宠)', 'data': `${response.data.typeAllMotion} : ${response.data.typeSpecificPerson - response.data.typeAllMotion} : ${response.data.typeSpecificVehicle - response.data.typeAllMotion} : ${response.data.typeSpecificPet - response.data.typeAllMotion}` }
          ]
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    }

  }

}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
