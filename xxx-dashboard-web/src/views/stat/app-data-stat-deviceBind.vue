<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <el-table :data="tableData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column label="软件版本" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.appVersion }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="绑定次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.totalCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="成功次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.successCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="绑定总时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.totalBindingDuration) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="平均绑定时长" min-width="10%">
                        <template slot-scope="scope">
                            {{ changeSecond(scope.row.avgBindDuring) }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="绑定成功率" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.bindSuccessRate * 100 + '%' }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="WIFI连接失败次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.wifiFailedCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="认证失败次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.authFailedCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="绑定超时次数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.timeOutCount }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>
<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getDeviceBindData } from '@/api/api-stat'
import { changetime } from '../../utils/util-date'
import { projectChannel } from '@/utils/util-broadcast'

export default {
    data() {
        return {
            tableData: [],
            channel: new BroadcastChannel(projectChannel.name),
        }
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
    beforeUnmount() {
        // 关闭通道，以避免内存泄漏
        this.channel.close();
    },

    methods: {
        getData(param) {
            startLoading()
            getDeviceBindData(param).then(response => {
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
  