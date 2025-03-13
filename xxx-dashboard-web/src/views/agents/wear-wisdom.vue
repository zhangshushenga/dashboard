<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">穿衣建议</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input
          v-model="prompt"
          autosize
          placeholder="如果此处没有值，则使用默认prompt"
          type="textarea"
        />

        <el-date-picker
          v-model="date"
          class="queryItem"
          placeholder="选择日期"
          type="date"
          value-format="yyyy-MM-dd"
        />
        <div class="el-divider el-divider--horizontal" style="background: #ffffff;margin: 0px"><!----></div>
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
          list-type="picture"
        >
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>

        <el-button
          :disabled="loading"
          class="queryItem"
          style="height: 40px;min-width: 22%;max-width: 50%;width: auto"
          type="primary"
          @click="queryAction"
          v-html="autoText"
        />

      </div>

    </div>
    <div style="margin: 30px">

      <el-descriptions :column="1" title="结果">
        <el-descriptions-item label="建议" label-style="min-width:50px">{{
          this.result.suggestion
        }}
        </el-descriptions-item>
        <el-descriptions-item
          v-if="this.result.imageUrl !== '' && this.result.imageUrl !== undefined "
          label="图片"
          label-style="width:50px"
        >
          <el-image
            :preview-src-list="[this.result.imageUrl]"
            :src="this.result.imageUrl"
            style="width: 200px"
          >
            >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item v-if="this.result.textSensitive === 1" label="敏感词" label-style="min-width:50px"><span
          style="color:red"
        >触发敏感词</span>
        </el-descriptions-item>
        <el-descriptions-item label="建议原始返回json" label-style="min-width:100px">
          <json-editor
            ref="jsonEditor"
            v-model="this.result.suggestionResult"
            style="min-width: 200px;"
          />
        </el-descriptions-item>
        <el-descriptions-item label="图片原始返回json" label-style="min-width:100px">
          <json-editor
            ref="jsonEditor"
            v-model="this.result.imageResult"
            style="min-width: 200px;"
          />
        </el-descriptions-item>

      </el-descriptions>

    </div>
  </div>
</template>

<script>

import JsonEditor from '@/components/JsonEditor'

import { generateWearWisdom, getWearWisdom, getWearWisdomImage } from '@/api/agents'

import { getToken } from '@/utils/auth'

