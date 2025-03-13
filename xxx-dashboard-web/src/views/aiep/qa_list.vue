<template>
    <div class="container">
        <div>客服QA列表</div>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <el-date-picker v-model="valueTime" :end-placeholder="$t('label19')" :picker-options="pickerOptions"
                @change="handleSelectDateChange" :range-separator="$t('label18')" :start-placeholder="$t('label17')"
                align="right" style="width: 30%" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" />
            <el-button :disabled="selectTotal == 0" class="button-style3" size="min" style="margin-right: 20px;"
                @click="exportTaskList">{{ $t('label3') }}
            </el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" class="table"
            @select="onSelect" v-loading="islistDataLoading" @select-all="selectAllRowsData"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="createTime" label="createTime" min-width="15%">
            </el-table-column>
            <el-table-column prop="sessionId" label="sessionId" min-width="20%">
            </el-table-column>
            <el-table-column prop="question" label="question" min-width="30%">
            </el-table-column>
            <el-table-column prop="answer" label="answer" min-width="60%">
            </el-table-column>
        </el-table>
        <el-pagination class="custom-pagination" :current-page.sync="currentPageNum" :page-size="currentPageSize"
            :page-sizes="[10, 20]" :total="total" background layout="total,sizes,prev,pager,next,jumper"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script>
import { getQaList } from '@/api/api-aiep'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            valueTime: '',
            currentPageNum: 1,
            currentPageSize: 20,
            islistDataLoading: false, // 加载列表数据
            query: {},
            total: 0,
            isSelectAll: false,
            listDataIdSelect: [],
            listDataIdSelectNot: [],
            selectTotal: 0,
            tableData: [],
            multipleSelection: []
        }
    },
    mounted() {
        this.firstSearch()
    },
    methods: {
        exportTaskList() {
            const param = {}
            console.log(param)
            if (this.valueTime != null && this.valueTime.length > 0) {
                param.createTimeStart = this.valueTime[0]
                param.createTimeEnd = this.valueTime[1]
            }
            param.idList = this.listDataIdSelect
            param.idNotInList = this.listDataIdSelectNot
            const token = Cookies.get('Admin-Token')
            const baseUrl = process.env.VUE_APP_BASE_API
            const url = baseUrl + '/api/export/chat_log?Authorization=' + token + '&' + this.tageGetUrl(param)
            console.log(url)
            const link = document.createElement('a')
            try {
                link.href = url
            } catch (error) {
                link.href = window.URL.createObjectURL(url)
            }
            link.click()
        },

        tageGetUrl(param, key) {
            var paramStr = ''
            console.log(param)
            if (typeof (param) === 'string' || typeof (param) === 'number' || typeof (param) === 'boolean') {
                return '&' + key + '=' + encodeURIComponent(param)
            } else {
                var data = null
                if (key) {
                    data = param ? param[key] : ''
                } else {
                    data = param
                }
                for (var keyTemp in data) {
                    var dataTemp = data[keyTemp]
                    if (Array.isArray(dataTemp) && dataTemp.length > 0) {
                        var tem = dataTemp.toString()
                        dataTemp = tem
                    }

                    paramStr += this.tageGetUrl(dataTemp, keyTemp)
                    console.log(paramStr)
                }
            }
            return paramStr.substr(1)
        },

        handleSelectDateChange(value) {
            this.firstSearch()
            this.selectAllRowsData([])
        },

        handleCurrentChange(val) {
            console.log('handleCurrentChange', val)
            this.searchData(val)
        },
        handleSizeChange(val) {
            console.log('handleSizeChange', val)
            //this.setLocalPageSize(val)
            this.searchData(1)
        },
        firstSearch() {
            this.currentPageNum = 1
            this.searchData(1)
        },
        searchData(currentPage) {
            this.islistDataLoading = true
            this.query.current = currentPage
            this.query.size = this.currentPageSize
            const param = Object.assign({}, this.query)
            if (this.valueTime != null && this.valueTime.length > 0) {
                param.createTimeStart = this.valueTime[0]
                param.createTimeEnd = this.valueTime[1]
            }
            getQaList(param).then(response => {
                console.log(response)
                if (response.code === 0) {
                    this.tableData = []
                    for (const r of response.data.records) {
                        this.tableData.push(r)
                    }
                    this.total = response.data.total
                    this.$nextTick(() => {
                        this.tableData.forEach(row => {
                            if (this.isSelectAll) {
                                if (this.listDataIdSelectNot.indexOf(row.id) !== -1) {
                                    this.$refs.multipleTable.toggleRowSelection(row, false)
                                } else {
                                    this.$refs.multipleTable.toggleRowSelection(row, true)
                                }
                            } else {
                                if (this.listDataIdSelect.indexOf(row.id) !== -1) {
                                    this.$refs.multipleTable.toggleRowSelection(row, true)
                                } else {
                                    this.$refs.multipleTable.toggleRowSelection(row, false)
                                }
                            }
                        })
                    })
                }
            }).finally(() => {
                this.islistDataLoading = false
            })
        },
        selectAllRowsData(selection) {
            if (selection.length > 0) {
                this.isSelectAll = true
            } else {
                this.isSelectAll = false
            }
            this.listDataIdSelect = []
            this.listDataIdSelectNot = []
            console.log('selection ', selection)
            console.log('isSelectAll ', this.isSelectAll)
            if (this.isSelectAll) {
                this.selectTotal = this.total
            } else {
                this.selectTotal = 0
            }
        },
        onSelect(selection, row) {
            console.log(selection)
            console.log(row)
            const selected = selection.length > 0 && selection.indexOf(row) !== -1
            console.log('is selected', selected)
            if (selected) {
                if (this.isSelectAll) {
                    this.listDataIdSelectNot.splice(this.listDataIdSelectNot.indexOf(row.id))
                    this.selectTotal = this.total - this.listDataIdSelectNot.length
                } else {
                    this.listDataIdSelect.push(row.id)
                    this.selectTotal = this.listDataIdSelect.length
                }
            } else {
                if (this.isSelectAll) {
                    this.listDataIdSelectNot.push(row.id)
                    this.selectTotal = this.total - this.listDataIdSelectNot.length
                } else {
                    this.listDataIdSelect.splice(this.listDataIdSelectNot.indexOf(row.id))
                    this.selectTotal = this.listDataIdSelect.length
                }
            }
            console.log(this.listDataIdSelect)
            console.log(this.listDataIdSelectNot)
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>

<style>
.custom-pagination {
    text-align: right;
    /* 将分页组件内的内容右对齐 */
    margin-top: 20px;
    /* 设置上边距为40px */
}

.data-picker {
    margin-top: 40px;
}

.table {
    margin-top: 40px;
}

.container {
    margin: 20px;
    background-color: white;
}

.button-style3 {
    height: 40px;
}
</style>
  