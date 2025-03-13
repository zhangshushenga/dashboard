<template>
    <div style="width: 100%; min-height: 100dvh;">
        <div style="font-size: 26px; font-weight: 600; margin: 20px">图片验证集详情: {{ dataSetName }}</div>
        <div style="display: flex; flex-direction: column; flex-wrap: wrap;">            
            <el-table ref="multipleTable" :data=currentData tooltip-effect="dark" style="width: 120%" class="table" :fit="true" :show-overflow="'tooltip'"
            v-loading="islistDataLoading">
                <el-table-column label="Iamge" width="200">
                    <template v-slot:default="scope">
                        <!-- 当 dataSetType 为 '1' 时显示图片 -->
                        <img v-if="dataSetType === '1'" :src="scope.row.s3Url" alt="Image" :style="{ width: '120px', height: '120px', objectFit: 'cover' }" class="imageCard"/>

                        <!-- 否则显示视频 -->
                        <video v-else controls style="width: 120px; height: auto;">
                            <source :src="scope.row.s3Url" type="video/mp4">
                            您的浏览器不支持视频标签。
                        </video>
                    </template>
                </el-table-column>
                    <template v-if="this.agent_type === 1">
                        <el-table-column prop="label" label="label" min-width="50%"></el-table-column>
                    </template>
                    <!-- 使用template包裹条件，这里判断type值决定是否显示gpt4Json列 -->
                    <template v-else-if="this.agent_type === 2">
                        <el-table-column prop="gpt4_json" label="label" min-width="30%"></el-table-column>
                        <el-table-column
                            min-width="30%"
                            v-for="key in this.labelKeys"
                            :key="key"
                            :prop="`gpt4Json.${key}`"
                            :label="key">
                        </el-table-column>
                    </template>
                    <!-- 使用template包裹条件，这里判断type值决定是否显示gpt4Json列 -->
                    <template v-else>
                        <el-table-column prop="label" label="label" min-width="50%"></el-table-column>
                    </template>

                <el-table-column fixed="right" label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <div class="button-group">
                            <el-button @click="handleEditClick(scope.row)" type="text" size="large">标注</el-button>
                            <el-button @click="openDeleteTip(scope.row.id)" type="text" size="large">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="custom-pagination" :current-page.sync="currentPageNum" :page-size="currentPageSize"
                    :page-sizes="[20]" :total="total" background layout="total,sizes,prev,pager,next,jumper"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" /> 
            <!-- 引入 DialogVisible 组件 -->
            <agent-label-dialog :dialog-visible.sync="agentDialogVisible" :label="labelValue" :gpt4Json="gpt4JsonValue" :agentType="agent_type" :labelKey="labelKeys" :prompt="promptValue" :agentName="agentNameValue" :imageId="imageIdValue"
                :dataSetId="dataSetIdValue" :dataSetName="dataSetName" :agentMarker="this.$route.query.data_set_agent_marker" 
                @submit="handleDialogSubmit">
            </agent-label-dialog>
        </div>
    </div>
</template>
  
<script>
import AgentLabelDialog from '../../components/Aiep/AgentLabelDialog.vue'
import { endLoading, startLoading } from '@/utils/loading'
import { getDataSetImageList, deleteDataSetImage, editImageLabel, editImageJson } from '../../api/api-aiep'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'
import { data } from 'jquery'
import { options } from 'dropzone'

