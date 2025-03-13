<template>
    <div style="width: 100%; min-height: 100dvh;">
        <div style="font-size: 26px; font-weight: 600; margin: 20px">验证结果详情: {{ agnetName }}</div>
        <div style="display: flex; flex-direction: column; flex-wrap: wrap;"> 
            <template v-if="this.task_type === true"> 
                <el-popover placement="bottom-start" width="300" trigger="click">
                    <div v-html="eval_mark" class="popover-content"></div>
                    <el-button slot="reference">点击查看评估结果</el-button>
                </el-popover>
            </template>
            <template v-else>
                <el-popover placement="bottom" width="1200" trigger="click">
                    <div v-html="promptValue"></div>
                    <el-button slot="reference">点击查看评分prompt</el-button>
                </el-popover>
            </template>
            <el-table ref="multipleTable" :data=currentData tooltip-effect="dark" style="width: 120%" class="table" :fit="true" :show-overflow="'tooltip'"
            v-loading="islistDataLoading" border>
                <el-table-column fixed prop="id" label="ID" min-width="15%"></el-table-column>
                <el-table-column label="Iamge" width="200">
                    <template v-slot:default="scope">
                        <img :src="scope.row.imageUrl" alt="Image" :style="{ width: '120px', height: '120px', objectFit: 'cover' }" class="imageCard"/>
                    </template>
                </el-table-column>
                <el-table-column prop="agentAnswer" label="agent_answer" min-width="50%">
                    <template slot-scope="scope">
                        <div class="limited-lines" v-html="scope.row.agentAnswer"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="labelAnswer" label="label" min-width="50%">
                    <template slot-scope="scope">
                        <div class="limited-lines" v-html="scope.row.labelAnswer"></div>
                    </template>
                </el-table-column>
                <template v-if="this.task_type !== true">
                    <el-table-column prop="eval" label="eval" min-width="50%">
                        <template slot-scope="scope">
                            <!-- 使用 v-html 指令渲染 HTML 内容 -->
                            <div class="limited-lines" v-html="scope.row.eval"></div>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column
                    min-width="30%"
                    v-for="key in dimensionAgentKeys"
                    :key="key"
                    :prop="key"
                    :label="key"
                    class-name="fixed-column-background">
                </el-table-column>

                <el-table-column
                    min-width="30%"
                    v-for="key in dimensionLabelKeys"
                    :key="key"
                    :prop="key"
                    :label="key">
                </el-table-column>
                <template v-if="this.task_type !== true">
                    <el-table-column prop="label_average_scores" label="label_scores" min-width="40%" class-name="fixed-column-background"></el-table-column>
                </template>
                <el-table-column prop="agent_average_scores" label="agent_scores" min-width="40%" ></el-table-column>
            </el-table>
            <el-pagination class="custom-pagination" :current-page.sync="currentPageNum" :page-size="currentPageSize"
                :page-sizes="[20]" :total="total" background layout="total,sizes,prev,pager,next,jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" /> 
        </div>
    </div>
</template>
  
<script>
import { getDataSetImageList, getAgentTestResultDownloadUrl } from '../../api/api-aiep'
import { endLoading, startLoading } from '@/utils/loading'
import DrawRectImage from '../../components/DrawRectImage/DrawRectImage.vue'
import XLSX from "xlsx"
import JSZip from 'jszip';
// import { data } from 'jquery'
import { options } from 'dropzone'
import { Loading } from 'element-ui';


