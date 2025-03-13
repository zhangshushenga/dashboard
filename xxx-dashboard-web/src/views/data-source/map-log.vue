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
          <el-select v-model="value4" placeholder="请选择">
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

      <el-row :gutter="10">
        <el-col :span="24" />
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-select
            v-model="typeList"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in optionTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="currentEnv"
            placeholder="请选择"
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
        <el-col :span="6">
          <el-button
            type="primary"
            icon="el-icon-search"
            style="width: 100%"
            @click="search"
          >搜索</el-button>
        </el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            style="width: 100%"
            @click="batchDownload"
          ><i class="el-icon-download" />
            批量下载
          </el-button>
        </el-col>
      </el-row>
    </div>
    <deviceInfo :env="currentEnv" :device-id="deviceInfoDeviceId" :timezone="deviceInfoTimezone" />
    <br>

    <div v-loading="listLoading" class="block">
      <el-timeline style="width: 100%">
        <el-timeline-item
          v-for="(activity, key) in tableDataLog"
          :key="key"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          <el-row>
            <el-col
              :span="15"
            ><div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8">
                  {{ activity.createDate }}
                </el-col>
                <el-col :span="6">
                  {{ activity.mapType }}
                </el-col>
                <el-col :span="6">
                  {{ activity.sizeText }}
                </el-col>
              </el-row>

            </div></el-col>

            <el-col
              :span="3"
            ><div class="grid-content bg-purple">
              <el-button
                type="primary"
                icon="el-icon-picture-outline"
                @click="mapClick(activity)"
              >预览</el-button>
            </div></el-col>
            <el-col
              :span="3"
            ><div class="grid-content bg-purple">
              <el-button
                type="primary"
                @click="downloadFile(activity)"
              ><i class="el-icon-download" />
                下载
              </el-button>
            </div></el-col>
            <el-col
              :span="3"
            ><div class="grid-content bg-purple">
              <el-checkbox
                v-model="selectMapKeyList"
                :label="activity.list"
                border
                size="medium"
              >选中</el-checkbox>
            </div></el-col>
          </el-row>

          <br>

          <el-image v-show="activity.showImg" :src="activity.loadingUrl" :preview-src-list="getPrivewImages(key)">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
          <!--          <div class="demo-image__placeholder">-->
          <!--            <div class="block">-->
          <!--              <img :src="activity.src">-->
          <!--            </div>-->
          <!--          </div>-->
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getMapLog } from '@/api/shooter'
import { getDownload } from '@/api/shooter'
import { endLoading } from '@/utils/loading'
import loadingGif from '@/assets/loading.gif'
import img404 from '@/assets/404_images/404.png'
import deviceInfo from '@/views/data-source/device-info'
const defaultFormThead = ['createDate', 'fileName', 'mapType']
const defaultFormThead_2 = ['createDate']

import { dateTransToString } from '@/utils/util-date'

const defaultStartDate = new Date()
const defaultEndDate = new Date()

