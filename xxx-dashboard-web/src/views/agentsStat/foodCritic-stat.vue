<template>
    <div>
        <h1>每日触发/分享次数</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="enterData"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="时间" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.triggerDate }}
                    </template>
                </el-table-column>
                <el-table-column label="触发次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.triggerCount }}
                    </template>
                </el-table-column>
                <el-table-column label="分享次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.shareCount }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalEnterCount != 0" :current-page.sync="enterCurrentPage" :page-size="30"
                :total="totalEnterCount" @current-change="getEnterData" background layout="total,prev,pager,next" />
        </div>
        <h1>每日成功触发次数与生成平均时长</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="generateDayData"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="时间" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.generateDate }}
                    </template>
                </el-table-column>
                <el-table-column label="触发次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.dayGenerateCount }}
                    </template>
                </el-table-column>
                <el-table-column label="平均原始资源大小(MB)" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgOriginResourceSize.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="平均压缩后资源大小(MB)" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgTargetResourceSize.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="平均压缩时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgProcessSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="平均上传时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgUploadSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="平均生成时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgResultSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="平均其他接口时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgOtherSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="平均总时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.avgDurationSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalGenerateDayCount != 0" :current-page.sync="totalGenerateDayCount" :page-size="30"
                :total="totalGenerateDayCount" @current-change="getGenerateDayData" background
                layout="total,prev,pager,next" />
        </div>
        <h1>生成时长详情</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="generateData"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="生成时间" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.startTime }}
                    </template>
                </el-table-column>
                <el-table-column label="原始资源大小(MB)" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.originResourceSize.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="压缩后资源大小(MB)" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.targetResourceSize.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="压缩时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.processSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="上传时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.uploadSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="生成时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.resultSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="其他接口时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.otherSeconds }}
                    </template>
                </el-table-column>
                <el-table-column label="总时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.durationSeconds.toFixed(2) }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalGenerateCount != 0" :current-page.sync="generateCurrentPage" :page-size="30"
                :total="totalGenerateCount" @current-change="getGenerateData" background
                layout="total,prev,pager,next" />
        </div>
    </div>
</template>
    
<script>

import { foodCriticGenerate, foodCriticGenerateDay, foodCriticTrigger } from '@/api/agents-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'timeCuratorStat',
    components: {
    },
    data() {
        return {
            enterData: [],
            totalEnterCount: 0,
            enterCurrentPage: 1,

            generateDayData: [],
            totalGenerateDayCount: 0,
            generateDayCurrentPage: 1,

            generateData: [],
            totalGenerateCount: 0,
            generateCurrentPage: 1
        }
    },
    computed: {

    },
    mounted() {
        this.getEnterData()
        this.getGenerateDayData()
        this.getGenerateData()


    },
    methods: {
        getEnterData() {
            startLoading()

            let param = {
                currentPage: this.enterCurrentPage - 1
            }

            foodCriticTrigger(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.enterData = response.data
                    this.totalEnterCount = response.data[0].totalTriggerCount
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        getGenerateDayData() {
            startLoading()

            let param = {
                currentPage: this.generateDayCurrentPage - 1
            }

            foodCriticGenerateDay(param).then((response) => {
                endLoading()

                if (response.code === 0) {
                    this.generateDayData = response.data
                    this.totalGenerateDayCount = response.data[0].totalDayGenerateCount
                }
            }).catch((error) => {
                endLoading()

                console.log(error)
            })
        },
        getGenerateData() {
            startLoading()

            let param = {
                currentPage: this.generateCurrentPage - 1
            }

            foodCriticGenerate(param).then((response) => {
                endLoading()
                console.log(response)
                if (response.code === 0) {
                    this.generateData = response.data
                    this.totalGenerateCount = response.data[0].totalGenerateCount
                }
            }).catch((error) => {
                endLoading()

                console.log(error)
            })
        }
    }
}
</script>
    
<style lang="scss" scoped>
.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3
            }
        }

        .icon-people {
            color: #40c9c6;
        }

        .icon-message {
            color: #36a3f7;
        }

        .icon-money {
            color: #f4516c;
        }

        .icon-shopping {
            color: #34bfa3
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 48px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }
}

@media (max-width: 550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;

        .svg-icon {
            display: block;
            margin: 14px auto !important;
            float: none !important;
        }
    }
}
</style>
    