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
          <el-input v-model="deviceId" placeholder="请输入设备ID/MAC" />
        </el-col>
        <el-col :span="5">
          <el-select v-model="value4" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :seleced="item.seleced"
            />
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24" />
      </el-row>

      <el-row :gutter="10">
        <el-col :span="7">
          <el-select
            v-model="typeList"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in optiontypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="cmdList"
            multiple
            filterable
            placeholder="指定 action"
            style="width: 100%"
          >
            <el-option
              v-for="(value, k) in cmdMap"
              :key="k"
              :label="k +' '+value"
              :value="k"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="currentEnv"
            filterable
            placeholder="环境"
            style="width: 100%"
          >
            <el-option
              v-for="item in envOptionTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-search"
            style="width: 100%"
            @click="search"
          >搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <deviceInfo :env="currentEnv" :device-id="deviceId" :timezone="value4" :time="deviceInfoTime" />

    <el-table
      v-show="currentEnv === 'prod'"
      :key="key"
      v-loading="scheduleLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      :row-class-name="rowStyle"
    >
      <el-table-column
        v-for="fruit in formThead"
        :key="fruit"
        :label="fruit"
        :width="columnWith(fruit)"
      >
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div v-loading="listLoading" class="block">
      <div class="radio">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>

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
          <el-button v-if="activity.subListSize > 0" style="margin-left: 20px" type="warning" @click="activity.showSubList= !activity.showSubList">{{ activity.showSubList? '收缩' : '展开' }}{{ activity.subListSize }}条相似数据</el-button>

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

          <el-timeline v-if="activity.showSubList" :reverse="!reverse" style="margin-top: 20px">
            <el-timeline-item
              v-for="(activity1, index) in activity.propListContent"
              :key="index"
              :timestamp="activity1.timestamp"
            >
              {{ activity1.content }}
              <el-popover
                placement="top-start"
                trigger="hover"
              >
                <pre style="max-width: 600px;max-height: 600px;overflow-y: auto">{{ JSON.stringify(activity1.raw, null, 4) }}</pre>
                <el-button slot="reference">raw</el-button>

              </el-popover>
            </el-timeline-item>
          </el-timeline>
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
import { getSchedules, getDeviceLog } from '@/api/shooter'
import deviceInfo from '@/views/data-source/device-info'
import { dateTransToString } from '@/utils/util-date'

const defaultStartDate = new Date()
const defaultEndDate = new Date()

