<template>
    <div class="container">
        <div class="text" style="font-size: 35px">agent验证结果列表</div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" class="table" :fit="true" :show-overflow="'tooltip'"
            v-loading="islistDataLoading" border>
            <el-table-column prop="id" label="ID" min-width="5%">
            </el-table-column>
            <el-table-column prop="createTime" label="开始时间" min-width="10%">
            </el-table-column>
            <el-table-column prop="updateTime" label="结束时间" min-width="10%">
            </el-table-column>
            <el-table-column prop="agentName" label="agent名称" min-width="10%">
            </el-table-column>
            <el-table-column prop="dataSetName" label="测试集名称" min-width="10%">
            </el-table-column>
            
            <el-table-column prop="imagEvaledCount" label="验证完成数" min-width="10%">
            </el-table-column>
            <el-table-column prop="imageTotalCount" label="图片总数量" min-width="10%">
            </el-table-column>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>

            <el-table-column label="agent得分" min-width="10%">
                <template slot-scope="scope">
                {{ getScore(scope.row) }}
                </template>
            </el-table-column>

            <el-table-column prop="gptScore" label="label得分" min-width="10%" >
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="15%">
                <template slot-scope="scope">
                    <div class="button-group">
                        <el-button @click="handleViewClick(scope.row)" type="text" size="small">查看详细信息</el-button>
                        <el-button @click="handleDownloadClick(scope.row)" type="text" size="small">评测文件下载</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="custom-pagination" :current-page.sync="currentPageNum" :page-size="currentPageSize"
            :page-sizes="[20]" :total="total" background layout="total,sizes,prev,pager,next,jumper"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        <!-- 引入 DataSetDialog 组件 -->
        <data-set-dialog :dialog-visible.sync="dialogVisible" :name="nameValue" :remark="remarkValue" :type="typeValue"
            @submit="handleDialogSubmit"></data-set-dialog>
    </div>
</template>

<script>

import DataSetDialog from '../../components/Aiep/DataSetDialog.vue';
import { getDataSetResult, getAgentTestResultDownloadUrl } from '../../api/api-aiep'

export default {
    components: {
        DataSetDialog
    },
    data() {
        return {
            tableData: [],
            islistDataLoading: false,
            currentPageNum: 1,
            currentPageSize: 20,
            total: 0,
            create_loading: false,
            dialogVisible: false,
            nameValue: '',
            remarkValue: '',
            typeValue: 0,
            isCreateDataSet: false,
            editDataSetId: '',
            value:'',
        }
    },
    computed: {
        getScore() {
            return (row) => {
                if (row.taskType === '1') {
                return row.f1;
                } else {
                return row.score;
                }
            }
        }
    },
    mounted() {
        this.firstSearch()
    },
    methods: {
        // handleChange(value){
        //     this.currentPageNum = 1
        //     this.searchData(1,value)
        // },

        handleClear(){
            this.firstSearch()
        },
        // 评测文件下载
        async handleDownloadClick(row) {
            try {
                // 假设getDownloadUrl是一个方法，根据当前行的数据来获取下载链接
                const param = {"path":row.evalResultUrl}
                console.log("下载链接-----》", param)
                const response = await getAgentTestResultDownloadUrl(param);
                console.log("下载链接返回-----》", response)
                // 创建一个临时的a标签来程序化地触发下载
                const a = document.createElement('a');
                a.href = response.data;
                a.download = ''; // 可以设置下载文件的名称，如果需要的话
                document.body.appendChild(a); // 将a标签添加到文档中
                a.click(); // 触发点击事件
                document.body.removeChild(a); // 下载后从文档中移除a标签
            } catch (error) {
                // 处理获取链接时可能出现的错误
                console.error('下载链接获取失败', error);
            }
        },
        createSet() {
            this.isCreateDataSet = true
            this.nameValue = ''
            this.remarkValue = ''
            this.typeValue = 1
            this.dialogVisible = true
        },
        handleDeleteClick(row) {
            this.deleteDataSet(row.id)
        },

        handleDialogSubmit(formData) {
            // 在这里处理提交的数据
            console.log('提交的数据:', formData);
            // 可以在这里发送数据到服务器
            if (this.isCreateDataSet) {
                this.addDataSet(formData.type, formData.name, formData.remark)
            } else {
                this.updateDataSet(this.editDataSetId, formData.type, formData.name, formData.remark)
            }
        },

        handleCurrentChange(val) {
            console.log('handleCurrentChange', val)
            this.currentPageNum = val
            this.searchData(val)
        },
        handleSizeChange(val) {
            console.log('handleSizeChange', val)
            //this.setLocalPageSize(val)
            this.searchData(val)
        },
        firstSearch() {
            this.currentPageNum = 1
            this.searchData(1)
        },
        //查询测试集列表
        searchData(currentPage) {
            this.islistDataLoading = true
            const param = {}
            param.current = currentPage
            param.size = this.currentPageSize
            param.idSort = false

            console.log("param---->", param)
            getDataSetResult(param).then(response => {
                console.log(response)
                if (response.code === 0) {
                    this.tableData = []
                    for (const r of response.data.records) {
                        const date = new Date(r["createTime"]);
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2, '0');
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const seconds = date.getSeconds().toString().padStart(2, '0');

                        r["createTime"] = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        
                        const date1 = new Date(r["updateTime"]);
                        const year1 = date1.getFullYear();
                        const month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
                        const day1 = date1.getDate().toString().padStart(2, '0');
                        const hours1 = date1.getHours().toString().padStart(2, '0');
                        const minutes1 = date1.getMinutes().toString().padStart(2, '0');
                        const seconds1 = date1.getSeconds().toString().padStart(2, '0');

                        r["updateTime"] = `${year1}-${month1}-${day1} ${hours1}:${minutes1}:${seconds1}`;
                        
                        if (r.prompt !== ''){
                            const prompt_data = JSON.parse(r.prompt)
                            const prompt = prompt_data.prompt
                            const role = prompt_data.role
                            r.show_prompt = role + '<br>' + prompt
                        }
                        else{
                            r.show_prompt = ''
                        }

                        this.tableData.push(r)
                        }
                        
                    }
                    this.total = response.data.total
                }
            ).catch(error => {
                console.log(error)
            }).finally(() => {
                this.islistDataLoading = false
            })
        },

        // 查看详细信息
        handleViewClick(row) {
            console.log("row.type",row)
            const routeUrl = this.$router.resolve({
                path: '/agent_eval_result_detail.',
                query: {
                    eval_result_url: row.evalResultUrl,
                    agent_name: row.agentName,
                    agent_score: row.score,
                    label_score: row.gptScore,
                    data_set_accuracy: row.accuracy,
                    data_set_precision: row.precision,
                    data_set_recall: row.recall,
                    data_set_f1: row.f1,
                    data_set_task_type: row.taskType
                }
            })
            window.open(routeUrl.href, '_blank')
        },

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

.el-table__row {
  max-height: 2em; /* 控制每行最大高度 */
  overflow: hidden; /* 超出部分隐藏 */
}

.el-table__row:hover {
  max-height: none; /* 鼠标悬停时取消最大高度限制 */
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
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
.button-group {
  display: flex;
  justify-content: space-around; /* 或使用 flex-start 来让按钮靠左排列 */
}

</style>
  