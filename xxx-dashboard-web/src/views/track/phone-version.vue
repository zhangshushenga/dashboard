<template>
  <div class="main-class">
    <div class="chart-class">
      <el-row>
        <el-col class="chart-version" :span="12" height="100%" width="100%">
          <chart :son-data="sonDataAndroid" height="100%" width="100%" />
        </el-col>
        <el-col class="chart-version" :span="12" height="100%" width="100%">
          <chart :son-data="sonDataIos" height="100%" width="100%" />
        </el-col>
      </el-row>
    </div>
    <div class="select-class" :style="{height:20 + 'px', width:100 + 'px', 'margin-top': 0 + 'px','left': 0 + 'px'}">
      <el-select
        v-model="listQuery.appVersion"
        placeholder="all"
        style="width: 140px"
        class="filter-item"
        @change="appVersionChange"
      >
        <el-option v-for="item in appVersionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Track/PhoneVersion'

export default {
  name: 'PhoneVersionChart',
  components: { Chart },
  data() {
    return {
      sonDataIos: 'ios+all',
      sonDataAndroid: 'android+all',
      listQuery: {
        appVersion: 'all'
      },
      appVersionOptions: [{
        value: 'all',
        label: 'all'
      }, {
        value: '2.36',
        label: '2.36'
      }, {
        value: '2.35',
        label: '2.35'
      }, {
        value: '2.34',
        label: '2.34'
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
      }]
    }
  },
  methods: {
    appVersionChange(value) {
      this.sonDataIos = 'ios' + '+' + this.listQuery.appVersion
      this.sonDataAndroid = 'android' + '+' + this.listQuery.appVersion
      console.log(this.sonData)
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.chart-version {
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
