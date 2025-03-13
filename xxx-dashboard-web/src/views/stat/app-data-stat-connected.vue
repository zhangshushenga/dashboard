<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <div style="display: flex; align-items: center;">
                <el-input v-model="input" placeholder="默认搜索出RVI设备最近30天的连接情况" style="flex:1; margin-right: 20px;"></el-input>
                <el-button type="primary" icon="el-icon-search" style="width: 100px;" @click="give_me_answer">搜索</el-button>
                </div>
                <el-tag style="width: 100%;max-width: calc(100% - 120px); margin-top: 5px;text-align: left; margin-right:120px">输入转化的查询条件：{{sqlAi}}</el-tag>


                <el-table :data="tableData" show-summary sum-text="统计" :summary-method="getSummaries"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <!-- <el-table-column min-width="20%" type="selection" /> -->
                    <el-table-column prop="exactDate" label="日期" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.exactDate }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="allNum" label="总连接数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.allNum }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numSuccess" label="连接成功数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numSuccess }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numSuccessIotOffline" label="成功离线数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numSuccessIotOffline }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numFailure" label="连接失败数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numFailure }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numFailureIotOffline" label="失败离线数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numFailureIotOffline }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="avgTimeSuccess" label="平均成功时长(s)" min-width="10%">
                        <template slot-scope="scope">
                            {{ ((scope.row.avgTimeSuccess) / 1000).toFixed(2) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="avgTimeFailure" label="平均失败时长(s)" min-width="10%">
                        <template slot-scope="scope">
                            {{ ((scope.row.avgTimeFailure) / 1000).toFixed(2) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="success_rate" label="成功率(连接成功数/总连接数)" min-width="10%">
                        <template slot-scope="scope">
                            {{ ((scope.row.numSuccess / scope.row.allNum) * 100).toFixed(1) + "%" }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
    <!-- </div> -->
</template>
<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getDeviceP2pConnect,getDeviceP2pConnectByInput,getDeviceP2pConnectWithAiSql } from '@/api/api-stat'


export default {
    data() {
        return {
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
        this.selectParam.phoneSystem = "all"
        this.getDataFromServer(this.selectParam)
        //this.getDataFromServer()
        //this.initChart()
    },
    methods: {
        /**
         * 筛选手机系统
         */
         selectPhoneSystem(value) {
            this.selectParam.phoneSystem = value
            this.getDataFromServer(this.selectParam)
        },
        give_me_answer() {
            console.log(this.input)
            if (this.input == "") {
                this.$message('请输入搜索内容');
            } else {
                this.inputParam.inputContent = this.input
                this.searchConnectData(this.inputParam)
            }
        },
        /**
         * 统计数据
         */
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            var successIndex = 2;
            var numIndex = 1;
            var successRateIndex = columns.length - 1;
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '统计';
                    return;
                }
                const prop = column.property
                if (prop === "allNum") {
                    numIndex = index
                }
                if (prop === "numSuccess") {
                    successIndex = index
                }
                if (prop === "success_rate") {
                    successRateIndex = index
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index];
                } else {
                    sums[index] = 'N/A';
                }
                if (prop === "avgTimeSuccess" || prop === "avgTimeFailure") {
                    console.log("sums[index]", sums[index])
                    console.log("this.tableData.size", this.tableData.length)
                    sums[index] = ((sums[index] / this.tableData.length) / 1000).toFixed(2);
                }

            });

            sums[successRateIndex] = ((sums[successIndex] / sums[numIndex]) * 100).toFixed(1) + "%"

            return sums;
        },

        /**
         * 请求连接数据
         */
        getDataFromServer(param) {
            startLoading()
            getDeviceP2pConnect(param).then(response => {
                if (response.code === 0) {
                    endLoading()
                    console.log(response)
                    this.tableData = []
                    for (const r of response.data) {
                        this.tableData.push(r)
                    }
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        searchConnectData(param) {
            startLoading()
            getDeviceP2pConnectWithAiSql(param).then(response => {
                this.tableData = []
                if (response.code === 0) {
                    endLoading()
                    console.log(response)
                    if (response.data.deviceP2pConnectResponseList.length == 0) {
                        this.$message({
                            message : '没有搜索到内容，请重新输入搜索条件',
                            type : 'warning'
                        })
                    }
                    this.sqlAi = response.data.aiSql.replace("WHERE","")
                    for (const r of response.data.deviceP2pConnectResponseList) {
                        this.tableData.push(r)
                    }
                } else {
                    this.$message({
                        message : '搜索错误，请重新输入搜索条件',
                        type : 'warning'
                    })
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        }
    }
}
</script>
  