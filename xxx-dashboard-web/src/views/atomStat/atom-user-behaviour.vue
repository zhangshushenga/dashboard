<template>
    <div>
        <h1>atom用户行为统计</h1>
        <!-- 增加 overflow-x: auto 支持水平滚动 -->
        <div style="margin-bottom: 50px; overflow-x: auto;">
            <el-table 
                v-if="filteredData.length"
                :data="filteredData"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                class="airlineDeviceTable"
                row-key="userId"
                style="margin-top: 24px; min-width: 1800px;"
                height="1200"
                :scrollbar-always-on="true"> 

                <el-table-column label="邮箱" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.userEmail }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定设备时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindDeviceTime }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定设备数量" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindDeviceCount }}
                    </template>
                </el-table-column>
                <el-table-column label="生效设备数量" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.effectDeviceCount }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定agent设备数量" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindAgentDeviceCount }}
                    </template>
                </el-table-column>
                <el-table-column label="agent开通次数" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.agentOpenedCount }}
                    </template>
                </el-table-column>
                <el-table-column label="点击agentStream次数" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.clickAgentStreamCount }}
                    </template>
                </el-table-column>
                <el-table-column label="点击详情页次数" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.clickDetailPageCount }}
                    </template>
                </el-table-column>
                <el-table-column label="首次开通agent名称" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.serviceName1 }}
                    </template>
                </el-table-column>
                <el-table-column label="首次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.firstOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定首次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindFirstOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="首次开通的套餐类型" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.paymentType1 }}
                    </template>
                </el-table-column>

                <el-table-column label="第二次开通agent名称" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.serviceName2 }}
                    </template>
                </el-table-column>
                <el-table-column label="第二次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.secondOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定第二次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindSecondOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="第二次开通的套餐类型" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.paymentType2 }}
                    </template>
                </el-table-column>

                <el-table-column label="第三次开通agent名称" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.serviceName3 }}
                    </template>
                </el-table-column>
                <el-table-column label="第三次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.thirdOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定第三次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindThirdOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="第三次开通的套餐类型" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.paymentType3 }}
                    </template>
                </el-table-column>

                <el-table-column label="第四次开通agent名称" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.serviceName4 }}
                    </template>
                </el-table-column>
                <el-table-column label="第四次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.fourthOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定第四次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindFourthOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="第四次开通的套餐类型" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.paymentType4 }}
                    </template>
                </el-table-column>

                <el-table-column label="第五次开通agent名称" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.serviceName5 }}
                    </template>
                </el-table-column>
                <el-table-column label="第五次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.fifthOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="绑定第五次开通agent的时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.bindFifthOpenAgentTime }}
                    </template>
                </el-table-column>
                <el-table-column label="第五次开通的套餐类型" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.paymentType5 }}
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
import { atomUserBehaviour } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomUserBehaviour',
    data() {
        return {
            dataday: [],
            deviceIds: [],
            agents: [],
            serviceIdToName: {
                "f7468696930644c595daf5600c4f5e3c": "照看宝宝的贝朵",
                "50d0517b27e643b59cd5635d8872d15d": "爱猫的丸子",
                "c508fb246834409394d47ef1d88287b3": "爱狗的太郎",
                "653a72cfe0a94aae9d10e7eb79883005": "陪餐小美-生成描述",
                "462f2d71d0244cccaab16d0851e0db51": "viewSay"
            },
            paymentType:{
                "0":"免费",
                "1":"Apple",
                "2":"Google",
                "3":"PayPal",
                "4":"兑换码"
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
    },
    mounted() {
        this.getatomUserBehaviour()
    },
    
    methods: {
        getatomUserBehaviour() {
            startLoading();

            const param = {};
            // param.timeZone = 'Asia/Tokyo';

            atomUserBehaviour(param).then((response) => {
                endLoading();
                if (response.code === 0) {
                    this.dataday = response.data
                    .filter(item => item.timeZone === 'Asia/Tokyo')
                    .map(item => {
                        return {
                            ...item,
                            serviceName1: this.serviceIdToName[item.firstOpenAgentName],
                            serviceName2: this.serviceIdToName[item.secondOpenAgentName],
                            serviceName3: this.serviceIdToName[item.thirdOpenAgentName],
                            serviceName4: this.serviceIdToName[item.fourthOpenAgentName],
                            serviceName5: this.serviceIdToName[item.fifthOpenAgentName],

                            paymentType1: this.paymentType[item.firstOpenPackageType],
                            paymentType2: this.paymentType[item.secondOpenPackageType],
                            paymentType3: this.paymentType[item.thirdOpenPackageType],
                            paymentType4: this.paymentType[item.fourthOpenPackageType],
                            paymentType5: this.paymentType[item.fifthOpenPackageType],
                        };
                    });
                }
            }).catch((error) => {
                endLoading();
                console.log(error);
            });
        }
    }
}
</script>
