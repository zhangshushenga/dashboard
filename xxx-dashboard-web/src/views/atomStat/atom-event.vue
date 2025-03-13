<template>
    <div>
        <h1>每人每天查看Event数量分布</h1>
        <div>
            <el-radio-group v-model="eventPerPersonPerDayCountDeviceModel" @input="getEventPerPersonPerDayCount">
                <el-radio-button v-for="(label, key) in atomProduction" :key="key" :label="label">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table :data="eventPerPersonPerDayCount"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.exactDate }}
                    </template>
                </el-table-column>
                <el-table-column label="小于3个" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.viewsLess3 }}
                    </template>
                </el-table-column>
                <el-table-column label="3-5个" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.views3To5 }}
                    </template>
                </el-table-column>
                <el-table-column label="5-10个" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.views5To10 }}
                    </template>
                </el-table-column>
                <el-table-column label="10-15个" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.views10To15 }}
                    </template>
                </el-table-column>
                <el-table-column label="15-20个" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.views15To20 }}
                    </template>
                </el-table-column>
                <el-table-column label="大于20个" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.viewsMore20 }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalEventPerPersonPerDayCountCount != 0" :current-page.sync="eventPerPersonPerDayCountCurrentPage" :page-size="30"
                :total="totalEventPerPersonPerDayCountCount" @current-change="getEventPerPersonPerDayCount" background
                layout="total,prev,pager,next" />
        </div>
        <h1>每天查看每条Event时长分布</h1>
        <div>
            <el-radio-group v-model="eventPerEventPerDayTimeDeviceModel" @input="getEventPerEventPerDayTime">
                <el-radio-button v-for="(label, key) in atomProduction" :key="key" :label="label">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table :data="eventPerEventPerDayTime"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.exactDate }}
                    </template>
                </el-table-column>
                <el-table-column label="小于3秒" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.lessThan3Secs }}
                    </template>
                </el-table-column>
                <el-table-column label="3-6秒" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.between3And6Secs }}
                    </template>
                </el-table-column>
                <el-table-column label="6-12秒" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.between6And12Secs }}
                    </template>
                </el-table-column>
                <el-table-column label="大于12秒" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.greaterThan12Secs }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalEventPerEventPerDayTimeCount != 0" :current-page.sync="eventPerEventPerDayTimeCurrentPage" :page-size="30"
                :total="totalEventPerEventPerDayTimeCount" @current-change="getEventPerEventPerDayTime" background
                layout="total,prev,pager,next" />
        </div>
    </div>
</template>
    
<script>

import { atomEventPerPersonPerDayCount, atomEventPerEventPerDayTime} from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'
import {changetime} from '@/utils/util-date'
import { atomProduction, getAtomDeviceModel } from '@/views/atomStat/atomUtil'

export default {
    name: 'atomEvents',
    components: {
    },
    data() {
        return {
            eventPerPersonPerDayCountDeviceModel: "All",
            eventPerPersonPerDayCount: [],
            totalEventPerPersonPerDayCountCount: 0,
            eventPerPersonPerDayCountCurrentPage: 1,

            eventPerEventPerDayTimeDeviceModel: "All",
            eventPerEventPerDayTime: [],
            totalEventPerEventPerDayTimeCount: 0,
            eventPerEventPerDayTimeCurrentPage: 1
        }
    },
    computed: {
        atomProduction() {
            return  {All: 'All', ...atomProduction};
        }
    },
    mounted() {
        this.getEventPerPersonPerDayCount()
        this.getEventPerEventPerDayTime()
    },
    methods: {
        getEventPerPersonPerDayCount() {
            startLoading()

            let param = this.eventPerPersonPerDayCountDeviceModel === 'All' ? {
                currentPage: this.eventPerPersonPerDayCountCurrentPage - 1
            } : {
                currentPage: this.eventPerPersonPerDayCountCurrentPage - 1,
                deviceModel: getAtomDeviceModel(this.eventPerPersonPerDayCountDeviceModel)
            }

            atomEventPerPersonPerDayCount(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.eventPerPersonPerDayCount = response.data
                    this.totalEventPerPersonPerDayCountCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        getEventPerEventPerDayTime() {
            startLoading()

            let param = this.eventPerEventPerDayTimeDeviceModel === 'All' ? {
                currentPage: this.eventPerEventPerDayTimeCurrentPage - 1
            } : {
                currentPage: this.eventPerEventPerDayTimeCurrentPage - 1,
                deviceModel: getAtomDeviceModel(this.eventPerEventPerDayTimeDeviceModel)
            }

            atomEventPerEventPerDayTime(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.eventPerEventPerDayTime = response.data
                    this.totalEventPerEventPerDayTimeCount = response.data[0].totalRowCount
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
    