export default {
  components: {
    deviceInfo
  },
  data() {
    return {
      deviceInfoDeviceId: '',
      deviceInfoTimezone: '',
      listLoading: false,
      currentEnv: 'prod',
      envOptionTypes: [
        {
          value: 'prod',
          label: '正服/beta'
        },
        {
          value: 'test',
          label: '测服'
        }
      ],
      typeList: ['history_map', 'current_map', 'memory_map'],
      optionTypes: [
        {
          value: 'history_map',
          label: 'history_map'
        },
        {
          value: 'current_map',
          label: 'current_map'
        },
        {
          value: 'memory_map',
          label: 'memory_map'
        }
      ],
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
        }
      ],
      srcList: [],
      selectMapKeyList: [],
      mapDataDownload: [],
      checkList: [],
      deviceId: '',
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
      formThead2: defaultFormThead_2
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
    getPrivewImages(index) {
      const tempImgList = [...this.srcList]// 所有图片地址
      if (index === 0) return tempImgList
      // 调整图片顺序，把当前图片放在第一位
      const start = tempImgList.splice(index)
      const remain = tempImgList.splice(0, index)
      return start.concat(remain)// 将当前图片调整成点击缩略图的那张图片
    },
    done() {
      this.$message('No checked')
    },
    open() {
      this.$message('No Data')
    },
    downloadFile: function(data) {
      const url = data.downloadUrl
      const link = document.createElement('a')
      try {
        link.href = url
        // link.target = '_blank'
      } catch (error) {
        link.href = window.URL.createObjectURL(url)
      }
      link.click()
    },
    batchDownload() {
      var uuidBase
      if (this.selectMapKeyList.length === 0) {
        this.done()
        return
      }// 判断是否选中框
      getDownload(this.selectMapKeyList).then((response) => {
        console.log(response)
        if (this.selectMapKeyList === undefined) {
          endLoading()
          return
        }
        var uuid = response.data
        console.log(uuid)
        uuidBase =
          'https://venus-dashboard-service.wyzecam.com/api/debug/map_log/batch_download' +
          '?Authorization=' +
          Cookies.get('Admin-Token') +
          '&uuid=' +
          response.data + '&env=' + this.currentEnv + '&deviceId=' + this.deviceId
        window.open(uuidBase)
      })// 请求借口 6
      // uuid
      // 接口7
    },
    mapClick(activity) {
      var newImg = new Image()
      // newImg.src = 'https://venus-dashboard-service.wyzecam.com/api/debug/map_log/img?Authorization=2ea06b1533edcf0643e084d42b248cd6120140a1736f419eb43c050a3ea7eac6&key=map/JA_RO2_7C78B20A6BF6/2021-08-11%2004:02:42.99_1628654562995_history_map.txt'
      newImg.src = activity.src
      newImg.onload = () => { // 图片加载成功后把地址给原来的img
        activity.loadingUrl = newImg.src
        // this.tableDataLog[key] = activity
      }
      newImg.onerror = () => {
        activity.loadingUrl = img404
      }
      activity.showImg = true
    },
    search() {
      this.deviceInfoTimezone = this.value4
      this.deviceInfoDeviceId = this.deviceId
      console.log('button is click')
      console.log('device id:', this.deviceId)
      console.log(this.queryDate.length)
      if (this.queryDate.length !== 2) {
        this.open()
        return
      }
      if (this.deviceId === '') {
        this.open()
        return
      }
      if (this.value4 === null) {
        this.open()
        return
      }

      var startDate = dateTransToString(this.queryDate[0])
      var endDate = dateTransToString(this.queryDate[1])
      var timezone = this.value4
      this.tableData = []
      this.tableDataLog = []
      this.srcList = []

      this.listLoading = true
      const typeList = this.typeList
      const param = {
        'deviceId': this.deviceId,
        startDate,
        endDate,
        timezone,
        env: this.currentEnv,
        'typeList': typeList.join(',')
      }
      getMapLog(param).then(
        (response) => {
          if (response.code !== 1) {
            alert(response.message)
          }
          console.log(response)
          if (response.data === undefined) {
            return
          }

          for (let i = 0; i < response.data.length; i++) {
            var data = {
              showImg: false,
              color: '#008B8B',
              icon: 'el-icon-position',
              content:
              response.data[i].createDate + ' ' + response.data[i].mapType + ' ' + response.data[i].sizeText,
              createDate: response.data[i].createDate,
              mapType: response.data[i].mapType,
              sizeText: response.data[i].sizeText,
              fileName: response.data[i].fileName,
              serverPath: response.data[i].key,
              src: getImgUrl(response.data[i].key, this.currentEnv, this.deviceId),
              downloadUrl: getDownloadUrl(response.data[i].key, this.currentEnv, this.deviceId),
              loadingUrl: loadingGif,
              list: response.data[i].key
            }
            this.srcList.push(data.src)
            this.tableDataLog.push(data)
          }
        }
      ).finally(() => {
        this.listLoading = false
      })

      function getImgUrl(key, env, deviceId) {
        const token = Cookies.get('Admin-Token')
        const baseUrl = process.env.VUE_APP_BASE_API
        return baseUrl + '/api/debug/map_log/img?Authorization=' + token + '&key=' + key + '&env=' + env + '&deviceId=' + deviceId
      }
      function getDownloadUrl(key, env, deviceId) {
        const token = Cookies.get('Admin-Token')
        const baseUrl = process.env.VUE_APP_BASE_API
        return baseUrl + '/api/debug/map_log/raw_file?Authorization=' + token + '&key=' + key + '&env=' + env + '&deviceId=' + deviceId
      }
    }
  }
}

</script>

<style scoped>
.el-row {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
