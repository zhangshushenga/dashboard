<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <!-- <el-date-picker  v-model="valueTime" :picker-options="pickerOptions" align="right"
              end-placeholder="结束日期" range-separator="至" start-placeholder="开始日期" style="width: 20%" type="datetimerange"
              value-format="yyyy-MM-dd" />
                <el-select v-model="value" placeholder="手机系统" style="margin-left: 20px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="固件版本" style="margin-left: 20px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="软件版本" style="margin-left: 20px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select> -->
                <el-table :data="tableData" show-summary sum-text="统计" :summary-method="getSummaries"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <!-- <el-table-column min-width="20%" type="selection" /> -->
                    <el-table-column prop="exactDate" label="触发时间" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.exactDate }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numClickHotQuestion" label="触发热门问题次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numClickHotQuestion }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numClickSendQuestion" label="触发输入问答次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numClickSendQuestion }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numClickFeedBack" label="触发反馈功能次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numClickFeedBack }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numClickHotQuestionFb" label="触发热门问题及反馈功能次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numClickHotQuestionFb }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numClickSendQuestionFb" label="触发输入问答及反馈功能次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.numClickSendQuestionFb }}
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
import { getHelpFeedBackClickData } from '@/api/api-stat'


export default {
    data() {
        return {
            tableData: []
        }
    },
    created() {
        //this.getDataFromServer()
    },
    mounted() {
        this.getDataFromServer()
        //this.initChart()
    },
    methods: {
        /**
         * 统计数据
         */
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            var successIndex = 2;
            var numIndex = 1;
            var successRateIndex = columns.length-1;
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '统计';
                    return;
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

            });
            return sums;
        },

        /**
         * 请求连接数据
         */
        getDataFromServer() {
            startLoading()
            getHelpFeedBackClickData().then(response => {
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
        }
    }
}
</script>
  