<template>
    <div class="container">
        <el-container style=" background-color: #ffffff; border-radius:6px ;">
            <el-main>
                <el-table :data="tableData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column prop="exactDate" label="时间" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.exactDate }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="allNum" label="激活设备总数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.activeDeviceCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numSuccess" label="在线设备总数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.connectionOnCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="numSuccessIotOffline" label="离线设备总数" min-width="10%">
                        <template slot-scope="scope">
                            {{ scope.row.connectionOffCount }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>
<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getDeviceStatusData} from '@/api/api-stat'


export default {
    data() {
        return {
            tableData: [],
        }
    },
    mounted() {
        let param = {}
        this.getData(param)
    },
    methods: {
        getData(param) {
            startLoading()
            getDeviceStatusData(param).then(response => {
                console.log(response)
                endLoading()
                if (response.code === 0) {
                    this.tableData = response.data
                }
            }).catch(error => {
                endLoading()
            })
        }
    }
}
</script>
  