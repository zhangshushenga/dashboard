<template>
  <div
    v-loading="listLoading"
    v-infinite-scroll="loadMore"
    style="width: 100%;overflow: auto;height: 100vh"
    infinite-scroll-disabled="listLoading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate="true"
  >
    <div style="font-size: 26px; font-weight: 600; margin: 20px">设备报警图片</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="queryDeviceId" class="queryItem" placeholder="请输入deviceId / 设备id进行搜索" />
        <el-input v-model="queryUserId" class="queryItem" placeholder="请输入userId / 用户id进行搜索" />
        <el-input v-model="queryEventId" class="queryItem" placeholder="请输入eventId / 事件id进行搜索" />
        <el-select v-model="aiTypeList" class="queryItem" clearable multiple placeholder="选择模型类型">
          <el-option v-for="item in allAiTypeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="brandTypeList" class="queryItem" clearable multiple placeholder="选择品牌类型">
          <el-option v-for="item in allBrandTypeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="testDeviceTypeList" class="queryItem" clearable multiple placeholder="过滤设备类型">
          <el-option v-for="item in allTestDeviceTypeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker
          v-model="valueTime"
          :picker-options="pickerOptions"
          align="right"
          class="queryItem"
          end-placeholder="事件结束日期"
          range-separator="至"
          start-placeholder="事件开始日期"
          style="width: 45%"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-select v-model="labelLikeType" class="queryItem" clearable placeholder="选择评价类型">
          <el-option v-for="item in labelLikeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-checkbox v-model="imageType" class="queryItem">只显示首图</el-checkbox>
        <el-checkbox v-model="onlyAmericaDevice" class="queryItem">只显示美区设备</el-checkbox>
        <el-checkbox v-model="labelSensitive" class="queryItem">触发敏感词</el-checkbox>
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; margin-right: 10px;">
        <el-button class="button-style4" style="height: 40px;" @click="queryAction">查询</el-button>
        <el-button class="button-style1" style="height: 40px;" @click="resetAction">重置</el-button>
      </div>
    </div>
    <div
      style="display: flex; flex-direction: row; flex-wrap: wrap; overflow: auto;"
    >
      <div v-for="(data, index) in currentData" :key="data.id" class="imageCard">
        <DrawRectImage
          :bigger-roi="data.biggerRoi"
          :dynamic-roi-list="data.dynamicRoiList"
          :image-url="data.imageS3Key"
          :roi="data.roi"
          :roi-list="data.roiList"
          :roi-type-list="data.roiTypeList"
        />
        <div class="dropdown-container">
          <el-button
            :loading="isAddDataSetLoading"
            circle
            class="add-icon-button"
            icon="el-icon-plus"
            @click="toggleDropdown(index)"
          >添加到测试集
          </el-button>
          <div v-show="showDropdowns[index]" class="dropdown-menu">
            <div class="dropdown-content">
              <el-dropdown-item
                v-for="(option, optionIndex) in dropdownOptions"
                :key="optionIndex"
                class="custom-dropdown-item"
                @click.native="selectOption(option,index,data.imageS3Key)"
              >
                {{ option.name }}
              </el-dropdown-item>
              <i v-show="loading[index]" class="el-icon-loading" />
            </div>
          </div>
        </div>

        <div class="content">id: {{ data.id }}</div>
        <div class="content">alarmId: {{ data.alarmId }}</div>
        <div class="content">eventId: {{ data.eventId }}</div>
        <div class="content">deviceId: {{ data.deviceId }}</div>
        <div class="content">userId: {{ data.userId }}</div>
        <div class="content">ai类型: {{ getAiText(data.aiType) }}</div>
        <div class="content">图片类型: {{ getImageType(data.imageType) }}</div>
        <div v-if="data.taskList" class="content">已设置的任务: {{ data.taskList.join(",") }}</div>
        <div
          v-if="data.okTaskInfoList"
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
        <div class=" content">事件发生时间: {{ data.eventTime }}</div>
        <div class=" content">收到图片时间: {{ data.createTime }}</div>

        <el-tooltip
          v-if="data.labelSensitive === 1"
          class="item"
          content="触发了敏感词检测，此文案不会推送给用户"
          effect="dark"
          placement="top-end"
        >
          <div class="content" style="color: red">
            描述: {{ data.label }}
          </div>
        </el-tooltip>

        <div v-else class="content">
          描述: {{ data.label }}
        </div>
        <div v-if="data.imageType === 1" class="content">
          图片标题: {{ data.title }}
        </div>
        <div v-if="data.labelLike !== 0" class="content">描述评价: {{ getLabelLikeText(data.labelLike) }}</div>
        <div v-if="data.labelDislikeFeedback !== undefined && data.labelDislikeFeedback !== ''" class="content">差评理由:
          {{ data.labelDislikeFeedback }}
        </div>
        <!--        <el-button-->
        <!--          v-if="data.aiType === 1"-->
        <!--          style="width: 100px;"-->
        <!--          type="text"-->
        <!--          @click="getLlamaDescription(data, index)"-->
        <!--        >获取LLama描述-->
        <!--        </el-button>-->
        <div v-if="data.llamaDescription != ''" class="content">LLama描述: {{ data.llamaDescription }}</div>
        <div
          v-if="data.shortLabelInfoList != undefined && data.shortLabelInfoList.length != 0"
          class="content"
          style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: center;"
        >
          <div>短描述:</div>
          <div
            v-for="(shortLabelInfo, shortLabelIndex) in data.shortLabelInfoList"
            :key="shortLabelIndex"
            :ref="'shortLabel' + index + shortLabelIndex"
            class="label-box"
            @mouseenter="shortLabelMouseEnter(index, shortLabelIndex, shortLabelInfo)"
            @mouseleave="shortLabelMouseLeave(index, shortLabelIndex, shortLabelInfo)"
          >{{ shortLabelInfo.label }}
          </div>

        </div>
      </div>
    </div>
    <p v-if="listLoading">加载中...</p>
    <p v-if="!hasMoreData">没有更多了</p>

  </div>
