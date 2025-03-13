<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <el-table :data="tableData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column prop="firmwareVersion" label="固件版本" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.firmwareVersion }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="升级次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.totalUpgrades }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="升级成功次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.successfulUpgrades }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="升级成功率" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.successRate + '%' }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="升级成功平均时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.averageSuccessDurationSeconds) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="升级成功时长分布">
                        <el-table-column align="left" label="小于1分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationLessThan1Minute }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="1分钟-2分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration1To2Minutes }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="2分钟-3分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration2To3Minutes }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="3分钟-4分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration3To4Minutes }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="4分钟-5分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.duration4To5Minutes }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="大于5分钟" min-width="10%">
                            <template slot-scope="scope">
                                {{ scope.row.durationGreaterThan5Minutes }}
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
import { getFirmwareUpgradeData } from '@/api/api-stat'
import { changetime } from '../../utils/util-date'
import { projectChannel } from '@/utils/util-broadcast'

export default {
    data() {
        return {
            tableData: [],
            channel: new BroadcastChannel(projectChannel.name),
        }
    },
    beforeUnmount() {
        // 关闭通道，以避免内存泄漏
        this.channel.close();
    },

    mounted() {
        let param = {}
        this.getData(param)
        // 监听通道消息
        this.channel.addEventListener('message', (event) => {
            if (event.data.action === projectChannel.changeAction) {
                this.getData(param)
            }
        });

    },
    methods: {
        getData(param) {
            startLoading()
            getFirmwareUpgradeData(param).then(response => {
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
  