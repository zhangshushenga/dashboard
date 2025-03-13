<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">文搜图历史</div>
    <div style="display: flex; flex-direction: row; margin-bottom: 20px;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="queryDeviceId" class="queryItem" placeholder="请输入deviceId / 设备id进行搜索" />
        <el-input v-model="queryUserId" class="queryItem" placeholder="请输入userId / 用户id进行搜索" />
        <el-date-picker
          v-model="valueTime"
          :picker-options="pickerOptions"
          align="right"
          class="queryItem"
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-checkbox v-model="onlyAmericaDevice" class="queryItem">只显示美区设备</el-checkbox>

      </div>
      <div style="display: flex; flex-direction: row; flex: 1">
        <el-button class="button-style4" @click="queryAction">查询</el-button>
        <el-button class="button-style1" @click="resetAction">重置</el-button>
      </div>
    </div>
    <el-table :data="currentData" border style="margin: 10px;">
      <el-table-column label="id" prop="id" />
      <el-table-column label="deviceId" prop="deviceId" />
      <el-table-column label="userId" prop="userId" />
      <el-table-column label="搜索内容" prop="searchContent" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="搜索类型" prop="omTypeText" />
      <el-table-column label="图片数" prop="searchResultSize" />
      <!--      <el-table-column label="图片数">-->
      <!--        <template slot-scope="scope">-->
      <!--          <div>{{ getImageCount(scope.row.searchImageInfoList) }}</div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="评价总数" prop="evaluationTotal" />
      <el-table-column label="评价匹配数" prop="matchTotal" />
      <el-table-column label="评价正确率" prop="matchPercent" />
      <el-table-column fixed="right" label="查看文搜图">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleClick(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="currentData.length != 0"
      :current-page.sync="currentPage"
      :page-size="20"
      :total="totalData"
      background
      layout="total,prev,pager,next"
      style="margin: 20px"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getTextSearchGroup } from '../../api/event-image'

export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      currentData: [],

      queryDeviceId: '',
      queryUserId: '',
      onlyAmericaDevice: false,
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
        onlyAmericaDevice: this.onlyAmericaDevice,
        createTimeStart: this.valueTime[0] === undefined ? '' : this.valueTime[0],
        createTimeEnd: this.valueTime[1] === undefined ? '' : this.valueTime[1]
      }

      console.log(param)

      getTextSearchGroup(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          this.dataSource[currentPage.toString()] = response.data.records
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
      this.queryEventId = ''
      this.valueTime = ''

      this.getList(1)
    },
    handleClick(index, row) {
      console.log(index)
      console.log(row)

      // const data = this.groupAndFilterImages(row.searchImageInfoList)

      // this.$store.dispatch('pictureRecognition/setTextSearchImages', data)

      const routeUrl = this.$router.resolve({
        path: '/search-image-history',
        query: { searchKey: row.id, deviceId: row.deviceId, userId: row.userId, content: row.searchContent }
      })
      window.open(routeUrl.href, '_blank')

      // this.$router.push({ path: '/text_search_image', query: { searchContent: row.searchContent } });
    },
    /**
     * 获取有效的图片数量
     */
    getImageCount(imageList, groupSize = 20) {
      const imageArr = this.groupAndFilterImages(imageList, groupSize)

      return (imageArr.length - 1) * 20 + imageArr[imageArr.length - 1].length
    },
    groupAndFilterImages(imageList, groupSize = 20) {
      const groupedImages = []
      let currentGroup = []

      for (const imageInfo of imageList) {
        if (this.filterObject(imageInfo)) {
          currentGroup.push(imageInfo)

          if (currentGroup.length === groupSize) {
            groupedImages.push(currentGroup)
            currentGroup = []
          }
        }
      }

      if (currentGroup.length > 0) {
        groupedImages.push(currentGroup)
      }

      return groupedImages
    },
    filterObject(obj) {
      if ((obj.imageS3Key !== undefined && obj.imageS3Key !== '') ||
          (obj.imageS3Url !== undefined && obj.imageS3Url !== '')) {
        return true // Include the object in the result
      }

      return false // Exclude the object from the result
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
</style>
