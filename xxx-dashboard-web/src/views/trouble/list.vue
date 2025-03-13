<template>
  <div>
    <div style="line-height: 28px; margin-top: 24px;">
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <div style="margin-left: 20px; font-size: 20px;">
          <span>{{ $t('label1') }}</span>
        </div>
        <div style="display: flex; flex-direction: row;">
          <div style="font-size: 14px;color: rgba(0, 0, 0, 0.4); text-align:right; margin-right:20px; margin-top: 5px;">
            {{ $t('label2', [selectTotal]) }}
          </div>
          <el-button :disabled="selectTotal == 0" class="button-style3" size="medium" style="margin-right: 20px;"
            @click="exportTaskList">{{ $t('label3') }}
          </el-button>
          <el-button :disabled="selectTotal == 0" class="button-style3" size="medium" style="margin-right: 20px;"
            @click="importToTb">{{ $t('label4') }}
          </el-button>
        </div>
      </div>
    </div>
    <el-tabs v-model="currentTab" style="margin-left: 20px; margin-right: 20px;" @tab-click="changeListTab">
      <el-tab-pane :label="$t('label6')" name="all" />
      <el-tab-pane :label="$t('userFeedback')" name="user" />
      <el-tab-pane :label="$t('label7')" name="relational" />
      <el-tab-pane :label="$t('label8')" name="new" />
      <el-tab-pane :label="$t('label9')" name="close" />
    </el-tabs>
    <div class="filter-container">
      <div style="flex: 1; margin-right: 25px;">
        <el-row :gutter="20" type="flex">
          <el-col v-for="filter of filteredSet.slice(0, 5)" :span="getFilterSize(filter)" style="margin-bottom: 25px;">
            <el-input v-if="filter === '反馈ID'" v-model="queryId" :placeholder="$t('label16')" />
            <el-date-picker v-if="filter === '时间范围'" v-model="valueTime" :end-placeholder="$t('label19')"
              :picker-options="pickerOptions" :range-separator="$t('label18')" :start-placeholder="$t('label17')"
              align="right" style="width: 100%" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" />
            <SelectIssueCategories v-if="filter === '标签'" v-model="query.serviceTypeOr" />
            <SelectAssignUser v-if="filter === '负责人'" v-model="query.assignUserIdList" />
            <SelectStatus v-if="filter === '进度'" v-model="query.statusList" />
            <SelectHandleTime v-if="filter === '剩余时长'" v-model="query.handleTimeList" />
            <SelectPriority v-if="filter === '优先级'" v-model="query.priorityList" />
            <SelectAssistUser v-if="filter === '协助人'" v-model="query.assistUserIdList" />
            <FirmwareVersionSelect v-if="filter === '固件版本'" v-model="query.firmwareVersionList" />
            <SelectAppVersion v-if="filter === '软件版本'" v-model="query.appVersionList" />
            <SelectIssueType v-if="filter === '问题类型'" v-model="query.issueTypeList" />
            <SelectPhoneType v-if="filter === '手机类型'" v-model="query.phoneModelList" />
            <SelectPhoneOS v-if="filter === '手机系统'" v-model="query.phoneOsVersionList" />
          </el-col>
        </el-row>
        <el-row v-if="isExpandSearch" :gutter="10">
          <el-col v-for="filter of filteredSet.slice(5, filteredSet.length)" :span="getFilterSize(filter)"
            style="margin-bottom: 25px;">
            <el-input v-if="filter === '反馈ID'" v-model="queryId" :placeholder="$t('label16')" />
            <el-date-picker v-if="filter === '时间范围'" v-model="valueTime" :end-placeholder="$t('label19')"
              :picker-options="pickerOptions" :range-separator="$t('label18')" :start-placeholder="$t('label17')"
              align="right" style="width: 100%" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" />
            <SelectIssueCategories v-if="filter === '标签'" v-model="query.serviceTypeOr" />
            <SelectAssignUser v-if="filter === '负责人'" v-model="query.assignUserIdList" />
            <SelectStatus v-if="filter === '进度'" v-model="query.statusList" />
            <SelectHandleTime v-if="filter === '剩余时长'" v-model="query.handleTimeList" />
            <SelectPriority v-if="filter === '优先级'" v-model="query.priorityList" />
            <SelectAssistUser v-if="filter === '协助人'" v-model="query.assistUserIdList" />
            <FirmwareVersionSelect v-if="filter === '固件版本'" v-model="query.firmwareVersionList" />
            <SelectAppVersion v-if="filter === '软件版本'" v-model="query.appVersionList" />
            <SelectIssueType v-if="filter === '问题类型'" v-model="query.issueTypeList" />
            <SelectPhoneType v-if="filter === '手机类型'" v-model="query.phoneModelList" />
            <SelectPhoneOS v-if="filter === '手机系统'" v-model="query.phoneOsVersionList" />
          </el-col>
        </el-row>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div style="margin-top: 10px; margin-right: 15px;">
          <div v-if="isExpandSearch" style="font-size: 14px ;color: #0052D9; text-align: center;"
            @click="expandSearch()">
            {{ $t('label46') }}<i class="el-icon-arrow-up" />
          </div>
          <div v-else style="font-size: 14px;color: #0052D9; text-align: center;" @click="expandSearch()">
            {{ $t('label45') }}<i class="el-icon-arrow-down" />
          </div>
        </div>
        <el-button class="button-style2" style="height: 40px;" @click="firstSearch()">{{ $t('label14') }}
        </el-button>
        <el-button class="button-style1" style="height: 40px;" @click="resetSearch">{{ $t('label15') }}
        </el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table ref="troubleTable" v-loading="islistDataLoading" :data="tableData"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA', 'font-size': '14px' }"
        :row-key="getRowKeys" class="el_table_devider" element-loading-background="rgba(0, 0, 0, 0)" style="width: 100%"
        @select="onSelect" @row-click="rowClick" @select-all="selectAllRowsData">
        <el-table-column min-width="20%" type="selection" />

        <el-table-column :label="$t('label47')" align="left" min-width="35%" prop="id" />

        <el-table-column :label="$t('label48')" min-width="200%">
          <template slot-scope="scope">
            <div
              style="font-size: 14px; word-break:break-word; overflow:hidden; text-align: left; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical; text-overflow: ellipsis;">
              {{ getPromblemTitle(scope.row.serviceTypeText, scope.row.categoryText, scope.row.subCategoryText) }}
            </div>
            <div
              style="font-size: 14px; word-break:break-word; overflow:hidden; text-align: left; -webkit-line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; text-overflow: ellipsis;">
              {{ scope.row.content }}
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('label49')" align="left" min-width="40%">
          <template slot-scope="scope">
            <el-avatar v-if="!needShowDefaultUser(scope.row.assignUserName)" :size="32"
              :style="{ background: BackGroundColor(scope.row.assignUserName) }">
              {{ userNameRule(scope.row.assignUserName) }}
            </el-avatar>
            <el-avatar v-if="needShowDefaultUser(scope.row.assignUserName)" :size="32" icon="el-icon-user-solid" />
          </template>
        </el-table-column>

        <el-table-column :label="$t('label50')" align="left" min-width="60%">

          <template slot-scope="scope">
            <el-tooltip :content="showAssist(scope.row.assistUserList)" :disabled="isShowTip(scope.row.assistUserList)"
              class="item" effect="dark" placement="bottom">

              <!-- <el-popover :content="showAssist(scope.row.assistUserList)" placement="bottom" popper-class="popover"
                trigger="hover" width="200"> -->
              <div>
                <el-avatar v-if="needShowAssistUser(scope.row, 0)" slot="reference" :size="32"
                  :style="{ background: BackGroundColor(getAssistUserName(scope.row, 0)) }" class="avatar-icon">
                  {{
            userNameRule(getAssistUserName(scope.row, 0))
          }}
                </el-avatar>
                <el-avatar v-if="needShowAssistUser(scope.row, 1)" slot="reference"
                  :class="{ 'avatar-overlay': needShowAssistMask(scope.row) }" :size="32"
                  :style="{ background: BackGroundColor(getAssistUserName(scope.row, 1)) }">
                  {{ userNameRule(getAssistUserName(scope.row, 1)) }}
                </el-avatar>
                <el-avatar v-if="needShowDefaultAssist(scope.row)" slot="reference" :size="32"
                  icon="el-icon-user-solid" />
              </div>
              <!-- </el-popover> -->
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label51')" align="left" min-width="50%">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)" disable-transitions style="min-width: 80px;"> {{
            $t(getStatusContent(scope.row.status))
          }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('label52')" align="left" min-width="50%">
          <template slot-scope="scope" style="font-size: 14px;">
            {{ calHandleTime(scope.row.status, scope.row.remainingProcessingTime) }}
          </template>
        </el-table-column>

        <el-table-column :label="$t('label58')" align="left" min-width="100%">
          <template slot-scope="scope">
            <div v-if="scope.row.tbShortId !== ''">
              <p>{{ $t('label71') }}</p>
              <p>{{ scope.row.tbShortId }} {{ getTbStatusContent(scope.row.tbStatus) }} </p>
            </div>
            <div v-else>
              <p>{{ $t('label59') }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label61')" align="left" min-width="100%" prop="createTime" />

        <el-table-column :label="$t('label62')" align="left" min-width="60%">
          <template slot-scope="scope">
            <el-button v-if="needShowStart(scope.row.status)" size="small" type="text"
              @click.native.stop="clickAcceptIssue(scope.row)">{{ $t('label63') }}
            </el-button>
            <el-button size="small" type="text" @click.native.stop="handleClickDrawer(scope.row)">
              {{ $t('label64') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <div class="pagination-container">
          <el-pagination :current-page.sync="currentPageNum" :page-size="currentPageSize" :page-sizes="[10, 20]"
            :total="total" background layout="total,sizes,prev,pager,next,jumper" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <div v-if="isLeadingOut" class="leadingOut">
      <div class="donut" />
      <div style="color: black; font-size: 14px; margin-left: 10px;">正在导出</div>
    </div>
  </div>
</template>

<script>

import { acceptIssue, getIssueList, importToTb } from '@/api/track'
import { userNameRule } from '../../utils/user-name'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import FirmwareVersionSelect from '@/components/Trouble/FirmwareVersionSelect'
import SelectPriority from '@/components/Trouble/SelectPriority'
import SelectStatus from '@/components/Trouble/SelectStatus'
import SelectAssistUser from '@/components/Trouble/SelectAssistUser'

import SelectAssignUser from '@/components/Trouble/SelectAssignUser.vue'
import SelectHandleTime from '@/components/Trouble/SelectHandleTime'
import SelectIssueCategories from '@/components/Trouble/SelectIssueCategories'
import SelectAppVersion from '@/components/Trouble/SelectAppVersion'
import SelectIssueType from '@/components/Trouble/SelectIssueType'
import SelectPhoneType from '@/components/Trouble/SelectPhoneType'
import SelectPhoneOS from '@/components/Trouble/SelectPhoneOS'

import cnchar from 'cnchar'
import store from '@/store'
import Cookies from 'js-cookie'

import { handleRemainTime } from './common_business'
import i18n from '@/lang'

import { TroubleStatus } from './enum'
import { projectChannel } from '@/utils/util-broadcast'
import { getCurrentProject } from '@/utils/project'

export default {
  components: {
    FirmwareVersionSelect,
    SelectPriority,
    SelectStatus,
    SelectHandleTime,
    SelectAssignUser,
    SelectIssueCategories,
    SelectAssistUser,
    SelectAppVersion,
    SelectIssueType,
    SelectPhoneType,
    SelectPhoneOS
  },
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.split('_')[0]
      }
      return value
    },
    ellipsis2(value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.split('_')[1].slice(-9)
      }
      return value
    }
  },
  data() {
    return {
      currentTab: 'all', // 当前反馈列表标签
      filteredSet: ['反馈ID', '时间范围', '标签', '负责人', '进度', '剩余时长', '协助人', '优先级', '问题类型', '软件版本', '固件版本', '手机类型', '手机系统'], // 过滤条件集合
      islistDataLoading: false, // 加载列表数据
      resetArray: [],
      allAssist: '',
      problemTabStr: '',
      isExpandSearch: false,
      formData: {},
      query: {
        firmwareVersionList: [],
        priorityList: [],
        statusList: [],
        serviceTypeOr: [],
        handleTimeList: [],
        assignUserIdList: [],
        assistUserIdList: [],
        appVersionList: [],
        issueTypeList: [],
        phoneModelList: [],
        phoneOsVersionList: []
      },
      getRowKeys(row) {
        return row.id
      },
      currentPageNum: 1,
      currentPageSize: 10,
      valueTime: '',
      valueCat: '',
      optionsAssignUser: [],
      valueAssignUser: '',
      valuePriority: '',
      valueStatus: '',
      queryDeviceId: '',
      queryId: '',
      total: 0,
      selectTotal: 0,
      tableData: [],
      allAttr: [],
      detailUrl: '',
      urlList: [],
      dialogPlay: false,
      allLogAttr: [],
      valueCatModify: '',
      valueAssignUserModify: '',
      valuePriorityModify: '',
      valueStatusModify: '',
      valueCatBeforeModify: '',
      valueAssignUserBeforeModify: '',
      valuePriorityBeforeModify: '',
      valueStatusBeforeModify: '',
      nowComments: [],
      comment_content: '',
      editorOption: {
        placeholder: 'insert comment here',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['image']
          ]
        }
      },
      isSelectAll: false,
      listDataIdSelect: [],
      listDataIdSelectNot: [],
      isLeadingOut: false,
      channel: new BroadcastChannel(projectChannel.name)
    }
  },
  computed: {
    pickerOptions() {
      return {
        shortcuts: [{
          text: i18n.t('label66'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: i18n.t('label67'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: i18n.t('label68'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    this.getLocalPageSize()
    this.firstSearch()
  },
  created() {
    window.addEventListener('message', (e) => {
      if (typeof e.data === 'string' && e.data.indexOf('trouble-update') != -1) {
        const paramString = e.data.slice(14)
        const param = JSON.parse(paramString)
        console.log(param)
        this.refresh(param)
      }
    })

    this.addProjectChangeListener()
  },
  beforeUnmount() {
    // 关闭通道，以避免内存泄漏
    this.channel.close()
  },
  methods: {
    addProjectChangeListener() {
      // 监听通道消息
      this.channel.addEventListener('message', (event) => {
        if (event.data.action === projectChannel.changeAction) {
          console.log('toubleList +' + projectChannel.changeAction)
          // 更换项目信息后重置搜索
          this.resetSearch()
        }
      })
    },
    // 获取本地页数配置
    getLocalPageSize() {
      this.currentPageSize = localStorage.getItem('Psync_TroubleList_PageSize') ? Number(localStorage.getItem('Psync_TroubleList_PageSize')) : 10
    },
    // 设置本地页数配置
    setLocalPageSize(pageSize) {
      this.currentPageSize = pageSize
      localStorage.setItem('Psync_TroubleList_PageSize', pageSize)
    },
    // 切换反馈列表标签
    changeListTab(tab, event) {
      // 重置多选项
      this.selectAllRowsData([])

      // 设置筛选组件
      if (this.currentTab === 'all') {
        this.filteredSet = ['反馈ID', '时间范围', '标签', '负责人', '进度', '剩余时长', '协助人', '优先级', '问题类型', '软件版本', '固件版本', '手机类型', '手机系统']
      } else if (this.currentTab === 'user') {
        this.filteredSet = ['反馈ID', '时间范围', '标签', '负责人', '剩余时长', '协助人', '优先级', '问题类型', '软件版本', '固件版本', '手机类型', '手机系统']
      } else if (this.currentTab === 'relational') {
        this.filteredSet = ['反馈ID', '时间范围', '标签', '进度', '剩余时长', '优先级', '问题类型', '软件版本', '固件版本', '手机类型', '手机系统']
      } else if (this.currentTab === 'new') {
        this.filteredSet = ['反馈ID', '时间范围', '标签', '负责人', '剩余时长', '协助人', '优先级', '问题类型', '软件版本', '固件版本', '手机类型', '手机系统']
      } else if (this.currentTab === 'close') {
        this.filteredSet = ['反馈ID', '时间范围', '标签', '负责人', '剩余时长', '协助人', '优先级', '问题类型', '软件版本', '固件版本', '手机类型', '手机系统']
      }

      // 重置筛选条件
      this.resetSearch()

      console.log(this.currentTab)
    },
    // 计算筛选组件尺寸
    getFilterSize(filter) {
      if (filter === '反馈ID' || filter === '时间范围' || filter === '时间范围' || filter === '软件版本' || filter === '固件版本' || filter === '手机类型' || filter === '手机系统') {
        return 8
      }
      return 4
    },
    rowClick(rowData) {
      this.handleClickDrawer(rowData)
    },
    // 判定是否弹出协助人提示
    isShowTip(data) {
      if (Array.isArray(data)) {
        return data.length < 2
      }
      return true
    },
    userNameRule(name) {
      return userNameRule(name)
    },
    resetSearch() {
      this.valueTime = ''
      this.queryId = ''
      this.query.priorityList = []
      this.query.statusList = []
      this.query.serviceTypeOr = []
      this.query.assignUserIdList = []
      this.query.selectListHandleTime = []
      this.query.assistUserIdList = []
      this.query.firmwareVersionList = []
      console.log(this.query.appVersionList)
      this.query.appVersionList = []
      console.log(this.query.appVersionList)
      this.query.issueTypeList = []
      this.query.phoneTypeList = []
      this.query.phoneOSList = []
      this.query.handleTimeList = []
      this.query.phoneModelList = []
      this.query.phoneOsVersionList = []
      this.firstSearch()
    },
    // 导出任务单
    importToTb() {
      this.islistDataLoading = true
      const param = Object.assign({}, this.query)

      param.idList = this.listDataIdSelect

      importToTb(param).then(response => {
        console.log(response)
        if (response.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message.error(response.message)
        }
      }).finally(() => {
        this.firstSearch()
        this.islistDataLoading = false
      })
    },
    // 导出任务单
    exportTaskList() {
      this.isLeadingOut = true
      const param = Object.assign({}, this.query)
      console.log(param)
      if (this.valueTime.length > 0) {
        param.createTimeStart = this.valueTime[0]
        param.createTimeEnd = this.valueTime[1]
      }
      if (param.serviceTypeOr.length > 0) {
        const serviceTypeOr = []
        for (const r of param.serviceTypeOr) {
          serviceTypeOr.push(r[r.length - 1])
        }
        param.serviceTypeOr = serviceTypeOr
      }
      if (this.valueAssignUser !== '') {
        param.assignUserId = this.valueAssignUser
      }
      if (this.queryId !== '') {
        param.idOrDeviceId = this.queryId
      }
      if (this.queryDeviceId !== '') {
        param.deviceId = this.queryDeviceId
      }
      param.idList = this.listDataIdSelect
      param.idNotInList = this.listDataIdSelectNot
      const token = Cookies.get('Admin-Token')
      const baseUrl = process.env.VUE_APP_BASE_API
      const currentProject = getCurrentProject()
      let url = baseUrl + '/api/export/issue?Authorization=' + token + '&' + this.tageGetUrl(param)
      if (currentProject !== undefined && currentProject !== null && Object.keys(currentProject).length !== 0) {
        url = baseUrl + '/api/export/issue?CurrentProjectId=' + currentProject.id + '&Authorization=' + token + '&' + this.tageGetUrl(param)
      }
      console.log(url)
      const link = document.createElement('a')
      try {
        link.href = url
        // link.target = '_blank'
      } catch (error) {
        link.href = window.URL.createObjectURL(url)
      }
      link.click()

      setTimeout(() => {
        // 俩秒之后让模块消失
        this.isLeadingOut = false
      }, 2000)
    },

    tageGetUrl(param, key) {
      var paramStr = ''
      console.log(param)
      if (typeof (param) === 'string' || typeof (param) === 'number' || typeof (param) === 'boolean') {
        return '&' + key + '=' + encodeURIComponent(param)
      } else {
        var data = null
        if (key) {
          data = param ? param[key] : ''
        } else {
          data = param
        }
        for (var keyTemp in data) {
          var dataTemp = data[keyTemp]
          if (Array.isArray(dataTemp) && dataTemp.length > 0) {
            var tem = dataTemp.toString()
            dataTemp = tem
          }

          paramStr += this.tageGetUrl(dataTemp, keyTemp)
          console.log(paramStr)
        }
      }
      return paramStr.substr(1)
    },

    getPromblemTitle(servicetext, categoryText, subCategoryText) {
      var promblemTabTitle = ''
      var tabTitle = ''
      if (this.isEmpty(categoryText)) {
        categoryText = ''
      }
      if (this.isEmpty(subCategoryText)) {
        subCategoryText = ''
      }
      if (!this.isEmpty(servicetext) && !this.isEmpty(categoryText)) {
        tabTitle = servicetext + '/' + categoryText
        promblemTabTitle = tabTitle
      } else {
        tabTitle = servicetext + categoryText
        promblemTabTitle = tabTitle
      }
      if (!this.isEmpty(tabTitle) && !this.isEmpty(subCategoryText)) {
        promblemTabTitle = tabTitle + '/' + subCategoryText
      } else {
        promblemTabTitle = tabTitle + subCategoryText
      }
      return promblemTabTitle + '\xa0'
    },
    isEmpty(str) {
      if (str === undefined || str == null || str === '') {
        return true
      } else {
        return false
      }
    },
    refresh(param) {
      if (!this.isEmpty(param.serviceTypeText)) {
        this.formData.serviceTypeText = param.serviceTypeText
        this.formData.categoryText = param.cargortyTypeText
        this.formData.subCategoryText = param.subCargortyTypeText
      }
      if (!this.isEmpty(param.chargePerson)) {
        this.formData.assignUserName = param.chargePerson
      }
      this.formData.status = param.status
      if (!this.isEmpty(param.assistSelect)) {
        this.formData.assistUserList = []
        for (let index = 0; index < param.assistSelect.length; index++) {
          this.formData.assistUserList.push({
            userName: param.assistSelect[index]
          })
        }
      }
      console.log(this.formData.serviceTypeText)
      console.log(this.formData.categoryText)
      console.log(this.formData.subCategoryText)
      console.log(this.formData.status)
      console.log(this.formData.assignUserName)
      console.log(this.formData.assistUserList)
    },
    BackGroundColor: function (userName) {
      if (userName) {
        const nameIndex = cnchar.stroke(userName) % 4
        switch (nameIndex) {
          case 0:
            return '#56C08D'
          case 1:
            return '#F6685D'
          case 2:
            return '#FA9550'
          case 3:
            return '#366EF4'
          case 4:
            return '#C5C5C5'
        }
      } else {
        return '#C5C5C5'
      }
    },
    expandSearch() {
      this.isExpandSearch = !this.isExpandSearch
    },
    handleClickDrawer(data) {
      this.formData = data
      console.log(this.formData)

      this.goToTroubleDetail()
    },
    goToTroubleDetail() {
      const routeUrl = this.$router.resolve({
        path: '/trouble_detail',
        query: {
          issue_id: this.formData.id
        }
      })

      window.open(routeUrl.href, '_blank')
    },
    firstSearch() {
      this.currentPageNum = 1
      this.searchData(1)
    },
    searchData(currentPage) {
      this.islistDataLoading = true
      this.selectAllRowsData([]) // 搜索后不选中任何数据

      this.query.current = currentPage
      this.query.size = this.currentPageSize
      const param = Object.assign({}, this.query)

      if (this.valueTime.length > 0) {
        param.createTimeStart = this.valueTime[0]
        param.createTimeEnd = this.valueTime[1]
      }
      if (param.serviceTypeOr.length > 0) {
        const serviceTypeOr = []
        for (const r of param.serviceTypeOr) {
          serviceTypeOr.push(r[r.length - 1])
        }
        param.serviceTypeOr = serviceTypeOr
      }
      if (this.valueAssignUser !== '') {
        param.assignUserId = this.valueAssignUser
      }
      if (this.queryId !== '') {
        param.idOrDeviceId = this.queryId
      }
      if (this.queryDeviceId !== '') {
        param.deviceId = this.queryDeviceId
      }

      // 新反馈标签设置筛选状态
      if (this.currentTab === 'new') {
        param.statusList = [TroubleStatus.New]
      }

      //用户反馈设置删选状态
      if (this.currentTab === 'user') {
        param.statusList = [
          TroubleStatus.New, 
          TroubleStatus.Preliminary, 
          TroubleStatus.Collaborate, 
          TroubleStatus.Finish
        ]
      }

      // 关闭标签设置筛选状态
      if (this.currentTab === 'close') {
        param.statusList = [TroubleStatus.Finish]
      }

      // 与我相关
      if (this.currentTab === 'relational') {
        param.aboutMe = true
      }
      console.log(param)

      getIssueList(param).then(response => {
        console.log(response)
        console.log(this)
        console.log(this.$refs)
        if (response.code === 0) {
          this.tableData = []
          for (const r of response.data.records) {
            this.tableData.push(r)
          }
          this.total = response.data.total
          if (this.$refs.troubleTable != null && this.$refs.troubleTable != undefined) {
            this.$nextTick(() => {
              this.tableData.forEach(row => {
                if (this.isSelectAll) {
                  if (this.listDataIdSelectNot.indexOf(row.id) !== -1) {
                    this.$refs.troubleTable.toggleRowSelection(row, false)
                  } else {
                    this.$refs.troubleTable.toggleRowSelection(row, true)
                  }
                } else {
                  if (this.listDataIdSelect.indexOf(row.id) !== -1) {
                    this.$refs.troubleTable.toggleRowSelection(row, true)
                  } else {
                    this.$refs.troubleTable.toggleRowSelection(row, false)
                  }
                }
              })
            })
          }
        }
      }).finally(() => {
        this.islistDataLoading = false
      })
    },
    getStatusType(status) {
      switch (status) {
        case TroubleStatus.New:
          return 'danger'
        case TroubleStatus.Preliminary:
          return 'warning'
        case TroubleStatus.Collaborate:
          return 'success'
        case 3:
          return 'info'
        case TroubleStatus.Finish:
          return 'info'
        case TroubleStatus.Internal:
          return 'info'
        default:
          return 'info'
      }
    },
    getStatusContent(status) {
      switch (status) {
        case TroubleStatus.New:
          return 'label23'
        case TroubleStatus.Preliminary:
          return 'label24'
        case TroubleStatus.Collaborate:
          return 'label25'
        case 3:
          return '未知'
        case TroubleStatus.Finish:
          return 'label26'
        case TroubleStatus.Internal:
          return 'label27'
        default:
          return '未知'
      }
    },
    getTbStatusContent(status) {
      switch (status) {
        case '待处理':
          return i18n.t('label72')
        case '进行中':
          return i18n.t('label73')
        case '待测试':
          return i18n.t('label74')
        case '测试完成':
          return i18n.t('label75')
        case '已完成':
          return i18n.t('label76')
        case '已挂起':
          return i18n.t('label77')
        case '重新打开':
          return i18n.t('label79')
        case '修复中':
          return i18n.t('label80')
        case '复测':
          return i18n.t('label81')
        case '已解决':
          return i18n.t('label82')
        case '已拒绝':
          return i18n.t('label83')
        case '关闭':
          return i18n.t('label84')
        default:
          return '未知'
      }
    },
    needShowStart(status) {
      if (status > 0) {
        return false
      } else {
        return true
      }
    },
    handleCurrentChange(val) {
      console.log('handleCurrentChange', val)
      this.searchData(val)
    },
    handleSizeChange(val) {
      console.log('handleSizeChange', val)
      this.setLocalPageSize(val)
      this.searchData(1)
    },
    getAssignUserNameById(assignUserId) {
      for (var user of this.optionsAssignUser) {
        if (user.value === assignUserId) {
          return user.label
        }
      }
    },
    clickAcceptIssue(issueData) {
      this.islistDataLoading = true
      var data = {}
      data.id = issueData.id
      acceptIssue(data).then(response => {
        this.islistDataLoading = false
        console.log(response)
        if (response.code === 0) {
          issueData.assignUserName = store.getters.name
          issueData.status = 1
          this.formData = issueData
          this.goToTroubleDetail()
        }
      }).catch((error) => {
        this.islistDataLoading = false
        console.log(error)
      })
    },
    needShowAssistUser(data, aUserIndex) {
      if (data.assistUserList) {
        if (data.assistUserList.length > aUserIndex) {
          return true
        }
      }
      return false
    },
    needShowAssistMask(data) {
      return data.assistUserList.length > 2
    },
    needShowDefaultAssist(data) {
      if (data.assistUserList) {
        if (data.assistUserList.length > 0) {
          return false
        }
      }
      return true
    },
    needShowDefaultUser(userName) {
      if (userName) {
        return false
      }
      return true
    },
    showAssist(data) {
      var reslut = ''
      // this.allAssist = ''
      if (!this.isEmpty(data)) {
        for (const d of data) {
          if (!this.isEmpty(reslut)) {
            reslut = reslut + '、' + d.userName
          } else {
            reslut = reslut + d.userName
          }
        }
      }
      // this.allAssist = reslut
      return reslut
    },
    getAssistUserName(data, aUserIndex) {
      if (data.assistUserList) {
        if (data.assistUserList.length > aUserIndex) {
          return data.assistUserList[aUserIndex].userName
        }
      }

      return ''
    },
    calHandleTime(status, remainingProcessingTime) {
      return status === TroubleStatus.Internal ? '——' : handleRemainTime(status, remainingProcessingTime)
    },
    selectAllRowsData(selection) {
      if (selection.length > 0) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
      this.listDataIdSelect = []
      this.listDataIdSelectNot = []
      console.log('isSelectAll ', this.isSelectAll)
      if (this.isSelectAll) {
        this.selectTotal = this.total
      } else {
        this.selectTotal = 0
      }
    },
    onSelect(selection, row) {
      console.log(selection)
      console.log(row)
      const selected = selection.length > 0 && selection.indexOf(row) !== -1
      console.log('is selected', selected)
      if (selected) {
        if (this.isSelectAll) {
          this.listDataIdSelectNot.splice(this.listDataIdSelectNot.indexOf(row.id))
          this.selectTotal = this.total - this.listDataIdSelectNot.length
        } else {
          this.listDataIdSelect.push(row.id)
          this.selectTotal = this.listDataIdSelect.length
        }
      } else {
        if (this.isSelectAll) {
          this.listDataIdSelectNot.push(row.id)
          this.selectTotal = this.total - this.listDataIdSelectNot.length
        } else {
          this.listDataIdSelect.splice(this.listDataIdSelectNot.indexOf(row.id))
          this.selectTotal = this.listDataIdSelect.length
        }
      }
      console.log(this.listDataIdSelect)
      console.log(this.listDataIdSelectNot)
    }
  }
}
</script>

<style scoped>
.popover.el-popover {
  background: black !important;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #5b5e63;
}

/* .el-table--striped .el-table__body tr.el-table__row--striped td{
  background: oldlace
} */
.el-col {
  margin-bottom: 5px;
}

.filter-container {
  display: flex;
  flex-direction: row;
  margin: 10px 20px 10px 20px;
}

.table-container {
  margin: 10px 20px 10px 20px;
}

.pagination-container {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: right;
}

.detail {
  background: #FFFFF0;
  border: 1px dashed blue;
  padding: 10px;
}

.detail-1 {
  border-right: 1px solid #000;
  padding: 10px;
}

.detail-2 {
  border-left: 1px solid #000;
  padding: 10px;
}

/* .btn-control {
  background: #000
} */
.commit-btn {
  margin-right: 0px;
  margin-top: 5px;
}

.attr-preview {
  width: 100%;
  height: calc(25vh - 21px);
}

.log-preview {
  width: 100%;
  height: calc(25vh - 21px);
}

.attr-thumb-image {
  padding: 5%;
  width: 100%;
  height: calc(25vh - 21px);
}

.attr-thumb-video {
  padding: 5%;
  width: 100%;
  height: calc(25vh - 21px);
}

::v-deep .el-upload {
  width: 100%;
  height: calc(25vh - 21px);
}

::v-deep .el-upload .el-upload-dragger {
  width: 100%;
  height: calc(25vh - 21px);
}

.btn-content {
  width: 100%;
  height: calc(25vh - 21px);
  left: 20%;
  top: calc(6vh + 5px);
}

.btn-play {
  background-color: transparent;
  border-style: ridge;
  color: white;
  min-width: calc(5vh - 5px);
  min-height: calc(5vh - 5px);
}

::v-deep .el-upload--picture-card {
  width: 100%;
  height: calc(25vh - 21px);
}

.btn-download-log {
  padding: 5%;
  width: 100%;
  height: calc(25vh - 21px);
}

.btn-download {
  background-color: #f1f1f1;
  border-style: ridge;
  min-width: 100%;
  min-height: calc(25vh - 21px);
}

.upload-attr {
  padding: 5%;
}

.upload-log {
  padding: 5%;
}

.author-title {
  padding: 4px
}

.author-name {
  font-size: 16px
}

.author-time {
  font-size: 10px;
  margin-left: 5px
}

.author-reply {
  font-size: 20px
}

.comment-module {
  height: calc(100vh - 50px);
}

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-table .cell {
  white-space: pre-line;
}

::v-deep .el-drawer__header {
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  margin-top: 2px;
  margin-right: 2px;
  margin-left: 2px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 100%;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
}

.el-container {
  height: 100%;
  background: #f3f3f3;
}

.avatar-icon {
  position: relative;
  z-index: 10;
  border: 1px solid #fff;
}

.avatar-overlay {
  position: relative;
  left: -8px;
  z-index: 5;
}

.avatar-overlay::before {
  content: "···";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0.5;
  z-index: 1;
}

@Keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.donut {
  display: inline-block;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0052D9;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  animation: donut-spin 1.2s linear infinite;
}

.leadingOut {
  display: flex;
  flex-direction: row;
  width: 110px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  margin-left: -55px;
  top: 10px;
}
</style>
