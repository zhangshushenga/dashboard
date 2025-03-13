<template>
    <div>
        <h1>使用平均时长</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="useAppAverageTime"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.useDate }}
                    </template>
                </el-table-column>
                <el-table-column label="平均时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ changeSecond(scope.row.avgUseTime) }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalUseAppAverageTimeCount != 0" :current-page.sync="useAppAverageTimeCurrentPage" :page-size="30"
                :total="totalUseAppAverageTimeCount" @current-change="getUseAppAverageTime" background
                layout="total,prev,pager,next" />
        </div>
        <h1>使用时长分布</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="useAppTimeDistributed"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.useDate }}
                    </template>
                </el-table-column>
                <el-table-column label="小于2分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.under2Minutes }}
                    </template>
                </el-table-column>
                <el-table-column label="2分钟-5分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.between2To5Minutes }}
                    </template>
                </el-table-column>
                <el-table-column label="5分钟-10分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.between5To10Minutes }}
                    </template>
                </el-table-column>
                <el-table-column label="大于10分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.over10Minutes }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalUseAppTimeDistributedCount != 0" :current-page.sync="useAppTimeDistributedCurrentPage" :page-size="30"
                :total="totalUseAppTimeDistributedCount" @current-change="getUseAppTimeDistributed" background
                layout="total,prev,pager,next" />
        </div>
    </div>
</template>
    
<script>

import { atomUseAppAverageTime, atomUseAppTimeDistributed} from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'
import {changetime} from '@/utils/util-date'

export default {
    name: 'atomApp',
    components: {
    },
    data() {
        return {
            useAppAverageTime: [],
            totalUseAppAverageTimeCount: 0,
            useAppAverageTimeCurrentPage: 1,

            useAppTimeDistributed: [],
            totalUseAppTimeDistributedCount: 0,
            useAppTimeDistributedCurrentPage: 1,
        }
    },
    computed: {

    },
    mounted() {
        this.getUseAppAverageTime()
        this.getUseAppTimeDistributed()
    },
    methods: {
        getUseAppAverageTime() {
            startLoading()

            let param = {
                currentPage: this.useAppAverageTimeCurrentPage - 1
            }

            atomUseAppAverageTime(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.useAppAverageTime = response.data
                    this.totalUseAppAverageTimeCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        getUseAppTimeDistributed() {
            startLoading()

            let param = {
                currentPage: this.useAppTimeDistributedCurrentPage - 1
            }

            atomUseAppTimeDistributed(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.useAppTimeDistributed = response.data
                    this.totalUseAppTimeDistributedCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        changeSecond(second) {
            return changetime(second) === "" ? "--" : changetime(second)
        }
    }
}
</script>
    