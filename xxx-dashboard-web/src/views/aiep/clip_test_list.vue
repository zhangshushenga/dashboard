<template>
    <div class="container">
        <div style="font-size: 26px; font-weight: 600; margin: 20px">{{ $t('label131') }}</div>
        <!-- <div class="text" >{{ $t('label131') }}</div> -->
        <div class="header">
            <el-select v-model="selectDataSetType" clearable placeholder="请选择" @clear="handleClear" @change="handleChange">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button :loading="create_loading" :disabled="selectTotal == 0" class="button-style3" size="min"
                @click="createSet">
                {{ $t('label130') }}
            </el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" class="table" 
            v-loading="islistDataLoading" border>
            <el-table-column prop="id" label="id" min-width="8%">
            </el-table-column>
            <el-table-column prop="name" label="dataset_name" min-width="15%">
            </el-table-column>
            <template v-if="this.selectDataSetType === 1">
                <el-table-column prop="agentName" label="agent_name" min-width="15%"></el-table-column>
            </template>
            
            <el-table-column prop="remark" label="remark" min-width="15%">
            </el-table-column>
            <el-table-column label="type" min-width="10%">
                <template slot-scope="scope">
                    <!-- 在这里根据 type 的值动态显示内容 -->
                    {{ scope.row.type === 1 ? 'pic' : (scope.row.type === 2 ? 'video' : (scope.row.type === 3) ? 'text' : '') }}
                </template>
            </el-table-column>
            <el-table-column prop="imageCount" label="Count" min-width="10%">
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="15%">
                <template slot-scope="scope">
                    <div class="button-group">
                        <el-button @click="handleViewClick(scope.row)" type="text" size="small" :disabled="scope.row.imageCount === 0">查看</el-button>
                        <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
                        <el-button @click="getPrompt(scope.row)" type="text" size="small" v-show="getGptLabelButtonShow(scope.row)">GPT标注</el-button>
                    </div>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="上传文件/图片" min-width="15%">
                <template slot-scope="scope">
                    <div class="button-group">
                        <el-button @click="handleUploadClick(scope.row)" type="text" size="small" >上传</el-button>
                        <template v-if="scope.row.type !== 1">
                            <el-button @click="handleDownloadClick(scope.row)" type="text" size="small" >下载</el-button>
                        </template>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="custom-pagination" :current-page.sync="currentPageNum" :page-size="currentPageSize"
            :page-sizes="[10, 20]" :total="total" background layout="total,sizes,prev,pager,next,jumper"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        <!-- 引入 DataSetDialog 组件 -->
        <data-set-dialog :dialog-visible.sync="dialogVisible" :name="nameValue" :remark="remarkValue" :type="typeValue" :agentName="agentNameValue" :agentType="agentTypeValue" :agents="this.agents"
            @submit="handleDialogSubmit">
        </data-set-dialog>
        <prompt-dialog :dialog-visible.sync="promptDialogVisible" :agentName="agentNameValue" :row="rowValue" :agentMarker="agentMarkerValue"
            @submit="promptDialogSubmit">
        </prompt-dialog>
        <upload-dialog :dialog-visible.sync="uploadDialogVisible" :dataSetId="dataSetIdValue" :dataSetType="dataSetTypeValue" :dataSetName="dataSetNameValue"
            @close="uploadDialogSubmit">
        </upload-dialog>
    </div>
</template>

<script>


import DataSetDialog from '../../components/Aiep/DataSetDialog.vue';
import PromptDialog from '../../components/Aiep/PromptDialog.vue';
import UploadDialog from '../../components/Aiep/UploadDialog.vue';
import { getAgentSelectList } from '@/api/agent-config';
import { getImageDataSet, getDataSetImageList, deleteDataSetImage, createDataSet, updateDataSet, deleteDataSet, getDataSetLabel, editImageLabel, getDataSetTextUrl, getTextTestResultDownloadUrl } from '../../api/api-aiep'
import { data } from 'jquery';
// 上传文件
import JsonEditor from '@/components/JsonEditor'
import { getToken } from '@/utils/auth'

