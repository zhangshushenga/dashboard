<template>
    <div>
        <h1>Agent_Log数据统计</h1>
        <div class="header" style="display: flex; align-items: center;">
            <label style="margin-right: 10px; font-size: 15px;">请选择agent:</label>
            <el-select v-model="selectAgentType" clearable placeholder="请选择agent" @change="handleChange">
                <el-option v-for="item in agentType" :key="item.agent_type" :label="item.agent_name" :value="item.agent_type">
                </el-option>
            </el-select>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table v-if="dataday.length" :data="dataday"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.date }}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="当前agent类型" min-width="20%">
                    <template slot-scope="scope">
                        {{ scope.row.agentType }}
                    </template>
                </el-table-column> -->
                <el-table-column label="总访问次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.logCount }}
                    </template>
                </el-table-column>
                <el-table-column label="访问的总设备数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.deviceCount }}
                    </template>
                </el-table-column>
                <el-table-column label="访问的总用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.userCount }}
                    </template>
                </el-table-column>
                <el-table-column
                    v-for="(key, value) in this.dataday[0].newStageData"
                    :key="value"
                    :prod="value"
                    :label="value"
                    min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.newStageData[value] }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { atomAgentLogData } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomAgentLogData',
    data() {
        return {
            dataday: [],
            selectAgentType: 0,
            agentType: [
                { "agent_type": 0, "agent_name": "all_agent"},
                { "agent_type": 124, "agent_name": "viewSay短描述"},
                { "agent_type": 118, "agent_name": "照看宝宝的贝朵"},
                { "agent_type": 120, "agent_name": "爱狗的太郎"},
                { "agent_type": 119, "agent_name": "爱猫的丸子"},
                { "agent_type": 122, "agent_name": "陪餐小美-生成描述"},
                { "agent_type": 123, "agent_name": "陪餐小美-生成总结"}
            ],
            stageName: {
                "0": [],
                "124": ["生成描述数"],
                "118": ["触发判断图片对象数", "成功生成描述数"],
                "120": ["触发判断图片对象数", "成功生成描述数"],
                "119": ["触发判断图片对象数", "成功生成描述数"],
                "122": ["触发判断图片对象数", "成功生成描述数"],
                "123": ["成功生成用餐互动数"]
            },
            totalLineCount: 0
        }
    },
    mounted() {
        this.getatomAgentLogData()
    },
    watch: {
        selectAgentType(newAgentType, oldAgentType) {
            if (newAgentType !== oldAgentType) {
                this.getatomAgentLogData();
            }
        }
    },
    methods: {
        getatomAgentLogData() {
            startLoading();

            const param = { "agentType": this.selectAgentType };

            atomAgentLogData(param).then((response) => {
                endLoading();
                if (response.code === 0) {
                    this.dataday = response.data.map(item => {
                        const newItem = { ...item };
                        const newStageData = {};

                        this.stageName[this.selectAgentType].forEach((label, index) => {
                            const stageCount = item[`stage${index + 1}Count`];
                            this.totalLineCount += stageCount
                            console.log("totalLineCount", this.totalLineCount)
                            if (this.totalLineCount > 0) {
                                console.log("stageCount", stageCount)
                                newStageData[label] = stageCount;
                            }
                        });

                        newItem.newStageData = newStageData;
                        console.log("newStageData:", newStageData)

                        return newItem;
                    });
                    console.log("dataday:", this.dataday)
                }
            }).catch((error) => {
                endLoading();
                console.log(error);
            });
        }
    }
}
</script>
