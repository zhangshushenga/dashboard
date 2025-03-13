<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <el-table :data="dateData" 
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <!-- <el-table-column min-width="20%" type="selection" /> -->
                    <el-table-column label="日期" min-width="10%" max-width="20%">
                        <template slot-scope="scope">
                            {{ scope.row }}
                        </template>
                    </el-table-column>
                    <el-table-column v-for="column in columns" align="center" :label="column" >
                        <el-table-column align="left" prop="numSuccessIotOffline" label="问题设备占比" min-width="5%">
                            <template slot-scope="scope">
                                {{ getOffRate(scope.row,column) }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" prop="numFailure" label="问题设备平均离线时长(min)" min-width="5%">
                            <template slot-scope="scope">
                                {{ getOffAvgTime(scope.row,column) }}
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
                <!-- <el-table v-if="isTrends" :data="trendTableData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop"
                        :label="column.label"></el-table-column>
                </el-table> -->
            </el-main>
        </el-container>
    </div>
    <!-- </div> -->
</template>
<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getDailyOffIotData } from '@/api/api-stat'


export default {
    data() {
        return {
            columns: [],
            dateData:[],
            isTrends: false,
            trendTableData: [],
            tableData: [],
            phone_system_value: '',
            phone_system_options: [{
                value: 'all'
            }, {
                value: 'Android'
            }, {
                value: 'iOS'
            }],
            selectParam: {},
            input: '',
            inputParam: {},
            sqlAi: ''
        }
    },
    created() {
        //this.getDataFromServer()
    },
    mounted() {
        // this.selectParam.phoneSystem = "all"
        this.getDataFromServer()
        //this.getDataFromServer()
        //this.initChart()
    },
    methods: {
        /**
         * 请求连接数据
         */
        getDataFromServer(param) {
            startLoading()
            this.columns = []
            this.dateData = []
            getDailyOffIotData(param).then(response => {
                if (response.code === 0) {
                    endLoading()
                    console.log(response)
                    this.tableData = []
                    for (const r of response.data) {
                        this.tableData.push(r)
                        if (!this.columns.includes(r.firmwareVersion)) {
                            this.columns.push(r.firmwareVersion)
                        }
                        if (!this.dateData.includes(r.exactDate)) {
                            this.dateData.push(r.exactDate)
                        }                           
                    }
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },


        /**
         * 根据时间和固件版本获取占比
         */
        getOffRate(date_time,fir_version){
            for (const r of this.tableData) {
                // console.log('getOffRate data_time',date_time)
                // console.log('getOffRate fir_version',fir_version)
                // console.log('getOffRate r',r)
                if(date_time == r.exactDate && fir_version == r.firmwareVersion) {
                    return (r.iotProblemCount/r.iotDeviceCount)*100+'%'
                }
            }
            return '0%'
        },

        /**
         * 根据时间和固件版本获取平均时间
         */
         getOffAvgTime(date_time,fir_version){
            for (const r of this.tableData) {
                // console.log('getOffAvgTime data_time',date_time)
                // console.log('getOffAvgTime fir_version',fir_version)
                // console.log('getOffAvgTime r',r)
                if(date_time == r.exactDate && fir_version == r.firmwareVersion) {
                    return  Math.floor(r.iotProblemAvgTime/60)
                }
            }
            return 0
        }
    }
}
</script>

<style scoped>
.my-span {
  display: block; /* 将元素设置为块级元素 */
  background-color: #ecf5ff;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  margin-top: 5px;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  max-width: calc(100% - 120px);
  width: 100%;
  text-align: left;
  word-wrap: break-word;
}


</style>
  