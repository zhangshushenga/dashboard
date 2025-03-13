<template>
  <div class="app-container">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">Agent 测试</div>

    <el-form
      ref="dataForm"
      :model="formData"
      :rules="rules"
    >
      <el-form-item>
        <el-select
            v-model="agentType"
            clearable
            placeholder="请选择 Agent"
            @change="changeAgent"
            filterable
        >
          <el-option
            v-for="item in agentList"
            :key="item.agentType"
            :label="item.name"
            :value="item.agentType"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="language" clearable placeholder="请选择语言 " @change="changeLanguage">
          <el-option
            v-for="item in languageList"
            :key="item.key"
            :label="item.display_name"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="(input,index) in formData.inputList"
        :key="input.id"
        :label="input.fieldName"
        :prop="'inputList.' + index + '.fieldValue'"

        :rules="input.required?[
          { required: true, message: input.fieldName + '必传', trigger: 'blur' },
        ]:[]"
      >
        <el-input
          v-model="input.fieldValue"
          autosize
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        v-for="(input,index) in formData.jsonList"
        :key="input.id"
        :label="input.fieldName"
        :prop="'jsonList.' + index + '.fieldValue'"

        :rules="input.required?[
          { required: true, message: input.fieldName + '必传', trigger: 'blur' },
        ]:[]"
      >
        <json-editor
          :ref="'input_'+index"
          v-model="input.fieldValue"
          style="min-width: 200px; max-width: 800px"
        />
      </el-form-item>
      <el-form-item
        v-for="(input,index) in formData.checkBoxList"
        :key="input.id"
        :label="input.fieldName"
        :prop="'checkBoxList.' + index + '.fieldValue'"

        :rules="input.required?[
          { required: true, message: input.fieldName + '必传', trigger: 'blur' },
        ]:[]"
      >
        <el-switch v-model="input.fieldValue" />

      </el-form-item>

      <template
        v-for="(input,index) in formData.promptList"
      >
        <el-form-item
          :key="input.id"
          :label="'提示语'+(index+1)+'-key'"
          :prop="input.key"
        >
          <el-input v-model="input.key" autosize type="textarea" disabled />
        </el-form-item>

        <el-form-item
          :key="input.id"
          :label="'提示语'+(index+1) +'-提示语'"
          :prop="input.prompt"
        >
          <el-input v-model="input.prompt" autosize type="textarea" :placeholder="input.desc" />
        </el-form-item>

        <el-form-item
          :key="input.id"
          :label="'提示语'+(index+1) +'-模型类型'"
        >
          <el-select v-model="input.type" clearable placeholder="模型类型">
            <el-option
              v-for="item in modelOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>

        </el-form-item>

      </template>
      <el-row v-if="formData.promptList.length > 0" :gutter="20">
        <el-col :span="24" style=" text-align: right;">
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="更新当前Agent的提示语吗?这将会立即生效。"
            @confirm="savePrompt"
          >
            <el-button slot="reference" v-loading="promptLoading" type="success">保存当前提示语配置</el-button>
          </el-popconfirm>
        </el-col>
      </el-row>
      <el-form-item
        v-if="formData.uploadImage"
        :rules="[
          { required: true,validator: requiredUpload, trigger: 'blur' },
        ]"
        label="附件"
        prop="uploaded"
      >

        <el-upload
        ref="upload"
          :action="uploadBaseUrl"
          :auto-upload="true"
          :before-upload="beforeAvatarUpload"
          :data="form"
          :http-request="uploadToS3"
          :limit="2"
          :on-change="onChange"
          :on-error="onUploadFail"
          :on-remove="onRemove"
          :on-success="onUploadOk"
          accept="image/jpeg, image/png, image/jpg"
          class="queryItem"
          list-type="picture-card">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
              </span>
            </div>
            <!-- <el-button size="small" type="primary">选择文件</el-button> -->
        </el-upload>
      </el-form-item>

      <el-form-item>

        <el-button
          :disabled="loading"
          type="primary"
          @click="queryAction"
          v-html="autoText"
        />

        <!--          <el-button :disabled="loading" type="primary" @click="queryAction">查询</el-button>-->
      </el-form-item>
    </el-form>

    <div style="margin: 30px">

      <el-descriptions :column="1" title="结果">
        <el-descriptions-item v-if="result.textSensitive === 1" label="敏感词"><span style="color:red">触发敏感词</span>
        </el-descriptions-item>

        <el-descriptions-item label="原始返回json">
          <json-editor
            ref="jsonEditor"
            v-model="rawJson"
            style="min-width: 600px; max-width: 800px"
          />
        </el-descriptions-item>

      </el-descriptions>
    </div>
    <template>

      <!--      <el-button v-if="agentType > 0 " type="success" icon="el-icon-refresh" @click="refreshList">刷新历史请求数据</el-button>-->

      <template
        v-for="(row,index) in list"
      >

        <el-card
          :key="index"
          class="box-card"
          style="margin-bottom: 10px"
        >
          <div slot="header" class="clearfix">
            <span>更新时间：{{ row.updateTime }} &nbsp;&nbsp;&nbsp;&nbsp; 更新人：{{ row.updateUserName }}</span>
          </div>
          <!--          <div class="text item">-->
          <!--            <pre><code style="  word-wrap: break-word;">{{ row.promptList ? JSON.parse(row.promptList) : '' }}</code></pre>-->
          <!--          </div>-->
          <div class="text item">
            <pre><code style="  word-wrap: break-word;">{{ row.promptList }}</code></pre>
          </div>
          <!--          <div class="text item">-->
          <!--            结果:-->
          <!--            <pre><code>{{ row.result ? JSON.parse(row.result) :'' }}</code></pre>-->
          <!--          </div>-->
        </el-card>

      </template>

      <pagination
        v-show="total>0"
        :limit.sync="listQuery.size"
        :page.sync="listQuery.current"
        :total="total"
        :auto-scroll="false"
        @pagination="getList"
      />

    </template>
    <mouse-move-dialog :dialog-visible.sync="dialogVisible"  :mouseMoveFile="mouseMoveFile"
      @submit="mouseDialogSubmit">
    </mouse-move-dialog>
  </div>

