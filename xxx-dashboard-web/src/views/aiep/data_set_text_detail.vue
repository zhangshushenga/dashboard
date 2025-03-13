<template>
    <div style="width: 100%; min-height: 100dvh;">
        <div style="font-size: 26px; font-weight: 600; margin: 20px">验证集详情: {{ dataSetName }}</div>
        <div style="display: flex; flex-direction: column; flex-wrap: wrap;">     
            <el-table ref="multipleTable" :data=currentData tooltip-effect="dark" style="width: 120%" class="table" :fit="true" :show-overflow="'tooltip'"
            v-loading="islistDataLoading">
                <el-table-column
                    min-width="30%"
                    v-for="key in fileKeys"
                    :key="key"
                    :prop="key"
                    :label="key"
                    cell-class-name="zebra-stripe">
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="15%">
                <template slot-scope="scope">
                    <div class="button-group">
                        <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                    </div>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination class="custom-pagination" :current-page.sync="currentPageNum" :page-size="currentPageSize"
                    :page-sizes="[20]" :total="total" background layout="total,sizes,prev,pager,next,jumper"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" /> 

            <!-- 引入 dialogVisible 组件 -->
            <edit-text-dialog :dialog-visible.sync="dialogVisible" :id="textId" :text:="textValue" :label="labelValue"  :content="textContent" :textKey="fileKeys"
                @submit="handleDialogSubmit">
            </edit-text-dialog>
        </div>
    </div>
</template>
  
<script>

import axios from 'axios';
import Papa from 'papaparse';
import { editTextContent } from '../../api/api-aiep'
import EditTextDialog from '../../components/Aiep/EditTextDialog.vue'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    components: {
        EditTextDialog
    },
    props: ['dataSetId', 'dataSetName', 'dataSetType', 'fileName', 'fileUrl'],
    data() {
        return {
            currentData: [],
            labelKeys: [],
            fileKeys: [],
            jsonData: {},
            dialogVisible: false,
            textPath: '',
            textId: '',
            textValue: '',
            labelValue: '',
            textContent: {},
            editContent: ''
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        startLoading()
        this.fetchAndParseCSV(this.$route.query.data_set_file_url)
    },
    methods: {
        firstSearch(){
        },
        getList(page) {
            this.currentPageSize = 20
            this.currentData = []
            const data_len = this.jsonData.length
            const max_page = Math.ceil(data_len/20)

            if (max_page < page){
                page = max_page
            }
            endLoading()
            const jsonData = this.jsonData.slice(this.currentPageSize*(page-1),this.currentPageSize*page)
            console.log("data------->",jsonData)
            this.getDetailToJson(jsonData)
        },
        // excel_to_json 解析
        getDetailToJson(jsonData){
            console.log("jsonData", jsonData)
            for (const r of jsonData) {
                this.fileKeys = []
                // 使用Object.keys遍历jsonData对象的键
                Object.keys(jsonData[0]).forEach((key) => {
                    // 如果labelKeys数组中还没有这个键，就添加进去
                    if (!this.fileKeys.includes(key)) {
                        this.fileKeys.push(key);
                    }
                })

                this.currentData.push(r)
            }
        },

        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
            this.currentPage = val
            console.log("当前页", this.currentPage)
            this.getList(this.currentPage)
        },
        initializeColumns() {
        if (this.tableData.length > 0) {
            // 从第一行数据中获取gpt4Json的键，假设所有行结构相同
            const firstRowGpt4Json = this.gpt4Json[0].gpt4Json;
            this.gpt4JsonKeys = Object.keys(firstRowGpt4Json);
            }
        },

        async fetchAndParseCSV(url) {
            console.log("文件原始path", url)
            var pathStart = url.indexOf("data_set_text/");
            var pathEnd = url.indexOf("?");
            this.textPath = url.substring(pathStart, pathEnd);
            console.log("textPath----->", this.textPath)

            console.log("当前的url", url)
            try {
                const response = await axios.get(url)
                Papa.parse(response.data, {
                header: true,
                complete: (results) => {
                    this.jsonData = results.data
                    this.getList(1)
                }
                })
            } catch (error) {
                endLoading()
                console.error('Error fetching or parsing CSV:', error)
            }
        },
        // 修改当前行
        handleEditClick(row){
            this.textId = row.id
            this.textValue = row.text
            this.labelValue = row.label
            this.textContent =  row
            console.log("textValue----->",this.textValue)
            console.log("textContent----->",this.textContent)
            this.dialogVisible = true
        },

        handleDialogSubmit(formData) {
            // 在这里处理提交的数据
            console.log('提交的数据[]:', formData);
            const data = [{"0": this.textId, "1": formData.content.text, "2": formData.content.label}]
            this.editContent = JSON.stringify(data)
            const param = {"path": this.textPath, "id": +formData.content.id, "editContent": this.editContent}
            console.log("param", JSON.stringify(param))

            editTextContent(param).then(response => {
                console.log("edit_param_response", response)
                if (response.code === 0) {
                    this.$message({
                        message: "modified successfull",
                        type: "success",
                        duration: 1000
                    })
                }
            }).catch(e => {
                console.log("edit_param_response" + e)
            })  
        },
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

/* .dropdown-content {
  max-height: 200px; /* 固定下拉框高度，根据需要调整 */
  /* overflow-y: auto; /* 内容超过高度时可滚动 */
  /* background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
} */ 

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
.button-container {
  display: flex;
  align-items: center; /* 确保按钮垂直居中 */
}
.limited-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* 限制显示的行数为5行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

/* 当鼠标悬停时，显示全部文本 */
.limited-lines:hover {
  -webkit-line-clamp: unset; /* 移除行数限制 */
  max-height: none;
}

.zebra-stripe {
    background-color: #797575;
}
</style>
  