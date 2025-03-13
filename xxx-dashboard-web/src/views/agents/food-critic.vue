<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">毒舌食评</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input
          v-model="prompt"
          autosize
          placeholder="如果此处没有值，则使用默认prompt"
          type="textarea"
        />

        <el-select
          v-model="modelType"
          class="queryItem"
          placeholder="请选择"
          style="width: auto"
        >
          <el-option
            v-for="item in modelTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-upload
          ref="upload"
          :action="uploadBaseUrl"
          :auto-upload="true"
          :before-upload="beforeAvatarUpload"
          :data="form"
          :headers="myHeaders"
          :limit="1"
          :on-change="onChange"
          :on-error="onUploadFail"
          :on-remove="onRemove"
          :on-success="onUploadOk"
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

      <el-descriptions :column="1" title="评价信息">
        <el-descriptions-item label="标题"> {{ this.result.title }}</el-descriptions-item>
        <el-descriptions-item label="评分">

          <span style="color: #ff9900">{{ this.result.rateScore }}</span>
          {{ this.result.rateReason }}
        </el-descriptions-item>
        <el-descriptions-item label="评价">{{ this.result.evaluation }}</el-descriptions-item>
        <el-descriptions-item v-if="this.result.textSensitive === 1" label="敏感词"><span style="color:red">触发敏感词</span>
        </el-descriptions-item>
      </el-descriptions>

    </div>
  </div>
</template>

<script>

import { generateFoodCritic, getFoodCritic } from '@/api/agents'

import { getToken } from '@/utils/auth'

const baseUrl = process.env.VUE_APP_BASE_API

export default {
  components: {},
  data() {
    return {
      uploadBaseUrl: baseUrl + '/api/agents/food_critic/image',
      form: {
        name: '',
        type: 1,
        env: 'test'
      },
      result: {
        title: '-',
        rateScore: '-',
        rateReason: '-',
        evaluation: '-',
        textSensitive: '-'
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

      autoText: '生成',
      queryDeviceId: 'E4AAEC828CC5',
      modelType: 1,
      prompt: '',
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
      getFoodCritic(4).then(response => {
        this.result = response.data
      }).finally()
    },
    handleAvatarSuccess(res, file) {
      this.uploadImageUrl = URL.createObjectURL(file.raw)
      this.oneclassform.pic = res.data
      // console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 < 5000
      if (!isJPG && !isLt2M) {
        this.$message.error('上传图片只能是jpg ,png ,jpeg格式且不能超过5M!')
      } else {
        if (!isJPG) {
          this.$message.error('上传图片只能是jpg ,png ,jpeg格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过5M!')
        }
      }
      return isJPG && isLt2M
    },
    onChange(file) {
      // console.log(file)
      console.log('onChange')
    }, onUploadOk(response, file, fileList) {
      console.log('onUploadOk')
      this.imagePath = response.data
      this.loading = false
      // this.getDataList()
    }, onUploadFail() {
      console.log('onUploadFail')
    }, onRemove() {
      console.log('onRemove')
      this.loading = true
      this.imagePath = ''
    },
    queryAction() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.autoText = '生成请求中。。。'
      const param = {
        modelType: this.modelType,
        imagePath: this.imagePath,
        prompt: this.prompt
      }
      generateFoodCritic(param).then(response => {
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
        this.loading = true
      })

      // this.getList(1)
    },
    checkAndDownloadFile: function(requestId, manual = true) {
      // 根据 requestId 获取结果
      // console.log('checkAndDownloadFile')
      const tKey = 'loading'

      getFoodCritic(requestId).then(response => {
        const timerElement = this.timer[tKey]
        const data = response.data
        if (data.status === 3 || data.status === 4) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          this.autoText = '生成失败，点击重新生成'
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
          if (timerCountElement > 300) {
            // 最多200次
            clearInterval(timerElement)
            this.autoText = '已超过300s，点击重新生成'
            this.loading = false
            // row.auto = !row.auto
          }
        }

        if (data.status === 2) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          this.loading = false
          // 请求成功
          this.autoText = '点击再次生成'
          this.result = data
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
