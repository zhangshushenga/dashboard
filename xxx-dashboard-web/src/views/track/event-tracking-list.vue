<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col
          :span="12"
        ><div class="block">
          <el-date-picker
            v-model="queryDate"
            style="width: 100%"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          /></div></el-col>
        <el-col :span="7">
          <el-input v-model="query.deviceId" placeholder="请输入设备ID/MAC" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.eventType" placeholder="eventType" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.eventKey" placeholder="eventKey" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg1" placeholder="arg1" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg2" placeholder="arg2" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg3" placeholder="arg3" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg4" placeholder="arg4" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg5" placeholder="arg5" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg6" placeholder="arg6" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg7" placeholder="arg7" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg8" placeholder="arg8" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg9" placeholder="arg9" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg10" placeholder="arg10" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg11" placeholder="arg11" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="query.arg12" placeholder="arg12" />
        </el-col>
        <el-col :span="24">
          <el-button
            type="primary"
            icon="el-icon-search"
            style="width: 100%"
            @click="search"
          >搜索</el-button>
        </el-col>
      </el-row>

    </div>
    <br>
    <div v-loading="listLoading" class="block">
      <div class="radio">
        最多返回100条数据，排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
        <br>
      </div>
      <br>
      <el-timeline :reverse="!reverse">
        <el-timeline-item
          v-for="(activity, key) in tableDataLog"
          :key="key"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          {{ activity.log_type }} {{ activity.content }}
          <el-popover
            placement="top-start"
            trigger="hover"
          >
            <pre style="max-width: 600px;max-height: 600px;overflow-y: auto">{{ JSON.stringify(activity.raw, null, 4) }}</pre>
            <el-button slot="reference">raw</el-button>

          </el-popover>
          <!--          <el-button v-if="activity.cleanType !== undefined" @click="alert(1)">查看此次清扫的log{{ activity.cleanType }}</el-button>-->
          <br>
          <el-tag
            v-for="tag in activity.tagList"
            :key="tag.label"
            :type="tag.type"
            effect="plain"
          >
            {{ tag.label }}
          </el-tag>
        </el-timeline-item>
      </el-timeline>
    </div>

  </div>
</template>

