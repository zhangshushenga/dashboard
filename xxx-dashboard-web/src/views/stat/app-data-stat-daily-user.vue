<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <el-table :data="tableData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column label="日期" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.exactDate }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="注册用户" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.totalUsers }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="新增用户" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.newUsers }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="流失用户" min-width="10%">
                        <template slot-scope="scope">
                            {{scope.row.lostUsers }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>
<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getDailyUserData} from '@/api/api-stat'
import {changetime} from '../../utils/util-date'

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
            getDailyUserData(param).then(response => {
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
  