<template>
    <div>
        <h1>按天统计用户每个Agent详情页的平均停留时长</h1>
        <div>
            <el-radio-group v-model="playbackForRerEventPerDayTimeDeviceModel" @input="getPlaybackForRerEventPerDayTime">
                <el-radio-button v-for="(label, key) in atomProduction" :key="key" :label="label">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table :data="playbackForRerEventPerDayTimeDayCount"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.exactDate }}
                    </template>
                </el-table-column>
                <el-table-column label="Agent类型" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.durationLt2min }}
                    </template>
                </el-table-column>    
                <el-table-column label="平均停留时间" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.durationLt2min }}
                    </template>
                </el-table-column>    
            </el-table>
            <el-pagination v-show="totalPlaybackForRerEventPerDayTimeCount != 0" :current-page.sync="playbackForRerEventPerDayTimeCurrentPage" :page-size="30"
                :total="totalPlaybackForRerEventPerDayTimeCount" @current-change="getPlaybackForRerEventPerDayTime" background
                layout="total,prev,pager,next" />
        </div>
    </div>
</template>
    
<script>

import { atomPlaybackForRerEventPerDayTime } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'
import { atomProduction, getAtomDeviceModel } from '@/views/atomStat/atomUtil'

export default {
    name: 'atomPlaybacks',
    components: {
    },
    data() {
        return {
            playbackForRerEventPerDayTimeDeviceModel: "All",
            playbackForRerEventPerDayTimeDayCount: [],
            totalPlaybackForRerEventPerDayTimeCount: 0,
            playbackForRerEventPerDayTimeCurrentPage: 1
        }
    },
    computed: {
        atomProduction() {
            return  {All: 'All', ...atomProduction};
        }
    },
    mounted() {
        this.getPlaybackForRerEventPerDayTime()
    },
    methods: {
        getPlaybackForRerEventPerDayTime() {
            startLoading()

            let param = this.playbackForRerEventPerDayTimeDeviceModel === 'All' ? {
                currentPage: this.playbackForRerEventPerDayTimeCurrentPage - 1
            } : {
                currentPage: this.playbackForRerEventPerDayTimeCurrentPage - 1,
                deviceModel: getAtomDeviceModel(this.playbackForRerEventPerDayTimeDeviceModel)
            }

            atomPlaybackForRerEventPerDayTime(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.playbackForRerEventPerDayTimeDayCount = response.data
                    this.totalPlaybackForRerEventPerDayTimeCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        }
    }
}
</script>
    