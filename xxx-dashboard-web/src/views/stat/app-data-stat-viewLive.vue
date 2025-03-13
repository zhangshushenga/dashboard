<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-top: 5px; margin-right: 10px; font-size: 12px;">是否只查看美区数据</div>
                    <el-switch v-model="isAmericaData" @change="getData">
                    </el-switch>
                </div>
                <el-table :data="tableData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column label="时间" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.exactDate }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="观看总次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.totalViews }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="观看时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.totalDuration) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="平均观看时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.avgDuration) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="观看人数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.perViews }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="每个用户平均观看次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.avgViewsPerUser }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="每人每天观看时长分布">
                        <el-table-column align="left" label="小于5分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationLt5min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="5分钟-10分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration5To10min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="10分钟-15分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration10To15min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="15分钟-20分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration15To20min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="20分钟-30分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration20To30min }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="大于30分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationGt30min }}
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
import { getViewLiveData } from '@/api/api-stat'
import { changetime } from '../../utils/util-date'
import { projectChannel } from '@/utils/util-broadcast'

export default {
    data() {
        return {
            tableData: [],
            channel: new BroadcastChannel(projectChannel.name),
            isAmericaData: false
        }
    },
    mounted() {
        this.getData()
        // 监听通道消息
        this.channel.addEventListener('message', (event) => {
            if (event.data.action === projectChannel.changeAction) {
                this.getData()
            }
        });
    },
    methods: {
        getData() {
            let param = { 'timeZone': this.isAmericaData === false ? '' : 'America' }
            startLoading()
            getViewLiveData(param).then(response => {
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
  