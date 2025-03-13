<template>
    <div style="width: 100%; min-height: 100dvh;">
        <div style="font-size: 26px; font-weight: 600; margin: 20px">文件验证集详情: {{ dataSetName }}</div>
        <div style="display: flex; flex-direction: column; flex-wrap: wrap;">            
            <el-table ref="multipleTable" :data=currentData tooltip-effect="dark" style="width: 120%" class="table" :fit="true" :show-overflow="'tooltip'"
            v-loading="islistDataLoading">
                <el-table-column prop="id" label="dataset_id" min-width="50%"></el-table-column>
                <el-table-column prop="s3Url" label="text_name" min-width="50%"></el-table-column>

                <el-table-column fixed="right" label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <div class="button-group">
                            <el-button @click="handleviewClick(scope.row)" type="text" size="large">查看</el-button>
                            <el-button @click="openDeleteTip(scope.row.id)" type="text" size="large">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getDataSetImageList, deleteDataSetImage, editImageLabel, editImageJson, getDataSetTextUrl } from '../../api/api-aiep'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'
import { data, error } from 'jquery'
import { options } from 'dropzone'

export default {
    components: {
        },
    props: ['dataSetId', 'dataSetType', 'dataSetName'],
    data() {
        return {
            isAddDataSetLoading: [],
            showDropdowns: [], // 控制每个下拉框的显示状态
            currentPage: 1,
            totalData: 0,
            currentData: [],
            loading: [],
            textUrl: ''
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        this.getList(1)
    },
    methods: {

        getList(currentPage) {
            startLoading()
            const param = {
                current: currentPage,
            }
            console.log("page",param)

            getDataSetImageList(this.dataSetId, param).then(response => {
                endLoading()
                console.log("response----->", response)
                if (response.code === 0) {
                    this.totalData = response.data.total
                    this.currentData = []
                    
                    for (const r of response.data.records) {
                        this.currentData.push(r)
                    }
                }
            }).catch(error => {
                endLoading()
                console.log(error)
            })
        },
        // 查看文件详情
        handleviewClick(row){
            console.log("文件原始path", row.s3Url)
            var pathStart = row.s3Url.indexOf("data_set_text/");
            var pathEnd = row.s3Url.indexOf("?");
            var url = row.s3Url.substring(pathStart, pathEnd);
            console.log("文件path", url)
            const param = { 'path': url }
            getDataSetTextUrl(param).then(response =>{
                if (response.code === 0){
                    this.textUrl = response.data
                    console.log("生成文件的url", this.textUrl)
                    const routeUrl = this.$router.resolve({
                        path: '/data_set_text_detail.',
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
            }).catch(error =>{
                console.log(error)
            })
        },

        // 删除文件
        openDeleteTip(imageId) {
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
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
  