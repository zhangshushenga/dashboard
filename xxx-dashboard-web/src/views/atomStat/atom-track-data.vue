<template>
    <div>
        <h1>目标用户app使用行为</h1>
        <div style="margin-bottom: 50px;">
            <label for="device-id-select">设备ID：</label>
            <el-select v-model="selectedDeviceId" placeholder="请选择设备ID" @change="getatomTrackData">
                <el-option
                v-for="item in deviceIds"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
            <span v-if="firstOpenTime">首次开通服务的时间：{{ firstOpenTime }}</span>
            <el-table v-if="filteredData.length" :data="filteredData"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.date }}
                    </template>
                </el-table-column>
                <el-table-column label="设备id" min-width="15%">
                    <template slot-scope="scope">
                        {{ scope.row.deviceId }}
                    </template>
                </el-table-column>
                <el-table-column label="agent" min-width="15%">
                    <template slot-scope="scope">
                        {{ scope.row.serviceName }}
                    </template>
                </el-table-column>
                <el-table-column label="生成的events数量" min-width="15%">
                    <template slot-scope="scope">
                        {{ scope.row.generatedEventsCount }}
                    </template>
                </el-table-column>
                <el-table-column label="查看的events数量" min-width="15%">
                    <template slot-scope="scope">
                        {{ scope.row.viewedEventsCount }}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="events播放率(%)" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.playRate }}
                    </template> -->
                <!-- </el-table-column> -->
                <el-table-column label="推送点击数量" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.pushClickCount }}
                    </template>
                </el-table-column>
                <el-table-column label="使用APP时长" min-width="10%">
                    <template slot-scope="scope">
                        {{ Math.round(scope.row.appUsageTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="进入APP次数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.appEnterCount }}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="首次开通服务的时间" min-width="15%">
                    <template slot-scope="scope">
                        {{ scope.row.firstOpenTime }}
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
    </div>
</template>

<script>
import { atomTrackData } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomTrackData',
    data() {
        return {
            dataday: [],
            selectedDeviceId: '',
            selectedAgent: '',
            deviceIds: [],
            agents: [],
            serviceIdToName: {
                "f7468696930644c595daf5600c4f5e3c": "照看宝宝的贝朵",
                "50d0517b27e643b59cd5635d8872d15d": "爱猫的丸子",
                "c508fb246834409394d47ef1d88287b3": "爱狗的太郎",
                "653a72cfe0a94aae9d10e7eb79883005": "陪餐小美-生成描述"
            }
        }
    },
    computed: {
        filteredData() {
            return this.dataday.filter(item => {
                return (this.selectedDeviceId === '' || item.deviceId === this.selectedDeviceId) &&
                    (this.selectedAgent === '' || item.serviceName === this.selectedAgent);
            });
        },
        firstOpenTime() {
        const selectedData = this.dataday.find(item => item.deviceId === this.selectedDeviceId && item.firstOpenTime !== '1900-01-01');
            return selectedData ? selectedData.firstOpenTime : '';
        },
    },
    mounted() {
        this.getatomTrackData()
    },
    
    methods: {
        getatomTrackData() {
            startLoading();

            const param = { };

            atomTrackData(param).then((response) => {
                endLoading();
                if (response.code === 0) {
                    this.dataday = response.data.map(item => {
                        const eventIdsSet = new Set(item.event_ids || []);
                        const eventIdLogSet = new Set(item.event_id_log || []);
                        const viewedEventsCount = [...eventIdsSet].filter(id => eventIdLogSet.has(id)).length;

                        return {
                            ...item,
                            firstOpenTime: item.firstOpenTime || '1900-01-01',
                            generatedEventsCount: item.eventCount || 0,
                            viewedEventsCount: item.eventPlayCount || 0,
                            playRate: parseFloat(((item.eventPlayCount || 0) / (item.eventCount || 1)).toFixed(4))*100 || 0,
                            pushClickCount: item.pushClickCount || 0,
                            appUsageTime: item.appUseTime || 0,
                            appEnterCount: item.appUseCount || 0,
                            serviceName: this.serviceIdToName[item.serviceId]
                        };
                    });
                    // 更新设备ID和Agent的列表
                    this.deviceIds = [...new Set(this.dataday.map(item => item.deviceId))];
                    this.agents = [...new Set(this.dataday.map(item => item.serviceName))];
                }
            }).catch((error) => {
                endLoading();
                console.log(error);
            });
        }
    }
}
</script>