export default {
  components: { JsonEditor },
  data() {
    return {
      uploadBaseUrl: '',
      form: {
        name: '',
        type: 1,
        env: 'test'
      },
      result: {
        suggestion: '-',
        label: '-',
        imageUrl: '',
        imageResult: {},
        suggestionResult: {}
      },
      myHeaders: { Authorization: getToken() },

      timer: [],
      timerFileIdList: [],
      timerCount: [],

      isAddDataSetLoading: false,
      showDropdowns: [], // 控制每个下拉框的显示状态
      dropdownOptions: [],
      loading: true,
      currentPage: 1,
      totalData: 0,
      timeZoneList: [{
        value: 'UTC',
        label: 'UTC'
      }, {
        value: 'Asia/Shanghai',
        label: '北京时间'
        // seleced: true
      }, {
        value: 'America/Los_Angeles',
        label: '太平洋时间'
      }],
      autoText: '生成',
      queryDeviceId: 'E4AAEC828CC5',
      prompt: '',
      date: new Date(),
      timezone: 'Asia/Shanghai',
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
      valueTime: ''

    }
  },
  computed: {},
  created() {
  },
  mounted() {
    // this.getList(1)

  },
  methods: {
    getList(currentPage) {
      getWearWisdom(4).then(response => {
        this.result = response.data
      }).finally()
    },
    handleAvatarSuccess(res, file) {
      this.uploadImageUrl = URL.createObjectURL(file.raw)
      this.oneclassform.pic = res.data
      // console.log(res)
    },
    getUpload() {
      // get 上传地址
      getWearWisdomImage().then(response => {
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
        // 调用getWearWisdomImage获取新的S3地址
        const response = await getWearWisdomImage()
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
    // 处理文件选择变化
    handleChange(file, fileList) {
      // 如果已经有文件，移除旧文件
      // if (this.fileList.length > 1) {
      //   this.fileList.splice(0, 1)
      // }
      // // fileList 是当前的文件列表，已经包含了新选择的文件
      // this.fileList = fileList.slice(-1) // 保留最后一个文件，即新选择的文件
    },
    onChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      // // fileList 是当前的文件列表，已经包含了新选择的文件
      fileList = fileList.slice(-1) // 保留最后一个文件，即新选择的文件
      this.resetData()
      console.log('onChange')
    }, onUploadOk(response, file, fileList) {
      console.log('onUploadOk')
      // this.imagePath = response.data
      this.loading = false
      this.autoText = '生成'
      // this.getDataList()
    }, onUploadFail(er, file, fileList) {
      fileList.splice(0, fileList.length)
      console.log('onUploadFail')
      this.autoText = '上传失败'
      this.resetData()
      this.loading = true
    }, onRemove() {
      console.log('onRemove')
      this.loading = true
      this.imagePath = ''
      this.resetData()
    },
    resetData() {
      this.result.suggestionResult = {}
      this.result.imageResult = {}
      this.result.imageUrl = ''
      this.result.suggestion = '-'
    },
    queryAction() {
      if (this.loading) {
        return
      }
      this.resetData()
      this.loading = true
      this.autoText = '生成请求中。。。'
      const param = {
        imagePath: this.imagePath,
        prompt: this.prompt,
        date: this.date
      }
      generateWearWisdom(param).then(response => {
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

      // this.getList(1)
    },
    checkAndDownloadFile: function(requestId, manual = true) {
      // 根据 requestId 获取结果
      // console.log('checkAndDownloadFile')
      const tKey = 'loading'

      getWearWisdom(requestId).then(response => {
        const timerElement = this.timer[tKey]
        const data = response.data
        // 请求成功
        if (data.suggestionResult !== undefined) {
          this.result.suggestion = data.suggestion
          this.result.suggestionResult = JSON.parse(data.suggestionResult)
        }

        if (data.imageResult !== undefined) {
          this.result.imageUrl = data.imageUrl
          this.result.imageResult = JSON.parse(data.imageResult)
        }

        if (data.status !== 0) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          if (data.status === 2) {
            this.autoText = '点击再次生成'
          }
          if (data.status === 3) {
            this.autoText = '生成失败'
          }
          if (data.status === 5) {
            this.autoText = '图片中没有人'
          }
          this.loading = false
          return
        }
        if (timerElement) {
          // console.log('当前fileId有定时器')
          this.timerCount[tKey] = ++this.timerCount[tKey]
          const timerCountElement = this.timerCount[tKey]
          // console.log(`取消 (已请求${timerCountElement}次)`)
          this.autoText = '等待获取结果。。。已等待约' + timerCountElement + 's'
          // row.autoText = `取消 (已请求${timerCountElement}次)`
          const count = 600
          if (timerCountElement > count) {
            // 最多60次
            clearInterval(timerElement)
            this.autoText = '已超过' + count + 's，点击重新生成'
            this.loading = false
            // row.auto = !row.auto
          }
        }
      }).finally()
    },
    resetAction() {
      this.queryDeviceId = ''
      this.queryUserId = ''
      this.queryEventId = ''
      this.valueTime = ''
      this.imageType = false
      this.labelSensitive = false
      this.onlyAmericaDevice = false
      this.labelLikeType = ''

      this.getList(1)
    }
  }
}
</script>

<style scoped>
.custom-dropdown-item {
  font-size: 12px; /* 设置字体大小为12 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出部分以省略号表示 */
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 100%;
}

.dropdown-content {
  max-height: 200px; /* 固定下拉框高度，根据需要调整 */
  overflow-y: auto; /* 内容超过高度时可滚动 */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.add-icon-button {
  background-color: transparent;
  border: none;
  padding: 0;
  width: auto;
  height: auto;
  text-align: left; /* 将文本左对齐 */
}

.queryItem {
  margin-top: 1%;
  margin-left: 1%;
  width: 22%
}

.imageCard {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 15%;
}

.content {
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}

.label-box {
  background-color: white;
  color: black;
  font-size: 14px;
  padding: 5px;
  margin: 5px;
  border: 2px solid black;
  border-radius: 5px;
}
</style>
