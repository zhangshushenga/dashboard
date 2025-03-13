<template>
  <div class="chart-container">
    <el-row :gutter="16" class="panel-group">
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              All Devices Number
            </div>
            <CountTo :start-val="0" :end-val="deviceNum" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              Android Devices Number
            </div>
            <CountTo :start-val="0" :end-val="deviceNumAndroid" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">
              iOS Devices Number
            </div>
            <CountTo :start-val="0" :end-val="deviceNumIos" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
        <el-table :data="dataList" style="width: 100%">
          <el-table-column label="APP Version" align="center">
            <template slot-scope="scope">
              {{ scope.row.version }}
            </template>
          </el-table-column>
          <el-table-column label="android device num" align="center">
            <template slot-scope="scope">
              {{ scope.row.device_num_android }}
            </template>
          </el-table-column>
          <el-table-column label="ios device num" align="center">
            <template slot-scope="scope">
              {{ scope.row.device_num_ios }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPhoneNum } from '@/api/track'
import CountTo from 'vue-count-to'

export default {
  components: { CountTo },
  data() {
    return {
      deviceNum: 0,
      deviceNumAndroid: 0,
      deviceNumIos: 0,
      dataList: [],
      xData: ['2.29', '2.30', '2.31', '2.32', '2.33', '2.34', '2.35', '2.36'],
      yDataAndroid: [0, 0],
      yDataIos: [0, 0]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    getData() {
      getPhoneNum().then(response => {
        if (response.code === 1) {
          console.log(response)
          for (const data of response.data) {
            if (data.key === 'ios') {
              this.deviceNumIos = data.otherCount
            }
            if (data.key === 'android') {
              this.deviceNumAndroid = data.otherCount
            }
          }
          this.deviceNum = this.deviceNumAndroid + this.deviceNumIos
        }
      })
      for (const version of this.xData) {
        const params = { 'appVersion': version }
        getPhoneNum(params).then(response => {
          if (response.code === 1) {
            console.log(response)
            for (const data of response.data) {
              console.log(this.xData.indexOf(version))
              if (data.key === 'ios') {
                this.yDataIos[this.xData.indexOf(version)] = data.otherCount
              }
              if (data.key === 'android') {
                this.yDataAndroid[this.xData.indexOf(version)] = data.otherCount
              }
            }
            this.dataList = []
            for (let i = 0; i < this.xData.length; i++) {
              this.dataList.push({
                'version': this.xData[i],
                'device_num_android': this.yDataAndroid[i],
                'device_num_ios': this.yDataIos[i]
              })
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  background-color: rgb(240, 242, 245);
  padding: 16px;
}

.panel-group {
  margin-top: 8px;

  .card-panel-col {
    margin-bottom: 16px;
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
      text-align: center;
      font-weight: bold;
      margin: 26px;
      margin-left: 26px;
      width: 100%;

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
</style>
