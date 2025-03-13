<template>
    <div>
        <h1>按天统计每个Agent卡片的点击用户数和点击次数</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="dataday"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.day }}
                    </template>
                </el-table-column>
                <el-table-column label="Agent类型" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.service_name }}
                    </template>
                </el-table-column>
                <el-table-column label="点用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.unique_users }}
                    </template>
                </el-table-column>
                <el-table-column label="点击数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.total_clicks }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { atomClickAgentStream } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomClickAgentStream',
    data() {
        return {
            dataday: []
        }
    },
    mounted() {
        this.getPlaybackForRerEventPerDayTime()
    },
    methods: {
        getPlaybackForRerEventPerDayTime() {
            startLoading()

            let param = { "where": "", "current_page": 1, "show_number": 200000 }

            atomClickAgentStream(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.dataday = response.data
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        }
    }
}
</script>

