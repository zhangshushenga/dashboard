<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">手动万物识别图片</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="queryDeviceId" class="queryItem" placeholder="请输入deviceId / 设备id进行搜索" />
        <el-input v-model="queryUserId" class="queryItem" placeholder="请输入userId / 用户id进行搜索" />
        <el-date-picker v-model="valueTime" :picker-options="pickerOptions" align="right" class="queryItem"
          end-placeholder="结束日期" range-separator="至" start-placeholder="开始日期" type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss" />
      </div>
      <div style="display: flex; flex-direction: row; flex: 1">
        <el-button class="button-style4" @click="queryAction">查询</el-button>
        <el-button class="button-style1" @click="resetAction">重置</el-button>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap; margin-top: 10px;">
      <div v-for="(data, index) in currentData" :key="data.id" class="imageCard">
        <DrawRectAndLabelImage :id="data.id" :click-label="gotoLabelImages"
          :image-label-info-list="data.dynamicRoiList" :image-url="data.imageS3Key" />
        <div class="content">id: {{ data.id }}</div>
        <div class="content">deviceId: {{ data.deviceId }}</div>
        <div class="content">userId: {{ data.userId }}</div>
        <div class="content">创建时间: {{ data.createTime }}</div>
        <div v-if="data.imageLabelInfoList.length != 0" style="display: flex; flex-direction: row; flex-wrap: wrap; margin-top: 10px;">
          <div class="content">识别物体: </div>
          <div v-for="(imageLabelInfo, imageLabelIndex) in data.imageLabelInfoList"
          :ref="'imageLabel' + index + imageLabelIndex" :key="imageLabelIndex" class="label-box"
          @mouseenter="imageLabelMouseEnter(index, imageLabelIndex, imageLabelInfo)"
          @mouseleave="imageLabelMouseLeave(index, imageLabelIndex, imageLabelInfo)"
          @click="imageLabelClick(index, imageLabelIndex, imageLabelInfo)">
          {{ getLabel(imageLabelInfo) }}
        </div>
        </div>
      </div>
    </div>
    <el-pagination v-show="currentData.length != 0" :current-page.sync="currentPage" :page-size="20" :total="totalData"
      background layout="total,prev,pager,next" style="margin: 20px" @current-change="handleCurrentChange" />
  </div>
</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getImageAllTag } from '../../api/event-image'
import DrawRectAndLabelImage from '../../components/DrawRectImage/DrawRectAndLabelImage.vue'
import { concatenateArrayElements } from '../../utils/util-array'

export default {
  components: {
    DrawRectAndLabelImage
  },
  data() {
    return {
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: [],

      queryDeviceId: '',
      queryUserId: '',
      valueTime: ''
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    getList(currentPage) {
      startLoading()
      const param = {
        current: currentPage,
        deviceId: this.queryDeviceId,
        userId: this.queryUserId,
        createTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        createTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1]
      }

      getImageAllTag(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          this.dataSource[currentPage.toString()] = response.data.records.map(item => {
            return {
              id: item.id,
              deviceId: item.deviceId,
              userId: item.userId,
              imageS3Key: item.imageS3Key,
              createTime: item.createTime,
              imageLabelInfoList: this.getImageLabelInfoLabels(item.imageLabelInfoList),
              dynamicRoiList: null
            }
          })
          this.currentPage = response.data.current
          this.currentData = this.dataSource[this.currentPage]
        }
      }).catch(error => {
        endLoading()
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 当前数据已经请求过
      if (this.dataSource.hasOwnProperty(val.toString())) {
        this.currentPage = val
        this.currentData = this.dataSource[this.currentPage]
      } else {
        this.getList(val)
      }
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
      this.valueTime = ''

      this.getList(1)
    },
    gotoLabelImages(id, label) {
      const routeUrl = this.$router.resolve({
        path: '/image_tag_detail',
        query: { id: id, label: label }
      })
      window.open(routeUrl.href, '_blank')

      // this.$router.push({ path: '/image_tag_detail', query: { id: id, label: label} });
    },
    getImageLabelInfoLabels(imageLabelInfoList) {

      if(imageLabelInfoList === undefined){
        return []
      }

      const result = {};

      // 遍历输入数组
      imageLabelInfoList.forEach(item => {
        const label = concatenateArrayElements(item.label)

        // 如果result中不存在该label的数组，创建一个空数组
        if (!result[label]) {
          result[label] = [];
        }

        // 将当前对象添加到相应label的数组中
        result[label].push(item);
      });

      // 将结果转换为最终数组形式
      const finalResult = Object.keys(result).map(key => ({
        [key]: result[key]
      }));

      return finalResult
    },
    getLabel(imageLabelInfo){
      return Object.keys(imageLabelInfo)[0]
    },
    imageLabelMouseEnter(index, imageLabelIndex, imageLabelInfo) {
      if (imageLabelInfo != undefined) {
        this.$refs['imageLabel' + index + imageLabelIndex][0].style.cursor = "pointer"; // 改变鼠标样式
      
        this.currentData[index]['dynamicRoiList'] = Object.values(imageLabelInfo)[0]
      }
    },
    imageLabelMouseLeave(index, imageLabelIndex, imageLabelInfo) {
      this.$refs['imageLabel' + index + imageLabelIndex][0].style.cursor = "default"; // 改变鼠标样式
      this.currentData[index]['dynamicRoiList'] = null
    },
    imageLabelClick(index, imageLabelIndex, imageLabelInfo) {
      const id = this.currentData[index].id
      const label = Object.keys(imageLabelInfo)[0]
      this.gotoLabelImages(id, label)
    }
  }
}
</script>

<style scoped>
.queryItem {
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