<style>
.el-row {
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-table .warning-row {
  color: #EE3E3E;
  background: oldlace;
}

.el-table .success-row {
  /*background: #f0f9eb;*/
  color: #13ce66;
}

</style>

<script>
import { dateTransToString } from '@/utils/util-date'
import { getEventTracking } from '@/api/event-tracking'

const defaultStartDate = new Date()
const defaultEndDate = new Date()

export default {
  components: {
  },
  data() {
    return {
      reverse: true,
      listLoading: false,
      scheduleLoading: false,
      actionText: {
        set_mode: {
          name: '操作设备',
          type: {
            0: '工作',
            3: '回充',
            6: '划区清扫',
            7: '建图'
          },
          value: {
            0: '停止',
            1: '开始',
            2: '暂停',
            3: '假暂停',
            4: '进入对应模式空闲状态'
          }
        },
        set_room_clean: {
          name: '选房间清扫'
        },
        set_area_clean: {
          name: '选房间清扫'
        }
      },
      options: [
        {
          value: 'UTC',
          label: 'UTC'
        },
        {
          value: '',
          label: '机器时区'
        },
        {
          value: 'Asia/Shanghai',
          label: '北京时间'
        },
        {
          value: 'America/Los_Angeles',
          label: '西雅图'
        }
      ],
      optiontypes: [
        {
          value: '1',
          label: 'action'
        },
        {
          value: '2',
          label: 'event'
        },
        {
          value: '3',
          label: '清扫记录'
        },
        {
          value: '4',
          label: '心跳包'
        }
      ],
      deviceId: '',
      eventKey: '',
      query: {
        startDate: '',
        endDate: '',
        deviceId: '',
        eventKey: '',
        eventType: '',
        arg1: '',
        arg2: '',
        arg3: '',
        arg4: '',
        arg5: '',
        arg6: '',
        arg7: '',
        arg8: '',
        arg9: '',
        arg10: '',
        arg11: '',
        arg12: ''
      },
      deviceInfoTime: 0,
      typeList: ['1', '2', '3', '4'],
      cmdList: [],
      currentEnv: 'prod',
      envOptionTypes: [
        {
          value: 'prod',
          label: '正服/beta'
        },
        {
          value: 'test',
          label: '测服 仅支持查询心跳包、action，且不支持查询换绑'
        }

      ],
      value4: 'Asia/Shanghai',
      queryDate: [new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate()),
        new Date(new Date(defaultEndDate.getFullYear(), defaultEndDate.getMonth(), defaultEndDate.getDate()).getTime() + 24 * 60 * 60 * 1000 - 1)
      ],
      input: '',
      tableData: [],
      tableDataLog: [],
      key: 1, // table key
      key1: 2,
      formTheadOptions: [''],
      icon: '',
      cleanTypeMap: {
        2: '全局',
        52: '预约全局',
        9: '选房间',
        59: '预约选房间',
        7: '新建图',
        14: '划区',
        1002: '扫拖-全局',
        1052: '扫拖-预约全局',
        1009: '扫拖-选房间',
        1059: '扫拖-预约选房间',
        1014: '扫拖-划区',
        2002: '单拖-全局',
        2052: '单拖-预约全局',
        2009: '单拖-选房间',
        2059: '单拖-预约选房间',
        2014: '单拖-划区'
      },
      vacuumMopModeMap: {
        0: '单扫',
        1: '扫拖',
        2: '单拖'
      },
      cmdMap: {
        'device_ctrl': '更新清扫偏好',
        'set_mode': '操作设备',
        'set_room_clean': '选房间清扫',
        'set_area_clean': '划区清扫',
        'get_info': '获取设备信息',
        'get_status': '获取设备状态',
        'set_consumables': '重置耗材',
        'delete_map': '删图',
        'set_current_map_id': '切图',
        'get_all_map_id': '获取所有地图id',
        'get_mute_setting': '获取静音设置',
        'set_mute_setting': '更新静音设置',
        'get_specify_map': '获取指定地图文件',
        'replace_map': '替图',
        'save_map': '保存增量图',
        'get_map': '获取当前记忆图',
        'upload_log_url': '上传log',
        'upgrade': '升级',
        'mergeRooms': '合并房间',
        'splitRooms': '拆分房间',
        'set_room_name': '更新房间名称',
        'setPlan': '批量更新房间名称',
        'set_preference': '更新清扫偏好',
        'set_order': '设置定时',
        'set_virwall': '设置虚拟墙',
        'sync_time': '设备请求同步时间',
        'set_time': '打开app同步时间到设备',
        'get_order': '打开app获取设备定时任务',
        'log_control': '用户提交反馈，请求设备上传固件日志',
        'delete_order': '删除定时任务',
        'get_current_map': '获取临时图',
        'get_consumables': '获取耗材信息'
      },
      modeMap: {
        0: '空闲',
        1: '清扫中',
        4: '暂停',
        5: '回充',
        10: '清扫完成 开始回去充电',
        11: '低电回充',
        30: '划区清扫中',
        31: '划区清扫暂停',
        32: '划区清扫完成回充中',
        33: '划区清扫低电回充',
        35: '划区清扫空闲',
        36: '拖地清扫中；',
        37: '拖地清扫暂停',
        38: '拖地清扫完成回充；',
        39: '拖地清扫断点',
        40: '拖地空闲',
        45: '建图中',
        46: '建图暂停',
        47: '建图完成回充中',
        48: '建图低电回充',
        1101: '扫拖中',
        1102: '扫拖暂停',
        1103: '扫拖完成回充',
        1104: '扫拖断点',
        1105: '扫拖空闲',
        1201: '扫拖划区中',
        1202: '扫拖划区暂停',
        1203: '扫拖划区完成回充',
        1204: '扫拖划区断点',
        1205: '扫拖划区空闲',
        1301: '单拖中',
        1302: '单拖暂停',
        1303: '单拖完成回充',
        1304: '单拖断点',
        1305: '单拖空闲',
        1401: '单拖划区中',
        1402: '单拖划区暂停',
        1403: '单拖划区完成回充',
        1404: '单拖划区断点',
        1405: '单拖划区空闲'
      },
      errorMap: {
        500: '雷达超时',
        501: '主机轮子抬起',
        502: '电量不足，无法启动',
        503: '灰尘盒不存在',
        507: '重定位失败',
        508: '主机斜坡启动',
        509: '触发地检，请擦拭悬崖传感器',
        510: '碰撞异常',
        511: '回充失败',
        512: '断点回充失败',
        513: '导航失败',
        514: '脱困失败',
        517: '设备升级中',
        518: '电量不足，主机在充电座上，用户操作',
        521: '水箱不存在',
        522: '拖布不存在',
        2100: '断点回充途中',
        2101: '断点充电中',
        2102: '主机正常回充',
        2103: '主机充电中',
        2104: '用户手动回充',
        2105: '主机充电完成',
        2108: '重定位中',
        2109: '二次清扫中',
        2110: '主机自检中',
        2111: '地图生成中',
        2112: '快速建图中',
        529: '没有安装二合一水箱和拖布，启动单拖',
        530: '没有安装二合一水箱和拖布，启动扫拖',
        531: '仅安装拖布，没有安装水箱，启动扫拖',
        532: '清扫完成回充成功',
        533: '主机待机超过6小时，自动关机',
        534: '主机电量低于15%，自动关机',
        535: '带拖布和清扫完成回充成功',
        536: '带拖布和水箱清扫完成回充成功',
        540: '没有安装水箱和尘盒，启动扫拖',
        541: '带尘盒完成回充成功',
        542: '带水箱完成回充成功'
      }
    }
  },
  watch: {
  },
  methods: {
    open() {
      this.$message('No Data')
    },
    search() {
      this.deviceInfoTime = new Date().getTime()
      // deviceInfo.methods.loadDeviceInfo()
      var startDate = dateTransToString(this.queryDate[0])
      var endDate = dateTransToString(this.queryDate[1])
      this.tableData = []
      this.tableDataLog = []

      this.listLoading = true
      this.scheduleLoading = true
      this.query.startDate = startDate
      this.query.endDate = endDate
      getEventTracking(this.query).then(
        (response) => {
          if (response.data === undefined) {
            return
          }
          for (let i = 0; i < response.data.length; i++) {
            var data = {}
            // js duixiang
            var currentData = response.data[i]
            data = {
              content: response.data[i].eventKey + ' ( ' + currentData.arg11 + ' ) ' + currentData.arg12,
              timestamp: response.data[i].createDate,
              createTime: response.data[i].createDate,
              log_type: currentData.eventType === 1 ? '[ action ]' : '[ page ]'
            }
            data.raw = currentData
            this.tableDataLog.push(data)
          }
        }
      ).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
