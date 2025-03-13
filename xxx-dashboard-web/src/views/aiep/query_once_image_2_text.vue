<template>
    <div style="width: 100%; min-height: 100dvh;">
      <div style="font-size: 26px; font-weight: 600; margin: 20px">图>>>>文</div>
      <div style="display: flex; flex-direction: row;">
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
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
            style="margin-bottom: 20px;"
          >
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>

          <el-input
            v-model="prompt"
            placeholder="prompt"
            type="textarea"
            :rows="10"
            style="margin-left: 20px; margin-right: 20px; font-size: 20px;"
          />

          <el-select class="label" v-model="optionModel" @change="modelSelectChange" style="margin-left: 20px; margin-right: 20px; margin-top: 20px; font-size: 20px;">
            <el-option
              v-for="item in optionsModels"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            ></el-option>
          </el-select>
  
          <el-button
            :disabled="loading"
            class="queryItem"
            style="height: 40px; min-width: 22%; max-width: 50%; width: auto"
            type="primary"
            @click="queryAction"
            v-html="autoText"
          />

        </div>

      </div>
      <div style="margin: 30px">

        <pre class="json-display">{{ resultText }}</pre>
  
      </div>
    </div>
  </template>
  
  <script>
  
  import JsonEditor from '@/components/JsonEditor'
  import { queryOnce } from '@/api/api-aiep'
//   import { generatePetMoment, getPetMoment, getPetMomentImage } from '@/api/agents'
  
  export default {
    components: { JsonEditor },
    data() {
      return {
        uploadBaseUrl: '',
        downloadBaseUrl: '',
        form: {
          name: '',
          type: 1,
          env: 'test'
        },
        result: {
          label: '-',
          description: '-',
          duration: 0,
          evaluation: 0,
          baby: false,
          result: {}
        },
        optionModel: 'llava-1.5',
        optionsModels: [
          {value: 'llava-1.5', label: 'llava-1.5'},
          {value: 'llava-1.6', label: 'llava-1.6'},
          {value: 'claude3-haiku', label: 'claude3-haiku'},
          {value: 'claude3-sonnet', label: 'claude3-sonnet'},
          {value: 'claude3-opus', label: 'claude3-opus'},
          {value: 'gpt4', label: 'gpt4'},
          {value: 'gpt4o', label: 'gpt4o'},
          {value: 'bird-cls', label: 'bird-cls'},
        ],

        resultText : '',

        timer: [],
        timerFileIdList: [],
        timerCount: [],
  
        isAddDataSetLoading: false,
        showDropdowns: [], // 控制每个下拉框的显示状态
        dropdownOptions: [],
        loading: true,
        currentPage: 1,
        totalData: 0,
  
        autoText: '生成',
        prompt: '',
        imagePath: '',
        queryUserId: '',
        queryEventId: '',
        imageType: false,
        onlyAmericaDevice: false,
        labelSensitive: false,
        labelLikeType: '',
        valueTime: ''
  
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      resetData() {
        this.result.result = {}
        this.result.description = ''
        this.result.duration = 0
        this.result.evaluation = 0
        this.resultText = ''
      },
      handleAvatarSuccess(res, file) {
        this.uploadImageUrl = URL.createObjectURL(file.raw)
        this.oneclassform.pic = res.data
      },
      // 自定义上传行为
      async uploadToS3(request) {
        console.log(request)
        this.autoText = '上传图片中。。。'
        try {
          // 调用getBaByFaceImage获取新的S3地址
          const params = {"upload_image": "123"}
          const data = {
            "param": JSON.stringify(params)
          }
          const response = await queryOnce(data)
          console.log('获取上传地址', response)
  
          if (response.code === 0) {
            // 更新action属性（S3地址）和图片路径
            this.uploadBaseUrl = JSON.parse(response.data.data).url_upload
            this.downloadBaseUrl = JSON.parse(response.data.data).url_download
  
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

        console.log(this.uploadBaseUrl)
        console.log(this.downloadBaseUrl)
  
        const { file } = request
        console.log(file)
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
        this.result.result = {}
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
        this.result.result = {}
        this.loading = true
        this.resetData()
      }, onRemove() {
        console.log('onRemove')
        this.loading = true
        this.imagePath = ''
  
        this.resetData()
      },
      queryAction() {
        if (this.loading) {
          return
        }
        this.resetData()
        this.loading = true
        this.autoText = '生成中。。。'
        const params = {
          image_url: this.downloadBaseUrl,
          prompt: this.prompt,
          model: this.optionModel
        }
        console.log(params)
        const data = {
            "param": JSON.stringify(params)
        }
        queryOnce(data).then(response => {
          console.log(response)
          if (response.code === 0) {
            this.resultText = JSON.parse(response.data.data).result
            
            this.autoText = '生成'
            this.loading = false
          }
        }).catch(error => {
          console.log(error)
          this.autoText = '生成'
          this.loading = false
        })
  
      },
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

  .json-display {
  white-space: pre-wrap; /* 允许换行 */
  word-wrap: break-word; /* 在需要时断开单词 */
  background-color: #f4f4f4; /* 添加背景颜色 */
  font-size: 20px;
  }

</style>
  