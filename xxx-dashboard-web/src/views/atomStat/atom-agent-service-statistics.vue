<template>
    <div>
        <h1>Agent用户、设备、服务相关统计</h1>
        <div style="margin-bottom: 50px;">
            <label for="analysis-result" style="font-size: 16px;">大模型分析结果: <br><br></label>
            <label for="analysis-result" v-html="analysisResult.replace(/\n/g, '<br>')" style="font-size: 15px; font-weight: normal;"></label>
            <el-table :data="dataday"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label=日期 min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.date }}
                    </template>
                </el-table-column>
                <el-table-column label="总激活设备数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.totalActiveDeviceCount }}
                    </template>
                </el-table-column>
                <el-table-column label="新增设备数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.newActiveDeviceCount }}
                    </template>
                </el-table-column>
                <el-table-column label="总服务用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.totalServiceUserCount }}
                    </template>
                </el-table-column>
                <el-table-column label="新增服务用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.newServiceUserCount }}
                    </template>
                </el-table-column>
                <el-table-column label="生效的设备数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.serviceOpeningCount }}
                    </template>
                </el-table-column>
                <el-table-column label="总服务设备数/开通比" min-width="10%"
                    :header-cell-style="{ 'white-space': 'normal', 'word-break': 'break-word', 'text-align': 'center' }">
                    <template slot-scope="scope">
                        {{ scope.row.totalServiceDeviceCount }} 
                        ({{ scope.row.totalActiveDeviceCount !== 0 ? (scope.row.totalServiceDeviceCount / scope.row.totalActiveDeviceCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="viewSay使用数/比例" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.viewSayUseCount }} 
                        ({{ scope.row.totalActiveDeviceCount !== 0 ? (scope.row.viewSayUseCount / scope.row.totalActiveDeviceCount * 100).toFixed(2) : 0.00 }}%) 
                    </template>
                </el-table-column>
                <el-table-column label="viewSay复购数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.viewSayCountRePurchase }} 
                        ({{ scope.row.viewSayUseCount !== 0 ? (scope.row.viewSayCountRePurchase / scope.row.viewSayUseCount * 100).toFixed(2) : 0.00 }}%) 
                    </template>
                </el-table-column>
                <el-table-column label="宝宝奈绪使用数/比例" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.babyCareUseCount }} 
                        ({{ scope.row.totalActiveDeviceCount !== 0 ? (scope.row.babyCareUseCount / scope.row.totalActiveDeviceCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="宝宝奈绪复购数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.babyCareCountRePurchase }} 
                        ({{ scope.row.babyCareUseCount !== 0 ? (scope.row.babyCareCountRePurchase / scope.row.babyCareUseCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="猫观察员使用数/比例" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.catCareUseCount }} 
                        ({{ scope.row.totalActiveDeviceCount !== 0 ? (scope.row.catCareUseCount / scope.row.totalActiveDeviceCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="猫观察员复购数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.catCareCountRePurchase }} 
                        ({{ scope.row.catCareUseCount !== 0 ? (scope.row.catCareCountRePurchase / scope.row.catCareUseCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="狗观察员使用数/比例" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.dogCareUseCount }} 
                        ({{ scope.row.totalActiveDeviceCount !== 0 ? (scope.row.dogCareUseCount / scope.row.totalActiveDeviceCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="狗观察员复购数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.dogCareCountRePurchase }} 
                        ({{ scope.row.dogCareUseCount !== 0 ? (scope.row.dogCareCountRePurchase / scope.row.dogCareUseCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="陪餐怪兽使用数/比例" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.mealWithUseCount }} 
                        ({{ scope.row.totalActiveDeviceCount !== 0 ? (scope.row.mealWithUseCount / scope.row.totalActiveDeviceCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
                <el-table-column label="陪餐怪兽复购数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.mealWithCountRePurchase }} 
                        ({{ scope.row.mealWithUseCount !== 0 ? (scope.row.mealWithCountRePurchase / scope.row.mealWithUseCount * 100).toFixed(2) : 0.00 }}%)
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { atomAgentService } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomAgentService',
    data() {
        return {
            dataday: [],
            analysisResult: ''
        }
    },
    mounted() {
        this.getAtomAgentServiceStatistics()
    },
    methods: {
        getAtomAgentServiceStatistics() {
            startLoading()

            let param = { "current_page": 1}

            atomAgentService(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    // 使用 some() 方法在找到第一个符合条件的项后退出循环
                    response.data.some(item => {
                        if (item['dataAnalysisResult'] != '-1') {
                            this.analysisResult = item['dataAnalysisResult'];
                            console.log("analysisResult:", this.analysisResult);
                            return true; // 退出循环
                        }
                        console.log("date:", item['date']);
                        return false; // 继续循环
                    });

                    // 将数据映射到 dataday 数组中
                    this.dataday = response.data.map(item => {
                        return {
                            ...item, // 保留 item 对象中的所有属性
                            analysisResult: item['dataAnalysisResult'] // 添加或覆盖 analysisResult 属性
                        };
                    });
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        }
    }
}
</script>
