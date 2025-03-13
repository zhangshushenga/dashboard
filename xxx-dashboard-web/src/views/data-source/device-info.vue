<template>
  <div v-show="env === 'prod' && showDeviceInfo" v-loading="loading">
    <el-descriptions title="设备信息">
      <el-descriptions-item label="deviceId">{{ deviceInfo.deviceId }}</el-descriptions-item>
      <el-descriptions-item label="deviceModel">{{ deviceInfo.deviceModel }}</el-descriptions-item>
      <el-descriptions-item label="timeZone">{{ deviceInfo.timeZone }}</el-descriptions-item>
      <el-descriptions-item label="mcuSysVersion">

        <el-popover
          placement="top-start"
          trigger="hover"
        >
          <el-table
            :data="fwLogList"
            style="width: 100%"
          >
            <el-table-column
              prop="createDate"
              :label="'Date ' +timezone"
              width="180"
            />
            <el-table-column
              prop="mcuSysVersion"
              label="version"
              width="80"
            />

          </el-table>
          <span slot="reference">  {{ deviceInfo.mcuSysVersion }}
            <i
              class="el-icon-arrow-down"
            /></span>
        </el-popover>

      </el-descriptions-item>
      <el-descriptions-item label="userId">
        <el-popover
          placement="top-start"
          trigger="hover"
        >
          <el-table
            :data="bindLogList"
            style="width: 100%"
          >
            <el-table-column
              prop="deviceDate"
              :label="'Date ' +timezone"
              width="180"
            />
            <el-table-column
              prop="state"
              label="动作"
              width="80"
            />
            <el-table-column
              prop="userId"
              label="userId"
              width="280"
            />

          </el-table>
          <span slot="reference">
            {{ deviceInfo.userId }}  <i
              class="el-icon-arrow-down"
            /></span>
        </el-popover>
        <el-tag v-show="!deviceInfo.bind" type="danger">已解绑</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="iotState">
        <el-tag :type="iotState==='connected' ? 'success' : 'danger'">{{ iotState }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="resetMapTimes">{{ deviceInfo.resetMapTimes }}</el-descriptions-item>

      <el-descriptions-item v-if="deviceInfo.mute===1" label="静音设置">{{ deviceInfo.muteType ===1 ? '全天':deviceInfo.startTimeStr + '-' + deviceInfo.endTimeStr }}</el-descriptions-item>
      <el-descriptions-item v-if="deviceInfo.mute===0 || deviceInfo.mute===undefined" label="静音设置">未设置</el-descriptions-item>

      <el-descriptions-item label="Ip信息">{{ deviceInfo.deviceIp }} / {{ deviceInfo.countryName }} / {{ deviceInfo.state }} / {{ deviceInfo.cityName }}</el-descriptions-item>
      <!--      <el-descriptions-item label="备注">-->
      <!--        <el-tag size="small">学校</el-tag>-->
      <!--      </el-descriptions-item>-->
      <!--      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>-->
    </el-descriptions>
  </div>
</template>

<script>
import { getDeviceInfo } from '@/api/device-info'
export default {
  name: 'DeviceInfo',
  props: {
    deviceId: {
      type: String,
      default: ''
    },
    timezone: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    },
    env: {
      type: String,
      default: 'prod'
    }
  },
  data() {
    return {
      bindLogList: [],
      fwLogList: [],
      iotState: '从未上线过',
      deviceInfo: {
      },
      showDeviceInfo: false,
      loading: false
    }
  },
  watch: {
    // deviceId: function(newData, oldData) {
    //   this.deviceId = newData
    //   this.loadDeviceInfo()
    // },
    // timezone: function(newData, oldData) {
    //   this.timezone = newData
    //   this.loadDeviceInfo()
    // },
    time: function(newData, oldData) {
      this.loadDeviceInfo()
    }
  },
  methods: {
    loadDeviceInfo() {
      if (this.deviceId === '' || this.deviceId === undefined) {
        return
      }
      this.bindLogList = []
      this.fwLogList = []
      this.deviceInfo = {}
      this.showDeviceInfo = true
      this.loading = true
      getDeviceInfo(this.deviceId, this.timezone).then(response => {
        // const data = response.data
        this.deviceInfo = response.data
        if (response.data.propState !== undefined) {
          this.iotState = response.data.propState.iotState
        }
        this.timezone = response.data.infoTimeZone
        this.bindLogList = response.data.deviceLog
        this.fwLogList = response.data.deviceFwLog
        // this.deviceInfoList.push({
        //   'deviceId': data.deviceId,
        //   'deviceModel': data.deviceModel,
        //   'timeZone': data.timeZone,
        //   'mcuSysVersion': data.mcuSysVersion,
        //   'resetMapTimes': data.resetMapTimes,
        //   'userId': data.userId
        // })
      }).finally(() => {
        this.loading = false
      }).catch(() => {
        this.showDeviceInfo = false
      })
    }
  }
}
</script>

<style scoped>

</style>
