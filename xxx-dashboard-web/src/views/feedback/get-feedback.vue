<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.token"
        placeholder="token"
        style="width: 400px;margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.interval"
        placeholder="token"
        style="width: 400px;margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.queryDate"
        style="width: 400px;margin-right: 10px"
        class="filter-item"
        type="datetimerange"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      />

      <!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
      <!--        搜索-->
      <!--      </el-button>-->

      <el-button class="filter-item" :disabled="listLoading" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleFilter">
        拉取
      </el-button>
    </div>
    <div>
      {{ list.length }} / {{ total }}
    </div>

    <div>
      {{ detailNum }} / {{ total }}
    </div>

    <div>
      {{ attrNum }} / {{ attrTotalNum }}
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="反馈id"
        prop="id"
        align="center"
        min-width="50"
      >
        >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="反馈时间"
        prop="create_time"
        align="center"
        min-width="100"
      >
        >
        <template slot-scope="{row}">
          <span>{{ formatTime(row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="固件信息"
        prop="data_info"
        align="left"
        min-width="120"
      >
        >
        <template slot-scope="{row}">
          <span>{{ row.device_id }}</span><br>
          <span>固件版本:{{ row.firmware_version }}</span><br>
        </template>
      </el-table-column>
      <el-table-column
        label="App信息"
        prop="data_info"
        align="left"
        min-width="100"
      >
        >
        <template slot-scope="{row}">
          <span>APP版本:{{ row.app_version }}</span><br>
          <span>手机信息:{{ row.client_device }}</span><br>
          <span>手机系统:{{ row.phone_os }}</span><br>
          <span>插件版本:{{ row.plug_version }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="问题分类"
        prop="category_id"
        align="center"
        min-width="100"
      >
        >
        <template slot-scope="{row}">
          <span>{{ categoriesMap[row.category_id] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="content"
        prop="content"
        align="center"
        min-width="200"
      >
        >
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="文件id" align="center" width="400">-->
      <!--        <template slot-scope="{row}">-->
      <!--          {{ row.fileId }}-->
      <!--          &lt;!&ndash;          <el-tag>{{ row.fileId }}</el-tag>&ndash;&gt;-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column label="设备上传状态" class-name="status-col" width="200" />
      <el-table-column label="Actions（最多自动请求200次）" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            v-show="row.upload"
            size="mini"
            type="success"
            @click="downloadFile(row)"
          >
            下载
          </el-button>
          <el-button v-show="!row.upload" title="最多自动请求200次" size="mini" @click="checkAndDownloadFile(row, true)">
            检查且下载
          </el-button>
          <el-button v-show="!row.upload" size="mini" @click="autoCheckAndDownloadFile(row)" v-html="row.autoText" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { importFromWdc, getTotpCode } from '@/api/wdc-feedback'
import waves from '@/directive/waves' // waves directive
import { dateTransToString } from '@/utils/util-date'

const defaultStartDate = new Date(new Date(new Date()).getTime() - 24 * 60 * 60 * 1000 * 7)
const defaultEndDate = new Date()

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        draft: 'info',
        false: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      searchText: '搜索',
      list: [
      ],
      startTs: 0,
      endTs: 0,
      total: 0,
      detailNum: 0,
      attrNum: 0,
      attrTotalNum: 0,
      listLoading: false,
      listQuery: {
        interval: 1000,
        page: 1,
        limit: 20,
        importance: undefined,
        date: '',
        deviceId: '',
        token: '',
        sort: '+id',
        queryDate: [new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate()),
          new Date(new Date(defaultEndDate.getFullYear(), defaultEndDate.getMonth(), defaultEndDate.getDate()).getTime() + 24 * 60 * 60 * 1000 - 1)
        ]
      },
      categoriesMap: {
        1173: 'Setup issues',
        1174: 'Disconnection ',
        1175: 'Mapping issues ',
        1176: 'Map disappeared',
        1177: 'Recharge issues',
        1178: 'Incorrect cleaning area',
        1179: 'Hardware issues',
        1180: 'Battery performance',
        1181: 'Firmware update issues',
        1182: 'Other issues',
        1183: 'Ideas'
      },
      downloadLoading: false
    }
  },
  created() {
    // this.getList()
    this.getToken()
  },
  methods: {
    formatTime(time) {
      return dateTransToString(new Date(time))
    },
    getFeedbackList() {
      if (this.listQuery.token === undefined || this.listQuery.token.trim() === '') {
        this.$message.error('请输入token')
        return
      }
      this.listLoading = true
      this.list = [
      ]
      this.total = 0
      this.attrNum = 0
      this.detailNum = 0
      this.attrTotalNum = 0

      this.startTs = Date.parse(new Date(dateTransToString(this.listQuery.queryDate[0])))
      this.endTs = Date.parse(new Date(dateTransToString(this.listQuery.queryDate[1])))
      this.getListFromWdc(1)
    },

    getToken() {
      getTotpCode().then(response => {
        const totpCode = response.data
        fetch('https://wyze-developer-center-server.wyzecam.com/totp/login', {
          'headers': {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'access_token': '',
            'content-type': 'application/json',
            'is_super_admin': 'undefined',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'time_zone': 'undefined',
            'Referer': 'https://wyze-developer-center.wyzecam.com/',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
          },
          'body': '{"username":"cyj","totpCode":"' + totpCode + '"}',
          'method': 'POST'
        }).then(res => {
          // console.log(res) // 拿到的是一个状态码
          // 用json格式读出来，也可以改为text，得到的就是一个text字符串，但是要做一个json解析，所以极少用text格式
          return res.json()
        }).then((res) => {
          // 第二个.then拿到的是从后端请求回来的真正的数据
          // 想要获取响应数据，需在第一个then中将响应数据转为json再返回给第二个then，在第二个then中去获取值
          // console.log(res)
          if (res.code !== 1) {
            this.$message.error('请求失败，' + res.message)
          }
          this.listQuery.token = res.data
        })
          // 请求错误时执行
          .catch(err => {
            console.log(err)
          }).finally(() => {
          })
      })
    },

    getListFromWdc(page) {
      fetch('https://wyze-developer-center-server.wyzecam.com/feedback/feedbacks?device_model=JA_RO2&page=' + page + '&size=20&sort=id+desc&startTime=' + this.startTs + '&endTime=' + this.endTs + '', {
        'headers': {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'zh-CN,zh;q=0.9',
          'access_token': this.listQuery.token,
          'is_super_admin': 'false',
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'time_zone': 'Asia/Shanghai'
        },
        'referrer': 'https://wyze-developer-center.wyzecam.com/',
        'referrerPolicy': 'strict-origin-when-cross-origin',
        'body': null,
        'method': 'GET',
        'mode': 'cors',
        'credentials': 'omit'
      }).then(res => {
        // console.log(res) // 拿到的是一个状态码
        // 用json格式读出来，也可以改为text，得到的就是一个text字符串，但是要做一个json解析，所以极少用text格式
        return res.json()
      }).then((res) => {
        // 第二个.then拿到的是从后端请求回来的真正的数据
        // 想要获取响应数据，需在第一个then中将响应数据转为json再返回给第二个then，在第二个then中去获取值
        // console.log(res)
        if (res.code !== 1) {
          this.$message.error('请求失败，' + res.message)
        }
        res.data.forEach((value, index) => {
          this.list.push(value)
        })

        this.total = res.total
        if (this.list.length !== this.total) {
          // 先获取list数据
          console.log('go next page', page + 1, this.total, this.list.length)
          setTimeout(() => {
            this.getListFromWdc(page + 1)
          }, this.listQuery.interval)
        } else {
          console.log('start getting detail')
          // 获取list数据结束后 获取详情
          this.list.forEach((value, index) => {
            setTimeout(() => {
              this.getDetailFromWdc(value)
            }, this.listQuery.interval * (index + 1))
          })
        }
      })
        // 请求错误时执行
        .catch(err => {
          console.log(err)
        }).finally(() => {
        })
    },
    getDetailFromWdc(value) {
      fetch('https://wyze-developer-center-server.wyzecam.com/feedback/get-feedback-info?id=' + value.id, {
        'headers': {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'zh-CN,zh;q=0.9',
          'access_token': this.listQuery.token,
          'is_super_admin': 'false',
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'time_zone': 'Asia/Shanghai'
        },
        'referrer': 'https://wyze-developer-center.wyzecam.com/',
        'referrerPolicy': 'strict-origin-when-cross-origin',
        'body': null,
        'method': 'GET',
        'mode': 'cors',
        'credentials': 'omit'
      }).then(res => {
        // console.log(res) // 拿到的是一个状态码
        // 用json格式读出来，也可以改为text，得到的就是一个text字符串，但是要做一个json解析，所以极少用text格式
        return res.json()
      }).then(res => {
        if (res.code !== 1) {
          this.$message.error('请求失败，' + res.message)
          return
        }
        this.detailNum++
        if (res.data.attachments !== undefined) {
          this.attrTotalNum += res.data.attachments.length
          value.attachments = res.data.attachments
        }
        // 替换list的数据 使其包含附件
        // const index = this.list.findIndex(v => v.id === value.id)
        // this.list.splice(index, 1, res.data)
        if (this.detailNum === this.total) {
          // 详情获取完后 拉取附件地址
          this.getAttrUrl()
        }
      })
    },

    getAttrUrl() {
      // console.log(atta.url)
      // 获取附件 s3 链接
      var countIndex = 1
      this.list.forEach((value, index) => {
        if (value.attachments !== undefined) {
          console.log(value)
          value.attachments.forEach((attr, attrIndex) => {
            setTimeout(() => {
              fetch('https://wyze-developer-center-server.wyzecam.com/common/signUrl', {
                'headers': {
                  'accept': 'application/json, text/plain, */*',
                  'accept-language': 'zh-CN,zh;q=0.9',
                  'access_token': this.listQuery.token,
                  'content-type': 'application/json',
                  'is_super_admin': 'false',
                  'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                  'sec-ch-ua-mobile': '?0',
                  'sec-fetch-dest': 'empty',
                  'sec-fetch-mode': 'cors',
                  'sec-fetch-site': 'same-site',
                  'time_zone': 'Asia/Shanghai'
                },
                'referrer': 'https://wyze-developer-center.wyzecam.com/',
                'referrerPolicy': 'strict-origin-when-cross-origin',
                'body': '{"url":"' + attr.url + '"}',
                'method': 'POST',
                'mode': 'cors',
                'credentials': 'omit'
              }).then(res => {
                // console.log(res) // 拿到的是一个状态码

                // 用json格式读出来，也可以改为text，得到的就是一个text字符串，但是要做一个json解析，所以极少用text格式
                return res.json()
              }).then(res => {
                // console.log(res) // 附件详情
                if (res.code !== 1) {
                  this.$message.error('请求失败，' + res.message)
                  return
                }
                attr.s3_url = res.data
                this.attrNum++
                console.log('getting attr', this.attrNum, this.attrTotalNum)
                if (this.attrNum === this.attrTotalNum) {
                  console.log('get data done')
                  this.listLoading = false
                  importFromWdc(this.list).then(response => {
                    console.log(response)
                    this.listLoading = false
                  })
                }
              })
            }, this.listQuery.interval * (countIndex++))
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getFeedbackList()
    }
  }
}
</script>
