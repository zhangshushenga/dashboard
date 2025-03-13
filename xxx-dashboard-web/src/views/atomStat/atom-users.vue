<template>
    <div>
        <h1>总激活用户</h1>
        <div style="font-size: xx-large;">{{totalActivateUsers}}</div>
        <h1>日激活用户</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="dailyActivateUsers"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.activateDate }}
                    </template>
                </el-table-column>
                <el-table-column label="日激活用户" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.activateUsers }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalDailyActivateUsersCount != 0" :current-page.sync="dailyActivateUsersCurrentPage" :page-size="30"
                :total="totalDailyActivateUsersCount" @current-change="getCurrentDailyActivateUsers" background
                layout="total,prev,pager,next" />
        </div>
        <h1>日活用户</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="dailyActiveUsers"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="日期" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.useDate }}
                    </template>
                </el-table-column>
                <el-table-column label="日活用户" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.activeUsers }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalDailyActiveUsersCount != 0" :current-page.sync="dailyActiveUsersCurrentPage" :page-size="30"
                :total="totalDailyActiveUsersCount" @current-change="getCurrentDailyActiveUsers" background
                layout="total,prev,pager,next" />
        </div>
        <h1>月活用户</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="monthlyActiveUsers"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="月份" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.monthStart }}
                    </template>
                </el-table-column>
                <el-table-column label="月活用户" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.activeUsers }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalMonthlyActiveUsersCount != 0" :current-page.sync="monthlyActiveUsersCurrentPage" :page-size="30"
                :total="totalMonthlyActiveUsersCount" @current-change="getCurrentMonthlyActiveUsers" background
                layout="total,prev,pager,next" />
        </div>
        <h1>系统用户</h1>
        <div style="margin-bottom: 50px;">
            <el-table :data="phoneosActiveUsers"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="系统" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.phoneOs }}
                    </template>
                </el-table-column>
                <el-table-column label="用户" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.phoneOsUsers }}
                    </template>
                </el-table-column>
            </el-table>
        </div>   
    </div>
</template>
    
<script>

import {atomActivateUsers, atomDailyActivateUsers, atomDailyActiveUsers, atomMonthlyActiveUsers, atomPhoneosActiveUsers} from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    name: 'atomUsers',
    components: {
    },
    data() {
        return {
            totalActivateUsers: 0,

            dailyActivateUsers: [],
            totalDailyActivateUsersCount: 0,
            dailyActivateUsersCurrentPage: 1,

            dailyActiveUsers: [],
            totalDailyActiveUsersCount: 0,
            dailyActiveUsersCurrentPage: 1,

            monthlyActiveUsers: [],
            totalMonthlyActiveUsersCount: 0,
            monthlyActiveUsersCurrentPage: 1,

            phoneosActiveUsers: [],
        }
    },
    computed: {

    },
    mounted() {
        startLoading()
        Promise.all([
            this.getActiveUsers(),
            this.getDailyActivateUsers(),
            this.getDailyActiveUsers(),
            this.getMonthlyActiveUsers(),
            this.getPhoneosActiveUsers()
        ]).then(response => {
            endLoading()
        }).catch(error => {
            endLoading()
        })
    },
    methods: {
        async getCurrentDailyActivateUsers() {
            startLoading()
            let _ = await this.getDailyActivateUsers()
            endLoading()
        },
        async getCurrentDailyActiveUsers() {
            startLoading()
            let _ = await this.getDailyActiveUsers()
            endLoading()
        },
        async getCurrentMonthlyActiveUsers() {
            startLoading()
            let _ = await this.getMonthlyActiveUsers()
            endLoading()
        },
        getActiveUsers() {
            return atomActivateUsers().then((response) => {
                this.totalActivateUsers = response.data.activateUsers
            }).catch((error) => {

            })
        },
        getDailyActivateUsers() {
            let param = {
                currentPage: this.dailyActivateUsersCurrentPage - 1
            }

            return atomDailyActivateUsers(param).then((response) => {
                if (response.code === 0) {
                    this.dailyActivateUsers = response.data
                    this.totalDailyActivateUsersCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        getDailyActiveUsers() {
            let param = {
                currentPage: this.dailyActiveUsersCurrentPage - 1
            }

            return atomDailyActiveUsers(param).then((response) => {
                if (response.code === 0) {
                    this.dailyActiveUsers = response.data
                    this.totalDailyActiveUsersCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        getMonthlyActiveUsers() {
            let param = {
                currentPage: this.monthlyActiveUsersCurrentPage - 1
            }

            return atomMonthlyActiveUsers(param).then((response) => {
                if (response.code === 0) {
                    this.monthlyActiveUsers = response.data
                    this.totalMonthlyActiveUsersCount = response.data[0].totalRowCount
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        getPhoneosActiveUsers() {
            return atomPhoneosActiveUsers().then((response) => {
                if (response.code === 0) {
                    this.phoneosActiveUsers = response.data
                }
            }).catch((error) => {
                console.log(error)
            })
        }

    }
}
</script>
    