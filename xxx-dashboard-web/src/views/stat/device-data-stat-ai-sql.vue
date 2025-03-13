<template>
    <div style="width: 100%; min-height: 100dvh; display: flex;">
        <div style="display: flex; flex-direction: row; flex: 1;">
            <div style="display: flex; flex-direction: column; flex: 4; margin: 20px">
                <div style="display: flex; align-items: center;">
                    <el-input v-model="input" placeholder="支持搜索p2p连接和升级相关数据, 搜索示例:美区设备在2023年7月13日的p2p连接成功率"
                        style="flex:1; margin-right: 20px;"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="give_me_answer">搜索</el-button>
                    <el-button class="button-style1" @click="addQuickSearch">添加至快捷搜索</el-button>
                </div>
                <div class="my-span">输入转化的查询条件：{{ sqlAi }}</div>
                <div v-if="sqlAi.length != 0"
                    style="display: flex; align-items: center; margin-top: 20px; margin-bottom: 20px;">
                    <el-input v-model="selectCharts" placeholder="输入想要的图表类型替换当前图表，示例:柱状图/我想要一个柱状图/给我一个柱状图"
                        style="flex:1; margin-right: 20px;"></el-input>
                    <el-button type="primary" style="width: 100px;" @click="changeChart">替换</el-button>
                </div>
                <div>
                    <line-chart v-if="chartType === 'L'" :legend="legend" :xData="xData" :yData="yData" />
                    <bar-chart v-if="chartType === 'H'" :legend="legend" :xData="xData" :yData="yData" />
                    <StackBarChart v-if="chartType === 'SH'" :legend="legend" :xData="xData" :yData="yData">
                    </StackBarChart>
                    <pie-chart v-if="chartType === 'P'" :yData="yData" />
                </div>
                <el-table :data="currentPageData"
                    :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                    :pagination-layout="'prev, pager, next'" class="airlineDeviceTable" row-key="id"
                    style="margin-top: 24px; width: 100%">
                    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop"
                        :label="column.label"></el-table-column>
                </el-table>
                <el-pagination v-show="totalCount != 0" :current-page.sync="currentPageNum" :page-size="30"
                    :total="totalCount" background layout="total,prev,pager,next" />
            </div>
            <div style="width: 1px; height: 100%; background-color: black; margin-top: 10px"></div>
            <div style="display: flex; flex-direction: column; flex: 1; margin: 20px;">
                <div style="font-size: 16px; font-weight: 600;">快速搜索</div>
                <div v-for="item in quickSearchList">
                    <div style="display: flex; flex-direction: row; margin-top: 10px; margin-bottom: 10px;">
                        <div style="flex: 5; font-size: 14px; font-weight: 500; justify-content: center; display: flex; flex-direction: column;"
                            @click="selectQuickSearch(item)">
                            {{ item.title }}</div>
                        <el-button type="text" @click="upDateQuickSearch(item)">编辑</el-button>
                        <el-button type="text" @click="deleteDialog(item)">删除</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="'条件编辑'" :visible.sync="addQuickSearchVisible" width="40%">
            <el-form ref="addQuickSearch" :model="addLQuickSearchForm" :rules="rules" label-width="70px">
                <el-form-item label="名称" prop="title">
                    <el-input v-model="addLQuickSearchForm.title" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="条件" prop="content">
                    <el-input v-model="addLQuickSearchForm.content" placeholder="请输入条件" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="button-style1" @click="cancelSubmitQuickSearch">取消</el-button>
                <el-button class="button-style2" @click="submitForm('addQuickSearch')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :show-close="false" :visible.sync="deleteQuickSearchVisible" style="border-radius: 6px;" width="30%">
            <span style="display: flex; flex-direction: row;">
                <el-image :src="warn" size="mini" style="height: 17px; width: 17px; margin-right: 10px;" />
                <span
                    style="color: #000000; margin-bottom: 15px; font-size: 14px; color: rgba(0, 0, 0, 0.9);">确定删除此""快捷搜索"条件吗?
                </span>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="button-style1" @click="cancelDelete">取 消</el-button>
                <el-button class="button-style2" @click="deleteSearch">确认删除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getDeviceDataWithSql, getSelectChartByUser, getQuickSearchList, addQuickSearch, updateQuickSearch, deleteQuickSearch } from '@/api/api-stat'