export default {
    props: ['evalResultUrl', 'agentName', 'aegntScore', 'labelScore'],
    data() {
        return {
            agnetName: this.$route.query.agent_name,
            evalResultUrl: this.$route.query.eval_result_url,
            agentScore: this.$route.query.agent_score,
            labelScore: this.$route.query.label_score,
            currentData: [],
            labelKeys: [],
            agent_answers: [],
            labels: [],
            imageUrl:[],
            excelKeys: [],
            dimensionAgentKeys: [],
            dimensionLabelKeys: [],
            promptValue: '',
            agentAverageScore: 0,
            labelAverageScore: 0,
            jsonData: {},
            eval_mark: '',
            task_type: '',
            total_sample: 0,
            positive_sample: 0,
            negative_sample: 0,
            positive_true: 0,
            negative_true: 0
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        // console.log("agnetName", this.evalResultUrl)
        startLoading()
        this.fetchExcelToJson(this.$route.query.eval_result_url),
         this.task_type = this.$route.query.data_set_task_type === '1'
         console.log("task_type--->", this.task_type)
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
            this.negative_sample = this.negative_true = this.positive_sample = this.positive_true = 0
            for (var r of this.jsonData){
                if (r.label === 0){
                    this.negative_sample += 1
                    if (r.agent_average_scores === 1){
                        this.negative_true += 1
                    }
                }else{
                    this.positive_sample += 1
                    if (r.agent_average_scores === 1){
                        this.positive_true += 1
                    }
                }
                this.total_sample = this.jsonData.length
            }
            this.eval_mark = `总样本数: ${this.total_sample}  <br><br>
        正/负样本数: ${this.positive_sample} / ${this.negative_sample} <br><br>
        正样本正确率: ${this.positive_true} / ${this.positive_sample} <br><br>
        负样本正确率: ${this.negative_true} / ${this.negative_sample} <br><br>
        准确率: ${this.$route.query.data_set_accuracy} <br><br>
        精确率: ${this.$route.query.data_set_precision} <br><br>
        召回率: ${this.$route.query.data_set_recall} <br><br>
        F1-score: ${this.$route.query.data_set_f1}`
            
            const jsonData = this.jsonData.slice(this.currentPageSize*(page-1),this.currentPageSize*page)
            console.log("data------->",jsonData)
            this.getDetailToJson(jsonData)
        },
        // excel_to_json 解析
        getDetailToJson(jsonData){
            
            console.log("jsonData", jsonData)
            if ('prompt_score' in jsonData[0] && jsonData[0].prompt_score !== ''){
                const prompt_score = JSON.parse(jsonData[0].prompt_score)
                const role = prompt_score[0].content
                const prompt = prompt_score[1].content[0].text
                this.promptValue = "role: " + role + "<br>" + "prompt: " + prompt
            }
            else{
                this.promptValue = ''
            }

            for (const r of jsonData) {
                this.dimensionAgentKeys = []
                this.dimensionLabelKeys = []
                this.excelKeys = ["id","agent_answer","agent_average_scores","agent_name","eval","imageUrl","image_path","label","label_average_scores","prompt_score","agentAnswer","labelAnswer"]
                // 使用Object.keys遍历jsonData对象的键
                Object.keys(jsonData[0]).forEach((key) => {
                    // 如果labelKeys数组中还没有这个键，就添加进去
                    if (!this.excelKeys.includes(key)) {
                        if (key.includes("agent")){
                            this.dimensionLabelKeys.push(key)
                        }
                        else{
                            this.dimensionAgentKeys.push(key);
                        }
                    }
                })
                console.log("label",r.label)
                if (r.label !== 0 && r.label !== 1){
                    try{
                        r.agent_answer = JSON.parse(r.agent_answer)
                        r.label = JSON.parse(r.label)
                    }
                    catch{
                        r.agent_answer = r.agent_answer
                        r.label = r.label
                    }
                    this.agent_answers = []
                    this.labels = []
                    //使用Object.keys遍历gpt4Json对象的键
                    Object.keys(r.label).forEach((key) => {
                        // 如果labelKeys数组中还没有这个键，就添加进去
                        if (!this.labelKeys.includes(key)) {
                            const label_value = r.label[key]
                            const agent_value = r.agent_answer[key]
                            this.agent_answers.push(key + ":" + agent_value)
                            this.labels.push(key + ":" + label_value)
                        }
                    });
                    r.agentAnswer = this.agent_answers.join('<br>')
                    r.labelAnswer = this.labels.join('<br>')
                }
                else{
                    r.agentAnswer = r.agent_answer
                    r.labelAnswer = r.label
                }
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
        async fetchExcelToJson(path) {
            try {
                const param = {"path": path};
                const response = await getAgentTestResultDownloadUrl(param);
                console.log("下载链接url---->", response.data);

                // 使用fetch API从提供的URL获取Excel文件
                const excelResponse = await fetch(response.data);
                const arrayBuffer = await excelResponse.arrayBuffer();

                // 使用SheetJS解析ArrayBuffer为JSON
                const workbook = XLSX.read(arrayBuffer, {type: 'buffer'});
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                // 准备处理图片
                const zip = new JSZip();
                await zip.loadAsync(arrayBuffer); // 加载Excel文件的ArrayBuffer到JSZip

                // 假设我们将图片URLs添加到JSON对象中
                // 这里我们需要一个逻辑来确保图片URL正确地对应于JSON中的记录
                let imageIndex = 0; // 用于追踪当前处理的图片索引

                for (let filename of Object.keys(zip.files)) {
                    if (filename.startsWith('xl/media/')) { // Excel图片通常存储在这个目录下
                        const fileContent = await zip.file(filename).async('blob');
                        // 生成图片URL
                        const url = URL.createObjectURL(fileContent);

                        // 假设我们已经知道如何将图片映射到特定的JSON对象
                        if (json[imageIndex]) {
                            // 添加图片URL到对应的JSON对象中
                            json[imageIndex].imageUrl = url;
                        }
                        imageIndex++;
                    }
                }

                console.log("带有图片URLs的JSON：", json);
                this.jsonData = json


                // 在这里处理带有图片URLs的JSON对象
                this.getList(1);
            } catch(error) {
                // 处理可能的错误
                endLoading()
                console.error("Error fetching or parsing Excel file:", error);
            };
        },
    }
}

</script>
  
<style>
/* .add-icon-button {
    margin-top: 10px;
    background-color: transparent;
    border: none;
    padding: 0;
    width: auto;
    height: auto;
    text-align: left;
    /* 将文本左对齐 */
/* } */

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
.popover-content {
    font-size: 14px;
}

</style>