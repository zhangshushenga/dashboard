<template>
    <div style="width: 100%; min-height: 100dvh;">
      <div style="font-size: 35px; font-weight: 600; margin: 20px">agent验证</div>
      <div style="display: flex; flex-direction: row; font-weight: 300; font-size: 30px; margin-bottom: 20px;">
       
        <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="选择数据集:">
            <el-select v-model="selectedData" placeholder="请选择数据集">
                <el-option
                v-for="item in datasets"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>

        <div style="padding-right: 30px;"></div>
        <!-- 选择agent类型 -->
        <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="选择验证类型:">
            <el-select v-model="selectedType" placeholder="请选择验证类型">
                <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>

        <div style="padding-right: 30px;"></div>
        <!-- agent选择 -->
        <el-form ref="form" :model="form" label-width="100px" >
        <el-form-item label="选择agent:" >
            <el-select v-model="selectedAgent" placeholder="请选择agent" >
                <el-option
                v-for="item in getselectAgentTypes"
                :key="item.name"
                :label="item.name"
                :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
        </el-form>
    </div>
      
      <!-- 换行，定义下一个父类 -->
      <!-- <div style="font-size: 16px; font-weight: 300; margin: 0px; margin-bottom: 5px;">请输入GPT打分的role:</div> -->
      <div style="display: flex; flex-direction: row; font-weight: 300; font-size: 18px; margin-bottom: 30px;"> 
        <div style="padding-right: 0px;"></div>
        <!-- 定义输入prompt框 -->
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7;">
          <el-input
            v-model="role"
            :rows = "2"
            type="textarea"
            v-show="isShow"
          />
        </div>
      </div>

      <!-- 换行，定义下一个父类 -->
      <!-- <div style="font-size: 16px; font-weight: 300; margin: 0px; margin-bottom: 5px;">请输入GPT打分的prompt:</div> -->
      <div style="display: flex; flex-direction: row; font-weight: 300; font-size: 18px; margin-bottom: 30px;"> 
        <div style="padding-right: 0px;"></div>
        <!-- 定义输入prompt框 -->
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7;">
          <el-input
            v-model="prompt"
            :rows = "20"
            type="textarea"
            :disabled = "getprompt"
            v-show="isShow"
          />
        </div>
      </div>
      <!-- 换行，定义下一个父类 -->
      <div style="display: flex; flex-direction: row; font-weight: 500; font-size: 50px; margin-bottom: 50px;"> 
        <div style="padding-right: 5px;"></div>
        <!-- 定义开始测试按钮 -->
        <el-button
          :disabled="isButtonDisabled"
          class="queryItem"
          style="height: 40px;min-width: 8%;max-width: 50%;width: auto"
          type="primary"
          @click="queryAction"
          v-html="autoText"
        />
    </div>
  </div>
</template>
  
<script>
import { Pass } from 'codemirror';
import { getImageDataSet, agentSendData } from '../../api/api-aiep'