</template>

<script>

import JsonEditor from '@/components/JsonEditor'
import MouseMoveDialog from '../../components/Aiep/MouseMoveDialog.vue';
import {
  generateRequest,
  getAgentList,
  getAgentSelectList,
  getImageUrl, getLogList,
  getResult,
  updateAgentConfigPrompt
} from '@/api/agent-config'

import { getToken } from '@/utils/auth'
import inlineEditTable from '@/views/table/inline-edit-table.vue'
import Pagination from '@/components/Pagination/index.vue'

// vqa llava-1.5 gemma-7b
const modelOptions = [
  { key: 1, display_name: 'vqa' },
  { key: 2, display_name: 'llava-1.5' },
  { key: 3, display_name: 'gemma-7b' },
  { key: 4, display_name: 'osprey' },
  { key: 5, display_name: 'claude3-haiku' },
  // { key: 6, display_name: 'gpt4v' },
  { key: 7, display_name: 'llava-1.6' },
  { key: 8, display_name: 'claude3-sonnet' },
  { key: 9, display_name: 'v15nx' },
  { key: 10, display_name: 'minicpm_cn' },
  // { key: 11, display_name: '' },
  // { key: 12, display_name: '' },
  { key: 13, display_name: 'claude3-sonnet3.5' },
  { key: 14, display_name: 'gpt4-mini' },
  { key: 15, display_name: 'llama3.2-11b' },
  { key: 16, display_name: 'llama3.2-90b' },
  { key: 17, display_name: 'bedrock_nova_lite' },
  { key: 18, display_name: 'bedrock_nova_pro' }
  ]