import LineChart from '../../components/Charts/LineChart.vue';
import BarChart from '../../components/Charts/BarChart.vue';
import PieChart from '../../components/Charts/PieChart.vue';
import StackBarChart from '../../components/Charts/StackBarChart.vue';
import warn from '@/assets/warn.png'
import { projectChannel } from '@/utils/util-broadcast'

let dataCountOfEveryPage = 30

export default {
    components: {
        LineChart,
        BarChart,
        PieChart,
        StackBarChart
    },
    data() {
        return {
            columns: [],
            trendTableData: [],
            input: '',
            inputParam: {},
            sqlAi: '',
            currentPageNum: 1,
            selectCharts: "",

            chartType: "",
            legend: [],
            xData: [],
            yData: [],

            addQuickSearchVisible: false,
            addLQuickSearchForm: {
                id: 0,
                title: '',
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入条件', trigger: 'blur' },
                ]
            },

            deleteQuickSearchVisible: false,
            deleteItem: null,
            warn: warn,

            quickSearchList: [],
            channel: new BroadcastChannel(projectChannel.name),
        }
    },
    created() {
    },
    mounted() {
        this.getQuickSearchList()
        this.channel.addEventListener('message', (event) => {
            if (event.data.action === projectChannel.changeAction) {
                this.getQuickSearchList()
            }
        });

    },
    beforeUnmount() {
        // 关闭通道，以避免内存泄漏
        this.channel.close();
    },

    computed: {
        totalCount() {
            return this.trendTableData.length
        },
        currentPageData() {
            return this.trendTableData.slice(dataCountOfEveryPage * (this.currentPageNum - 1), dataCountOfEveryPage * this.currentPageNum)
        }
    },
    methods: {
        getQuickSearchList() {
            startLoading()

            const param = {
                model: 'device'
            }
            getQuickSearchList(param).then(response => {
                endLoading()
                if (response.code === 0) {
                    this.addQuickSearchVisible = false
                    this.deleteQuickSearchVisible = false
                    this.quickSearchList = response.data
                }
            }).catch(error => {
                endLoading()
                console.log(error)
            })
        },

        give_me_answer() {
            console.log(this.input)
            if (this.input == "") {
                this.$message('请输入搜索内容');
            } else {
                this.inputParam.inputContent = this.input
                this.searchConnectData(this.inputParam)
            }
        },

        addQuickSearch() {
            this.addLQuickSearchForm.id = 0
            this.addLQuickSearchForm.content = this.input
            this.addLQuickSearchForm.title = ""
            this.addQuickSearchVisible = true
        },

        cancelSubmitQuickSearch() {

            this.addQuickSearchVisible = false
        },

        deleteDialog(item) {
            console.log(item)
            this.deleteQuickSearchVisible = true
            this.deleteItem = item
        },

        cancelDelete() {
            this.deleteQuickSearchVisible = false

        },

        deleteSearch() {
            startLoading()
            const param = {
                id: this.deleteItem.id
            }
            console.log(param)
            deleteQuickSearch(param).then(response => {
                console.log(response)
                if (response.code === 0) {
                    this.getQuickSearchList()
                } else {
                    endLoading()
                    this.$message.error(response.message);
                }
            }).catch(error => {
                endLoading()
                this.$message.error(error);
                console.log(error)
            })
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    startLoading()

                    if (this.addLQuickSearchForm.id === 0) {
                        const param = {
                            model: 'device',
                            title: this.addLQuickSearchForm.title,
                            content: this.addLQuickSearchForm.content
                        }
                        addQuickSearch(param).then(response => {
                            if (response.code === 0) {
                                this.getQuickSearchList()
                            } else {
                                endLoading()
                                this.$message.error(response.message);
                            }

                        }).catch(error => {
                            endLoading()
                            this.$message.error(error);
                            console.log(error)
                        })

                    } else {
                        const param = {
                            id: this.addLQuickSearchForm.id,
                            title: this.addLQuickSearchForm.title,
                            content: this.addLQuickSearchForm.content
                        }
                        updateQuickSearch(param).then(response => {
                            if (response.code === 0) {
                                this.getQuickSearchList()
                            } else {
                                endLoading()
                                this.$message.error(response.message);
                            }

                        }).catch(error => {
                            console.log(error)
                        })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        selectQuickSearch(item) {
            this.input = item.content
        },

        upDateQuickSearch(item) {
            this.addLQuickSearchForm.id = item.id
            this.addLQuickSearchForm.content = item.content
            this.addLQuickSearchForm.title = item.title
            this.addQuickSearchVisible = true
        },

        searchConnectData(param) {
            this.sqlAi = ""
            this.selectCharts = "",
                startLoading()
            getDeviceDataWithSql(param).then(response => {
                this.columns = []
                this.trendTableData = []
                var limitNum = 0
                if (response.code === 0) {
                    endLoading()
                    console.log(response)
                    //sql错误
                    if (Object.keys(response.data).length === 0) {
                        this.columns = [],
                            this.trendTableData = [],
                            this.sqlAi = '',

                            this.chartType = "",
                            this.legend = [],
                            this.xData = [],
                            this.yData = []
                        return
                    }

                    if (response.data.dataMapping.length == 0) {
                        this.$message({
                            message: '没有搜索到内容，请重新输入搜索条件',
                            type: 'warning'
                        })
                    } else {
                        this.isTrends = true
                        Object.keys(response.data.dataMapping[0]).forEach(key => {
                            var obj = {}
                            obj.prop = key
                            obj.label = key
                            this.columns.push(obj)
                        });
                        this.trendTableData = response.data.dataMapping
                        // for (const r of response.data.dataMapping) {
                        //     if(limitNum <30){
                        //     this.trendTableData.push(r)
                        //     limitNum++
                        //     }else{
                        //         break
                        //     }
                        // }
                    }
                    this.sqlAi = response.data.searchSqlCondition
                    this.parsingChartData(response.data.charts)
                } else {
                    this.$message({
                        message: '搜索错误，请重新输入搜索条件',
                        type: 'warning'
                    })
                }
            }).catch((error) => {
                endLoading()
                console.log(error)
            })
        },

        parsingChartData(chartData) {
            this.chartType = ""
            this.legend = []
            this.xData = []
            this.yData = []

            //解析openai推荐的
            const chartTypeMatch = chartData.match(/ChartType: "(.*?)"/);
            const xMatch = chartData.match(/X: "(.*?)"/);
            const yMatch = chartData.match(/Y: "(.*?)"/);

            //图标类型
            this.chartType = chartTypeMatch ? chartTypeMatch[1] : "";

            //x轴字段
            const x = xMatch ? xMatch[1] : null;
            //y轴字段
            const y = yMatch ? yMatch[1].split(",") : null;

            this.drawChart(x, y)
        },

        changeChart() {
            startLoading()

            const param = {
                sql: this.sqlAi,
                description: this.selectCharts
            }

            getSelectChartByUser(param).then(response => {
                endLoading()
                console.log(response)
                if (response.code === 0) {
                    const responseJson = response.data.charts
                    const result = JSON.parse(responseJson)
                    this.chartType = result.chartType

                    this.drawChart(result.X, result.Y)
                }

            }).catch(error => {
                endLoading()
            })
        },

        /**
         * 
         * @param {*} x x轴数据字段
         * @param {*} y y轴数据字段
         */
        drawChart(x, y) {
            if (this.chartType != "") {
                //柱状图，折线图
                if (this.chartType === "H" || this.chartType === "L" || this.chartType === "SH") {
                    //x轴数据
                    if (x != null) {
                        this.xData = this.trendTableData.map(item => {
                            if (item[x].includes("+08:00")) {
                                const datePart = item[x].substring(0, 10);
                                return datePart
                            } else {
                                return item[x]
                            }
                        })
                    }

                    //y轴数据
                    if (y != null) {
                        this.legend = y
                        this.yData = y.map(item => {
                            return {
                                name: item,
                                data: this.trendTableData.map(data => {
                                    return data[item]
                                })
                            }
                        })
                    }

                } else if (this.chartType === "P") {
                    //饼状图
                    if (y != null) {
                        this.yData = y.map(item => {
                            return {
                                name: item,
                                value: this.trendTableData[0][item]
                            }
                        })
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.my-span {
    background-color: #ecf5ff;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    margin-top: 5px;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    width: 100%;
    text-align: left;
    word-wrap: break-word;
    /* 允许单词内换行，与 word-wrap 属性提供的功能相同，兼容性更好 */
}
</style>
  