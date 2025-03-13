<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <el-table :data="tableData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column label="时间" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.exactDate }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="使用次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.totalCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="使用总时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.totalDuring) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="平均使用时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.averageUsageDuration) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="使用时长分布">
                        <el-table-column align="left" label="小于2分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationLt2min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="2-5分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration2To5min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="5-10分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration5To10min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="大于10分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationGt10min }}
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>
<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getAppUseData } from '@/api/api-stat'
import { changetime } from '../../utils/util-date'

export default {
    data() {
        return {
            tableData: [],
        }
    },
    mounted() {
        let param = {}
        this.getData(param)
    },
    methods: {
        getData(param) {
            startLoading()
            getAppUseData(param).then(response => {
                console.log(response)
                endLoading()
                if (response.code === 0) {
                    this.tableData = response.data
                }
            }).catch(error => {
                endLoading()
            })
        },
        changeSecond(second) {
            return changetime(second) === "" ? "--" : changetime(second)
        }
    }
}
</script>
  