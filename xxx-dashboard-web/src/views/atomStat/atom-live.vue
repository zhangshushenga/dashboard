<template>
    <div>
        <h1>平均查看时长/平均查看次数</h1>
        <div>
            <el-radio-group v-model="liveAvgDeviceModel" @input="getLiveAvg">
                <el-radio-button v-for="(label, key) in atomProduction" :key="key" :label="label">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table :data="liveAvg"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.exactDate }}
                    </template>
                </el-table-column>
                <el-table-column label="平均查看时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ changeSecond(scope.row.avgDuration) }}
                    </template>
                </el-table-column>
                <el-table-column label="平均查看次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgViewsPerUser }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalLiveAvgCount != 0" :current-page.sync="liveAvgCurrentPage" :page-size="30"
                :total="totalLiveAvgCount" @current-change="getLiveAvg" background
                layout="total,prev,pager,next" />
        </div>
        <h1>每人每天观看直播时长的分布情况</h1>
        <div>
            <el-radio-group v-model="liveEveryOneTimeDeviceModel" @input="getLiveEveryOneTime">
                <el-radio-button v-for="(label, key) in atomProduction" :key="key" :label="label">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table :data="liveEveryOneTime"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.exactDate }}
                    </template>
                </el-table-column>
                <el-table-column label="小于5分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.durationLt5min }}
                    </template>
                </el-table-column>
                <el-table-column label="5分钟-10分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.duration5To10min }}
                    </template>
                </el-table-column>
                <el-table-column label="10分钟-15分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.duration10To15min }}
                    </template>
                </el-table-column>
                <el-table-column label="15分钟-20分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.duration15To20min }}
                    </template>
                </el-table-column>
                <el-table-column label="20分钟-30分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.duration20To30min }}
                    </template>
                </el-table-column>
                <el-table-column label="大于30分钟" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.durationGt30min }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalLiveEveryOneTimeCount != 0" :current-page.sync="liveEveryOneTimeCurrentPage" :page-size="30"
                :total="totalLiveEveryOneTimeCount" @current-change="getLiveEveryOneTime" background
                layout="total,prev,pager,next" />
        </div>
    </div>
</template>
    
<script>

import { atomLive} from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'
import {changetime} from '@/utils/util-date'
import { atomProduction, getAtomDeviceModel } from '@/views/atomStat/atomUtil'

export default {
    name: 'atomLives',
    components: {
    },
    data() {
        return {
            liveAvgDeviceModel: "All",
            liveAvg: [],
            totalLiveAvgCount: 0,
            liveAvgCurrentPage: 1,

            liveEveryOneTimeDeviceModel: "All",
            liveEveryOneTime: [],
            totalLiveEveryOneTimeCount: 0,
            liveEveryOneTimeCurrentPage: 1
        }
    },
    computed: {
        atomProduction() {
            return  {All: 'All', ...atomProduction};
        }
    },
    mounted() {
        this.getLiveAvg()
        this.getLiveEveryOneTime()
    },
    methods: {
        getLiveAvg() {
            startLoading()

            let param = this.liveAvgDeviceModel === 'All' ? {
                currentPage: this.liveAvgCurrentPage - 1
            } : {
                currentPage: this.liveAvgCurrentPage - 1,
                deviceModel: getAtomDeviceModel(this.liveAvgDeviceModel)
            }

            atomLive(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.liveAvg = response.data
                    this.totalLiveAvgCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        getLiveEveryOneTime() {
            startLoading()

            let param = this.liveEveryOneTimeDeviceModel === 'All' ? {
                currentPage: this.liveEveryOneTimeCurrentPage - 1
            } : {
                currentPage: this.liveEveryOneTimeCurrentPage - 1,
                deviceModel: getAtomDeviceModel(this.liveEveryOneTimeDeviceModel)
            }

            atomLive(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.liveEveryOneTime = response.data
                    this.totalLiveEveryOneTimeCount = response.data[0].totalRowCount
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
    