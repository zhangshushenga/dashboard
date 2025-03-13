<template>
    <div>
        <h1>区分购买方式,按天统计点击Agent购买按钮的用户数和点击次数</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="dataday"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.day }}
                    </template>
                </el-table-column>
                <el-table-column label="购买类型" min-width="20%">
                    <template slot-scope="scope">
                        {{ getPurchaseType(scope.row.subscribe_flag, scope.row.package_type) }}
                    </template>
                </el-table-column>
                <el-table-column label="用户数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.unique_users }}
                    </template>
                </el-table-column>
                <el-table-column label="点击数" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.total_clicks }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { atomPurchaseMethods } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomPurchaseMethods',
    data() {
        return {
            dataday: []
        }
    },
    mounted() {
        this.getPlaybackForRerEventPerDayTime()
    },
    methods: {
        getPlaybackForRerEventPerDayTime() {
            startLoading()

            let param = { "where": "", "current_page": 1, "show_number": 200000 }

            atomPurchaseMethods(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.dataday = response.data.map(item => ({
                        ...item,
                        purchase_type: this.getPurchaseType(item.subscribe_flag, item.package_type)
                    }))
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        getPurchaseType(subscribeFlag, packageType) {
            if (subscribeFlag === "1") {
                return "订阅购买";
            } else if (subscribeFlag === "0" && packageType === "1") {
                return "限时免费";
            } else if (subscribeFlag === "0" && (packageType === "2" || packageType === "3")) {
                return "按月购买";
            } else {
                return "其他";
            }
        }
    }
}
</script>