</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getEventImageList, getLlamaDescriptionResquest } from '../../api/event-image'
import { addImageToDataSet, getImageDataSet } from '../../api/api-aiep'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'

export default {
  components: {
    DrawRectImage
  },
  data() {
    return {
      minId: 0,
      listLoading: false,
      hasMoreData: true,
      isAddDataSetLoading: false,
      showDropdowns: [], // 控制每个下拉框的显示状态
      dropdownOptions: [],
      loading: [],
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: [],

      queryDeviceId: '',
      queryUserId: '',
      queryEventId: '',
      imageType: false,
      onlyAmericaDevice: false,
      labelSensitive: false,
      labelLikeType: '',
      aiTypeList: [],
      testDeviceTypeList: [],
      brandTypeList: [],
      valueTime: '',

      labelLikeOptions: [{
        label: '好评',
        value: '好评'
      }, {
        label: '差评',
        value: '差评'
      }],
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
      ],
      allBrandTypeList: [
        {
          label: 'Psync',
          value: '1'
        }, {
          label: 'Atom',
          value: '2'
        }
      ],
      allTestDeviceTypeList: [
        {
          label: '内测/beta白名单用户',
          value: '1'
        }, {
          label: '测试白名单设备',
          value: '2'
        }
      ]
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    // this.getList(1)
  },
  methods: {
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
      this.listLoading = true
      const param = {
        current: currentPage,
        deviceId: this.queryDeviceId,
        userId: this.queryUserId,
        eventId: this.queryEventId,
        onlyAmericaDevice: this.onlyAmericaDevice,
        labelSensitive: this.labelSensitive ? 1 : '',
        imageType: this.imageType ? 1 : '',
        aiTypeList: this.aiTypeList,
        testDeviceTypeList: this.testDeviceTypeList,
        brandTypeList: this.brandTypeList,
        eventTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        eventTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1]
      }

      if (this.labelLikeType !== '') {
        param.labelLike = this.labelLikeType === '好评' ? 1 : 2
      }
      console.log(param)
      getEventImageList(param).then(response => {
        this.listLoading = false
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
        this.listLoading = false
        console.log(error)
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
        userId: this.queryUserId,
        eventId: this.queryEventId,
        onlyAmericaDevice: this.onlyAmericaDevice,
        labelSensitive: this.labelSensitive ? 1 : '',
        imageType: this.imageType ? 1 : '',
        aiTypeList: this.aiTypeList,
        testDeviceTypeList: this.testDeviceTypeList,
        brandTypeList: this.brandTypeList,
        eventTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        eventTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1]
      }

      if (this.labelLikeType !== '') {
        param.labelLike = this.labelLikeType === '好评' ? 1 : 2
      }
      console.log(param)
      getEventImageList(param).then(response => {
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
      this.labelSensitive = false
      this.onlyAmericaDevice = false
      this.labelLikeType = ''
      this.aiTypeList = []
      this.brandTypeList = []
      this.testDeviceTypeList = []

      this.getList(1)
    },
    getAiText(aiType) {
      // 1.联汇 2.华来
      let aiText
      switch (aiType) {
        case 1:
          aiText = '联汇'
          break
        case 2:
          aiText = 'llava'
          break
        case 3:
          aiText = 'sam'
          break
        case 4:
          aiText = 'gpt4 version'
          break
        case 5:
          aiText = 'gemini'
          break
        case 6:
          aiText = 'gpt猫狗印记'
          break
        case 7:
          aiText = 'gemini猫狗印记'
          break
        case 8:
          aiText = '车辆识别'
          break
        case 9:
          aiText = '鸟类识别'
          break
        case 101:
          aiText = 'viewsay-长描述'
          break
        default:
          aiText = '未知'
      }
      return aiText
    },
    getImageType(imageType) {
      let imageTypeText
      switch (imageType) {
        case 1: {
          imageTypeText = '报警首图'
        }
          break
        case 2: {
          imageTypeText = '后续图'
        }
          break
      }
      return imageTypeText
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
    getLlamaDescription(data, index) {
      startLoading()
      getLlamaDescriptionResquest({
        id: data.id
      }).then((response) => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.currentData[index]['llamaDescription'] = response.data.desc
        } else {
          this.$message.error(response.message)
        }
      }).catch((error) => {
        endLoading()
        this.$message.error('error')
      })
    },
    getLabelLikeText(labelLike) {
      let labelLikeText
      switch (labelLike) {
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
  word-wrap: break-word;
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