export default {
    components: {
        DataSetDialog,
        PromptDialog,
        UploadDialog
    },
    props: ['agentName'],
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
            agentNameValue: '',
            agentTypeValue: '',
            remarkValue: '',
            typeValue: 0,
            isCreateDataSet: false,
            editDataSetId: '',
            rowValue: '',
            agentMarkerValue: 0,
            textUrl: '',
            options: [{
                value: 1,
                label: 'pic'
            }, {
                value: 2,
                label: 'video'
            }, {
                value: 3,
                label: 'text'
            }],
            dataSetTypevalue:'',
            promptDialogVisible: false,
            agents:[
                // 判断型：1，描述型：2
                {"name": "毒舌食评", "type": 2, "marker": -1},
                {"name": "猫狗印记", "type": 2, "marker": -1},
                {"name": "婴儿笑脸", "type": 1, "marker": -1},
                {"name": "宠物互动", "type": 1, "marker": -1},
                {"name": "婴幼儿哭泣", "type": 1, "marker": -1}
            ],
            uploadDialogVisible: false,
            dataSetIdValue: '',
            selectDataSetType: 1,
            dataSetNameValue: ''
        }
    },
    mounted() {
        this.firstSearch()
        this.getSelectList()
    },
    methods: {
        handleChange(){
            this.currentPageNum = 1
            this.searchData(1,this.selectDataSetType)
        },

        handleClear(){
            this.firstSearch()
        },

        handleViewClick(row) {
            console.log("row.type",row)
            if (row.type === 1){
                for (var i=0; i<this.agents.length; i++){
                    if (this.agents[i].name === row.agentName){
                        this.agentMarkerValue = this.agents[i].marker
                        break
                    }
                }
                console.log("agentMarkerValue", this.agentMarkerValue)
                const routeUrl = this.$router.resolve({
                    path: '/data_set_detail',
                    query: {
                        data_set_id: row.id,
                        data_set_type: row.type,
                        data_set_name: row.name,
                        data_set_agent_name: row.agentName,
                        data_set_agent_type: row.agentType,
                        data_set_agent_marker: this.agentMarkerValue
                    }
                })
                window.open(routeUrl.href, '_blank')
            }
            else{
                const data = { current: 1, }
                getDataSetImageList(row.id, data).then(response => {
                    console.log("response----->", response)
                    if (response.code === 0) {
                        const path = response.data.records[0].s3Key

                        console.log("文件url", path)
                        // var pathStart = path.indexOf("data_set_text/");
                        // console.log("pathStart------>", pathStart)
                        // var url = path.substring(pathStart);

                        const param = { 'path': path }
                        console.log("param------>", param)
                        getDataSetTextUrl(param).then(response =>{
                            if (response.code === 0){
                                this.textUrl = response.data
                                console.log("生成文件的url", this.textUrl)
                                const routeUrl = this.$router.resolve({
                                    path: '/data_set_text_detail',
                                    query: {
                                        data_set_id: row.id,
                                        data_set_type: row.type,
                                        data_set_name: row.name,
                                        data_set_file_name: row.fileName,
                                        data_set_file_url: this.textUrl
                                    }
                                })
                                window.open(routeUrl.href, '_blank')
                            }
                        })
                    }
                })
            }
        },

        handleEditClick(row) {
            this.isCreateDataSet = false
            this.nameValue = row.name
            this.remarkValue = row.remark
            this.typeValue = row.type
            this.editDataSetId = row.id
            this.agentNameValue = row.agentName
            this.agentTypeValue = row.agentType
            for (var i=0; i<this.agents.length; i++){
                if (this.agents[i].name === row.agentName){
                    this.agentMarkerValue = this.agents[i].marker
                    break
                }
            }
            this.dialogVisible = true
        },
        createSet() {
            this.isCreateDataSet = true
            this.nameValue = ''
            this.remarkValue = ''
            this.typeValue = 1
            this.agentNameValue = ''
            this.agentTypeValue = ''
            this.dialogVisible = true
            console.log("this.dialogVisible", this.dialogVisible)
        },
        handleDeleteClick(row) {
            this.$confirm('此操作将删除该验证集, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteDataSet(row.id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        handleDialogSubmit(formData) {
            // 在这里处理提交的数据
            console.log('提交的数据:', formData);
            // 可以在这里发送数据到服务器
            if (this.isCreateDataSet) {
                this.addDataSet(formData.type, formData.name, formData.remark, formData.agentName, formData.agentType)
            } else {
                this.updateDataSet(this.editDataSetId, formData.type, formData.name, formData.remark, formData.agentName, formData.agentType)
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
            this.searchData(1)
        },
        firstSearch() {
            this.currentPageNum = 1
            this.searchData(this.currentPageNum)
        },
        //查询测试集列表
        searchData(currentPage,type) {
            this.islistDataLoading = true
            const param = {}
            param.current = currentPage
            param.size = this.currentPageSize
            param.typr = type
            console.log("searchData-param", param)
            getImageDataSet(param).then(response => {
                console.log(response)
                if (response.code === 0) {
                    this.tableData = []
                    for (const r of response.data.records) {
                        if (this.selectDataSetType === r.type){
                            this.tableData.push(r)
                        }
                    }
                    this.total = response.data.total
                }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                this.islistDataLoading = false
            })
        },

        //增加测试集
        addDataSet(type, name, remark, agent_name, agent_type) {
            this.create_loading = true
            const param = {}
            param.name = name
            param.remark = remark
            param.type = type
            param.agentName = agent_name
            param.agentType = agent_type
            console.log("addDataSet_param=", param)
            createDataSet(param).then(response => {
                console.log("createDataSet" + response)
                if (response.code === 0) {
                    this.$message({
                        message: "create data set successfully",
                        type: "success",
                        duration: 1000
                    })
                    this.firstSearch()
                }
            }).catch(e => {
                console.log("createDataSet" + e)
            }).finally(() => {
                this.create_loading = false
            })
        },

        //更新测试集
        updateDataSet(dataSetId, type, name, remark, agent_name, agent_type) {
            this.islistDataLoading = true
            const param = {}
            param.name = name
            param.remark = remark
            param.type = type
            param.agentName = agent_name
            param.agentType = agent_type
            console.log("更新:", param)
            updateDataSet(dataSetId, param).then(response => {
                console.log("updateDataSet" + response)
                if (response.code === 0) {
                    this.$message({
                        message: "update data set successfully",
                        type: "success",
                        duration: 1000
                    })
                    this.searchData(this.currentPageNum)
                }
            }).catch(e => {
                console.log("updateDataSet" + e)
            }).finally(() => {
                this.islistDataLoading = false
            })
        },

        //删除测试集
        deleteDataSet(dataId) {
            this.islistDataLoading = true
            console.log("dataId=" + dataId)
            deleteDataSet(dataId).then(response => {
                console.log("deleteDataSet" + response)
                if (response.code === 0) {
                    this.$message({
                        message: "delete data set successfully",
                        type: "success",
                        duration: 1000
                    })
                    this.firstSearch()
                }
            }).catch(e => {
                console.log("createDataSet" + e)
            }).finally(() => {
                this.islistDataLoading = false
            })
        },
        // gpt标注获取prompt
        getPrompt(row){
            this.agentNameValue = row.agentName
            this.rowValue = row
            for (var i=0; i<this.agents.length; i++){
                if (this.agents[i].name === row.agentName){
                    this.agentMarkerValue = this.agents[i].marker
                    break
                }
            }
            this.promptDialogVisible = true
        },
        // prompt
        promptDialogSubmit(promptData){
            // 在这里处理提交的数据
            this.promptDialogVisible = false
            console.log('prompt提交的数据:', promptData);
            this.getGptLabel(promptData)
        },
        // gpt标注
        getGptLabel(promptData){
            const param = {}
            console.log("promptData", promptData.role)
            const role = promptData.role
            const prompt = promptData.prompt
            param.prompt = JSON.stringify({"role":role, "prompt":prompt})
            param.dataSetId = this.rowValue.id
            param.dataSetName = this.rowValue.name
            param.agentName = this.rowValue.agentName
            param.agentType = this.rowValue.agentType
            param.imageTotalCount = this.rowValue.imageCount
            console.log("添加标签----》", param)
            getDataSetLabel( param).then(response => {
                console.log("updateDataSet" + response)
                if (response.code === 0) {
                    this.$message({
                        message: "start get label",
                        type: "success",
                        duration: 1000
                    })
                }
            }).catch(e => {
                console.log("updateDataSet" + e)
            }).finally(() => {
                this.islistDataLoading = false
            })
        },
        getGptLabelButtonShow(row){
            if (row.agentType === 2 && this.selectDataSetType === 1){
                return true
            }
            else{
                return false
            }
        },
        getSelectList(currentPage) {
            this.isDataLoading = true
            getAgentSelectList().then(response => {
                if (response.code === 0) {
                    for (var i=0; i<response.data.length; i++){
                        const name = response.data[i].name
                        const type = response.data[i].agentResultType
                        const agentMarker = response.data[i].agentType
                        const add_agents = {"name": name, "type": type, "marker": agentMarker}
                        this.agents.push(add_agents)
                    }
                }
            }).finally()
        },
        handleUploadClick(row){
            this.dataSetIdValue = row.id
            this.dataSetTypeValue = row.type
            this.dataSetNameValue = row.name
            this.uploadDialogVisible = true
            console.log("uploadDialogVisible", this.uploadDialogVisible)
        },
        // upload_text
        uploadDialogSubmit(){
            this.searchData(1,this.selectDataSetType)
            console.log("selectDataSetType", this.selectDataSetType)
        },
        // 下载测试集
        handleDownloadClick(row){
            const data = { current: 1, }
            getDataSetImageList(row.id, data).then(response => {
                console.log("response----->", response)
                if (response.code === 0) {
                    const url = response.data.records[0].s3Key
                    console.log("文件path", url)

                    this.downloadClick(url)
                }
            })
        },
        // 评测文件下载
        async downloadClick(path) {
            try {
                // 假设getDownloadUrl是一个方法，根据当前行的数据来获取下载链接
                const param = {"path":path}
                console.log("下载链接-----》", param)
                const response = await getDataSetTextUrl(param);
                console.log("下载链接返回-----》", response)
                
                // 创建一个 Blob 对象
                const blob = await fetch(response.data).then(r => r.blob());
                const url = window.URL.createObjectURL(blob);

                // 创建一个临时的a标签来程序化地触发下载
                const a = document.createElement('a');
                a.href = url;
                a.download = ''; // 可以设置下载文件的名称，如果需要的话
                document.body.appendChild(a); // 将a标签添加到文档中
                a.click(); // 触发点击事件
                document.body.removeChild(a); // 下载后从文档中移除a标签

                // 释放 URL 对象
                window.URL.revokeObjectURL(url);
            } catch (error) {
                // 处理获取链接时可能出现的错误
                console.error('下载链接获取失败', error);
            }
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
  