const defaultFormThead = [
  'mapId',
  'scheduleId',
  'isEnable',
  'isRepeat',
  'isMapRoomAvailable',
  'vacuumMopMode',
  'roomsIdroomsName',
  'scheduleTime',
  'weekday'
]
const defaultFormThead_2 = [
  'createDate',
  'createTime',
  'type',
  'cmd',
  '',
  'result',
  'type',
  'cleanType',
  'cleanSize',
  'cleanTime',
  'timeBeginMs',
  'battery'
]
export default {
  components: {
    deviceInfo
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
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead, // 默认表头 Default header
      formThead2: defaultFormThead_2,
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
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(
        (i) => valArr.indexOf(i) >= 0
      )
      this.key = this.key + 1 // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  methods: {
    rowStyle({ row, rowIndex }) {
      if (row.isMapRoomAvailable === 'YES' && row.isEnable === 'YES') {
        return 'success-row'
      }
      return 'warning-row'
    },
    open() {
      this.$message('No Data')
    },
    columnWith(item) {
      let widthStr = ''
      switch (item) {
        case 'scheduleTime':
          widthStr = '120'
          break
        case 'mapId':
          widthStr = '150'
          break
        case 'scheduleId':
          widthStr = '150'
          break
        case 'roomsIdroomsName':
          widthStr = '350'
          break
        case 'weekday':
          widthStr = '350'
          break
        case 'isEnable':
          widthStr = '100'
          break
        case 'isRepeat':
          widthStr = '100'
          break
        case 'isMapRoomAvailable':
          widthStr = '100'
          break
        default:
          break
      }
      return widthStr
    },
    addRoomIdRoomName(roomsId, roomsName) {
      if (roomsId === undefined || roomsId.length === 0) {
        return '全局清扫'
      }
      var content = []
      for (let i = 0; i < roomsId.length; i++) {
        content.push(roomsName[i] + ':' + roomsId[i])
      }
      return content.join(' | ')
    }, // roomIdrooName 拼接方法
    changeWeekdayString(day) {
      var content = ''
      switch (day) {
        case 6:
          content = '星期六'
          break
        case 5:
          content = '星期五'
          break
        case 4:
          content = '星期四'
          break
        case 3:
          content = '星期三'
          break
        case 2:
          content = '星期二'
          break
        case 1:
          content = '星期一'
          break
        case 0:
          content = '星期日'
          break
      }
      return content
    },
    changeWeekday(weekday) {
      if (weekday.length !== 7) {
        return ''
      }
      var content = []
      if (weekday === '1111111') {
        return '每天'
      }
      for (let i = 0; i < weekday.length; i++) {
        if (weekday[i] === '1') {
          content.push(this.changeWeekdayString(i))
        }
      }
      return content.join(',')
    }, // 星期字符串转格式
    roomAvailableFlag(isEnable) {
      if (isEnable === 1) {
        return 'YES'
      } else {
        return 'NO'
      }
    },
    judgeFlag(isEnable) {
      if (isEnable === '1') {
        return 'YES'
      } else {
        return 'NO'
      }
    }, // isEnable判断
    judgeisRepeat(isRepeat) {
      if (isRepeat === '1') {
        return 'YES'
      } else {
        return 'NO'
      }
    }, // isRepeat判断
    search() {
      this.deviceInfoTime = new Date().getTime()
      // deviceInfo.methods.loadDeviceInfo()
      var util = require('util')
      if (this.deviceId === '') {
        this.open()
        return
      }
      if (this.value4 === null) {
        this.open()
        return
      }
      if (this.typeList === '') {
        this.open()
        return
      }
      var startDate = dateTransToString(this.queryDate[0])
      var endDate = dateTransToString(this.queryDate[1])
      var timezone = this.value4
      var typeList = this.typeList
      this.tableData = []
      this.tableDataLog = []

      this.listLoading = true
      this.scheduleLoading = true

      getSchedules(this.deviceId).then((response) => {
        if (response.code !== 1) {
          alert(response.message)
        }
        for (let i = 0; i < response.data.length; i++) {
          const currentData = response.data[i]
          this.tableData.push({
            mapId: currentData.mapId,
            scheduleId: currentData.scheduleId,
            isEnable: this.judgeFlag(currentData.enableFlag),
            isMapRoomAvailable: this.roomAvailableFlag(currentData.isMapRoomAvailable),
            isRepeat: this.judgeisRepeat(currentData.repeat),
            roomsIdroomsName: this.addRoomIdRoomName(
              currentData.roomsId,
              currentData.roomsName
            ),
            scheduleTime: currentData.scheduleTime,
            vacuumMopMode: currentData.vacuumMopMode === undefined ? '单扫' : this.vacuumMopModeMap[currentData.vacuumMopMode],
            weekday: this.changeWeekday(currentData.weekday)
          })
        }
      }).finally(() => {
        this.scheduleLoading = false
      })
      getDeviceLog(this.currentEnv, this.deviceId, startDate, endDate, timezone, typeList).then(
        (response) => {
          if (response.data === undefined) {
            return
          }
          for (let i = 0; i < response.data.length; i++) {
            var data = {}
            // js duixiang
            var currentData = response.data[i].data
            switch (response.data[i].type) {
              // action type-1
              case 1:
                var cmd = response.data[i].data.cmd
                if (this.cmdList.length !== 0 && this.cmdList.indexOf(cmd) < 0) {
                  continue
                }

                data = {
                  raw: 'ddddd',
                  color: '#122856',
                  icon: 'el-icon-monitor',
                  timestamp: response.data[i].createDate,
                  log_type: '[ action ]',
                  cmd: response.data[i].data.cmd,
                  response: response.data[i].data.response
                }

                data.tagList = []

                data.tagList.push({
                  type: response.data[i].data.response === 'success' ? 'success' : 'danger',
                  label: '下发指令：' + this.cmdMap[cmd]
                })

                var cx = cmd +
                  ' ' +
                  response.data[i].data.response
                if (this.actionText[cmd] !== undefined) {
                  if (response.data[i].data.cmd === 'set_mode' || response.data[i].data.cmd === 'set_area_clean') {
                    cx = cx + ' ' + this.actionText['set_mode']['name'] + ' ' + this.actionText['set_mode']['type'][response.data[i].data.type ] +
                      ' ' + this.actionText['set_mode']['value'][response.data[i].data.value ]
                  }
                  if (response.data[i].data.cmd === 'set_room_clean') {
                    cx = cx + ' ' + this.actionText[cmd]['name'] + ' 房间id:' + response.data[i].data.roomsId
                  }
                  if (currentData.vacuumMopMode !== undefined) {
                    data.tagList.push({
                      type: 'success',
                      label: this.vacuumMopModeMap[currentData.vacuumMopMode]
                    })
                  } else {
                    data.tagList.push({
                      type: 'success',
                      label: this.vacuumMopModeMap[0]
                    })
                  }
                }

                data.content = cx

                if (cmd === 'delete_order') {
                  data.tagList.push({
                    type: 'danger',
                    label: '任务id:' + currentData.orderId
                  })
                }
                if (cmd === 'set_preference') {
                  var spLabel = '吸力'
                  if (currentData.ctrlType === 1) {
                    spLabel = '吸力'
                  }
                  if (currentData.ctrlType === 2) {
                    spLabel = '水量'
                  }
                  if (currentData.ctrlType === 3) {
                    spLabel = '拖地路线'
                  }
                  data.tagList.push({
                    type: 'success',
                    label: spLabel
                  })
                  var spVLabel = '低'
                  if (currentData.value === 1) {
                    spVLabel = '低'
                  }
                  if (currentData.value === 2) {
                    spVLabel = '中'
                  }
                  if (currentData.value === 3) {
                    spVLabel = '强'
                  }
                  if (currentData.value === 11) {
                    spVLabel = '低'
                  }
                  if (currentData.value === 12) {
                    spVLabel = '中'
                  }
                  if (currentData.value === 13) {
                    spVLabel = '强'
                  }
                  data.tagList.push({
                    type: 'success',
                    label: spVLabel
                  })
                  if (currentData.type === 2) {
                    spLabel = '重置地图'
                  }
                  data.tagList.push({
                    type: 'success',
                    label: spLabel
                  })
                }
                if (cmd === 'set_order') {
                  data.tagList.push({
                    type: 'success',
                    label: '任务id:' + currentData.orderId
                  })

                  if (currentData.roomsId.length === 0) {
                    data.tagList.push({
                      type: 'success',
                      label: '全局'
                    })
                  } else {
                    data.tagList.push({
                      type: 'success',
                      label: '选房间'
                    })
                  }
                  if (currentData.enable) {
                    data.tagList.push({
                      type: 'success',
                      label: '启用'
                    })
                  } else {
                    data.tagList.push({
                      type: 'danger',
                      label: '禁用'
                    })
                  }
                  data.tagList.push({
                    type: 'success',
                    label: parseInt(currentData.dayTime / 60).toString().padStart(2, '0') + ':' + (currentData.dayTime % 60).toString().padStart(2, '0')
                  })
                  if (currentData.repeat) {
                    data.tagList.push({
                      type: 'success',
                      label: this.changeWeekday(currentData.weekday.toString(2).split('').reverse().join('').padStart(7, '0'))
                    })
                  } else {
                    data.tagList.push({
                      type: 'success',
                      label: '单次'
                    })
                  }
                }
                break
              // event type-2
              case 2:
                data = {
                  color: '#561250',
                  icon: 'el-icon-info',
                  content: response.data[i].data.type,
                  timestamp: response.data[i].createDate,
                  createTime: response.data[i].createTime,
                  log_type: '[ event ]',
                  type: response.data[i].data.type
                }
                break
              // 清扫记录type-3
              case 3:
                data = {
                  color: '#1f5612',
                  icon: 'el-icon-copy-document',
                  content:
                    this.cleanTypeMap[currentData.cleanType] +
                    ' mapId: ' +
                    response.data[i].data.mapId +
                    ' cleanTime :' +
                    response.data[i].data.cleanTime +
                    ' cleanSize :' +
                    response.data[i].data.cleanSize,
                  timestamp: response.data[i].createDate,
                  createTime: response.data[i].createTime,
                  cleanSize: response.data[i].cleanSize,
                  cleanTime: response.data[i].cleanTime,
                  timeBeginDate: response.data[i].timeBeginDate,
                  mapId: response.data[i].mapId,
                  log_type: '[ 清扫记录 ]',
                  cleanType: currentData.cleanType,
                  timeBeginMs: response.data[i].timeBeginMs
                }
                data.tagList = []
                data.tagList.push({
                  type: 'success',
                  label: '设备开始清扫时间:' + currentData.timeBeginDate
                })

                if (currentData.errorTimes !== undefined && currentData.errorTimes > 0) {
                  data.tagList.push({
                    type: 'danger',
                    label: '异常:' + currentData.errorTimes + '次'
                  })

                  if (currentData.errorList !== undefined) {
                    currentData.errorCodeList.forEach(code => {
                      data.tagList.push({
                        type: 'danger',
                        label: this.errorMap[code]
                      })
                    })
                  }
                }
                break
              // 心跳包 type-4
              case 4:
                data = getPropContent(currentData)
                if (currentData.propList) {
                  data.propListContent = []
                  data.showSubList = false
                  currentData.propList.forEach(x => {
                    const subData = getPropContent(x)
                    delete subData.raw.propList
                    data.propListContent.push({
                      content: subData.content,
                      timestamp: subData.timestamp,
                      raw: subData.raw
                    })
                  })
                  delete data.raw.propList
                }
                break

              default:
                break
            }
            data.raw = currentData
            this.tableDataLog.push(data)
          }
        }
      ).finally(() => {
        this.listLoading = false
      })

      var getPropContent = (currentData) => {
        const data = {
          color: '#561236',
          icon: 'el-icon-first-aid-kit',
          timestamp: currentData.createTimeDate,
          log_type: '[ prop ]',
          content: JSON.stringify(currentData),
          raw: currentData,
          subListSize: currentData.propList === undefined ? 0 : currentData.propList.length
        }
        data.tagList = []
        if (currentData.mode || currentData.mode === 0) {
          data.content = util.format(
            'mode:%s faultCode :%s chargeState :%s battery :%s cleanTime:%s cleanSize: %s  count: %s ',
            currentData.mode,
            currentData.faultCode,
            currentData.chargeState,
            currentData.battery,
            currentData.cleanTime,
            currentData.cleanSize,
            currentData.count
          )
          data.color = '#561215'
          data.tagList.push({
            type: 'success',
            label: this.modeMap[currentData.mode]
          })
          if (currentData.faultCode !== 0) {
            if (currentData.faultCode >= 500 && currentData.faultCode < 600) {
              data.tagList.push({
                type: 'danger',
                label: this.errorMap[currentData.faultCode]
              })
            } else {
              data.tagList.push({
                type: '',
                label: this.errorMap[currentData.faultCode]
              })
            }
          }
          if (currentData.chargeState === 1) {
            data.tagList.push({
              type: 'warning',
              label: '充电中'
            })
          }
        } else if (currentData.mainBrush) {
          data.content = util.format(
            'mainBrush: %s sideBrush: %s filter: %s',
            currentData.mainBrush,
            currentData.sideBrush,
            currentData.filter
          )
          data.color = '#562d12'
        } else if (currentData.mac) {
          data.content = util.format(
            'mcuSysVersion: %s deviceType: %s ipaddr: %s',
            currentData.mcuSysVersion,
            currentData.deviceType,
            currentData.ipaddr
          )
          data.color = '#565612'
        } else if (currentData.appVersion) {
          data.content = util.format(
            'deviceVersion: %s manufacturer: %s ',
            currentData.mcuSysVersion,
            currentData.manufacturer
          )
          data.color = '#245612'
        } else if (currentData.mapIdList) {
          data.content = util.format(
            'mapIdList: %s mapName: %s curMap: %s mapid : %s ',
            currentData.mapIdList,
            currentData.mapName,
            currentData.curMap,
            currentData.mapid
          )
          data.color = '#12563d'
        } else if (currentData.mcuSysVersion) {
          data.content = util.format(
            'mcuSysVersion: %s source: %s',
            currentData.mcuSysVersion,
            currentData.source
          )
          data.color = '#122c56'
        } else if (currentData.deviceState) {
          data.content = '' + currentData.deviceState + ' '
          data.color = '#371256'
        } else if (currentData.iotState) {
          data.content = '' + currentData.iotState + ' '
          data.color = '#561252'
        } else if (currentData.showMappingCompleted !== undefined) {
          if (currentData.showMappingCompleted && currentData.source === 'firmware') {
            data.content = '显示新图提示'
          }
          if (!currentData.showMappingCompleted && currentData.source === 'app') {
            data.content = 'app 展示了新图提示'
          }
          if (currentData.noticeSaveMap !== undefined) {
            data.content = '更新弹框标记 来源:' + currentData.source
            if (currentData.noticeSaveMap) {
              data.tagList.push({
                type: 'success',
                label: '提示增量更新'
              })
            } else {
              data.tagList.push({
                type: 'danger',
                label: '丢弃增量更新'
              })
            }
            if (currentData.noticeReplaceMap) {
              data.tagList.push({
                type: 'success',
                label: '提示有新图需要替换'
              })
            } else {
              data.tagList.push({
                type: 'danger',
                label: '丢弃新图'
              })
            }
            if (currentData.showMappingCompleted) {
              data.tagList.push({
                type: 'success',
                label: '提示有新图完成'
              })
            } else {
              data.tagList.push({
                type: 'danger',
                label: '关闭有新图完成的提示'
              })
            }
          }
        } else if (currentData.currentMapId !== undefined) {
          data.content = '收到设备上传的记忆图'
        } else {
          // data.content = 'unk'
          // continue
        }
        return data
      }
    }
  }
}
</script>
