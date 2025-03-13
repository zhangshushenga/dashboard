<template>
  <div class="main-class">
    <div class="chart-class">
      <chart :son-data="sonData" height="100%" width="100%" @latestTimeFromChild="latestTimeFromChild" />
    </div>
    <div class="select-class" :style="{height:20 + 'px', width:100 + 'px', 'margin-top': 0 + 'px','right': 200 + 'px'}">
      <el-select
        v-model="listQuery.phoneType"
        placeholder="all"
        style="width: 140px"
        class="filter-item"
        @change="phoneTypeChange"
      >
        <el-option v-for="item in phoneTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="select-class" :style="{height:20 + 'px', width:100 + 'px', 'margin-top': 0 + 'px','right': 50 + 'px'}">
      <el-select
        v-model="listQuery.appVersion"
        placeholder="all"
        style="width: 140px"
        class="filter-item"
        @change="appVersionChange"
      >
        <el-option v-for="item in appVersionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div class="latest-time-class">
        <span>同步截止时间：{{ latestTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Track/UsePath'

export default {
  name: 'UsePathChart',
  components: { Chart },
  data() {
    return {
      latestTime: '0000-00-00 00:00:00',
      listQuery: {
        phoneType: 'all',
        appVersion: 'all'
      },
      phoneTypeOptions: [{
        value: 'all',
        label: 'all'
      }, {
        value: 'ios',
        label: 'ios'
      }, {
        value: 'android',
        label: 'android'
      }],
      appVersionOptions: [{
        value: 'all',
        label: 'all'
      }, {
        value: '2.33',
        label: '2.33'
      }, {
        value: '2.32',
        label: '2.32'
      }, {
        value: '2.31',
        label: '2.31'
      }, {
        value: '2.30',
        label: '2.30'
      }, {
        value: '2.29',
        label: '2.29'
      }],
      sonData: 'all+all'
    }
  },
  methods: {
    phoneTypeChange(value) {
      this.sonData = this.listQuery.phoneType + '+' + this.listQuery.appVersion
      console.log(this.sonData)
    },
    appVersionChange(value) {
      this.sonData = this.listQuery.phoneType + '+' + this.listQuery.appVersion
      console.log(this.sonData)
    },
    latestTimeFromChild(childValue) {
      this.latestTime = childValue
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
  .main-class {
    position:relative;
  }
  .select-class {
    position:absolute;
  }
  .chart-class {
    position:absolute;
    width: 100%;
    height: calc(100vh - 80px);
  }
  .latest-time-class {
    position:absolute;
    text-align: right;
    height:20px;
    width:300px;
    top:calc(100vh - 110px);
    right:0px;
  }
</style>
