<template>
    <div>
        <h1>Agent详情数据统计</h1>
        <div class="header" style="display: flex; align-items: center;">
            <label style="margin-right: 10px; font-size: 15px;">请选择agent:</label>
            <el-select v-model="selectedAgentType" clearable placeholder="请选择agent" @change="handleAgentChange">
                <el-option v-for="item in agentList" :key="item.agent_type" :label="item.agent_name" :value="item.agent_type">
                </el-option>
            </el-select>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table v-if="dataList.length" :data="dataList"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.date }}
                    </template>
                </el-table-column>
                <el-table-column label="详情页浏览次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.pageDetailCount }}
                    </template>
                </el-table-column>
                <el-table-column label="服务总用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.totalUserCount }}
                    </template>
                </el-table-column>
                <el-table-column label="调用总设备数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.totalDevices }}
                    </template>
                </el-table-column>
                <el-table-column label="服务生效用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.userCount }}
                    </template>
                </el-table-column>
                 
                <el-table-column label="调用用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.uniqueUsers }}
                    </template>
                </el-table-column>
                <el-table-column label="调用设备数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.uniqueDevices }}
                    </template>
                </el-table-column>
                <el-table-column label="调用次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.totalCalls }}
                    </template>
                </el-table-column>
                <el-table-column label="新增用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.newUserCount }}
                    </template>
                </el-table-column>
                <el-table-column label="复购用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.repeatUserCount }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getAgentName, getAgentDetailData } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'AgentDetailData',
    data() {
        return {
            agentList: [],
            selectedAgentType: null,
            dataList: []
        }
    },
    mounted() {
        this.fetchAgentNames()
    },
    methods: {
        fetchAgentNames() {
            startLoading()
            getAgentName().then(response => {
                if (response.code === 0) {
                    const convertedData = response.data.map(item => ({
                        agent_type: item.agentType,
                        agent_name: item.agentName,
                        serviceId: item.serviceId,
                        serviceName: item.serviceName
                    }))
                    this.agentList = [{ agent_type: null, agent_name: '请选择agent' }, ...convertedData]
                }
                endLoading()
            }).catch(error => {
                console.log(error)
                endLoading()
            })
        },
        handleAgentChange() {
            this.fetchAgentDetailData()
        },
        fetchAgentDetailData() {
            startLoading()
            const param = { agentType: this.selectedAgentType }
            getAgentDetailData(param).then(response => {
                if (response.code === 0) {
                    this.dataList = response.data
                }
                endLoading()
            }).catch(error => {
                console.log(error)
                endLoading()
            })
        }
    }
}
</script>