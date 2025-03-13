<template>
    <div class="container">
      <div class="filter-container">
        <el-select v-model="filter.networkType" placeholder="网络类型" class="filter-item">
          <el-option
            v-for="item in networkTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
  
        <el-select v-model="filter.productType" placeholder="设备型号" class="filter-item">
          <el-option
            v-for="item in productTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
  
        <el-select v-model="filter.phoneSystem" placeholder="客户端类型" class="filter-item">
          <el-option
            v-for="item in phoneSystemOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
  
        <el-select v-model="filter.connectType" placeholder="预连接" class="filter-item">
          <el-option
            v-for="item in connectTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
  
        <el-date-picker
          v-model="filter.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="filter-item"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="onDateChange"
        />
      </div>
  
      <div class="button-container">
        <el-input v-model="filter.deviceVersion" placeholder="输入固件版本" class="input-item" />
        <el-input v-model="filter.deviceMac" placeholder="输入MAC(多个用','隔开)" class="input-item" />
        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </div>
  
      <el-table
        :data="tableData"
        show-summary
        sum-text="统计"
        class="data-table"
        style="margin-top: 10px; width: 100%"
      >
        <el-table-column prop="exactDate" label="日期" min-width="80" />
        <el-table-column prop="successRate" label="成功率" min-width="80" />
        <el-table-column prop="allNum" label="总连接数" min-width="80" />
        <el-table-column prop="numSuccess" label="连接成功数" min-width="80" />
        <el-table-column prop="numSuccessIotOffline" label="离线成功数" min-width="100" />
        <el-table-column prop="numFailure" label="失败数" min-width="80" />
        <el-table-column prop="numFailureIotOffline" label="离线失败数" min-width="100" />
        <el-table-column prop="avgTimeSuccess" label="平均成功时长" min-width="120" />
        <el-table-column prop="avgTimeFailure" label="平均失败时长" min-width="120" />
        <el-table-column prop="oneTimeSuccessConnect" label="一次性连接成功数" min-width="120" />
        <el-table-column prop="unoneTimeSuccessConnect" label="非一次性的平均重连次数" min-width="120" />
      </el-table>
    </div>
  </template>
  
  <script>
  import { startLoading, endLoading } from '@/utils/loading';
  import { getDeviceP2pConnect } from '@/api/api-stat';
  import moment from 'moment';
  
  export default {
    data() {
      return {
        tableData: [],
        filter: {
          networkType: '',
          productType: '',
          phoneSystem: '',
          connectType: '',
          deviceVersion: '',
          deviceMac: '',
          dateRange: [], // 存储开始和结束日期的字符串
        },
        networkTypeOptions: [
          { value: -1, label: '默认值' },
          { value: 0, label: 'LTE' },
          { value: 1, label: '不同WiFi' },
          { value: 2, label: '同网WiFi' },
          { value: 3, label: '未知网络' },
          { value: 5, label: '伪同网WiFi' },
        ],
        productTypeOptions: [
          { value: 'HL_RVIC1', label: 'HL_RVIC1' },
          { value: 'HL_Cam3', label: 'HL_Cam3' },
          { value: 'HL_CamPan2', label: 'HL_CamPan2' },
          { value: 'QV1', label: 'QV1' },
          { value: 'QV1_DM', label: 'QV1_DM' },
        ],
        phoneSystemOptions: [
          { value: 'iOS', label: 'iOS' },
          { value: 'Android', label: 'Android' },
        ],
        connectTypeOptions: [
            { value: -1, label: '默认值' },
            { value: 0, label: '是预连接' },
            { value: 1, label: '不是预连接' },
        ],
      };
    },
    created() {
      this.searchData();
      this.setDefaultDateRange();
    },
    methods: {
      setDefaultDateRange() {
        const endDate = moment().format('YYYY-MM-DD');
        const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        this.filter.dateRange = [startDate, endDate];
      },
      resetFilters() {
        this.filter = {
          networkType: '',
          productType: '',
          phoneSystem: '',
          connectType: '',
          deviceVersion: '',
          deviceMac: '',
          dateRange: []
        };
        this.setDefaultDateRange();
        this.tableData = [];
      },
      searchData() {
        startLoading();
        if (this.filter.dateRange.length === 0) {
          this.setDefaultDateRange();
        }
        let deviceMac = this.filter.deviceMac;
        if (deviceMac) {
          deviceMac = `('${deviceMac.split(',').join("','")}')`;
        }
        const params = {
          networkType: this.filter.networkType,
          productType: this.filter.productType,
          phoneSystem: this.filter.phoneSystem,
          connectType: this.filter.connectType,
          deviceVersion: this.filter.deviceVersion,
          deviceMac: deviceMac,
          startDate: this.filter.dateRange[0] || '',
          endDate: this.filter.dateRange[1] || ''
        };
        getDeviceP2pConnect(params)
          .then((res) => {
            endLoading();
            if (res.code === 0 && Array.isArray(res.data)) {
                this.tableData = res.data.map(item => {
              return {
                ...item,
                successRate: item.allNum ? ((item.numSuccess / item.allNum) * 100).toFixed(2) + '%' : '0%'
              };
            });
            } else {
              this.tableData = [];
            }
          })
          .catch(() => {
            endLoading();
            this.tableData = [];
          });
      },
      onDateChange() {
        // 处理日期变化
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  .filter-container,
  .input-container,
  .date-picker-container,
  .button-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .filter-item,
  .input-item,
  .date-picker {
    margin-right: 20px;
    flex: 1;
  }
  .button-container {
    justify-content: flex-end;
  }
  .data-table {
    width: 100%;
  }
  </style>