<template>
    <el-card>
        <el-input-group>
            <div class="grid-container">
                <div class="prefix-text">输入您的问题：</div>
                <el-input v-model="inputValue" placeholder="查询内容"></el-input>
                <el-button @click="handleQuery">匹配知识库</el-button>
            </div>
            
            <div class="divider"></div>
            
            <div class="input-row">
                <div class="label">Context:</div>
                <el-input type="textarea" v-model="contextValue" :rows="8"></el-input>
            </div>
            
            <div class="divider"></div>
            
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
                        <el-button class="label" @click="openDialog">Prompt</el-button>
                        <el-dialog
                            title="edit prompt"
                            :visible.sync="dialogVisible"
                            width="70%"
                            @close="closeDialog"
                        >
                            <el-input v-model="editedContent" type="textarea" :rows="20"></el-input>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="closeDialog">cancel</el-button>
                                <el-button type="primary" @click="saveContent">save</el-button>
                            </span>
                        </el-dialog>
                        <el-button class="label" @click="answer1">Answer1</el-button>
                    </div>
                    <div class="input-row">
                        <div class="input-container">
                            <el-input type="textarea" v-model="contextAnswer1" :rows="5"></el-input>
                        </div>
                    </div>
                </div>
                
                
                <div >
                    <div  class="input-row">
                        <el-select class="label" v-model="optionGPT">
                            <el-option
                                v-for="item in optionsGPT"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-button class="label" @click="openDialog2">Prompt</el-button>
                        <el-dialog
                            title="edit gpt prompt"
                            :visible.sync="dialogVisible2"
                            width="70%"
                            @close="closeDialog2"
                        >
                            <el-input v-model="editedContent2_sys" type="textarea" :rows="18"></el-input>
                            <el-input v-model="editedContent2_user" type="textarea" :rows="8"></el-input>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="closeDialog2">cancel</el-button>
                                <el-button type="primary" @click="saveContent2">save</el-button>
                            </span>
                        </el-dialog>
                        <el-button class="label" @click="answer2">Answer2</el-button>
                    </div>
                    <div class="input-row">
                        <div class="input-container">
                            <el-input type="textarea" v-model="contextAnswer2" :rows="5"></el-input>
                        </div>
                    </div>
                </div>
            </div>

            <div class="divider"></div>

            <div class="answer-content">
                <div>
                    <el-select class="label" v-model="optionGPTEval">
                            <el-option
                                v-for="item in optionsGPTEval"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value"
                            ></el-option>
                    </el-select>
                    <el-button class="label" @click="openDialog3">Prompt</el-button>
                    <el-dialog
                            title="edit eval prompt"
                            :visible.sync="dialogVisible3"
                            width="70%"
                            @close="closeDialog3"
                        >
                            <el-input v-model="editedContent3" type="textarea" :rows="25"></el-input>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="closeDialog3">cancel</el-button>
                                <el-button type="primary" @click="saveContent3">save</el-button>
                            </span>
                        </el-dialog>
                    <el-button @click="handleEval">开始评价Answer1和Answer2</el-button>
                </div>
                <el-input type="textarea" v-model="contextEval" :rows="9"></el-input>
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
            optionModel: 'llama-2-7b-chat',
            optionsModels: [
                {value: 'llama-2-7b-chat', label: 'llama-2-7b-chat'},
                {value: 'llama-2-13b-chat', label: 'llama-2-13b-chat'},
                {value: 'llama-2-70b-chat', label: 'llama-2-70b-chat'},
                {value: 'claude-v2', label: 'claude-v2'},
                {value: 'assistant-api', label: 'assistant-api'},
                {value: 'next-gemma-7b', label: 'next-gemma-7b'},
            ],
            optionGPT: 'gpt-4',
            optionsGPT: [
                {value: 'gpt-4', label: 'gpt-4'},
                {value: 'gpt-4-turbo', label: 'gpt-4-turbo'},
                {value: 'gpt-3.5', label: 'gpt-3.5'},
                {value: 'claude-v3', label: 'claude-v3'},
            ],
            optionGPTEval: 'gpt-4',
            optionsGPTEval: [
                {value: 'gpt-4', label: 'gpt-4'},
                {value: 'gpt-4-turbo', label: 'gpt-4-turbo'}
            ],
            editedContent: "",
            promptLlama2: "<s>[INST] <<SYS>>\n" + 
                        "As a customer service representative for Psync Camera Genie S camera products, my responsibilities include responding to user inputs, providing technical support, and addressing complaints. Here are my work guidelines:\n" +
                        "I will extract the most relevant information from the context based on the user's input. I will avoid irrelevant reasoning and refrain from responding to content unrelated to the user's input.\n" +
                        "Express a positive attitude when users make suggestions. Keep my responses concise and easy to understand, without informing the user of the source of your answers.\n" +
                        "I will preserve the content provided in the context, attempting to retain the original information as much as possible, avoiding unnecessary independent reasoning and unrelated information.\n" +
                        "Provide Accurate and Impartial Information: I will offer precise and unbiased information to ensure users receive reliable assistance.\n" +
                        "Avoid Sharing Inappropriate Content: I will consistently avoid sharing harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.\n" + 
                        "Concise and Impactful Responses: I will focus on delivering concise yet effective responses to resolve user issues and avoid excessive enthusiasm.\n" +
                        "Address Unreasonable Questions: If faced with unreasonable or factually inconsistent questions, I will kindly explain and request clarification in a friendly manner to better assist users.\n" +
                        "If the answer cannot be accurately inferred from the context, I could say\"I'm sorry, I unable to provide you a solution at the moment. For further assistance, please visit our Help Center at https://psynclabs.com/pages/support\"\n" +
                        "Respond to the user input based on the context below\n"+
                        "\nContext:\n" +
                        "{{context}}\n" +
                        "\n<</SYS>>\n\n" +
                        " {{question}} [/INST]",
            promptClaudeV2: "\n\nHuman:\n" +
                        "As a customer service representative for Psync Camera Genie S camera products, your responsibilities include responding to user inputs, providing technical support, and addressing complaints. Here are your work guidelines:\n" +
                        "You will extract the most relevant information from the context based on the user's input. You will avoid irrelevant reasoning and refrain from responding to content unrelated to the user's input.\n" +
                        "Express a positive attitude when users make suggestions. Keep your responses concise and easy to understand, without informing the user of the source of your answers.\n" +
                        "You will preserve the content provided in the context, attempting to retain the original information as much as possible, avoiding unnecessary independent reasoning and unrelated information.\n" +
                        "Provide Accurate and Impartial Information: you will offer precise and unbiased information to ensure users receive reliable assistance.\n" +
                        "Avoid Sharing Inappropriate Content: you will consistently avoid sharing harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.\n" + 
                        "Concise and Impactful Responses: you will focus on delivering concise yet effective responses to resolve user issues and avoid excessive enthusiasm.\n" +
                        "Address Unreasonable Questions: If faced with unreasonable or factually inconsistent questions, you will kindly explain and request clarification in a friendly manner to better assist users.\n" +
                        "If the answer cannot be accurately inferred from the context, you could say\"I'm sorry, I unable to provide you a solution at the moment. For further assistance, please visit our Help Center at https://psynclabs.com/pages/support\"\n" +
                        "Respond to the user input based on the context below\n"+
                        "\nContext:\n" +
                        "{{context}}\n" +
                        "\nInput:\n" +
                        "{{question}}\n" +
                        "\nAssistant:",
            promptGemma: "As a customer service representative for Psync Camera Genie S camera products, your responsibilities include responding to user inputs, providing technical support, and addressing complaints. Here are your work guidelines:\n" +
                        "You will extract the most relevant information from the context based on the user's input. You will avoid irrelevant reasoning and refrain from responding to content unrelated to the user's input.\n" +
                        "Express a positive attitude when users make suggestions. Keep your responses concise and easy to understand, without informing the user of the source of your answers.\n" +
                        "You will preserve the content provided in the context, attempting to retain the original information as much as possible, avoiding unnecessary independent reasoning and unrelated information.\n" +
                        "Provide Accurate and Impartial Information: you will offer precise and unbiased information to ensure users receive reliable assistance.\n" +
                        "Avoid Sharing Inappropriate Content: you will consistently avoid sharing harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.\n" + 
                        "Concise and Impactful Responses: you will focus on delivering concise yet effective responses to resolve user issues and avoid excessive enthusiasm.\n" +
                        "Address Unreasonable Questions: If faced with unreasonable or factually inconsistent questions, you will kindly explain and request clarification in a friendly manner to better assist users.\n" +
                        "If the answer cannot be accurately inferred from the context, you could say\"I'm sorry, I unable to provide you a solution at the moment. For further assistance, please visit our Help Center at https://psynclabs.com/pages/support\"\n" +
                        "Respond to the user input based on the context below\n"+
                        "\nContext:\n" +
                        "{{context}}\n" +
                        "\nInput:\n" +
                        "{{question}}\n",
            dialogVisible2: false,
            editedContent2_sys: "As a customer service representative for Psync Camera Genie S camera products, my responsibilities include responding to user inputs, providing technical support, and addressing complaints. Here are my work guidelines:\n" +
                            "I will extract the most relevant information from the context based on the user's input. I will avoid irrelevant reasoning and refrain from responding to content unrelated to the user's input.\n" + 
                            "Express a positive attitude when users make suggestions. Keep my responses concise and easy to understand, without informing the user of the source of your answers.\n" + 
                            "I will preserve the content provided in the context, attempting to retain the original information as much as possible, avoiding unnecessary independent reasoning and unrelated information.\n" + 
                            "Provide Accurate and Impartial Information: I will offer precise and unbiased information to ensure users receive reliable assistance.\n" + 
                            "Avoid Sharing Inappropriate Content: I will consistently avoid sharing harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.\n" + 
                            "Concise and Impactful Responses: I will focus on delivering concise yet effective responses to resolve user issues and avoid excessive enthusiasm.\n" + 
                            "Address Unreasonable Questions: If faced with unreasonable or factually inconsistent questions, I will kindly explain and request clarification in a friendly manner to better assist users." + 
                            "If the answer cannot be accurately inferred from the context, I could say\"I'm sorry, I unable to provide you a solution at the moment. For further assistance, please visit our Help Center at https://psynclabs.com/pages/support\"",
            editedContent2_user: "Respond to the user input based on the context below" +
                            "\n\n" + 
                            "Context:" + 
                            "\n{{context}}" +
                            "\n\n" + 
                            "Input:" + 
                            "\n{{question}}",
            dialogVisible3: false,
            editedContent3: "[Context]" + 
                            "\n" + 
                            "{{context}}" + 
                            "\n\n" + 
                            "[Question]" + 
                            "\n" + 
                            "{{question}}" + 
                            "\n\n" + 
                            "[Assistant 1]" + 
                            "\n" + 
                            "{{assist_1_answer}}" + 
                            "\n\n" + 
                            "[End of Assistant 1]" + 
                            "\n\n" + 
                            "[Assistant 2]" + 
                            "\n" + 
                            "{{assist_2_answer}}" + 
                            "\n\n" + 
                            "[End of Assistant 2]" + 
                            "\n\n" + 
                            "[System]" + 
                            "\n" + 
                            "我想听听你对上述用户问题中的两个AI助手表现的反馈。两个助手的回答是根据提供的三个知识点分析而来,这三个知识点中也有和问题无关的内容。为了帮助你参考，我提供了这些知识点。请根据准确性、简洁性和感情这三方面评价这两个助手的回应，1到10打分，并给出综合打分。准确性:只关心回答对于用户问题是否正确,不关心是否含了三个知识点中的所有内容。简洁性:用最少的词汇和语法结构回复。感情:表达生动,可以安抚用户的情绪。",
        }
      },
      created() {
        this.editedContent = this.promptLlama2
      },
      mounted() {

      },
      methods: {
        handleQuery(){
            console.log("handleQuery");
            if (this.inputValue.trim()) {
                this.contextValue = ""
                this.contextAnswer1 = ""
                this.contextAnswer2 = ""
                this.contextEval = ""
                const params = {"vector_question":this.inputValue}
                const data = {
                    "param": JSON.stringify(params)
                }
                console.log(data)
                startLoading()
                queryOnce(data).then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        this.contextValue = JSON.parse(response.data.data).context + "\n\nscore:\n" + JSON.parse(response.data.data).score
                    }
                    endLoading()
                }).catch(error => {
                    console.error("网络访问异常:", error);
                    endLoading()
                });
            }else{
                this.$message.warning('请输入查询内容');
            }

        },
        modelSelectChange(value) {
            console.log(value)
            if (value == "llama-2-7b-chat"){
                this.editedContent = this.promptLlama2
            }
            if (value == "llama-2-13b-chat"){
                this.editedContent = this.promptLlama2
            }
            if (value == "llama-2-70b-chat"){
                this.editedContent = this.promptLlama2
            }
            if(value == "claude-v2"){
                this.editedContent = this.promptClaudeV2
            }
            if(value == "claude-v3"){
                this.editedContent = this.promptClaudeV2
            }
            if(value == "assistant-api"){
                this.editedContent = "{{question}}"
            }
            if(value == "next-gemma-7b"){
                this.editedContent = this.promptGemma
            }
        },
        can_i_submit(){
            if (this.optionModel == "assistant-api") {
                if (this.inputValue.trim()){
                    return true
                }
            }
            if (this.inputValue.trim() && this.contextValue.trim()){
                return true
            }
            return false
        },
        answer1(){
            if (this.can_i_submit()) {
                const params = {
                    "llm_question":this.editedContent.replace("{{context}}",this.contextValue.split("\n\nscore:\n")[0]).replace("{{question}}",this.inputValue),
                    "model":this.optionModel
                }
                const data = {
                    "param": JSON.stringify(params)
                }
                console.log(data)
                startLoading()
                queryOnce(data).then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        this.contextAnswer1 = JSON.parse(response.data.data).generated_answer.result
                    }
                    endLoading()
                }).catch(error => {
                    console.error("网络访问异常:", error);
                    endLoading()
                });
            }else{
                this.$message.warning('内容不能为空');
            }
            
        },
        answer2(){
            if (this.inputValue.trim() && this.contextValue.trim()) {
                const params = {
                    "content_sys":this.editedContent2_sys,
                    "content_user":this.editedContent2_user.replace("{{context}}",this.contextValue.split("\n\nscore:\n")[0]).replace("{{question}}",this.inputValue),
                    "gpt_question":this.inputValue,
                    "model":this.optionGPT
                }
                const data = {
                    "param": JSON.stringify(params)
                }
                console.log(data)
                startLoading()
                queryOnce(data).then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        this.contextAnswer2 = JSON.parse(response.data.data).gpt_answer
                    }
                    endLoading()
                }).catch(error => {
                    console.error("网络访问异常:", error);
                    endLoading()
                });
            }else{
                this.$message.warning('内容不能为空');
            } 
            
        },
        handleEval(){
            if (this.inputValue.trim() && this.contextValue.trim() && this.contextAnswer1.trim() && this.contextAnswer2.trim()) {
                console.log("handleEval");
                const params = {
                    "eval_content":this.editedContent3.replace("{{context}}",this.contextValue.split("\n\nscore:\n")[0]).replace("{{question}}",this.inputValue).replace("{{assist_1_answer}}",this.contextAnswer1).replace("{{assist_2_answer}}",this.contextAnswer2),
                    "model":this.optionGPTEval
                }
                const data = {
                    "param": JSON.stringify(params)
                }
                console.log(data)
                // this.getEvalResult(data)
                startLoading()
                queryOnce(data).then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        this.contextEval = JSON.parse(response.data.data).eval_result
                    }
                    endLoading()
                }).catch(error => {
                    console.error("网络访问异常:", error);
                    endLoading()
                });
            }else{
                this.$message.warning('内容不能为空');
            } 
            
        },
        openDialog() {
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        saveContent() {
            // 在这里可以保存编辑后的内容
            console.log("保存的内容: " + this.editedContent);
            this.dialogVisible = false;
        },
        openDialog2() {
            this.dialogVisible2 = true;

        },
        closeDialog2() {
            this.dialogVisible2 = false;
        },
        saveContent2() {
            // 在这里可以保存编辑后的内容
            console.log("保存的内容: " + this.editedContent2_sys);
            this.dialogVisible2 = false;
        },
        openDialog3() {
            this.dialogVisible3 = true;
        },
        closeDialog3() {
            this.dialogVisible3 = false;
        },
        saveContent3() {
            // 在这里可以保存编辑后的内容
            console.log("保存的内容: " + this.editedContent3);
            this.dialogVisible3 = false;
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
</style>