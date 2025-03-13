<template>
    <div style="margin-left: 10px; margin-right: 10px;">
        <h1>安装SD卡设备数</h1>
        <div>
            <el-radio-group v-model="SDCardIntallDeviceModel" @input="getSDCardInstall">
                <el-radio-button v-for="(label, key) in atomProduction" :key="key" :label="label">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table :data="SDCardInstall"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="存在" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.tfExists }}
                    </template>
                </el-table-column>
                <el-table-column label="不存在" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.tfNotExists }}
                    </template>
                </el-table-column>
                <el-table-column label="不支持" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.tfNotSupported }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <h1>SD卡容量分布情况</h1>
        <div>
            <el-radio-group v-model="SDCarCapacityDeviceModel" @input="getSDCarCapacity">
                <el-radio-button v-for="(label, key) in atomProduction" :key="key" :label="label">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-bottom: 50px;">
            <el-table :data="SDCarCapacity"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                style="margin-top: 24px; width: 100%">
                <el-table-column label="16GB" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.size16G }}
                    </template>
                </el-table-column>
                <el-table-column label="32GB" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.size32G }}
                    </template>
                </el-table-column>
                <el-table-column label="64GB" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.size64G }}
                    </template>
                </el-table-column>
                <el-table-column label="大于64GB" min-width="10%">
                    <template slot-scope="scope">
                        {{ scope.row.sizeOver64G }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

import { atomSDCardInstall, atomSDCardCapacity } from '@/api/atom-stat'
import { endLoading, startLoading } from '@/utils/loading'
import { atomProduction, getAtomDeviceModel } from '@/views/atomStat/atomUtil'

export default {
    name: 'atomSDCard',
    components: {
    },
    data() {
        return {
            SDCardIntallDeviceModel: "All",
            SDCardInstall: [],

            SDCarCapacityDeviceModel: "All",
            SDCarCapacity: [],
        }
    },
    computed: {
        atomProduction() {
            return  {All: 'All', ...atomProduction};
        }
    },
    mounted() {
        this.getSDCardInstall()
        this.getSDCarCapacity()
    },
    methods: {
        getSDCardInstall() {

            startLoading()

            let param = this.SDCardIntallDeviceModel === 'All' ? {} : {
                deviceModel: getAtomDeviceModel(this.SDCardIntallDeviceModel)
            }

            atomSDCardInstall(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.SDCardInstall = [response.data]
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },
        getSDCarCapacity() {
            startLoading()

            let param = this.SDCarCapacityDeviceModel === 'All' ? {} : {
                deviceModel: getAtomDeviceModel(this.SDCarCapacityDeviceModel)
            }

            atomSDCardCapacity(param).then((response) => {
                endLoading()
                if (response.code === 0) {
                    this.SDCarCapacity = [response.data]
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        }
    }
}
</script>