export default {
    components: {
        // DrawRectImage,
        AgentLabelDialog
        },
    props: ['dataSetId', 'dataSetType', 'dataSetName', 'agentName', 'agentType', 'agentMarker'],
    data() {
        return {
            isAddDataSetLoading: [],
            showDropdowns: [], // 控制每个下拉框的显示状态
            dropdownOptions: [{"label":0},{"label":1}],
            currentPage: 1,
            totalData: 0,
            currentData: [],
            loading: [],
            labelKeys: [],
            agentDialogVisible: false,
            labelValue: '',
            gpt4JsonValue: '',
            agent_type: '',
            imageIdValue: '',
            promptValue: '',
            agentNameValue: '',
            dataSetIdValue: '',
            dataSetNameValue: '',
            datasetImageIdValue: ''
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        console.log("agentMarkerValue", this.$route.query.data_set_agent_marker)
        this.getList(1)
    },
    methods: {
        // 修改判断型agent
        editImageLabelBool(Option) {
            const param ={"id":this.datasetImageIdValue,"label":Option.label}
            console.log("判断型param:", param)
            editImageLabel(param).then(response => {
                if (response.code === 0) {
                    this.getList(this.currentPage)
                    this.$set(this.isAddDataSetLoading, false)
                    this.$message({
                        message: 'add label successfully',
                        type: 'success',
                        duration: 1000
                    })
                }
            }).catch(error => {
                this.$set(this.isAddDataSetLoading, false)
                console.log(error)
            })
        },
        
        // 修改描述型agent
        editImageLabelJson(Option) {
            const gpt_json = JSON.stringify(Option.gpt4Json)
            const param ={"id":this.datasetImageIdValue, "gpt4Json":gpt_json}
            console.log('描述型param:', param)
            editImageJson(param).then(response => {
                if (response.code === 0) {
                    this.getList(this.currentPage)
                    this.$set(this.isAddDataSetLoading, false)
                    this.$message({
                        message: 'edit label successfully',
                        type: 'success',
                        duration: 1000
                    })
                }
            }).catch(error => {
                this.$set(this.isAddDataSetLoading, false)
                console.log(error)
            })
        },

        getList(currentPage) {
            startLoading()
            const param = {
                current: currentPage,
            }
            console.log(param)

            getDataSetImageList(this.dataSetId, param).then(response => {
                endLoading()
                if (response.code === 0) {
                    this.totalData = response.data.total
                    this.currentData = []
                    
                    for (const r of response.data.records) {
                        r.gpt4_json = r.gpt4Json
                        if (r.agentType === 2 && r.gpt4Json !== "{}" && r.gpt4Json !== ''){
                            r.gpt4Json = JSON.parse(r.gpt4Json)
                            // r.gpt4Json = JSON.parse(r.gpt4Json)

                            // 使用Object.keys遍历gpt4Json对象的键
                            Object.keys(r.gpt4Json).forEach((key) => {
                                console.log("keys", key)
                                // 如果labelKeys数组中还没有这个键，就添加进去
                                if (!this.labelKeys.includes(key)) {
                                    this.labelKeys.push(key);
                                }
                            });
                        }
                        this.agent_type = r.agentType
                        this.currentData.push(r)
                    }
                }
            }).catch(error => {
                endLoading()
                console.log(error)
            })
            },

            openDeleteTip(imageId) {
                this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDataSetImage(imageId).then(response => {
                        endLoading()
                        if (response.code === 0) {
                            this.getList(this.currentPage)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    }).catch(error => {
                        endLoading()
                        console.log(error)
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.currentPage = val
            this.getList(val)
        },
        initializeColumns() {
        if (this.tableData.length > 0) {
            // 从第一行数据中获取gpt4Json的键，假设所有行结构相同
            const firstRowGpt4Json = this.gpt4Json[0].gpt4Json;
            this.gpt4JsonKeys = Object.keys(firstRowGpt4Json);
            }
        },
        // 编辑label
        handleEditClick(row) {
            this.dataSetIdValue = row.dateSetId
            this.dataSetNameValue = row.name
            this.agentType = row.agentType
            this.labelValue = row.label
            this.gpt4JsonValue = row.gpt4Json
            this.datasetImageIdValue = row.id
            this.imageIdValue = row.imageId
            this.agentNameValue = row.agentName
            this.promptValue = ''
            this.agentDialogVisible = true
            console.log("gpt4Json", this.gpt4JsonValue)
        },
        handleDialogSubmit(formData) {
            // 在这里处理提交的数据
            console.log('提交的数据:', formData);
            // 可以在这里发送数据到服务器
            if (this.agent_type === 1){
                this.editImageLabelBool(formData)
            }
            else
                this.editImageLabelJson(formData)
        }
    }
}
</script>
  
<style scoped>
.add-icon-button {
    margin-top: 10px;
    background-color: transparent;
    border: none;
    padding: 0;
    width: auto;
    height: auto;
    text-align: left;
    /* 将文本左对齐 */
}

.queryItem {
    margin-left: 1%;
    width: 22%
}

.imageCard {
    display: flex;
    flex-direction: column;
    margin: 20px;
    width: 15%;
}

.content {
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
}

.custom-dropdown-item {
  font-size: 12px; /* 设置字体大小为12 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出部分以省略号表示 */
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 100%;
}

.dropdown-content {
  max-height: 200px; /* 固定下拉框高度，根据需要调整 */
  overflow-y: auto; /* 内容超过高度时可滚动 */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.add-icon-button {
  background-color: transparent;
  border: none;
  padding: 0;
  width: auto;
  height: auto;
  text-align: left; /* 将文本左对齐 */
}
.button-group {
  display: flex;
  justify-content: space-around; /* 或使用 flex-start 来让按钮靠左排列 */
}
</style>
  