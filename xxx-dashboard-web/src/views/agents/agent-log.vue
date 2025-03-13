<template>
  <div
    v-loading="listLoading"
    v-infinite-scroll="loadMore"
    style="width: 100%;overflow: auto;height: 100vh"
    infinite-scroll-disabled="listLoading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate="true"
  >
    <div style="font-size: 26px; font-weight: 600; margin: 20px">Agent使用记录</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="queryDeviceId" class="queryItem" placeholder="请输入deviceId" />
        <el-input v-model="queryEventId" class="queryItem" placeholder="请输入eventId" />
        <el-input v-model="queryImageId" class="queryItem" placeholder="请输入imageId" />
        <el-select
          v-model="agentTypeList"
          filterable
          class="queryItem"
          clearable
          multiple
          placeholder="选择模型类型"
          @change="handleChange"
        >
          <el-option
            v-for="item in agentList"
            :key="item.agentType"
            :label="item.name"
            :value="item.agentType"
          />
        </el-select>
        <el-select v-model="brandTypeList" class="queryItem" clearable multiple placeholder="选择品牌类型">
          <el-option v-for="item in allBrandTypeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker
          v-model="valueTime"
          :picker-options="pickerOptions"
          align="right"
          class="queryItem"
          end-placeholder="请求结束日期"
          range-separator="至"
          start-placeholder="请求开始日期"
          style="width: 45%"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-select v-model="labelLikeType" class="queryItem" clearable placeholder="选择评价类型">
          <el-option v-for="item in labelLikeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-if="agentTypeList.length > 0" v-model="dealStatus" class="queryItem" clearable placeholder="选择处理结果">
          <el-option v-for="item in dealStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
      </div>
    </div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-checkbox v-model="textSensitive" class="queryItem">触发敏感词</el-checkbox>
        <el-checkbox v-model="showAiAlert" class="queryItem">在结果中展示智能告警(如果有)</el-checkbox>
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; margin-right: 10px;">
        <el-button class="button-style4" style="height: 40px;" @click="queryAction">查询</el-button>
        <el-button class="button-style1" style="height: 40px;" @click="resetAction">重置</el-button>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
      <div v-for="(data, index) in currentData" :key="data.id" class="imageCard">
        <DrawRectImage
          v-if="data.imageS3Key !== ''"
          :bigger-roi="data.biggerRoi"
          :dynamic-roi-list="data.dynamicRoiList"
          :image-url="data.imageS3Key"
          :roi="data.roi"
          :roi-list="data.roiList"
          :roi-type-list="data.roiTypeList"
        />
        <div class="content">id: {{ data.id }}</div>
        <div v-if="data.imageId > 0" class="content">imageId: {{ data.imageId }}</div>
        <div v-if="data.alarmId !== ''" class="content">alarmId: {{ data.alarmId }}</div>
        <div v-if="data.eventId !== ''" class="content">eventId: {{ data.eventId }}</div>
        <div class="content">deviceId: {{ data.deviceId }}</div>
        <div class="content">{{ getAgentText(data.agentType) }}</div>
        <div class="content">{{ data.param && JSON.parse(data.param).difyVersion === undefined ? 'Version: ' + JSON.parse(data.param).version :'' }}</div>
        <div class="content"> {{ data.param && JSON.parse(data.param).difyVersion !== undefined ? 'Dify Version: ' + JSON.parse(data.param).difyVersion :'' }}</div>
        <div class=" content">处理状态:             {{ data.status | statusFilter }}
        </div>
        <div v-if="data.imageId > 0" class=" content">事件发生时间:<br> {{ data.eventTime }}</div>
        <div class=" content">收到请求时间:<br> {{ data.createTime }}</div>
        <div class=" content">生成结果时间:<br> {{ data.generateTime }}</div>
        <div v-if="data.imageId > 0" class="content">图片类型: {{ getImageType(data.imageType) }}</div>
        <div v-if="showAiAlert && data.imageId > 0 && data.taskList" class="content">已设置的任务: {{ data.taskList.join(",") }}</div>
        <div
          v-if="showAiAlert && data.imageId > 0 &&data.okTaskInfoList"
          class="content"
          style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: center;"
        >
          <div>已识别的任务:</div>
          <div>
            <div
              v-for="(okTaskInfo, okTaskIndex) in data.okTaskInfoList"
              :key="okTaskIndex"
              :ref="'okTaskArea' + index + okTaskIndex"
              class="label-box"
              @mouseenter="okTaskMouseEnter(index, okTaskIndex, okTaskInfo)"
              @mouseleave="okTaskMouseLeave(index, okTaskIndex, okTaskInfo)"
            >
              {{ okTaskInfo.task }}
            </div>
          </div>
        </div>
        <div class="content">
          <el-button @click="showJson(data.param ? JSON.parse(data.param) :'' )">查看参数</el-button>
        </div>
        <div v-if="data.status !== 0" class="content">
          <el-button @click="showJson(data.result ? JSON.parse(data.result) :'' )">查看结果</el-button>
        </div>
        <div v-if="data.resultLike !== 0" class="content">评价: {{ getLabelLikeText(data.resultLike) }}</div>
        <div v-if="data.resultDislikeFeedback !== undefined && data.resultDislikeFeedback !== ''" class="content">差评理由:
          {{ data.resultDislikeFeedback }}
        </div>
      </div>
    </div>
    <p v-if="listLoading">加载中...</p>
    <p v-if="!hasMoreData">没有更多了</p>
    <el-dialog
      title="data"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <pre style="white-space: pre-wrap;"><code>{{ jsonData }}</code></pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>

