<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.deviceId"
        placeholder="deviceId"
        style="width: 400px;margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="sendUploadAction">
        拉取固件日志
      </el-button>
    </div>

    <deviceInfo :device-id="deviceInfoDeviceId" :timezone="deviceInfoTimezone" />

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="下发指令时间"
        prop="createTimeDate"
        align="center"
        min-width="200"
      >
        >
        <template slot-scope="{row}">
          <span>{{ row.createTimeDate }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="文件id" align="center" width="400">-->
      <!--        <template slot-scope="{row}">-->
      <!--          {{ row.fileId }}-->
      <!--          &lt;!&ndash;          <el-tag>{{ row.fileId }}</el-tag>&ndash;&gt;-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="文件大小" align="center" width="100">
        <template v-show="row.upload" slot-scope="{row}">
          <span v-show="row.upload">
            {{ row.fileSize }} kb
          </span>
          <!--          <el-tag>{{ row.fileId }}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="设备上传状态" class-name="status-col" width="200">
        <template slot-scope="{row}">
          <el-tag :type="row.upload | statusFilter">
            {{ row.upload }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions（最多自动请求200次）" align="center" width="300" class-name="small-padding fixed-width">
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

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { checkAndGetDownloadUrl, getLogDownloadUrl, getUploadLogList, sendUploadLogAction } from '@/api/upload-log'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import deviceInfo from '@/views/data-source/device-info'

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
  components: { Pagination, deviceInfo },
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
      deviceInfoTimezone: '',
      deviceInfoDeviceId: '',
      timer: [],
      timerFileIdList: [],
      timerCount: [],
      searchText: '搜索',
      tableKey: 0,
      list: [
      ],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        // deviceId: undefined,
        deviceId: '',
        type: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      onlyLog: true,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        deviceId: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    // this.getList()
    this.changeSearchBtn()
  },
  methods: {
    changeSearchBtn() {
      if (this.onlyLog) {
        this.searchText = '获取上传日志列表'
      } else {
        this.searchText = '拉取且获取上传日志列表'
      }
    },
    getList() {
      if (this.listQuery.deviceId === undefined || this.listQuery.deviceId.trim() === '') {
        this.$message.error('请输入设备id')
        return
      }
      this.deviceInfoDeviceId = this.listQuery.deviceId
      this.listLoading = true
      getUploadLogList(this.listQuery.deviceId).then(response => {
        this.listLoading = false
        this.list = response.data
        for (const data of this.list) {
          data.auto = false
          data.autoText = '每隔5s自动检测下载'
        }
        this.total = response.data ? response.data.length : 0

        for (const timerFileIdListKey of this.timerFileIdList) {
          console.log(timerFileIdListKey)
          clearInterval(this.timer[timerFileIdListKey])
        }
        this.timerFileIdList = []

        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    downloadFile: function(row) {
      this.downloadLoading = true
      getLogDownloadUrl(this.listQuery.deviceId, row.fileId).then(response => {
        const url = response.data
        if (url === undefined) {
          this.$message.error('服务端没有返回下载链接，请联系技术支持')
          return
        }
        const link = document.createElement('a')
        try {
          link.href = url
          // link.target = '_blank'
        } catch (error) {
          link.href = window.URL.createObjectURL(url)
        }
        link.click()
      }).finally(this.downloadLoading = false)
    },
    checkAndDownloadFile: function(row, manual = true) {
      console.log('checkAndDownloadFile')
      this.downloadLoading = true
      checkAndGetDownloadUrl(this.listQuery.deviceId, row.fileId).then(response => {
        const data = response.data
        const timerElement = this.timer[row.fileId]
        if (timerElement) {
          console.log('当前fileId有定时器')
          this.timerCount[row.fileId] = ++this.timerCount[row.fileId]
          const timerCountElement = this.timerCount[row.fileId]
          console.log(`取消 (已请求${timerCountElement}次)`)
          row.autoText = `取消 (已请求${timerCountElement}次)`
          if (timerCountElement > 200) {
            // 最多200次
            clearInterval(timerElement)
            row.autoText = '已超过200次，点击继续'
            row.auto = !row.auto
          }
        }
        if (data !== undefined) {
          row.upload = true
          row.fileSize = data.size
          if (timerElement) {
            clearInterval(timerElement)
          }
          const link = document.createElement('a')
          try {
            link.href = data.url
            // link.target = '_blank'
          } catch (error) {
            link.href = window.URL.createObjectURL(data.url)
          }
          link.click()
        } else {
          if (manual) {
            this.$message.error('设备还没有上传哦')
          }
        }
      }).finally(this.downloadLoading = false)
    },
    autoCheckAndDownloadFile: function(row) {
      const tempRow = Object.assign({}, row)
      console.log(tempRow.auto ? '取消自动' : '开始自动')
      if (tempRow.auto) {
        tempRow.autoText = '每隔5s自动检测下载'
        const timerElement = this.timer[row.fileId]
        if (timerElement) {
          console.log('取消成功')
          clearInterval(timerElement)
        }
      } else {
        tempRow.autoText = '自动请求中点击取消'
        this.timerCount[row.fileId] = 0
        this.timer[row.fileId] = setInterval(this.checkAndDownloadFile, 5000, tempRow, false)
        this.timerFileIdList.push(row.fileId)
        // this.$set(row, 'autoText', '每隔5s自动检测下载')
      }

      tempRow.auto = !tempRow.auto
      const index = this.list.findIndex(v => v.fileId === tempRow.fileId)
      this.list.splice(index, 1, tempRow)
    },
    sendUploadAction() {
      if (this.listQuery.deviceId === undefined || this.listQuery.deviceId.trim() === '') {
        this.$message.error('请输入设备id')
        return
      }
      this.deviceInfoDeviceId = this.listQuery.deviceId
      this.listLoading = true
      sendUploadLogAction(this.listQuery.deviceId).then(response => {
        setTimeout(() => {
          this.getList()
        }, 10 * 1000)
      })
      // this.resetTemp()
      // this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
