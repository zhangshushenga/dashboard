<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">Event反馈</div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="queryDeviceId" class="queryItem" placeholder="请输入deviceId / 设备id进行搜索" />
        <el-input v-model="queryUserEmail" class="queryItem" placeholder="请输入userEmail / 用户邮箱进行搜索" />
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
        <el-select v-model="labelLikeType" class="queryItem" clearable placeholder="选择评价类型">
          <el-option v-for="item in labelLikeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; margin-top: 20px;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-select v-model="labelId" class="queryItem" clearable placeholder="选择标签">
          <el-option
              v-for="item in labelList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
          />
        </el-select>
        <el-select v-model="agentTypeList" class="queryItem" clearable multiple placeholder="选择模型类型">
          <el-option
            v-for="item in agentList"
            :key="item.agentType"
            :label="item.name"
            :value="item.agentType"
          />
        </el-select>
        <el-select v-model="deviceModelList" class="queryItem" clearable multiple placeholder="选择设备类型">
          <el-option
            v-for="item in deviceModelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7" />
      <div style="display: flex; flex-direction: row; flex: 1; margin-right: 10px;">
        <el-button class="button-style4" style="height: 40px;" @click="queryAction">查询</el-button>
        <el-button class="button-style1" style="height: 40px;" @click="resetAction">重置</el-button>
      </div>
    </div>
    <el-table :data="currentData" border style="margin: 10px;">
      <el-table-column label="用户信息" prop="userInfo" width="150px">
        <template slot-scope="scope">
          <div>
            <p>deviceId: {{ scope.row.deviceId }}</p>
            <p>userId: {{ scope.row.userId }}</p>
            <p>Email: {{ scope.row.userEmail }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="反馈类型" prop="like" width="80px">
        <template slot-scope="scope">
          <!-- 在这里根据 type 的值动态显示内容 -->
          {{ scope.row.like === 1 ? '喜欢' : (scope.row.like === 2 ? '不喜欢' : '') }}
        </template>
      </el-table-column>
      <el-table-column label="反馈来源" prop="like" width="80px">
        <template slot-scope="scope">
          <!-- 在这里根据 type 的值动态显示内容 -->
          {{
            scope.row.type === 1 ? 'agent：' + scope.row.feedbackSource :
            (scope.row.type === 2 ? '设备：' + scope.row.feedbackSource : '')
          }}
        </template>
      </el-table-column>
      <el-table-column label="评价时间" prop="voteTime" width="150px">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.voteTime).toLocaleString() }}</span>
        </template>
      </el-table-column>>
      <el-table-column label="标签列表" prop="labelInfo" width="180px">
        <template slot-scope="scope">
          <template v-if="scope.row.labelNameList && scope.row.labelNameList.length > 0">
            <el-tag v-for="label in scope.row.labelNameList" :key="label" style="margin-top: 5px">{{ label }}</el-tag>
          </template>
          <template v-else>
            ——
          </template>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="130px">
        <template slot-scope="scope">
          {{ scope.row.content || '——' }}
        </template>
      </el-table-column>
      <el-table-column label="固件信息" prop="firmwareInfo">
        <template slot-scope="scope">
          <div>
            <p>app版本: {{ scope.row.appVersion }}</p>
            <p>固件版本: {{ scope.row.firmwareVersion }}</p>
            <p>手机型号: {{ scope.row.phoneModel }}</p>
            <p>手机系统版本: {{ scope.row.phoneOsVersion }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="图片" width="100px">
      <template slot-scope="scope">
        <template v-if="shouldDisplayImage(scope.row)">
          <div class="image-container">
          <img
            :key="scope.row.id"
            :src="scope.row.imageS3Key"
            alt="Your Image"
            style="width: 100px; height: 130px; cursor: pointer;"
            @click="handleImageClick(scope.row.imageS3Key)"
          >
          <div class="overlay" v-if="showOverlay" @click="closeOverlay"></div>
          <div class="enlarged-image" v-if="showOverlay">
            <img :src="enlargedImageUrl" alt="Enlarged Image" @click="closeOverlay">
          </div>
        </div>
          <!-- <img
            :key="scope.row.id"
            :src="scope.row.imageS3Key"
            alt="Your Image"
            style="width: 100px; height: 130px; cursor: pointer;"
            @click="handleImageClick(scope.row.imageS3Key)"
          > -->
          <!-- <DrawRectImage
          v-if="data.imageS3Key !== ''"
          :bigger-roi="data.biggerRoi"
          :dynamic-roi-list="data.dynamicRoiList"
          :image-url="scope.row.imageS3Key"
        /> -->
        </template>
        <template v-else>
          ——
        </template>
      </template>
      </el-table-column>
      <el-table-column fixed="right" label="agentLog" width="80px">
        <template slot-scope="scope">
          <template v-if="shouldDisplayButton(scope.row)">
            <el-button
              size="small"
              type="text"
              @click="handleClick(scope.$index, scope.row)"
            >查看</el-button>
          </template>
          <template v-else>
            ---
          </template>
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

    <!-- <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="true"
    :append-to-body="true"
    @close="handleCloseDialog"
  >
    <div class="dialog-image">
      <img :src="enlargedImageUrl" alt="Enlarged Image">
    </div>
  </el-dialog>  -->
  </div>


</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getAgentVoteList,getLabelList } from '../../api/exualuate'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'
import { getAgentSelectList } from '@/api/agent-config'

