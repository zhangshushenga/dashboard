<template>
    <el-dialog title="请输入GPT标注的prompt" :visible.sync="DialogVisible" :before-close="handleDialogClose" :modal="false" width="1000px" :style="{ height: '2000px' }">
      <el-form ref="dataForm" :model="promptData" :rules="formRules" fullscreen>
        <el-form-item label="agent_name" prop="agentName">
          <el-input v-model="promptData.agentName" readonly></el-input>
        </el-form-item>
        <el-form-item label="GPT标注role" prop="role">
            <el-input 
              type = "textarea"
              :row = "1"
              v-model="promptData.role">
            </el-input>
        </el-form-item>
        <el-form-item label="GPT标注prompt" prop="prompt">
            <el-input 
              type = "textarea"
              :rows = "10"
              v-model="promptData.prompt">
            </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer-flex">
        <el-button @click="closeDialog" >取消</el-button>
        <el-button type="primary" @click="submitData">确定</el-button>
      </span>
    </el-dialog>
</template>
      
<script>
import { number } from 'echarts';

export default {
    props: {
      DialogVisible: {
        type: Boolean,
        required: true,
      },
      agentName:{
        type: String,
      },
      role:{
        type: String
      },
      prompt:{
        type: String
      },
      agentMarker: {
        type: Number
      }
    },
    
    data() {
      return {
        promptData: {
          role: '',
          prompt: '',
          agentName: this.agentName,
          row: this.row,
          agentMarker: this.agentMarker
        },
        formRules: {
          // prompt: [{ required: true, message: '请输入GPT标注的prompt', trigger: 'blur' }],
        },
        prompt_data: [
          // 1. 毒舌食评
          {"name": "毒舌食评", 
          "role": "You're an elegantly venomous food critic.",
          "prompt": `Please carefully identify the food or drink in the pictures provided. If the image features one dish, complete response according to the following requirements. If multiple dishes are present in the image, select one that is either most familiar to you or is prominently displayed and fully visible in the photo. Then, complete the response based on the following requirements. The requirements are as follows:

1.title:
- Analyze and identify one of the main characteristics of the selected dish, such as color, flavor, and ingredients. Then, in about 8 words, generate an artistic, vivid and metaphorical title. If the picture does not show a dish ready to be eaten, the 'title' is "".
- Example: Example 1: 'Colorful Vitamin Salad'

2.rateScore:
- Carefully analyze the content of the images and then rate them according to the following rules:
-- if there are larger critical issues. such as overcooking, the rateScore up to 3;
-- If no major errors are found but the color variety is boring or monotonous, rateScore up to 5;
-- If no major errors are found, and the color are not monotonous, but the presentation is unattractive, rateScore up to 6;
-- If no major errors are found, and the color are not monotonous, the presentation is impressive, but the nutrition is not balanced, rateScore up to 7;
-- If no major errors are found, and the color are not monotonous, the presentation is impressive and the nutrition is balanced, but the cooking process is simple, rateScore up to 8;
-- If all of the previously mentioned items are very good, the rateScore goes straight to 10;
-- If there is no prepared dish in the picture, the rating will be 0.
3.rateReason:
- Explain in one sentence the reason for the rating, the format of "strength , but shortcomings". Sentence length should be about 8 words. If the 'title' is '', then 'rateReason' is also ''.
4.evaluation:
- Look carefully at the information in the pictures.
-- If the 'title' is not ''. identify the advantages and disadvantages of the dishes. Write a short, subjectively sharp, biting and humorous essay of 30 words, without vulgarity, which includes both a vivid affirmation of the dish's merits and an outspoken criticism and slightly mean-spirited elaboration of its shortcomings.
-- If the 'title' is '', Please generate a witty, humorous, and positive comment related to cooking based on the content of the image, approximately 30 words.

Response must be presented in JSON format, the structure of the response must be:
{
    "title": "xxxxxxx", 
    "rateScore": "0",
    "rateReason": "xx ,xx",
    "evaluation": "xxxxxxxxxxxxxxxxxxxxxxxxxx"
 }`
},
          // 2.猫狗印记
          {"name": "猫狗印记", 
          "role": "You are a pet expert with extensive knowledge of dog and cat breeds.", 
          "prompt": `Please provide a description of the picture that includes the breeds of the dog or cat. The rules are as follows:
1.If there are no cats or dogs, just output ''
2.Identified pet breeds into the description.
3.The description should be vivid, factual, avoiding any ambiguity.
4.The description should not exceed 15 words.
5.If there is more than one cat or dog in the picture, consider the following example.
example: British Shorthair cat slaps naughty Shiba Inu with its hind legs.


Response should be presented in JSON format, the structure of the response should be:

{"description":"xxxxxx"}`},

        // 3.agent_type
        {
          "name": "",
          "role": "You are a content editor.",
          "prompt": `Describe the picture in 15 words or less.
Response should be presented in JSON format, the structure of the response should be:

{"description":"xxxxxx"}`
        }
        ],
      };
    },
    watch: {
      prompt(newPrompt) {
        this.promptData.prompt = newPrompt
      },
      role(newRole){
        this.promptData.role = newRole
      },
      agentName(newAgentName){
        this.promptData.agentName = newAgentName
      },
      agentMarker(newagentMarker){
        this.promptData.agentMarker = newagentMarker
        this.firstSearch()
      },
    },
    mounted(){
      this.firstSearch()
    },
  
    methods: {
      firstSearch(){
        console.log("this.promptData.agentMarker", this.promptData)
        if (this.promptData.agentMarker === -1){
          for (var i=0; i<this.prompt_data.length; i++){
            if (this.promptData.agentName === this.prompt_data[i].name){
              this.promptData.role = this.prompt_data[i].role
              this.promptData.prompt = this.prompt_data[i].prompt
            }
          }
        }
        else{
          const lastIndex = this.prompt_data.length - 1;
          this.promptData.role = this.prompt_data[lastIndex].role
          this.promptData.prompt = this.prompt_data[lastIndex].prompt
        }
      },
      handleDialogClose(done) {
        // 在对话框关闭前触发的事件处理程序
        // 这里可以进行必要的处理
        // 在这个示例中，我们简单地将 DialogVisible 设置为 false
        this.$emit('update:dialogVisible', false);
        console.log("Closing dialog");
        // 调用 done() 表示允许关闭对话框
        done();
      },
  
      closeDialog() {
        console.log("关闭对话框")
        this.$emit('update:dialogVisible', false);
      },
      submitData() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            // 这里执行请求操作
            console.log("promptData", this.promptData)
            this.$emit('submit', this.promptData);
            this.closeDialog();
          } else {
            console.log('输入有误!');
            return false;
          }
        });
      },
    }
  };
</script>

    
