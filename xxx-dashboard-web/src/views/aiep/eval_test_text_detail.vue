<template>
    <div style="width: 100%; min-height: 100dvh;">
        <div style="font-size: 26px; font-weight: 600; margin: 20px">验证结果详情: {{ dataSetName }}</div>
        <template v-if="taskType === '1'">
            <el-button :loading="create_loading"  class="button-style3" size="min"
                @click="handleResultAnalysis">
                {{ $t('意图识别结果统计') }}
            </el-button>
        </template>
        <div style="display: flex; flex-direction: column; flex-wrap: wrap;">     
            
            <el-table ref="multipleTable" :data=currentData tooltip-effect="dark" style="width: 120%" class="table" :fit="true" :show-overflow="'tooltip'"
            v-loading="islistDataLoading" border>
                <el-table-column
                    min-width="30%"
                    v-for="key in textKey"
                    :key="key"
                    :prop="key"
                    :label="key">
                </el-table-column>
            </el-table>
            <el-pagination class="custom-pagination" :current-page.sync="currentPageNum" :page-size="currentPageSize"
                :page-sizes="[20]" :total="total" background layout="total,sizes,prev,pager,next,jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" /> 
        </div>
        <result-statistics-dialog :dialog-visible.sync="dialogVisible" :typeData="typeData" :totalNumber="totalNumber" 
            @close="DialogSubmit">
        </result-statistics-dialog>
    </div>
</template>
  
<script>
import { getTextTestResultDownloadUrl } from '../../api/api-aiep'
import axios from 'axios';
import Papa from 'papaparse';
import ResultStatisticsDialog from '../../components/Aiep/ResultStatisticsDialog.vue';
import { endLoading, startLoading } from '@/utils/loading'


export default {
    components: {
        ResultStatisticsDialog,
    },
    props: ['evalResultUrl', 'agentName', 'aegntScore', 'labelScore'],
    data() {
        return {
            currentData: [],
            jsonData: {},
            textKey: [],
            labelType: [],
            typeData: [],
            totalNumber: 0,
            dialogVisible: false,
            dataSetName: '',
            taskType: ''
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        startLoading()
        this.fetchCsvToJson(this.$route.query.eval_result_url)
        this.dataSetName = this.$route.query.data_set_name
        this.taskType = this.$route.query.data_set_task_type
        console.log("taskType",this.taskType)
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

            for (const r of jsonData){
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
        // 定义从URL获取Excel文件并解析为JSON的函数
        async fetchCsvToJson(path) {
            try {
                const param = {"path": path};
                console.log("path", path)
                const response = await getTextTestResultDownloadUrl(param);
                console.log("下载链接url---->", response.data);

                axios.get(response.data).then(response => {
                Papa.parse(response.data, {
                    header: true,
                    complete: (results) => {
                        this.jsonData = results.data
                        console.log("data---->", this.jsonData);

                        for (const r of this.jsonData) {
                            Object.keys(this.jsonData[0]).forEach((key) => {
                                if (!this.textKey.includes(key)) {
                                    this.textKey.push(key)
                                }
                            })
                        }
                        console.log("textKey---->", this.textKey);
                        this.getList(1)
                    }
                })
            })
            } catch(error) {
                endLoading()
                // 处理可能的错误
                console.error("Error fetching or parsing Excel file:", error);
            };
        },
        handleResultAnalysis(){
            for (var k=0; k<this.jsonData.length; k++){
                const label_list = this.jsonData[k].label
                if (!this.labelType.includes(label_list) && label_list !== undefined){
                    this.labelType.push(label_list)
                    this.typeData.push({name: label_list, correct: 0, total: 0, error: 0, accuracy: 0}); 
                }
            }
            console.log("labelType----->", this.labelType)
            // console.log("typeData.name----->", this.typeData.name)
            for (var i=0; i<this.jsonData.length; i++){
                const label = this.jsonData[i].label
                const correctNumber = this.jsonData[i].score
                for (var j=0; j<this.labelType.length; j++){
                    if (this.typeData[j].name === label){
                        this.typeData[j].correct += Number(correctNumber)
                        this.typeData[j].total += 1
                        this.typeData[j].error = this.typeData[j].total - this.typeData[j].correct
                        this.typeData[j].accuracy = (this.typeData[j].correct / this.typeData[j].total * 100).toFixed(2)
                        this.totalNumber += 1
                    }
                }
            }
            console.log("typeData------>",this.typeData)

            this.typeData.sort(function(a,b){
                return a.accuracy - b.accuracy
            })
            console.log("sort_typeData------>",this.typeData)

            this.dialogVisible = true
        }
    }
}

</script>
  
<style>

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

/* .add-icon-button {
  background-color: transparent;
  border: none;
  padding: 0;
  width: auto;
  height: auto;
  text-align: left; /* 将文本左对齐 */
/* }  */
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
.fixed-column-background {
  background-color: #f4f0f0e6 !important; /* 选择你希望的颜色 */
}
</style>
  