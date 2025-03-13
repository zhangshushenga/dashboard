<template>
  <div class="container">
    <el-container style=" background-color: #ffffff; border-radius:6px ; min-height: 1200px;">
      <el-aside style="background-color: #ffffff" width="288px">
        <div style="display: flex; flex-direction: column;">
          <span class="left_title">类目</span>
          <el-select v-model="currentLanguage" placeholder="请选择语言" @change="changeCurrentLanguage">
            <el-option v-for="item in selectMultiLanguage" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-input v-model="classSearchInput" clearable placeholder="请输入内容" style="margin-top: 20px;" />
        <el-tree v-if="data.length > 0" ref="tree" :allow-drag="allowDrag" :allow-drop="allowDrop"
          :current-node-key="currentNodeKey" :data="data" :default-expand-all="false"
          :default-expanded-keys="treeExpandData" :draggable="isDraggle" :filter-node-method="filterNode"
          :highlight-current="true" accordion node-key="id" style="margin-top: 28px;" @node-drop="handleDrop"
          @node-click="handleNodeClick">
          <span slot-scope="{ node, data }" class="custom-tree-node" @mouseenter="mouseenter(data)"
            @mouseleave="mouseleave(data)">
            <span :style="{ 'width': data.type == 2 ? '75%' : '70%' }" :title="node.label" class="em-tree-text">{{
            node.label
          }}</span>
            <span v-show="data.show"
              style="position: absolute; right: 10px;background-color:#F2F3FF !important ; height: 20px;margin-top: 3px;">
              <el-image v-show="data.type != 2" :src="class_append" size="mini"
                style="height: 12px; width: 12px; margin-bottom: 2px; " @click.stop="addTwoClass(data)" />
              <el-image :src="class_edit" size="mini"
                style="height: 12px; width: 12px; margin-left: 12px; margin-bottom: 2px;"
                @click.stop="editClass(node, data)" />
              <el-image :src="class_delete" size="mini"
                style="height: 13px; width: 12px; margin-left: 12px; margin-bottom: 2px;"
                @click.stop="() => handledeleteClass(node, data)" />
            </span>
          </span>
        </el-tree>
        <el-button plain style="width: 240px; margin-top: 24px;" @click="createOneClass">+ 新增一级类目</el-button>
        <el-dialog :show-close="false" :title="classdialogtitle" :visible.sync="dialogOneClassCreateVisible"
          width="40%">
          <div style=" width: 90%;">
            <el-form ref="oneclassform" :model="oneclassform" :rules="oneClassRules">
              <el-form-item :label-width="formLabelWidth" label="类目名称" prop="name">
                <el-input style="margin-bottom: 10px;" v-for="(language, index) in oneclassform.multiLanguageNameList"
                  :key="language.code" :value="language.name" @input="updateOneClassLanguageName($event, index)"
                  :placeholder="language.placeholder" />
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="产品型号" prop="deviceModel">
                <el-input v-model="oneclassform.deviceModel" placeholder="请输入产品型号" />
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="类目图片" prop="pic">
                <div style="display: flex; flex-direction: row;">
                  <el-upload ref="upload" :action="uploadBaseUrl" :auto-upload="true"
                    :before-upload="beforeAvatarUpload" :headers="myHeaders" :on-change="onChange"
                    :on-error="onUploadFail" :on-success="handleAvatarSuccess" :show-file-list="false"
                    class="avatar-uploader">
                    <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">点击上传图片</i>
                  </el-upload>
                  <div style="display: flex; flex-direction: column; margin-left: 10px; color: rgba(0, 0, 0, 0.4);">
                    <div slot="tip">支持.jpg .png .jpeg 格式</div>
                    <div slot="tip">图片大小不超过500K</div>
                    <div slot="tip">建议尺寸：48*48px</div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogOneClassCreateVisible = false">取 消</el-button>
            <el-button type="primary"
              @click="isupdate ? updateFaqCategoryFromServer(1, editData, 'oneclassform') : submitAddClass(1, 0, 'oneclassform')">确
              定
            </el-button>
          </div>
        </el-dialog>
        <el-dialog :title="classdialogtitle" :visible.sync="isAddTwoClass" width="40%">
          <div style="width: 90%;">
            <el-form ref="twoclassForm" :model="twoclassForm" :rules="twoClassRules">
              <el-form-item :label-width="formLabelWidth" label="类目名称" prop="name">
                <el-input style="margin-bottom: 10px;" v-for="(language, index) in twoclassForm.multiLanguageNameList"
                  :key="language.code" :value="language.name" @input="updateTwoClassLanguageName($event, index)"
                  :placeholder="language.placeholder" />
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isAddTwoClass = false">取 消</el-button>
            <el-button type="primary"
              @click="isupdate ? updateFaqCategoryFromServer(2, editData, 'twoclassForm') : submitAddClass(2, clickOneClassId, 'twoclassForm')">确
              定
            </el-button>
          </div>
        </el-dialog>
      </el-aside>

      <el-container style="margin-top: 15px; margin-left: 5px; border-left: 1px solid #dcdfe6;">
        <el-header>
          <span style="text-align: left;font-size: 20px">{{ currentNodeData.label }}</span>
          <el-tooltip :disabled="!isOkAddFaq" content="请先创建二级类目后再新增知识" effect="light" placement="top-end">
            <el-button size="small" style="float: right;" type="primary" @click="addNewFaq">新增知识</el-button>

          </el-tooltip>
          <el-row v-if="isHasFaq" gutter="10" style="margin-top: 20px;">
            <el-col :span="5">
              <el-input v-model="searchFaqInput" clearable placeholder="请输入标题关键词" @keyup.enter.native="searchFaq">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="searchFaq" />
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="selectValue" clearable placeholder="问题状态" @change="selectFaq">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="0.5" style="float: right;">
              <el-button :disabled="isOkBatch" plain type="info" @click="handlePublish">发布</el-button>
              <el-button :disabled="isOkBatch" plain type="info" @click="handleDeactivate">停用</el-button>
              <el-button :disabled="isOkBatch" plain type="info" @click="handleDelete">删除</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-table v-if="isHasFaq" ref="faqTable" :data="tableDataShow"
            :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
            :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
            style="margin-top: 24px; width: 100%" @select="onSelect" @select-all="selectAllRowsData">
            <el-table-column min-width="20%" type="selection" />
            <el-table-column label="标题" min-width="150%">
              <template slot-scope="scope">

                <div
                  style="word-break:break-word; overflow:hidden; text-align: left; -webkit-line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; text-overflow: ellipsis;">
                  {{
            scope.row.title
          }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="left" label="类名" min-width="70%">
              <template slot-scope="scope">
                {{ scope.row.subCategoryText }}
              </template>
            </el-table-column>
            <el-table-column label="状态" min-width="40%">
              <template slot-scope="scope">
                <el-tag :type="getStatusType(scope.row.status)" disable-transitions
                  style="width: 64px; text-align: center;"> {{
            getStatusContent(scope.row.status)
          }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column align="left" label="更新时间" min-width="80%" prop="updateTime" />

            <el-table-column align="left" label="操作" min-width="60%">
              <template slot-scope="scope">
                <el-button v-if="needShowStart(scope.row.status)" size="small" type="text"
                  @click="handleEditItemFaq(scope.row)">编辑
                </el-button>
                <el-button size="small" type="text" @click="handlePublishDeactItemFaq(scope.row)">{{
            getOperateStatus(scope.row.status)
          }}
                </el-button>
                <el-button size="small" type="text" @click="handledeleteItemFaq(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-dialog :show-close="false" :visible.sync="dialogVisible" style="border-radius: 6px;" width="30%">
          <span style="display: flex; flex-direction: row; justify-content: center;">
            <el-image :src="warn" size="mini" style="height: 17px; width: 17px; margin-right: 10px;" />
            <span style="color: #000000;">{{ dialogContent }}</span>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleFaq">{{ sureText }}</el-button>
          </span>
        </el-dialog>

      </el-container>
    </el-container>
  </div>
  <!-- </div> -->
</template>

<script>
import { endLoading, startLoading } from '@/utils/loading'
import {
  batchDeleteFaq,
  batchDeployFaq,
  batchUndeployFaq,
  createFaqCategory,
  deleteFaq,
  deleteFaqCategory,
  deployFaq,
  getFaqCategories,
  getFaqList,
  sortFaq,
  sortFaqCategory,
  undeployFaq,
  updateFaqCategory
} from '@/api/faq'
import class_append from '@/assets/class_append.png'
import class_edit from '@/assets/class_edit.png'
import class_delete from '@/assets/delete.png'
import warn from '@/assets/warn.png'
import Sortable from 'sortablejs'
import { getToken } from '@/utils/auth'
import { MUITLANGUAGE_NOTIFICATION, getLocalMultiLanguage, getLanguageContentFromCode } from '@/utils/multiLanguage'
import { EventBus } from '@/utils/event-bus';

const baseUrl = process.env.VUE_APP_BASE_API

export default {
  components: {},
  data() {
    return {
      isfaqfilter: false,
      uploadImageUrl: '',
      myHeaders: { Authorization: getToken() },
      uploadBaseUrl: baseUrl + '/api/upload/faq/category/',
      screenHeight: document.documentElement.clientHeight,
      isHasFaq: false,
      isDraggle: true,
      treeExpandData: [],
      searchFaqInput: '',
      statusSearch: -1,
      faqInput: '',
      selectValue: '',
      itemDeleteId: '',
      sureText: '确认',
      handleType: '',
      dialogContent: '',
      dialogVisible: false,
      itemFaqId: '',
      responseData: [],
      tableData: [],
      tableDataShow: [],
      currentNodeData: {},
      currentNodeKey: '',
      sortId: [],
      isdimiss: false,
      id: 1000,
      isupdate: false,
      twoClassName: '',
      clickOneClassId: '',
      class_edit: class_edit,
      class_delete: class_delete,
      warn: warn,
      class_append: class_append,
      classSearchInput: '',
      data: [],
      editnode: {},
      editData: {},
      isOneClass: false,
      dialogOneClassCreateVisible: false,
      isAddTwoClass: false,
      formLabelWidth: '120px',
      twoclassForm: {
        name: ''
      },
      oneclassform: {
        name: '',
        pic: '',
        deviceModel: '',
        multiLanguageNameList: []
      },
      options: [{
        value: 1,
        label: '发布'
      }, {
        value: '0',
        label: '停用'
      }],
      isSelectAll: false,
      listDataIdSelect: [],
      listDataIdSelectNot: [],
      isOkBatch: true,
      isOkAddFaq: true,
      deleteNode: {},
      deleteData: {},
      apiObjDrag: [],
      table_sort: {},
      classdialogtitle: '创建类目',
      //当前语言
      currentLanguage: "",
      //切换多语数据源
      selectMultiLanguage: [],
      //一级类目规则
      oneClassRules: {
        name: [
          { required: true, message: '请输入类目名称', trigger: 'blur' },
        ],
        deviceModel: [
          { required: true, message: '产品型号不能为空', trigger: 'blur' }
        ],
        pic: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      },
      //二级类目规则
      twoClassRules: {
        name: [
          { required: true, message: '请输入类目名称', trigger: 'blur' },
        ],
      }
    }
  },
  watch: {
    currentNodeData(val) {
      if (val.type === 1) {
        this.isfaqfilter = true
      } else {
        this.isfaqfilter = false
      }
    },
    isfaqfilter(val) {
      if (val) {
        this.stopDrop()
      } else {
        this.$nextTick(() => {
          this.rowDrop()
        })
      }
    },
    isShowCreat(val) {
      if (!val && this.currentNodeData.type != 1) {
        this.$nextTick(() => {
          this.rowDrop()
        })
      }
    },
    isHasFaq(val) {
      if (val && this.currentNodeData.type != 1) {
        this.$nextTick(() => {
          this.rowDrop()
        })
      }
    },
    currentNodeKey(newVal) {
      if (newVal.toString()) {
        this.$refs['tree'].setCurrentKey(newVal)
      } else {
        this.$refs['tree'].setCurrentKey(null)
      }
    },
    classSearchInput(val) {
      if (val === '') {
        this.isDraggle = true
      } else {
        this.isDraggle = false
      }
      this.$refs.tree.filter(val)
    },
    listDataIdSelect(val) {
      if (this.listDataIdSelect.length > 0) {
        this.isOkBatch = false
      } else {
        this.isOkBatch = true
      }
    }
  },

  mounted() {
    this.initLanguageConfig()
    this.getFaqCategoriesFromServer(1, -1)
  },
  created() {
    EventBus.$on(MUITLANGUAGE_NOTIFICATION, this.handleNotification);

    window.addEventListener("message", (e) => {
      if (e.data === 'knowledge-creat' || e.data === 'knowledge-update') {
        console.log('更新faq')
        this.finishSave()
      }
    });
  },
  beforeDestroy() {
    // 在组件销毁之前解除事件监听，以防内存泄漏
    EventBus.$off(MUITLANGUAGE_NOTIFICATION, this.handleNotification);
  },
  methods: {
    handleNotification(data) {
      if (this.currentLanguage === "" || this.currentLanguage === undefined) {
        this.initLanguageConfig()
        this.getFaqCategoriesFromServer(1, -1)
      }
    },
    //初始化多语配置
    initLanguageConfig() {
      this.currentLanguage = getLocalMultiLanguage().defaultLanguage
      this.selectMultiLanguage = getLanguageContentFromCode().map(language => {
        const key = Object.keys(language)[0];
        return { label: language[key], value: key };
      });
    },
    //更新一级类目多语配置
    updateOneClassLanguageName(value, index) {
      this.oneclassform.multiLanguageNameList[index].name = value;
      //把默认语言的name赋值
      this.oneclassform.name = this.oneclassform.multiLanguageNameList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
      this.oneclassform = { ...this.oneclassform };
    },
    updateTwoClassLanguageName(value, index) {
      this.twoclassForm.multiLanguageNameList[index].name = value;
      //把默认语言的name赋值
      this.twoclassForm.name = this.twoclassForm.multiLanguageNameList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
      this.twoclassForm = { ...this.twoclassForm };
    },
    //改变当前语言
    changeCurrentLanguage() {
      this.getFaqCategoriesFromServer(1, -1)
    },
    // 过滤列表数据
    filterTableData() {
      this.$nextTick(() => {
        this.tableDataShow = this.tableData.filter(data => this.statusSearch == -1 ? (!this.faqInput || data.title.toLowerCase().includes(this.faqInput.toLowerCase())) : ((!this.faqInput && data.status == this.statusSearch) || (data.title.toLowerCase().includes(this.faqInput.toLowerCase()) && data.status == this.statusSearch)))
      })
    },
    scrollToBottom() {
      console.log(this.$refs.faqTable)
      // 获取el-table的DOM元素
      const tableElement = this.$refs.faqTable.$el

      // 将其滚动到底部
      tableElement.querySelector('.el-table__body-wrapper').scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      })
    },
    mouseEnterAddFaq(data) {
      if (this.isOkAddFaq) {
        this.$refs.popoverSH.doShow()
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // faq状态筛选框
    selectFaq(value) {
      if (value === '') {
        if (this.searchFaqInput === '' && this.currentNodeData.type != 1) {
          this.isfaqfilter = false
        }
        this.statusSearch = -1
      } else {
        this.isfaqfilter = true
        console.log(value)
        this.statusSearch = value
      }
      this.filterTableData()
    },
    // 行-拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      console.log(this.tableDataShow)
      const _this = this
      this.table_sort = Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          _this.apiObjDrag = []
          const currRow = _this.tableDataShow.splice(oldIndex, 1)[0]
          _this.tableDataShow.splice(newIndex, 0, currRow)
          //   拖动后获取newIdex
          const arr = Array.from(_this.tableDataShow)
          console.log(arr)
          for (const d of arr) {
            _this.apiObjDrag.push({
              id: d.id
            })
          }
          _this.saveSortData()
        }
      })
    },
    stopDrop() {
      this.table_sort.destroy()
    },
    // 排序后，把拖动后的结果穿啊给后端
    saveSortData() {
      startLoading()
      console.log(this.apiObjDrag)
      sortFaq(this.apiObjDrag).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.dialogVisible = false
          if (this.currentNodeData.type == 1) {
            this.getFaqListFromServer(this.currentNodeData.id, '')
          } else {
            this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },

    handleFaq() {
      if (this.handleType === 1) {
        // 批量发布
        this.batchDeployFaqFromServer(this.listDataIdSelect)
      } else if (this.handleType === 2) {
        // 批量停用
        this.batchUndeployFaqFromServer(this.listDataIdSelect)
      } else if (this.handleType === 3) {
        // 批量删除
        this.batchDeleteFaqFromServer(this.listDataIdSelect)
      } else if (this.handleType === 4) {
        // item删除
        this.deleteFaqFromServer(this.itemDeleteId)
      } else if (this.handleType === 5) {
        // item删除
        this.deleteFaqCategoryFromServer(this.deleteNode, this.deleteData)
      }
    },
    // 批量发布faq
    handlePublish() {
      this.dialogVisible = true
      this.dialogContent = '即将进行批量发布知识，您确认要发布吗？'
      this.handleType = 1
      this.sureText = '确认'
    },
    // 批量停用faq
    handleDeactivate() {
      this.dialogVisible = true
      this.dialogContent = '即将进行批量停用知识，您确认要停用吗？'
      this.handleType = 2
      this.sureText = '确认'
    },
    // 批量删除faq
    handleDelete() {
      this.dialogVisible = true
      this.dialogContent = '即将进行批量删除知识，删除后将不能被恢复，您确认要删除吗？'
      this.handleType = 3
      this.sureText = '确认'
    },
    // 编辑item faq
    handleEditItemFaq(faqItemData) {
      this.itemFaqId = faqItemData.id

      const routeUrl = this.$router.resolve({
        path: '/faq_detail',
        query: {
          knowLedgeId: this.itemFaqId === '' ? -1 : this.itemFaqId,
          prop_categoryId: this.currentNodeData.type === 1 ? this.currentNodeData.id : this.currentNodeData.parentId,
          prop_subCategoryId: this.currentNodeData.type === 2 ? this.currentNodeData.id : -1,
          languageCode: faqItemData.languageCode === undefined ? this.currentLanguage : faqItemData.languageCode
        }
      })

      window.open(routeUrl.href, '_blank')
    },
    // 发布/停用item faq
    handlePublishDeactItemFaq(faqItemData) {
      if (faqItemData.status === 0) {
        // 发布
        this.deployFaqFromServer(faqItemData.id)
      } else {
        // 停用
        this.undeployFaqFromServer(faqItemData.id)
      }
    },
    // 删除item faq
    handledeleteItemFaq(faqItemData) {
      this.dialogVisible = true
      this.dialogContent = '删除后无法恢复，确定删除此知识吗？'
      this.handleType = 4
      this.sureText = '确认删除'
      this.itemDeleteId = faqItemData.id
    },
    // 删除类目确认框
    handledeleteClass(node, data) {
      this.dialogVisible = true
      this.dialogContent = '删除此类目会同时删除此类目下所有已创建的知识，您确定要删除吗？'
      this.handleType = 5
      this.sureText = '确认删除'
      this.deleteNode = node
      this.deleteData = data
    },
    // 创建知识完成回掉
    finishSave() {
      this.itemFaqId = ''
      if (this.currentNodeData.type == 1) {
        this.getFaqListFromServer(this.currentNodeData.id, '')
      } else {
        this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
      }
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.currentNodeData.id)
      })
      // this.scrollToBottom()
    },
    // 点击新增按钮
    addNewFaq() {
      if (!this.isOkAddFaq) {
        this.itemFaqId = ''
      }

      const routeUrl = this.$router.resolve({
        path: '/creat-faq',
        query: {
          knowLedgeId: this.itemFaqId === '' ? -1 : this.temFaqId,
          prop_categoryId: this.currentNodeData.type === 1 ? this.currentNodeData.id : this.currentNodeData.parentId,
          prop_subCategoryId: this.currentNodeData.type === 2 ? this.currentNodeData.id : -1,
          languageCode: this.currentLanguage
        }
      })

      window.open(routeUrl.href, '_blank')
    },
    needShowStart(status) {
      if (status > 0) {
        return false
      } else {
        return true
      }
    },
    getStatusType(status) {
      switch (status) {
        case 0:
          return 'info'
        case 1:
          return 'success'
      }
    },
    getStatusContent(status) {
      switch (status) {
        case 0:
          return '停用'
        case 1:
          return '发布'
      }
    },
    getOperateStatus(status) {
      switch (status) {
        case 0:
          return '发布'
        case 1:
          return '停用'
      }
    },
    // 批量停用faq
    batchUndeployFaqFromServer(param) {
      startLoading()
      console.log(param)
      batchUndeployFaq(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.dialogVisible = false
          this.listDataIdSelect = []
          if (this.currentNodeData.type == 1) {
            this.getFaqListFromServer(this.currentNodeData.id, '')
          } else {
            this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 批量发布faq
    batchDeployFaqFromServer(param) {
      startLoading()
      console.log(param)
      batchDeployFaq(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.dialogVisible = false
          this.listDataIdSelect = []
          if (this.currentNodeData.type == 1) {
            this.getFaqListFromServer(this.currentNodeData.id, '')
          } else {
            this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 批量删除faq
    batchDeleteFaqFromServer(param) {
      startLoading()
      console.log(param)
      batchDeleteFaq(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.dialogVisible = false
          this.listDataIdSelect = []
          if (this.currentNodeData.type == 1) {
            this.getFaqListFromServer(this.currentNodeData.id, '')
          } else {
            this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 停用faq
    undeployFaqFromServer(param) {
      startLoading()
      console.log(param)
      undeployFaq(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          if (this.currentNodeData.type == 1) {
            this.getFaqListFromServer(this.currentNodeData.id, '')
          } else {
            this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 发布faq
    deployFaqFromServer(param) {
      startLoading()
      console.log(param)
      deployFaq(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          if (this.currentNodeData.type == 1) {
            this.getFaqListFromServer(this.currentNodeData.id, '')
          } else {
            this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 删除faq
    deleteFaqFromServer(param) {
      startLoading()
      console.log(param)
      deleteFaq(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.dialogVisible = false
          if (this.currentNodeData.type == 1) {
            this.getFaqListFromServer(this.currentNodeData.id, '')
          } else {
            this.getFaqListFromServer(this.currentNodeData.parentId, this.currentNodeData.id)
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 获取faq列表
    getFaqListFromServer(category, subCategory) {
      startLoading()
      const param = {}
      param.category = category
      param.subCategory = subCategory
      param.languageCode = this.currentLanguage
      console.log(param)
      getFaqList(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.tableData = []
          for (const r of response.data) {
            this.tableData.push(r)
          }
          if (this.tableData.length > 0) {
            this.isHasFaq = true
          } else {
            this.isHasFaq = false
          }
          this.filterTableData()
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    handleNodeClick(data, node) {
      this.currentNodeKey = data.id
      this.currentNodeData = {
        id: data.id,
        label: data.label,
        iconUrl: data.iconUrl,
        type: data.type,
        parentId: data.parentId
      }
      if (data.type == 1) {
        this.getFaqListFromServer(data.id, '')
        if (Array.isArray(data.children) && data.children.length > 0) {
          this.isOkAddFaq = false
          this.openNode(data.id)
        } else {
          this.isOkAddFaq = true
        }
        this.closeOtherNode(data.id)
      } else {
        this.isOkAddFaq = false
        this.getFaqListFromServer(data.parentId, data.id)
      }
      this.searchFaqInput = ''
      this.statusSearch = -1
      this.faqInput = ''
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', draggingNode, dropNode, dropType)
      this.sortId = []
      if (draggingNode.data.type === 1) {
        for (const d of this.data) {
          if (d.id == dropNode.data.id) {
            if (dropType === 'before') {
              this.sortId.push({
                id: draggingNode.data.id
              })
              this.sortId.push({
                id: dropNode.data.id
              })
            }
            if (dropType === 'after') {
              this.sortId.push({
                id: dropNode.data.id
              })
              this.sortId.push({
                id: draggingNode.data.id
              })
            }
          } else {
            if (d.id !== draggingNode.data.id) {
              this.sortId.push({
                id: d.id
              })
            }
          }
        }
      }
      if (draggingNode.data.type === 2) {
        const ids = []
        for (const c of this.data) {
          if (draggingNode.data.parentId == c.id) {
            for (const i of c.children) {
              ids.push({
                id: i.id
              })
            }
          }
        }
        for (const d of ids) {
          if (d.id == dropNode.data.id) {
            if (dropType === 'before') {
              this.sortId.push({
                id: draggingNode.data.id
              })
              this.sortId.push({
                id: dropNode.data.id
              })
            }
            if (dropType === 'after') {
              this.sortId.push({
                id: dropNode.data.id
              })
              this.sortId.push({
                id: draggingNode.data.id
              })
            }
          } else {
            if (d.id !== draggingNode.data.id) {
              this.sortId.push({
                id: d.id
              })
            }
          }
        }
      }
      this.$refs.tree.setCurrentKey(this.currentNodeData.id)
      // this.treeExpandData = []
      // this.treeExpandData.push(this.currentNodeData.id)
      this.sortFaqCategoryFromServer()
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.type === draggingNode.data.type && dropNode.data.parentId === draggingNode.data.parentId) {
        return type !== 'inner'
      } else {
        return type !== 'inner' && type !== 'next' && type !== 'prev'
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    mouseenter(data) {
      this.$set(data, 'show', true)
    },
    mouseleave(data) {
      this.$set(data, 'show', false)
    },
    // 排序类目
    sortFaqCategoryFromServer() {
      startLoading()
      console.log(this.sortId)
      sortFaqCategory(this.sortId).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.treeExpandData = [this.currentNodeData.id]
          // 把其他需要关闭的节点 放到 otherNodes数组中
          const otherNodes = this.data.filter(
            (item) => item.id !== this.currentNodeData.id
          )
          // 控制其他树节点是否打开  store对象里的nodesMap对象存储的是 节点id
          otherNodes.forEach((item) => {
            (this.$refs.tree).store.nodesMap[item.id].expanded = false
          })
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 编辑类目
    updateFaqCategoryFromServer(type, data, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          startLoading()
          var classData = {}
          if (type === 1) {
            console.log(this.oneclassform)
            classData.multiLanguageMap = this.oneclassform.multiLanguageNameList.reduce((acc, item) => {
              // 确保 code 不为空且不重复
              if (item.code && !acc[item.code]) {
                // 将 code 作为键，name 作为值添加到结果对象中
                acc[item.code] = item.name;
              }
              return acc;
            }, {});
            classData.name = this.oneclassform.name
            classData.icon = this.oneclassform.pic
            classData.deviceModel = this.oneclassform.deviceModel
          } else {
            //将多语配置转成参数
            classData.multiLanguageMap = this.twoclassForm.multiLanguageNameList.reduce((acc, item) => {
              // 确保 code 不为空且不重复
              if (item.code && !acc[item.code]) {
                // 将 code 作为键，name 作为值添加到结果对象中
                acc[item.code] = item.name;
              }
              return acc;
            }, {});
            classData.name = this.twoclassForm.name
          }
          console.log(classData)

          updateFaqCategory(data.id, classData).then(response => {
            console.log(response)
            endLoading()
            if (response.code === 0) {
              this.dialogOneClassCreateVisible = false
              this.isAddTwoClass = false
              this.editData.label = classData.multiLanguageMap[this.currentLanguage]
              this.editData.icon = classData.icon
              this.editData.deviceModel = classData.deviceModel
              this.editData.iconUrl = this.uploadImageUrl
              if (this.currentNodeData.id === data.id) {
                this.currentNodeData = {
                  id: data.id,
                  label: classData.multiLanguageMap[this.currentLanguage],
                  iconUrl: this.uploadImageUrl,
                  type: data.type,
                  parentId: data.parentId
                }
              }
              // 更新类目集合
              for (const d of this.responseData) {
                if (d.id === data.id) {
                  d.name = classData.multiLanguageMap[this.currentLanguage]
                  d.icon = classData.icon
                  d.deviceModel = classData.deviceModel
                  d.iconUrl = this.uploadImageUrl
                }
                for (const sub of d.sub) {
                  if (sub.id === data.id) {
                    sub.name = classData.multiLanguageMap[this.currentLanguage]
                    sub.icon = classData.icon
                    sub.iconUrl = this.uploadImageUrl
                  }
                }
              }
              console.log(this.responseData)
            }
          }).catch((error) => {
            endLoading()
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除类目
    deleteFaqCategoryFromServer(node, data) {
      startLoading()
      deleteFaqCategory(data.id).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.remove(node, data)
          this.dialogVisible = false
          // 如果删除的是当前选中状态的,就默认选中第一个
          console.log(this.currentNodeData)
          if (data.id === this.currentNodeData.id || data.id === this.currentNodeData.parentId) {

            if (data.type === 2 && data.id === this.currentNodeData.id) {
              for (const d of this.responseData) {
                if (d.id === data.parentId) {
                  this.$refs.tree.setCurrentKey(d.id)
                  if (Array.isArray(d.sub) && d.sub.length > 1) {
                    this.isOkAddFaq = false
                  } else {
                    this.isOkAddFaq = true
                  }
                  this.currentNodeData = {
                    id: d.id,
                    label: d.name,
                    iconUrl: d.iconUrl,
                    type: 1,
                    parentId: d.parentId
                  }
                }
              }
            } else {
              this.$refs.tree.setCurrentKey(this.data[0].id)
              if (Array.isArray(this.data[0].children) && this.data[0].children.length > 0) {
                this.isOkAddFaq = false
              } else {
                this.isOkAddFaq = true
              }
              this.currentNodeData = {
                id: this.data[0].id,
                label: this.data[0].label,
                iconUrl: this.data[0].iconUrl,
                type: this.data[0].type,
                parentId: this.data[0].parentId
              }
            }
            this.getFaqListFromServer(this.currentNodeData.id, '')
            this.treeExpandData = []
            this.treeExpandData.push(this.currentNodeData.id)
          }
          //更新类目集合
          for (const d of this.responseData) {
            if (d.id === data.id) {
              this.responseData.splice(this.responseData.indexOf(d), 1)
            } else {
              for (const sub of d.sub) {
                if (sub.id === data.id) {
                  d.sub.splice(d.sub.indexOf(sub), 1)
                }
              }
            }
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 查寻类目
    getFaqCategoriesFromServer(type, classId, data) {
      startLoading()
      this.data = []

      const param = {
        'languageCode': this.currentLanguage
      }
      getFaqCategories(param).then(response => {
        console.log(response)
        endLoading()
        if (response.code === 0) {
          this.data = []
          this.responseData = eval(response.data)
          for (const d of response.data) {
            console.log(d)
            var subOption1 = []
            for (const sub of d.sub) {
              subOption1.push({
                id: sub.id,
                label: sub.name,
                type: 2,
                parentId: d.id,
                multiLanguageMap: sub.multiLanguageMap
              })
            }
            if (subOption1.length > 0) {
              this.data.push({
                id: d.id,
                label: d.name,
                iconUrl: d.iconUrl,
                icon: d.icon,
                type: 1,
                deviceModel: d.deviceModel,
                children: subOption1,
                multiLanguageMap: d.multiLanguageMap
              })
            } else {
              this.data.push({
                id: d.id,
                label: d.name,
                icon: d.icon,
                iconUrl: d.iconUrl,
                type: 1,
                deviceModel: d.deviceModel,
                multiLanguageMap: d.multiLanguageMap
              })
            }
          }
          if (type === 1) {
            if (classId == -1) {
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(this.data[0].id)
                if (Array.isArray(this.data[0].children) && this.data[0].children.length > 0) {
                  this.isOkAddFaq = false
                } else {
                  this.isOkAddFaq = true
                }
                this.currentNodeData = {
                  id: this.data[0].id,
                  label: this.data[0].label,
                  iconUrl: this.data[0].iconUrl,
                  icon: this.data[0].icon,
                  type: this.data[0].type,
                  parentId: this.data[0].parentId,
                  multiLanguageMap: this.data[0].multiLanguageMap
                }
                this.getFaqListFromServer(this.data[0].id, '')
                this.treeExpandData = [this.data[0].id]
                // 把其他需要关闭的节点 放到 otherNodes数组中
                const otherNodes = this.data.filter(
                  (item) => item.id !== this.data[0].id
                )
                // 控制其他树节点是否打开  store对象里的nodesMap对象存储的是 节点id
                otherNodes.forEach((item) => {
                  (this.$refs.tree).store.nodesMap[item.id].expanded = false
                })
              })
            } else {
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(this.data[this.data.length - 1].id)
                if (Array.isArray(this.data[this.data.length - 1].children) && this.data[this.data.length - 1].children.length > 0) {
                  this.isOkAddFaq = false
                } else {
                  this.isOkAddFaq = true
                }
                this.currentNodeData = {
                  id: this.data[this.data.length - 1].id,
                  label: this.data[this.data.length - 1].label,
                  iconUrl: this.data[this.data.length - 1].iconUrl,
                  icon: this.data[this.data.length - 1].icon,
                  type: this.data[this.data.length - 1].type,
                  parentId: this.data[this.data.length - 1].parentId,
                  multiLanguageMap: this.data[this.data.length - 1].multiLanguageMap
                }
                this.getFaqListFromServer(this.data[this.data.length - 1].id, '')
                this.treeExpandData = [this.data[this.data.length - 1].id]
                // 把其他需要关闭的节点 放到 otherNodes数组中
                const otherNodes = this.data.filter(
                  (item) => item.id !== this.data[this.data.length - 1].id
                )
                // 控制其他树节点是否打开  store对象里的nodesMap对象存储的是 节点id
                otherNodes.forEach((item) => {
                  (this.$refs.tree).store.nodesMap[item.id].expanded = false
                })
              })
            }
          }
          if (type === 2) { // 增加二级类目
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(data.id)
              this.currentNodeData = {
                id: data.id,
                label: data.name,
                iconUrl: '',
                type: 2,
                parentId: classId,
                multiLanguageMap: data.multiLanguageMap
              }
              this.isOkAddFaq = false
              this.getFaqListFromServer(classId, data.id)

              this.treeExpandData = [data.id]
              // 把其他需要关闭的节点 放到 otherNodes数组中
              const otherNodes = this.data.filter(
                (item) => item.id !== data.id
              )
              // 控制其他树节点是否打开  store对象里的nodesMap对象存储的是 节点id
              otherNodes.forEach((item) => {
                (this.$refs.tree).store.nodesMap[item.id].expanded = false
              })
            })
          }
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    // 新增类目
    submitAddClass(type, classId, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var classData = {}
          if (type === 1) {
            console.log(this.oneclassform)
            //将多语配置转成参数
            classData.multiLanguageMap = this.oneclassform.multiLanguageNameList.reduce((acc, item) => {
              // 确保 code 不为空且不重复
              if (item.code && !acc[item.code]) {
                // 将 code 作为键，name 作为值添加到结果对象中
                acc[item.code] = item.name;
              }
              return acc;
            }, {});
            classData.name = this.oneclassform.name
            classData.icon = this.oneclassform.pic
            classData.deviceModel = this.oneclassform.deviceModel
            if (this.duplicateNamesInPrimaryClass() === false) {
              this.$message.error('类目名称已存在');
              return
            }
          } else {
            classData.parentId = classId
            classData.multiLanguageMap = this.twoclassForm.multiLanguageNameList.reduce((acc, item) => {
              // 确保 code 不为空且不重复
              if (item.code && !acc[item.code]) {
                // 将 code 作为键，name 作为值添加到结果对象中
                acc[item.code] = item.name;
              }
              return acc;
            }, {});
            classData.name = this.twoclassForm.name
            if (this.duplicateNamesInSecondClass(classId) === false) {
              this.$message.error('类目名称已存在');
              return
            }
          }
          console.log(classData)
          startLoading()
          createFaqCategory(classData).then(response => {
            console.log(response)
            if (response.code === 0) {
              this.dialogOneClassCreateVisible = false
              this.isAddTwoClass = false
              // 清空搜索项
              this.classSearchInput = ''
              // if(type == 1){
              //     //增加一级类目,如果有搜索词则清空
              //     this.classSearchInput("")
              // }
              // this.append()
              this.getFaqCategoriesFromServer(type, classId, response.data)
            }
          }).catch((error) => {
            endLoading()
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //一级分类重名验证
    duplicateNamesInPrimaryClass() {
      for (const primaryClass of this.data) {
        if (this.oneclassform.name === primaryClass.label) {
          return false
        }
      }

      return true
    },
    //二级分类重名验证
    duplicateNamesInSecondClass(primaryClassId) {
      let currentPrimaryClass
      for (const primaryClass of this.data) {
        if (primaryClassId === primaryClass.id) {
          currentPrimaryClass = primaryClass
          break
        }
      }

      if (currentPrimaryClass.children != undefined && currentPrimaryClass.children != null) {
        for (const secondClass of currentPrimaryClass.children) {
          if (this.twoclassForm.name === secondClass.label) {
            return false
          }
        }
      }
      return true
    },
    append(data) {
      const newChild = { id: id++, label: data.label, children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handleAvatarSuccess(res, file) {
      this.uploadImageUrl = URL.createObjectURL(file.raw)
      this.oneclassform.pic = res.data
      console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 < 500
      if (!isJPG && !isLt2M) {
        this.$message.error("上传图片只能是jpg ,png ,jpeg格式且不能超过500K!");
      } else {
        if (!isJPG) {
          this.$message.error("上传图片只能是jpg ,png ,jpeg格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过500K!");
        }
      }
      return isJPG && isLt2M
    },
    editClass(node, data) {
      this.isupdate = true
      this.editnode = node
      this.editData = data
      this.classdialogtitle = '编辑类目'
      console.log(data)
      if (data.type == 2) {
        // 编辑二级类目
        this.isAddTwoClass = true
        if (data.multiLanguageMap === undefined || Object.keys(data.multiLanguageMap).length === 0) {
          //兼容之前的数据：将name填写到默认的语言中
          this.twoclassForm.multiLanguageNameList = getLanguageContentFromCode().map(language => {
            const key = Object.keys(language)[0];
            if (key === getLocalMultiLanguage().defaultLanguage) {
              return { name: data.label, placeholder: language[key], code: key };
            } else {
              return { name: "", placeholder: language[key], code: key };
            }
          });

        } else {
          //有多语配置的时候则正常构建数据源
          this.twoclassForm.multiLanguageNameList = getLanguageContentFromCode().map(language => {
            const key = Object.keys(language)[0];
            return { name: data.multiLanguageMap[key] === undefined ? "" : data.multiLanguageMap[key], placeholder: language[key], code: key };
          });
        }

        this.twoclassForm.name = data.label
      } else {
        // 编辑一级类目
        this.dialogOneClassCreateVisible = true

        if (data.multiLanguageMap === undefined || Object.keys(data.multiLanguageMap).length === 0) {
          //兼容之前的数据：将name填写到默认的语言中
          this.oneclassform.multiLanguageNameList = getLanguageContentFromCode().map(language => {
            const key = Object.keys(language)[0];
            if (key === getLocalMultiLanguage().defaultLanguage) {
              return { name: data.label, placeholder: language[key], code: key };
            } else {
              return { name: "", placeholder: language[key], code: key };
            }
          });

        } else {
          //有多语配置的时候则正常构建数据源
          this.oneclassform.multiLanguageNameList = getLanguageContentFromCode().map(language => {
            const key = Object.keys(language)[0];
            return { name: data.multiLanguageMap[key] === undefined ? "" : data.multiLanguageMap[key], placeholder: language[key], code: key };
          });
        }
        this.oneclassform.name = data.label
        this.oneclassform.pic = data.icon
        this.oneclassform.deviceModel = data.deviceModel
        this.uploadImageUrl = data.iconUrl

      }
    },
    addTwoClass(data) {
      this.isupdate = false
      this.clickOneClassId = data.id
      this.isAddTwoClass = true
      // name: ''
      this.twoclassForm = {
        name: '',
      }
      this.twoclassForm.multiLanguageNameList = getLanguageContentFromCode().map(language => {
        const key = Object.keys(language)[0];
        return { name: "", placeholder: language[key], code: key };
      });
      console.log(this.twoclassForm)

      this.classdialogtitle = '创建类目'
    },
    createOneClass() {
      this.isupdate = false
      this.classdialogtitle = '创建类目'
      this.dialogOneClassCreateVisible = true
      this.uploadImageUrl = ''
      //一级类目数据配置
      this.oneclassform = {
        name: '',
        pic: '',
        deviceModel: ''
      }
      this.oneclassform.multiLanguageNameList = getLanguageContentFromCode().map(language => {
        const key = Object.keys(language)[0];
        return { name: "", placeholder: language[key], code: key };
      });
    },
    // faq关键字搜索
    searchFaq() {
      if (this.searchFaqInput !== '') {
        this.isfaqfilter = true
      } else {
        if (this.statusSearch === -1 && this.currentNodeData.type != 1) {
          this.isfaqfilter = false
        }
      }
      this.faqInput = this.searchFaqInput
      this.filterTableData()
    },
    selectAllRowsData(selection) {
      if (selection.length > 0) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
      this.listDataIdSelect = []
      for (const d of selection) {
        this.listDataIdSelect.push(d.id)
      }
      // this.listDataIdSelectNot = []
      console.log('listDataIdSelect ', this.listDataIdSelect)
      console.log('isSelectAll ', this.isSelectAll)
    },
    onSelect(selection, row) {
      console.log(selection)
      console.log(row)
      const selected = selection.length > 0 && selection.indexOf(row) !== -1
      console.log('is selected', selected)
      if (selected) {
        this.listDataIdSelect.push(row.id)
      } else {
        // this.listDataIdSelectNot.push(row.id)
        this.listDataIdSelect.splice(this.listDataIdSelect.indexOf(row.id), 1)
      }
      console.log(this.listDataIdSelect)
      console.log(this.listDataIdSelectNot)
    },
    /**
     * 打开某个属性节点
     * @param {*} id 树形节点id
     */
    openNode(id) {
      const tree = this.$refs.tree;
      const node = tree.getNode(id);
      tree.setCurrentKey(id);
      node.expanded = true;
    },
    /**
     * 关闭除id外的其他标签
     * @param {*} id 树形节点id
     */
    closeOtherNode(id) {
      for (const nodeData of this.data) {
        if (nodeData.id != id) {
          const tree = this.$refs.tree;
          const node = tree.getNode(nodeData.id);
          node.expanded = false;
        }
      }
    }
  }
}
</script>

<style>
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 100vh;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}

.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #F2F3FF !important;
  border-radius: 3px;
  color: #0052D9;
}

/* tree 的高度和宽度重新定义 */
::v-deep.el-tree .el-tree-node>.el-tree-node__content {
  width: 300px;
  height: 40px;
}

/*  鼠标hover改变背景颜色 */
.el-tree ::v-deep.el-tree-node>.el-tree-node__content:hover {
  background-color: #F2F3FF !important;
  border-radius: 8px;
}

/*  颜色高亮 */
::v-deep.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #F2F3FF !important;
  border-radius: 8px;
}

/* .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
  } */
.custom-tree-node {
  font-size: 14px;
  padding-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.em-tree-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
  vertical-align: bottom;
}

/* .span.em-tree-icon{
      position: absolute;
      left: 100px;
      top: 10px;
  } */

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  background: #EEEEEE;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  color: #8c939d;
  width: 104px;
  height: 104px;
  text-align: center;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.container {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 24px;
  overflow: auto;
  background-color: rgb(241, 241, 241);
}

.left_title {
  margin-bottom: 20px;
  text-align: justify;
  font-size: 20px;
  color: #000;
}
</style>