export default {
  data() {
    return {
      selectedData: '',
      selectedAgent: '',
      selectedType: '',
      autoText: '请选择',
      prompt: '请输入GPT评分的prompt',
      role: "You are an assessment specialist who specializes in reviewing and evaluating the quality of other assistants answers.",
      agent_name: '',
      datasets: [],
      aegnnts:[{ name: ''}],
      dataSetName:'',
      types:[
        {id: 1, name: '判断型'},
        {id: 2, name: '描述型'},
      ],
      // 判断型agent
      agentName1: [
        { name: '婴儿笑脸' },
        { name: '宠物互动' },
        { name: '婴幼儿哭泣' },
      ],
      //描述型agent
      agentName2: [
        { name: '毒舌食评' },
        { name: '猫狗印记' },
        // { name: '穿衣建议' },
        // { name: '婴语专家' },
        // { name: '魔镜' },
        // { name: '鸟类识别' },
        // { name: '车辆智识' }
      ],
      
      gpt_prompt: {
        "时光精选": "",
//           "毒舌食评":`You are an expert in food evaluation, you have to combine the content of the picture with the background content and output content of assistant A below, and score 0-10 in the following four aspects of eval_food_accuracy, eval_title, eval_score and eval_evaluation, the scoring rules are as follows.
// 1. @eval_food_accuracy: if you find that there is no food in the picture, and the title, rateScore, rateReason in the output given by assistant A is empty, and evaluation is not empty, then give assistant A a score of 10 for the ability of recognizing the picture (eval_food_accuracy), or else give it 0 points. If you find food in the picture, and the title, rateScore, rateReason and evaluation are not empty in the output given by assistant A, then give assistant A 10 points for its ability to recognize the picture (eval_food_accuracy), otherwise it will score 0 points.
// 2. @eval_title: if the title given by assistant A is not empty, combine with the dishes in the picture and whether to capture the characteristics of the dishes, whether the evaluation is appealing to the title given by assistant A to score 0-10 (eval_title); if the title given by assistant A is empty, score -1.
// 3. @eval_score: if the rateScore given by assistant A is not empty, please only visually synthesize the color of the food in the picture, the food pairing and the rateReason given by assistant A; rate the rateScore value given by assistant A to score 0-10 (eval_score); if the rateScore given by assistant A is empty, score -1. 1 score.
// 4. @eval_evaluation: only through the visual combination of the dishes in the picture and whether to capture the characteristics of the dishes, whether the evaluation of the harshness of the assistant A to the evaluation of 0-10 points (eval_evaluation)

// Assistant A's background.
// Assistant A is a poisonous food critic, will give the following output for the combination of the dishes in the picture
// 1. Combined with the characteristics of the dish output title (title).
// 2. According to the color of the dishes, food combinations, the degree of deliciousness for the score (rateScore).
// 3. Give the reason for the rate (rateReason).
// 4. Give a scathing evaluation of the dishes in the picture.
// Note to assistant A: If there is no dish in the picture, title, rateScore, rateReason will be output as empty, and only the evaluation for this picture will be output.

// Assistant A output:{agent_answer}`,

          "毒舌食评":`Your task is to combine the background content of the assistants based on the content of the pictures. Then come to an objective assessment of the two assistants' answers.
Assistant A's answer is: '&&'.
Assistant B's answer is: '**'.
The value of 'title' in the assistant's is the title generated based on the content of the picture; the value of 'rateScore' is the assistant's score for the dish in the picture; the value of 'rateReason' is the reason for scoring the dish in the picture; and the value of 'evaluation' is the evaluation of the dish in the picture.

Please rate 0-10 on 'eval_food_accuracy', 'eval_title', 'eval_score', 'eval_evaluation'.
Rating rules:
- 1. @eval_food_accuracy:
-- If you recognize that there is no food in the picture and the 'title', 'rateScore', 'rateReason', and 'evaluation' are not empty in the assistant's answer, give the assistant a score of 10 for its ability to recognize the picture;
-- If you recognize that there is food in the picture and the 'title', 'rateScore', 'rateReason', and 'evaluation' are not empty in the assistant's answer, give the assistant a score of 10 for its ability to recognize the picture;
-- If none of the above is true, give Assistant a score of 0 for its ability to recognize the picture.

- 2. @eval_title:
-- If the value of 'title' in the assistant's answer is not empty, rate the title given by the assistant in terms of whether it captures the characteristics of the dish in the picture in conjunction with the dish in the picture, and whether the title is appealing from 0-10.
-- If the value of 'title' in the assistant's answer is empty and the food does not appear in the picture, it is scored on a scale of 10.

- 3. @eval_score:
-- If the value of 'rateScore' in the assistant's answer is not empty, rate the title given by the assistant in relation to the dish in the picture in terms of whether it captures the characteristics of the dish in the picture and whether the title is appealing. Then the assistant's answer is scored, based on the difference between the assistant's score and your score, 0-10 points, the smaller the difference, the higher the score.
-- If the value of 'rateScore' in the assistant's answer is empty and the food does not appear in the picture, it is scored on a scale of 10.

- 4. @eval_evalation:
-- 0-10 rating based on picture content only, in terms of humor, whether the evaluation captures the characteristics, and whether the shortcomings are over-exaggerated

Assistant's background:
Please carefully identify the food or drink in the pictures provided. If the image features one dish, complete response according to the following requirements. If multiple dishes are present in the image, select one that is either most familiar to you or is prominently displayed and fully visible in the photo. Then, complete the response based on the following requirements. The requirements are as follows:
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
-- If the 'title' is not ''. identify the advantages and disadvantages of the dishes. Write a short, subjectively sharp, biting and humorous essay of no more than 30 words, without vulgarity, which includes both a vivid affirmation of the dish's merits and an outspoken criticism and slightly mean-spirited elaboration of its shortcomings. Strengths and weaknesses must be in the order of 10 words each. 
-- If the 'title' is '', Please generate a witty, humorous, and positive comment related to cooking based on the content of the image, approximately 30 words.

`,
        
        // 猫狗印记
        "猫狗印记": `Your task is to identify the breeds of cats and dogs as an expert, then evaluate the responses of two assistants regarding their description of the images.

Assistant A's answer is "&&".
Assistant B's answer is "**".
The assistant's answer is the value of 'description'.

The context for the assistant's answer is:
- If there are no cats or dogs in the picture, output ''.
- Identify the breeds of cats and dogs in the description.
- The description should be vivid, factual, and avoid any ambiguity.
- The description should not exceed 15 words.

You will evaluate 'eval_pet_accuracy' and 'eval_description' on two dimensions. Here are the scoring rules:
Scoring Rules:
@eval_pet_accuracy: (cat and dog recognition accuracy)
-- 1 point if you recognize that there is no cat or dog in the picture and the assistant's answer is null;
-- 1 point if you recognize that there is a cat or dog in the picture and the assistant's answer is non-blank.
-- 0 points in all other cases.
@eval_description: (breed recognition accuracy)
- Evaluate the breed recognition accuracy of a cat or dog based on the content of the picture and the assistant's description.
-- 1 point if you identify the breed of cat or dog in the picture as the same as the breed described by the assistant, otherwise 0 points.

`,
          "穿衣建议": "",
          "婴语专家": "你是一名婴幼儿专家，首先识别图中是否出现婴幼儿。助手答案中anyone是他给出的答案，如果图中没有婴儿，而且anyone为false时，则将score中分数用10填充；如果有婴儿，助手答案为false，则将score中分数用0填充；否则你将通过婴儿的表情、情绪以及肢体动作，猜测婴儿想要表达的内容。要求语言幽默，略有夸张。然后助手答案中包含他对此图片给出的答案，此答案不一定符合要求。\n请根据准确性、简洁性和感情这三方面对助手答案进行评价，1到10打分，并给出综合打分。\n@准确性:只关心回答对于用户问题是否正确,不关心是否含了三个知识点中的所有内容。\n@简洁性:用最少的词汇和语法结构回复。\n@感情:表达生动,可以安抚用户的情绪。\n并根据要求给出你的答案。",
          "魔镜": "",
          "鸟类识别": "",
          "车辆智识": ""
        },
    };
  },


  computed: {
    getselectAgentTypes(){
      if (this.selectedType === 1){
        this.selectedAgent = ''
        return this.agentName1
      }
      else{
        this.selectedAgent = ''
        return this.agentName2
      }
    },
    getprompt(){
      if (this.selectedType === 1){
        return true
      }
      else{
        return false 
      }
    },

    isShow(){
      if (this.selectedType === 2){
        return true
      }
      else{
        return false
      }
    },

    isButtonDisabled() {
        return this.selectedData === '' || this.selectedAgent === '' || (this.prompt === '' && this.selectedType === 2) || this.selectedType === '';
    },
  },
  watch: {
    selectedAgent() {
      if (this.selectedAgent !== this.agent_name){
        this.agent_name = this.selectedAgent
        this.prompt = this.gpt_prompt[this.selectedAgent]
      }
    },
  },
  created(){
    // getSelectedAgents()
  },
  mounted() {
    this.firstSearch()
  },

  methods: {
    firstSearch() {
      this.currentPageNum = 1
      this.searchData(1)
    },

    // 从服务端获取数据集
    searchData(currentPage,type) {
      this.islistDataLoading = true
      const param = {}
      param.current = currentPage
      param.size = this.currentPageSize
      param.typr = type
      
      getImageDataSet(param).then(response => {
        // endLoading()
        console.log(response)
        if (response.code === 0) {

            for (const r of response.data.records) {
              if (r.type === 1){
                // this.tableData.push(r)
                this.datasets.push({ id: r.id, name: r.name });
              }
            }
            // 请求完成，读取按钮状态，只有 开始验证，按钮可点击
            this.autoText = "开始验证"
        }
      }).catch(error => {
          endLoading()
          console.log(error)
      })
    },

    queryAction() {
      // 实现开始测试按钮点击事件的逻辑
      for (var i = 0; i < this.datasets.length; i++ ) {
        if (this.datasets[i].id === this.selectedData){
          this.dataSetName = this.datasets[i].name
          break;
        }
      }
      if (this.selectedType === 1){
        prompt = ''
      }
      else{
        const prompt1 = {"prompt":this.prompt, "role": this.role}
        prompt = JSON.stringify(prompt1)
      }
      console.log("type", typeof prompt)
      const data = {"dataSetId": this.selectedData,"dataSetName":this.dataSetName, "agentName": this.selectedAgent, "prompt":prompt, "agentType":this.selectedType}
      console.log("param---->",data)
      console.log("param111---->",data.prompt)
      
      agentSendData(data).then(response => {
        if (response.code === 0) {
          alert('验证已开始，请到"agent验证结果"界面查看');
          this.selectedAgent = ''
          this.selectedData = ''
          this.selectedType = ''
          // 使用 window.location.reload() 方法重新加载页面
          // window.location.reload();
        }
      }
      )
    },
  }
};
  </script>


<style scoped>
.custom-dropdown-item {
  font-size: 30px; /* 设置字体大小为12 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出部分以省略号表示 */
}

.custom-textarea textarea {
  font-size: 30px; /* 设置文本框的字体大小为 16 像素 */
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
  padding: 10px;
}

.add-icon-button {
  background-color: transparent;
  border: none;
  padding: 0;
  width: auto;
  height: auto;
  text-align: left; /* 将文本左对齐 */
}

.queryItem {
  margin-top: 1%;
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

.label-box {
  background-color: white;
  color: black;
  font-size: 14px;
  padding: 5px;
  margin: 5px;
  border: 2px solid black;
  border-radius: 5px;
}
</style>
 
