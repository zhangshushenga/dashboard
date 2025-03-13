<template>
    <div>
        <h1>总激活设备</h1>
        <div style="font-size: xx-large;">{{totalActivateDevices}}</div>
        <h1>日激活设备</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="dailyActivateDeivces"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.activateDate }}
                    </template>
                </el-table-column>
                <el-table-column label="日激活设备" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.activateDevices }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalDailyActivateDevicesCount != 0" :current-page.sync="dailyActivateDevicesCurrentPage" :page-size="30"
                :total="totalDailyActivateDevicesCount" @current-change="getCurrentDailyActivateDevices" background
                layout="total,prev,pager,next" />
        </div>
    </div>
</template>
    
<script>

import {atomActivateDevices, atomDailyActivateDevices} from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomDevices',
    components: {
    },
    data() {
        return {
            totalActivateDevices: 0,

            dailyActivateDeivces: [],
            totalDailyActivateDevicesCount: 0,
            dailyActivateDevicesCurrentPage: 1,
        }
    },
    computed: {

    },
    mounted() {
        startLoading()
        Promise.all([
            this.getActiveDevices(),
            this.getDailyActivateDevices()
        ]).then(response => {
            endLoading()
        }).catch(error => {
            endLoading()
        })
    },
    methods: {
        async getCurrentDailyActivateDevices() {
            startLoading()
            let _ = await this.getDailyActivateDevices()
            endLoading()
        },
        getActiveDevices() {
            return atomActivateDevices().then((response) => {
                this.totalActivateDevices = response.data.activateDevices
            }).catch((error) => {

            })
        },
        getDailyActivateDevices() {
            let param = {
                currentPage: this.dailyActivateDevicesCurrentPage - 1
            }

            return atomDailyActivateDevices(param).then((response) => {
                if (response.code === 0) {
                    this.dailyActivateDeivces = response.data
                    this.totalDailyActivateDevicesCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
    