import {
  getAgentLogList, getAgentSelectList
} from '@/api/agent-config'

import { endLoading, startLoading } from '@/utils/loading'
import { addImageToDataSet, getImageDataSet } from '../../api/api-aiep'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'

const statusOptions = [
  { key: 0, display_name: '生成中' },
  { key: 2, display_name: '成功' },
  { key: 3, display_name: '返回失败' },
  { key: 5, display_name: '识别失败' },
  { key: 6, display_name: '生成结果满足条件，但是业务不使用' },
  { key: 7, display_name: 'AI入参预检未通过' } // New status added
]

// arr to obj, such as { CN : "China", US : "USA" }
const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: {
    DrawRectImage
  },
  filters: {
    statusFilter(type) {
      return statusKeyValue[type]
    }
  },
  data() {
    return {
      minId: 0,
      listLoading: false,
      hasMoreData: true,
      allBrandTypeList: [
        {
          label: 'Psync',
          value: '1'
        }, {
          label: 'Atom',
          value: '2'
        }
      ],
      agentList: [],
      jsonData: '',
      dialogVisible: false,
      isAddDataSetLoading: false,
      showDropdowns: [], // 控制每个下拉框的显示状态
      dropdownOptions: [],
      // 是否已经加载完所有数据
      finished: false,
      loading: [],
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: [],

      queryDeviceId: '',
      queryUserId: '',
      queryEventId: '',
      queryImageId: '',
      imageType: false,
      onlyAmericaDevice: false,
      textSensitive: false,
      showAiAlert: false,
      labelLikeType: '',
      dealStatus: '',
      aiTypeList: [],
      agentTypeList: [],
      brandTypeList: [],
      valueTime: '',

      labelLikeOptions: [{
        label: '好评',
        value: '好评'
      }, {
        label: '差评',
        value: '差评'
      }],
      dealStatusOptions: [],
      allAiTypeList: [
        {
          label: '联汇',
          value: '1'
        }, {
          label: 'llava',
          value: '2'
        }, {
          label: 'sam',
          value: '3'
        }, {
          label: 'gpt4 version',
          value: '4'
        }, {
          label: 'gemini',
          value: '5'
        }, {
          label: 'gpt猫狗印记',
          value: '6'
        }, {
          label: 'gemini猫狗印记',
          value: '7'
        }
      ]
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    // this.getList(1)
    this.getSelectList()
    this.dealStatusOptions = statusOptions
  },
  methods: {
    showJson(text) {
      this.jsonData = text
      this.dialogVisible = true
    },
    getSelectList(currentPage) {
      getAgentSelectList().then(response => {
        this.agentList = response.data
      }).finally()
    },
    toggleDropdown(clickedIndex) {
      // 切换特定索引的下拉框显示状态
      this.$set(this.showDropdowns, clickedIndex, !this.showDropdowns[clickedIndex])
      this.showDropdowns.forEach((_, index) => {
        // 如果是当前点击的下拉框，则切换其显示状态
        if (index != clickedIndex) {
          // 如果不是当前点击的下拉框，则确保它是关闭的
          this.$set(this.showDropdowns, index, false)
        }
      })
      this.$set(this.loading, clickedIndex, true)
      // 请求测试集列表
      this.dropdownOptions = []
      const param = { 'type': 1 }
      getImageDataSet(param).then(response => {
        this.$set(this.loading, clickedIndex, false)
        console.log(response)
        if (response.code === 0) {
          this.dropdownOptions = []
          for (const r of response.data.records) {
            this.dropdownOptions.push(r)
          }
        }
        if (this.dropdownOptions.length === 0) {
          this.$set(this.showDropdowns, clickedIndex, false)
        }
      }).catch(error => {
        this.$set(this.showDropdowns, clickedIndex, !this.showDropdowns[clickedIndex])
        this.$set(this.loading, clickedIndex, false)
        console.log(error)
      })
    },
    getImageType(imageType) {
      let imageTypeText
      switch (imageType) {
        case 1:
          imageTypeText = '报警首图'
          break
        case 2:
          imageTypeText = '后续图'
          break
      }
      return imageTypeText
    },
    selectOption(option, index, s3Key) {
      // 处理选项选择逻辑
      console.log('Selected Option:', option)
      this.showDropdowns[index] = false // 隐藏下拉框
      // this.$set(this.loading, index, true);
      this.isAddDataSetLoading = true
      // 添加图片到测试集
      const param = { 's3Key': s3Key }
      addImageToDataSet(option.id, param).then(response => {
        // this.$set(this.loading, index, false);
        console.log(response)
        if (response.code === 0) {
          this.isAddDataSetLoading = false
          this.$message({
            message: 'add image successfully',
            type: 'success',
            duration: 1000
          })
        }
      }).catch(error => {
        this.$set(this.showDropdowns, index, !this.showDropdowns[index])
        this.$set(this.loading, index, false)
        console.log(error)
      })
    },

    getList(currentPage) {
      console.log('getList')
      const param = {
        current: currentPage,
        deviceId: this.queryDeviceId,
        agentTypeList: this.agentTypeList,
        brandTypeList: this.brandTypeList,
        eventId: this.queryEventId,
        imageId: this.queryImageId,
        textSensitive: this.textSensitive ? 1 : '',
        createTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        createTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1],
        status: this.dealStatus
      }

      if (this.labelLikeType !== '') {
        param.resultLike = this.labelLikeType === '好评' ? 1 : 2
      }
      console.log(param)
      this.listLoading = true
      getAgentLogList(param).then(response => {
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          if (response.data.records.length > 0) {
            this.hasMoreData = true
          }
          this.currentData = response.data.records.map((obj) => {
            return {
              ...obj,
              'dynamicRoiList': null,
              'llamaDescription': ''
            }
          })
          // 更新最小ID
          if (this.currentData.length > 0) {
            this.minId = Math.min(...this.currentData.map(item => item.id))
          } else {
            this.minId = 0
          }
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.listLoading = false
      })
    },
    loadMore() {
      console.log('loadMore trigger')
      if (!this.hasMoreData) {
        console.log('no data')
        return
      } // 如果没有更多数据，则不执行任何操作
      if (this.listLoading) {
        console.log('listLoading')
        return
      }
      if (this.minId === 0) {
        return
      }
      this.listLoading = true
      const param = {
        idLt: this.minId,
        deviceId: this.queryDeviceId,
        agentTypeList: this.agentTypeList,
        brandTypeList: this.brandTypeList,
        eventId: this.queryEventId,
        imageId: this.queryImageId,
        textSensitive: this.textSensitive ? 1 : '',
        createTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        createTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1],
        status: this.dealStatus
      }

      if (this.labelLikeType !== '') {
        param.resultLike = this.labelLikeType === '好评' ? 1 : 2
      }
      console.log(param)
      this.listLoading = true
      getAgentLogList(param).then(response => {
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          if (response.data.records.length === 0) {
            this.hasMoreData = false
          }
          const newRecords = response.data.records.map(obj => ({
            ...obj,
            'dynamicRoiList': null,
            'llamaDescription': ''
          }))
          // 更新最小ID
          if (newRecords.length > 0) {
            const cMinId = Math.min(...newRecords.map(item => item.id))
            if (cMinId === this.minId) {
              this.hasMoreData = false
            } else {
              this.minId = cMinId
            }
          } else {
            this.minId = 0
          }
          // 使用数组的 concat 方法或者可以使用扩展运算符来追加数据
          this.currentData = [...this.currentData, ...newRecords]
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.listLoading = false
      })
    },
    queryAction() {
      this.dataSource = {}
      this.currentData = []
      this.getList(1)
    },
    resetAction() {
      this.dataSource = {}
      this.currentData = []
      this.queryDeviceId = ''
      this.queryUserId = ''
      this.queryEventId = ''
      this.valueTime = ''
      this.imageType = false
      this.textSensitive = false
      this.onlyAmericaDevice = false
      this.labelLikeType = ''
      this.dealStatus = ''
      this.aiTypeList = []
      this.brandTypeList = []
      this.agentTypeList = []

      this.getList(1)
    },
    getAgentText(agentType) {
      return this.agentList.reduce((acc, cur) => {
        acc[cur.agentType] = cur.name
        return acc
      }, {})[agentType]
    },
    okTaskMouseEnter(index, okTaskIndex, okTaskInfo) {
      if (okTaskInfo.roiList != undefined) {
        this.$refs['okTaskArea' + index + okTaskIndex][0].style.cursor = 'crosshair' // 改变鼠标样式
        this.currentData[index]['dynamicRoiList'] = okTaskInfo.roiList
      }
    },
    okTaskMouseLeave(index, okTaskIndex, okTaskInfo) {
      this.$refs['okTaskArea' + index + okTaskIndex][0].style.cursor = 'default' // 改变鼠标样式
      this.currentData[index]['dynamicRoiList'] = null
    },
    shortLabelMouseEnter(index, shortLabelIndex, shortLabelInfo) {
      if (shortLabelInfo.roi != undefined) {
        this.$refs['shortLabel' + index + shortLabelIndex][0].style.cursor = 'crosshair' // 改变鼠标样式

        const roiList = [
          {
            roi: JSON.parse(shortLabelInfo.roi),
            conf: '0'
          }
        ]
        this.currentData[index]['dynamicRoiList'] = roiList
      }
    },
    shortLabelMouseLeave(index, shortLabelIndex, shortLabelInfo) {
      this.$refs['shortLabel' + index + shortLabelIndex][0].style.cursor = 'default' // 改变鼠标样式
      this.currentData[index]['dynamicRoiList'] = null
    },
    getLabelLikeText(resultLike) {
      let labelLikeText
      switch (resultLike) {
        case 0:
          labelLikeText = '未评价'
          break
        case 1:
          labelLikeText = '好评'
          break
        case 2:
          labelLikeText = '差评'
          break
        default:
          labelLikeText = '未知'
      }
      return labelLikeText
    },
    handleChange() {
      this.dealStatus = ''
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

.imageCard {
  margin: 20px;
  width: 20%;
}

.content {
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
  word-wrap: break-word;
}

</style>
