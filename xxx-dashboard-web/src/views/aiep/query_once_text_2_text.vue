<template>
    <el-card>
        <el-input-group>
            
            
            
            <div style="font-size: 26px; font-weight: 600; margin: 0px">文>>>>文</div>
            <div class="input-row">
                <el-input type="textarea" v-model="inputValue" :rows="15"></el-input>
            </div>
            
            
            <div class="additional-content">
                <div >
                    <div class="input-row">
                        <el-select class="label" v-model="optionModel" @change="modelSelectChange">
                            <el-option
                                v-for="item in optionsModels"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        
                        <el-button class="label" @click="answer1">Answer</el-button>
                    </div>
                    <!-- <div class="input-row">
                        <div class="input-container">
                            <el-input type="textarea" v-model="contextAnswer1" :rows="20"></el-input>
                        </div>
                    </div> -->
                    <div style="margin: 30px">

                        <pre class="json-display">{{ contextAnswer1 }}</pre>

                    </div>
                </div>
                
                
                
            </div>
        </el-input-group>
    </el-card>
</template>



<script>
    import { startLoading, endLoading } from '@/utils/loading'
    import { queryOnce } from '@/api/api-aiep'
  
    export default {
      data(){
        return {
            inputValue: '',
            contextValue: '',
            contextAnswer1: '',
            contextAnswer2: '',
            contextEval: '',
            dialogVisible: false,
            optionModel: 'claude-v3-haiku',
            optionsModels: [
                {value: 'claude-v3-haiku', label: 'claude-v3-haiku'},
                {value: 'claude-v3-sonnet', label: 'claude-v3-sonnet'},
                {value: 'claude-v3-opus', label: 'claude-v3-opus'},
                {value: 'command+', label: 'command+'},
                {value: 'gpt4', label: 'gpt4'},
                {value: 'gpt4o', label: 'gpt4o'},
                {value: 'llama3-8b-inst', label: 'llama3-8b-inst'},
                {value: 'llama3-70b-inst', label: 'llama3-70b-inst'},
            ],
        }
      },
      created() {
      },
      mounted() {

      },
      methods: {
        modelSelectChange(value) {
            console.log(value)
        },
        answer1(){
            if (this.inputValue.trim()) {
                const params = {
                    "llm_question": this.inputValue,
                    "model": this.optionModel
                }
                const data = {
                    "param": JSON.stringify(params)
                }
                console.log(data)
                startLoading()
                this.contextAnswer1 = ""
                queryOnce(data).then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        if (this.optionModel == "claude-v3-haiku"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }
                        if (this.optionModel == "claude-v3-sonnet"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }
                        if (this.optionModel == "claude-v3-opus"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }
                        if (this.optionModel == "gpt4"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }
                        if (this.optionModel == "gpt4o"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }
                        if (this.optionModel == "command+"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }
                        if(this.optionModel == "llama3-8b-inst"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }
                        if(this.optionModel == "llama3-70b-inst"){
                            this.contextAnswer1 = JSON.parse(response.data.data).generated_answer
                        }           
                    }
                    endLoading()
                }).catch(error => {
                    console.error("网络访问异常:", error);
                    endLoading()
                });
            } else {
                this.$message.warning('请输入内容');
            }
            
        },
      }
    }
</script>
  
<style>
  .grid-container {
    display: grid;
    grid-template-columns: auto 1fr auto; /* 第一列自动宽度，第二列占剩余空间 */
    align-items: center;
    column-gap: 10px; /* 调整前缀文本和输入框的间隔 */
  }
  .prefix-text {
      font-size: 16px;
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #ed8712; /* 分割线的颜色 */
    margin: 5px 0; /* 调整分割线上下的间距 */
  }
  .additional-content div {
      margin-bottom: 1px;
  }
  .answer-content div {
    margin-bottom: 2px; /* 调整 el-button 和 el-input 之间的间距 */
  }
  .input-row {
    display: flex;
    align-items: center;
    margin-bottom: 5px; /* 调整每一行之间的间距 */
  }
  .label {
    margin-right: 10px; /* 调整文本和输入框之间的间距 */
  }
  .input-container {
    flex: 1; /* 让输入框占据剩余空间 */
  }

  .json-display {
  white-space: pre-wrap; /* 允许换行 */
  word-wrap: break-word; /* 在需要时断开单词 */
  background-color: #f4f4f4; /* 添加背景颜色 */
  font-size: 20px;
  }
</style>