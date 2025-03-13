<template>
    <div>
        <h1>每人每天平均查看回放视频时长分布情况</h1>
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
                <el-table-column label="小于2分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.durationLt2min }}
                    </template>
                </el-table-column>
                <el-table-column label="2-5分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.duration3To5min }}
                    </template>
                </el-table-column>
                <el-table-column label="5-10分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.duration5To10min }}
                    </template>
                </el-table-column>
                <el-table-column label="大于10分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.durationGt10min }}
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
    