export default {
  components: {
    DrawRectImage
  },
  data() {
    return {
      agentList: [],
      deviceModelList: [],
      labelList: [],
      currentPage: 1,
      totalData: 0,
      dataSource: {},
      labelLikeType: null,
      currentData: [],
      agentTypeList: [],
      labelId:'',
     showOverlay: false,
      enlargedImageUrl: '',
      labelLikeOptions: [{
        label: '喜欢',
        value: 1
      }, {
        label: '不喜欢',
        value: 2
      }],
      deviceModelOptions: [{
        label: 'ATOM Cam GPT',
        value: 'ATOM_RVIC1'
      }, {
        label: 'ATOM Cam Swing',
        value: 'ATOM_CAKP1JZJP'
      }, {
        label: 'ATOM Cam 2',
        value: 'ATOM_CamV3C'
      }, {
        label: 'ATOM Cam',
        value: 'AC1'
      }, {
        label: 'ATOM_MaaxCam1',
        value: 'ATOM_MaaxCam1'
      }],
      queryDeviceId: '',
      queryUserEmail: '',
      valueTime: ''
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.setLast30Days() // 在组件挂载时设置近30天的默认时间范围
    this.getSelectList()
    this.getLabelList()
    this.getList(1)
  },
  methods: {
    shouldDisplayImage(row) {
      return row.shareData && typeof row.imageS3Key !== 'undefined' && row.imageS3Key !== null && row.imageS3Key !== '';
    },
    shouldDisplayButton(row) {
      return row.shareData && row.type === 1},
    handleImageClick(imageUrl) {
      this.enlargedImageUrl = imageUrl;
      this.showOverlay = true;
    },
    closeOverlay() {
      this.showOverlay = false;
    },
    getList(currentPage) {
      startLoading()
      console.log(this.valueTime)
      const param = {
        current: currentPage,
        deviceId: this.queryDeviceId,
        userEmail: this.queryUserEmail,
        agentTypeList: this.agentTypeList,
        deviceModelList: this.deviceModelList,
        labelId: this.labelId
      }
      if (this.valueTime != null) {
        param.startTime = this.valueTime[0] === undefined ? '' : new Date(this.valueTime[0]).getTime()
        param.endTime = this.valueTime[1] === undefined ? '' : new Date(this.valueTime[1]).getTime()
      }
      if (this.labelLikeType !== '') {
        param.likeType = this.labelLikeType
      }
      console.log(param)

      getAgentVoteList(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          this.dataSource[currentPage.toString()] = response.data.records
          console.log(this.dataSource)

          this.currentPage = response.data.current
          this.currentData = this.dataSource[this.currentPage]
          console.log(this.currentData)
        }
      }).catch(error => {
        endLoading()
        console.log(error)
      })
    },
    getSelectList() {
      getAgentSelectList().then(response => {
        this.agentList = response.data
      }).finally()
    },
    getLabelList() {
      getLabelList().then(response => {
        this.labelList = response.data
        this.labelList.unshift({ label: '无标签', id: -1 });
      }).finally()
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
    setLast30Days() {
      const today = new Date()
      const endDate = this.formatDate(today) // 当天日期
      const startDate = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000) // 30天前的日期
      startDate.setHours(0, 0, 0, 0) // 设置为当天的开始时间

      this.valueTime = [
        this.formatDate(startDate) + ' 00:00:00',
        endDate + ' 23:59:59'
      ]
    },
    formatDate(date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return `${year}-${month}-${day}`
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
      this.queryUserEmail = ''
      this.queryEventId = ''
      this.valueTime = ''
      this.labelLikeType = ''
      this.labelId = ''
      this.deviceModelList = []
      this.setLast30Days()
      this.getList(1)
    },
    handleClick(index, row) {
      console.log(index)
      console.log(row)

      const routeUrl = this.$router.resolve({
        path: '/evaluate-agentLog-detail',
        query: {
          id: row.id
        }
      })
     // 窗口的宽度和高度
      const width = 800
      const height = 600

      // 计算屏幕的中心位置
      const left = (window.innerWidth - width) / 2 + window.screenX
      const top = (window.innerHeight - height) / 2 + window.screenY

      // 窗口特性
      const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`

      window.open(routeUrl.href, '_blank', windowFeatures)

      // this.$router.push({ path: '/device-event-group-image', query: { group_id: row.id } });
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

.image-container {
  position: relative;
  display: inline-block;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  cursor: pointer;
}

.enlarged-image {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  text-align: center;
}

.enlarged-image img {
  max-width: 90%;
  max-height: 90%;
  cursor: pointer;
}

.content {
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}
</style>