const modelKeyValue = modelOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: { MouseMoveDialog , JsonEditor, Pagination},
  filters: {
    modelFilter(type) {
      return modelKeyValue[type]
    }
  },
  data() {
    return {
      dialogVisible: false,

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },

      modelOptions,
      agentList: [],
      languageList: [
        { key: 'en', display_name: '英文' },
        { key: 'jp', display_name: '日语' },
        { key: 'es', display_name: '墨西哥语' }
      ],
      uploadBaseUrl: '',

      form: {
        name: '',
        type: 1,
        env: 'test'
      },
      result: {
        label: '-',
        babySmile: '',

        result: {}
      },
      rawJson: {},
      myHeaders: { Authorization: getToken() },

      timer: [],
      timerFileIdList: [],
      timerCount: [],

      isAddDataSetLoading: false,
      showDropdowns: [], // 控制每个下拉框的显示状态
      dropdownOptions: [],
      loading: true,
      promptLoading: false,
      currentPage: 1,
      totalData: 0,

      autoText: '生成',
      queryDeviceId: 'E4AAEC828CC5',
      agentType: null,
      language: 'en',
      prompt: '',
      param: [],
      imagePath: '',
      queryUserId: '',
      queryEventId: '',
      imageType: false,
      onlyAmericaDevice: false,
      labelSensitive: false,
      labelLikeType: '',
      modelTypeList: [
        {
          'label': 'gpt',
          'value': 1
        },
        {
          'label': 'gemini',
          'value': 2
        }
      ],
      valueTime: '',
      rules: [],
      formData: {
        inputList: [{}],
        checkBoxList: [{}],
        attrList: [{}],
        jsonList: [{}],
        promptList: [{}],
        uploadImage: false
      },
      mouseMoveFile: '',
      mousePosition: ''
    }
  },
  computed: {
    inlineEditTable() {
      return inlineEditTable
    },
  },
  created() {
  },
  mounted() {
    this.formData.inputList = []
    this.formData.checkBoxList = []
    this.formData.attrList = []
    this.formData.jsonList = []
    this.formData.promptList = []
    this.getSelectList()
  },
  methods: {
    refreshList() {
      this.listQuery.current = 1
      this.getList()
    },

    getList() {
      // this.listLoading = true
      // this.listQuery.agentType = this.agentType
      // this.listQuery.deviceId = 'testDevice'
      // getLogList(this.listQuery).then(response => {
      //   this.list = response.data.records
      //   this.total = response.data.total
      //   // this.$nextTick(() => {
      //   //   this.list = response.data.records
      //   // })
      // }).finally(
      //   () => {
      //     this.listLoading = false
      //   }
      // )
    },
    savePrompt() {
      this.promptLoading = true
      // console.log(111)
      const agentConfig = this.agentList.find(v => v.agentType === this.agentType)
      agentConfig.prompt[this.language] = this.formData.promptList
      const tempData = {
        prompt: agentConfig.prompt
      }
      updateAgentConfigPrompt(agentConfig.id, tempData).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
        // this.getSelectList()
      }).finally(() => {
        this.promptLoading = false

        // this.refreshList()
      })
    },
    requiredUpload(rule, value, callback) {
      // 自定义验证规则
      if (this.imagePath === '') {
        callback(new Error('请上传至少一个文件'))
      } else {
        callback()
      }
    },
    changeAgent(agentType) {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

      const find = this.agentList.find(v => v.agentType === agentType)
      if (find !== undefined) {
        // this.languageList = Object.keys(find.prompt)
        // Object.keys(find.prompt)
        if (find.prompt !== undefined) {
          if (this.language in find.prompt) {
            this.formData.promptList = find.prompt[this.language]
          } else {
            this.formData.promptList = find.prompt['en']
            this.language = 'en'
          }
        }

        const param = find.param
        this.formData.inputList = param.filter(item => {
          return item.fieldType === 2 || item.fieldType === 1
        })
        this.formData.checkBoxList = param.filter(item => {
          return item.fieldType === 3
        })
        this.formData.jsonList = param.filter(item => {
          return item.fieldType === 4
        })
        const imageList = param.filter(item => {
          return item.fieldType === 5
        })
        this.formData.uploadImage = imageList.length > 0
      }
      if (!this.formData.uploadImage) {
        this.loading = false
      }

      this.getList()
    },
    changeLanguage(lang) {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

      const find = this.agentList.find(v => v.agentType === this.agentType)
      if (find !== undefined) {
        // this.languageList = Object.keys(find.prompt)

        if (lang in find.prompt) {
          this.formData.promptList = find.prompt[lang]
        } else {
          this.$message.error('当前agent不支持此语言，已自动切回英文')
          this.formData.promptList = find.prompt['en']
          this.language = 'en'
        }
      }
    },
    getSelectList(currentPage) {
      getAgentSelectList().then(response => {
        this.agentList = response.data
      }).finally()
    },
    handleAvatarSuccess(res, file) {
      this.uploadImageUrl = URL.createObjectURL(file.raw)
      this.oneclassform.pic = res.data
      // console.log(res)
    },
    getUpload() {
      // get 上传地址
      getImageUrl().then(response => {
        console.log('get 上传地址', response)
        if (response.code === 0) {
          this.uploadImageUrl = response.data.uploadUrl
          this.imagePath = response.data.path
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 自定义上传行为
    async uploadToS3(request) {
      this.autoText = '上传图片中。。。'
      try {
        // 调用getBaByFaceImage获取新的S3地址
        const response = await getImageUrl({ agentType: this.agentType })
        console.log('获取上传地址', response)

        if (response.code === 0) {
          // 更新action属性（S3地址）和图片路径
          this.uploadBaseUrl = response.data.uploadUrl
          this.imagePath = response.data.path

          // 可以在这里设置额外的headers或者表单数据
          // this.myHeaders = { ... };
          // this.form = { ... };

          // 返回true以继续上传流程
        } else {
          // 处理错误情况
          this.$message.error('上传图片失败')
          console.error('获取S3地址失败:', response)
        }
      } catch (error) {
        this.$message.error('上传图片失败')
        console.error('获取S3地址失败:', error)
        // 返回false以停止上传流程
      }

      const { file } = request
      try {
        const response = await fetch(this.uploadBaseUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type // 或者 'application/octet-stream'
          },
          body: file
        })

        if (response.ok) {
          this.onUploadOk(response) // 处理上传成功
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } catch (error) {
        this.onUploadFail(error) // 处理上传失败
      }
    },
    beforeAvatarUpload(file) {
      console.log('beforeAvatarUpload')
      this.loading = true
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 < 5000
      if (!isJPG && !isLt2M) {
        this.$message.error('上传图片只能是jpg ,png ,jpeg格式且不能超过5M!')
        this.isFileValid = false
        return false
      } else {
        if (!isJPG) {
          this.$message.error('上传图片只能是jpg ,png ,jpeg格式!')
          this.isFileValid = false
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过5M!')
          this.isFileValid = false
          return false
        }
      }
      this.isFileValid = true

      return isJPG && isLt2M
    },
    onChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      // // fileList 是当前的文件列表，已经包含了新选择的文件
      fileList = fileList.slice(-1) // 保留最后一个文件，即新选择的文件
      this.rawJson = {}
      console.log('onChange')
    }, onUploadOk(response, file, fileList) {
      console.log('onUploadOk')
      // this.imagePath = response.data
      this.loading = false
      this.autoText = '生成'
      // this.getDataList()
      this.$refs.dataForm.validateField('uploaded')
    }, onUploadFail(er, file, fileList) {
      fileList.splice(0, fileList.length)
      console.log('onUploadFail')
      this.autoText = '上传失败'
      this.rawJson = {}
      this.loading = true
      this.$refs.dataForm.validateField('uploaded')
    }, onRemove() {
      console.log('onRemove')
      this.loading = true
      this.imagePath = ''
      this.rawJson = {}
      this.$refs.dataForm.validateField('uploaded')
    },
    queryAction() {
      this.$refs['dataForm'].validate((valid) => {
        if (this.loading) {
          return
        }
        this.loading = true
        console.log(this.formData)
        if (valid) {
          this.autoText = '生成请求中。。。'
          const param = {
            agentType: this.agentType,
            language: this.language,
            promptList: this.formData.promptList
          }
          param.param = {}
          // 遍历 inputList 并填充 param
          this.formData.inputList.forEach(item => {
            param.param[item.field] = item.fieldValue
          })
          // 遍历 checkBoxList 并填充 param
          this.formData.checkBoxList.forEach(item => {
            param.param[item.field] = item.fieldValue
          })
          // 遍历 jsonList 并填充 param
          this.formData.jsonList.forEach((input, index) => {
            const jsonEditorInstance = this.$refs[`input_${index}`][0]
            if (jsonEditorInstance) {
              const value = jsonEditorInstance.getValue()
              if (value) {
                param.param[input.field] = JSON.parse(value)
              }
            }
          })
          if (this.formData.uploadImage) {
            param.param['imageUrl'] = this.imagePath
            param.param['imageS3Key'] = this.imagePath
          }
          console.log(param)
          generateRequest(param).then(response => {
            if (response.code === 0) {
              // 获取 requestId
              const requestId = response.data
              const tKey = 'loading'
              this.autoText = '等待获取结果。。。'
              if (requestId === 0) {
                this.loading = false
                this.autoText = '生成失败'
              } else {
                this.timerCount[tKey] = 0
                this.timer[tKey] = setInterval(this.checkAndDownloadFile, 1000, requestId, false)
                this.timerFileIdList.push(tKey)
              }
            }
          }).catch(error => {
            console.log(error)
            this.autoText = '生成'
            this.loading = false
          })
        }
      })
    },
    checkAndDownloadFile: function(requestId, manual = true) {
      // 根据 requestId 获取结果
      // console.log('checkAndDownloadFile')
      const tKey = 'loading'

      getResult(requestId).then(response => {
        const timerElement = this.timer[tKey]
        const data = response.data
        if (data.status !== 0) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          if (data.status === 2) {
            this.autoText = '点击再次生成'
          } else if (data.status === 5) {
            this.autoText = '图片中没有关键目标'
          } else {
            this.autoText = '生成失败，点击重新生成'
          }

          this.loading = false
          // 请求成功
          this.result = data
          this.rawJson = data.result
          return
        }
        if (timerElement) {
          // console.log('当前fileId有定时器')
          this.timerCount[tKey] = ++this.timerCount[tKey]
          const timerCountElement = this.timerCount[tKey]
          // console.log(`取消 (已请求${timerCountElement}次)`)
          this.autoText = '等待获取结果。。。已等待约' + timerCountElement + 's'
          // row.autoText = `取消 (已请求${timerCountElement}次)`
          if (timerCountElement > 60) {
            // 最多60次
            clearInterval(timerElement)
            this.autoText = '已超过60s，点击重新生成'
            this.loading = false
            // row.auto = !row.auto
          }
        }
      }).finally()
    },
    // 删除和查看图片
    handlePictureCardPreview(file) {
      this.mouseMoveFile = file.url;
      this.dialogVisible = true;
      console.log("view_file", this.mouseMoveFile)
    },
    mouseDialogSubmit(formData){
      console.log("提交的信息", formData)
      this.WriteToRoi(formData)
    },
    WriteToRoi(formData){
      const text = `[${formData.position.start.x},${formData.position.start.y},${formData.position.end.x},${formData.position.end.y}]`
      console.log("agentList----->",this.agentList)
      try{
        for (var i=0; i<this.agentList.length; i++){
          const type = this.agentList[i].agentType
          if (type === 101 || type === 102){
            for (var j=0; j<this.agentList[i].param.length; j++){
              const fieldName = this.agentList[i].param[j].fieldName
              if (fieldName === 'roi'){
                this.mousePosition = text
                console.log("agentList[i].param[j].field", agentList[i].param[j].field)
                break
              }
            }
            break
          }
        }
      }
      catch{
        console.log("agentListError")
      }
      console.log("text", text)
    }
  }
}
</script>

<style scoped>

.queryItem {
  margin-top: 1%;
  margin-left: 1%;
  width: 22%
}
.image-container {
  position: relative;
  display: inline-block;
}

.coordinates {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
}
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

</style>
