<template>
  <div>
    <h1>每日点击次数</h1>
    <div style="margin-bottom: 50px;">
      <el-table :data="enterData"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%">
        <el-table-column label="时间" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.enterDate }}
          </template>
        </el-table-column>
        <el-table-column label="点击次数" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.enterCount }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="totalEnterCount != 0" :current-page.sync="enterCurrentPage" :page-size="30"
        :total="totalEnterCount" @current-change="getEnterData" background layout="total,prev,pager,next" />
    </div>
    <h1>每日成功触发次数与生成平均时长</h1>
    <div style="margin-bottom: 50px;">
      <el-table :data="generateData"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%">
        <el-table-column label="时间" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.generateDate }}
          </template>
        </el-table-column>
        <el-table-column label="触发次数" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.generateCount }}
          </template>
        </el-table-column>
        <el-table-column label="生成时长" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.averageDurationSeconds.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="totalGenerateCount != 0" :current-page.sync="generateCurrentPage" :page-size="30"
        :total="totalGenerateCount" @current-change="getGenerateData" background layout="total,prev,pager,next" />
    </div>
    <h1>点击推荐event播放次数/平均停留时长/平均完播率</h1>
    <div style="margin-bottom: 50px;">
      <el-table :data="recommendData"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
        style="margin-top: 24px; width: 100%" :span-method="mergeRows">
        <el-table-column label="时间" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.eventDate }}
          </template>
        </el-table-column>
        <el-table-column label="deivceId" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.deviceId }}
          </template>
        </el-table-column>
        <el-table-column label="eventId" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.eventId }}
          </template>
        </el-table-column>
        <el-table-column label="播放次数" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.playCount }}
          </template>
        </el-table-column>
        <el-table-column label="平均停留时长" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.averagePlayDurationSeconds.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="平均完播率" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.averageCompletionRate.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="totalRecommendCount != 0" :current-page.sync="recommendCurrentPage" :page-size="30"
        :total="totalRecommendCount" @current-change="getRecommendData" background layout="total,prev,pager,next" />
    </div>
  </div>
</template>
  
<script>

import { timecuratorGenerate, timecuratorRecommend, timecuratorEnter } from '@/api/agents-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
  name: 'timeCuratorStat',
  components: {
  },
  data() {
    return {
      enterData: [],
      totalEnterCount: 0,
      enterCurrentPage: 1,

      generateData: [],
      totalGenerateCount: 0,
      generateCurrentPage: 1,

      recommendData: [],
      totalRecommendCount: 0,
      recommendCurrentPage: 1
    }
  },
  computed: {

  },
  mounted() {
    this.getGenerateData()
    this.getRecommendData()
    this.getEnterData()
  },
  methods: {
    getGenerateData() {
      startLoading()

      let param = {
        currentPage: this.generateCurrentPage - 1
      }

      timecuratorGenerate(param).then((response) => {
        endLoading()

        if (response.code === 0) {
          this.generateData = response.data
          this.totalGenerateCount = response.data[0].totalGenerateCount
        }
      }).catch((error) => {
        endLoading()

        console.log(error)
      })
    },
    getRecommendData() {
      startLoading()

      let param = {
        currentPage: this.recommendCurrentPage - 1
      }

      timecuratorRecommend(param).then((response) => {
        endLoading()

        if (response.code === 0) {
          this.recommendData = response.data
          this.totalRecommendCount = response.data[0].totalRecommendCount
          this.prepareMergeInfo()
        }
      }).catch((error) => {
        endLoading()

        console.log(error)
      })
    },
    getEnterData() {
      startLoading()

      let param = {
        currentPage: this.enterCurrentPage - 1
      }

      timecuratorEnter(param).then((response) => {
        endLoading()
        if (response.code === 0) {
          this.enterData = response.data
          this.totalEnterCount = response.data[0].totalEnterCount
        }
      }).catch((error) => {
        endLoading()
        console.log(error)
      })
    },
    prepareMergeInfo() {
      const mergeInfo = {};
      this.recommendData.forEach((row, index) => {
        const key = `${row.eventDate}-${row.deviceId}`;
        if (!mergeInfo[key]) {
          mergeInfo[key] = { rowIndex: index, count: 0 };
        }
        mergeInfo[key].count++;
      });
      // 准备第一列的合并信息
      const eventDateCount = {};
      this.recommendData.forEach(row => {
        if (eventDateCount[row.eventDate] === undefined) {
          eventDateCount[row.eventDate] = 1;
        } else {
          eventDateCount[row.eventDate]++;
        }
      });
      Object.keys(eventDateCount).forEach((date, index, array) => {
        const prevCount = array.slice(0, index).reduce((acc, cur) => acc + eventDateCount[cur], 0);
        mergeInfo[date] = { rowIndex: prevCount, count: eventDateCount[date] };
      });

      this.mergeInfo = mergeInfo;
    },
    mergeRows({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // 第一列根据eventDate合并
        const eventDateKey = row.eventDate;
        if (this.mergeInfo[eventDateKey] && this.mergeInfo[eventDateKey].rowIndex === rowIndex) {
          return {
            rowspan: this.mergeInfo[eventDateKey].count,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      } else if (columnIndex === 1) { // 第二列根据eventDate和deviceId合并
        const key = `${row.eventDate}-${row.deviceId}`;
        if (this.mergeInfo[key] && this.mergeInfo[key].rowIndex === rowIndex) {
          return {
            rowspan: this.mergeInfo[key].count,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    }
  }
}
</script>
  
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
  