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
                    <el-table-column align="left" label="查看回放视频总数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.totalPlayback }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="查看总时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.totalDuration) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="平均每个回放视频的查看时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.avgDuration) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="查看人数" min-width="10%">
                        <template slot-scope="scope">
                            {{scope.row.perViews}}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="平均每人查看回放数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.avgPlaybackPerUser }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="每日每人查看回放时长的分布">
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
                    <el-table-column align="center" label="每日每个回放被查看的时长分布">
                        <el-table-column align="left" label="小于6秒" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationLt6sec }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="6~12秒" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration6To12sec }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="13~18秒" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration13To18sec }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="19~24秒" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration19To24sec }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="25~30秒" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration25To30sec }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="31~36秒" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration31To36sec }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="大于36秒" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationGt36sec }}
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
import { getViewPlaybackData} from '@/api/api-stat'
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
            startLoading()
            let param = { 'timeZone': this.isAmericaData === false ? '' : 'America' }
            getViewPlaybackData(param).then(response => {
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
        },
    }
}
</script>
  