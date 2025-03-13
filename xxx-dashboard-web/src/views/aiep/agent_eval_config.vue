<template>
  <div style="width: 100%; min-height: 100dvh;" v-loading="isDataLoading">
    <div style=" margin: 15px; margin-bottom: 30px;margin-top: 30px;font-size: 25px;">agent验证</div>
    <div style="display: flex; flex-direction: row; font-weight: 300; font-size: 30px; margin-bottom: 20px;">

      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="选择数据集:">
          <el-select v-model="selectedData" placeholder="请选择数据集">
            <el-option v-for="item in datasets" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div style="padding-right: 30px;"></div>
      <!-- 选择agent类型 -->
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="选择验证类型:">
          <el-select v-model="selectedType" placeholder="请选择验证类型" @change="handleTypeChange">
            <el-option v-for="item in resultArray" :key="resultArray.agentResultType" :label="item.agentResultTypeText"
              :value="item.agentResultType">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div style="padding-right: 30px;"></div>
      <!-- agent选择 -->
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="选择agent:">
          <el-select v-model="selectedAgent" placeholder="请选择agent" @change="handleAgentChange">
            <el-option v-for="item in agent_names" :key="item.agentType" :label="item.agent_name"
              :value="item.agentType">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 换行，定义下一个父类 -->
    <!-- <div style="font-size: 16px; font-weight: 300; margin: 0px; margin-bottom: 5px;">请输入GPT打分的role:</div> -->

    <div v-show="isShow"
      style="display: flex; flex-direction: column; font-weight: 300; font-size: 18px; margin-bottom: 30px;margin: 20px;">
      <div style="padding-right: 0px; font-size: 16px;">system:</div>
      <!-- 定义输入prompt框 -->
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7;margin-top: 10px;">
        <el-input v-model="role" :rows="2" type="textarea"
          placeholder="Please assign a role to the model, for example: 'You are a food appraisal expert.'" />
      </div>
    </div>

    <!-- 换行，定义下一个父类 -->
    <!-- <div style="font-size: 16px; font-weight: 300; margin: 0px; margin-bottom: 5px;">请输入GPT打分的prompt:</div> -->
    <div v-show="isShow"
      style="display: flex; flex-direction: column; font-weight: 300; font-size: 18px; margin-bottom: 30px;margin: 20px;">
      <div style="padding-right: 0px;font-size: 16px;">task:</div>
      <!-- 定义输入task框 -->
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7;margin-top: 10px;">
        <el-input v-model="task_prompt" :rows="3" type="textarea"
          placeholder="Please add an evaluation task, for example: 'Your task is to objectively evaluate the answers of Assistant A and B based on the content of the image and their background information. Assess the responses in the following evaluation dimensions.'" />
      </div>
    </div>

    <div v-show="isShow"
      style="display: flex; flex-direction: column; font-weight: 300; font-size: 18px; margin-bottom: 30px;margin: 20px;">
      <div style="padding-right: 0px;font-size: 16px;">answer:</div>
      <!-- 定义输入background框 -->
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7;margin-top: 10px;">
        <el-input readonly v-model="assistantAAnswer" placeholder="Assistant A's answer is: {assistanA_answer};">
        </el-input>
        <el-input readonly v-model="assistantBAnswer" style="margin-top: 10px;"
          placeholder="Assistant B's answer is: {assistanB_answer};">
        </el-input>
      </div>
    </div>

    <div v-show="isShow"
      style="display: flex; flex-direction: column; font-weight: 300; font-size: 18px; margin-bottom: 30px;margin: 20px;">
      <div style="padding-right: 0px;font-size: 16px;">background:</div>
      <!-- 定义输入background框 -->
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7;margin-top: 10px;">
        <el-input v-model="bg_prompt" :rows="10" type="textarea" :placeholder="back_temp" />
      </div>
    </div>

    <!--显示评分维度ui-->
    <div v-show="isShow" style="padding: 0 15px;">
      <el-button type="text" icon="el-icon-plus" @click="addRow"
        style="font-size: 16px; padding: 10px 15px;">点击加号增加评分维度</el-button>
      <div v-for="(input, index) in inputs" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
        <el-input type="textarea" :rows="1" style="flex: 1 1 10%;" v-model="input.first"
          placeholder="eval_evalation"></el-input>
        <el-input type="textarea" :rows="1" style="flex: 9 1 auto; margin-left: 10px;" v-model="input.second"
          :placeholder="eval_temp"></el-input>
        <el-button type="text" icon="el-icon-close" @click="removeRow(index)" style="margin-left: 10px;"></el-button>
      </div>
    </div>

    <!-- <div v-show="isShow&&!isJsonObjEmpty" style="padding: 0 15px;"> -->
    <div v-show="isShow && !isJsonObjEmpty"
      style="display: flex; flex-direction: column; font-weight: 300; font-size: 18px; margin-bottom: 30px;margin: 20px; margin-top: 30px;">
      <div style="padding-right: 0px;font-size: 16px;">输出格式:</div>
      <!-- 省略了原有布局代码 -->
      <!-- 在这里添加显示生成的JSON -->
      <p class="custom-text">Output in JSON format, the key is: {{ keysString }}</p>
      <pre class="custom-text">{{ JSON.stringify(generatedJson(), null, 2) }}</pre>
    </div>

    <!-- 换行，定义下一个父类 -->
    <div style="display: flex; flex-direction: row; font-weight: 500; font-size: 50px; margin-bottom: 50px;">
      <div style="padding-right: 5px;"></div>
      <!-- 定义开始测试按钮 -->
      <el-button :disabled="isButtonDisabled" class="queryItem"
        style="height: 40px;min-width: 8%;max-width: 50%;width: auto" type="primary" @click="queryAction"
        v-html="autoText" />
    </div>
  </div>
</template>

<script>
import { Pass } from 'codemirror';
import { getAgentSelectList } from '@/api/agent-config'
import { getImageDataSet, agentSendData } from '../../api/api-aiep'
//{assistanA_answer}
export default {
  data() {
    return {
      assistantAAnswer: "Assistant A's answer is: {assistanA_answer};",
      assistantBAnswer: "Assistant B's answer is: {assistanB_answer};",
      task_prompt: '',
      bg_prompt: '',
      isDataLoading: false,
      resultArray: [],
      agent_names: [],
      inputs: [{ first: '', second: '' }],
      selectedData: '',
      selectedAgent: '',
      selectedType: '',
      selectedAgentName: '',
      autoText: '请选择',
      prompt: '请输入GPT评分的prompt',
      role: "",
      agent_name: '',
      datasets: [],
      aegnnts: [{ name: '' }],
      dataSetName: '',
      back_temp: `Please add the background for the assistant's generated responses, essentially the agent's requirements, for example:
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

      eval_temp: '0-10 rating based on picture content only, in terms of humor, whether the evaluation captures the characteristics, and whether the shortcomings are over-exaggerated',
      types: [
        { id: 1, name: '判断型' },
        { id: 2, name: '描述型' },
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

        "毒舌食评": `Your task is to combine the background content of the assistants based on the content of the pictures. Then come to an objective assessment of the two assistants' answers.
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


Assistant B is the standard answer. You are asked to rate Assistant A's answer from 0-10 in the following four areas: eval_food_accuracy, eval_title, eval_score, and eval_evaluation, with the following scoring rules.
1. @eval_food_accuracy:
    -If the title field value is empty for both Assistant A and Assistant B, score 10 points;
    -0 points if the title value of assistant B is empty and the title value of assistant A is not empty;
    -0 points if the title value of assistant B is not empty and the title value of assistant A is empty;
    -score 0-10 points if neither the title value of assistant A nor assistant B is empty, based on assistant assistant B's answer.
2. @eval_title: Please score 0-10 points according to the title value of assistant B, and the title value of assistant A in terms of the characteristics of the dish, and whether the evaluation is appealing or not.
3. @eval_score: If the rateScore value given by assistant A is not empty, please score 0-10 (eval_score) based on the rateScore value in assistant B against the rateScore value in assistant A in terms of the color of the food, the food pairing.
4. @eval_evaluation: Please rate Assistant A on a scale of 0-10 based on the value of "desc" in Assistant B, in terms of the visual combination of describing the dish and whether or not it captures the characteristics of the dish and whether or not it is harsh.

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

        //             "猫狗印记":`Your task is to act as an expert in identifying cat and dog breeds. You need to evaluate the provided image content as well as the background and output content from Assistant A across two dimensions: 'eval_pet_accuracy and 'eval_description'. Below is the optimized version of the scoring rules:

        // ### Evaluation Dimensions

        // - **eval_pet_accuracy (Pet Recognition Accuracy)**:
        //   - If the image does not contain cats or dogs, and Assistant A's output content (description) is empty, you should award 10 points, indicating that Assistant A accurately identified that there are no cats or dogs in the image.
        //   - If the image contains cats or dogs, and Assistant A's output content is not empty and includes at least the breed information of the cat or dog, you should also award 10 points, indicating that Assistant A accurately recognized the cat or dog in the image.
        //   - In other scenarios, award 0 points.

        // - **eval_description (Description Accuracy)**:
        //   - Based on the image content and the description output by Assistant A, assess the accuracy of the cat or dog breed identification. If the description is not empty and accurately describes the breed of the cat or dog in the image, award a score between 0 to 10 points based on the accuracy of the breed identification.
        //   - If the description is empty or the breed identification is inaccurate, the score should tend toward the lower end.

        // ### Background Content for Assistant A

        // Assistant A is responsible for identifying whether there are cats or dogs in the image:
        // - If there are no cats or dogs, the output description should be empty.
        // - If there are cats or dogs, Assistant A must identify the breed of the cat or dog and describe the image content with at least one sentence that includes the breed of the cat or dog (description).

        // ### Output Content from Assistant A : {agent_answer}

        // Based on the instructions above, please evaluate the performance of Assistant A.`,
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
    // 计算属性生成JSON
    keysString() {
      // 获取所有非空的 input.first 值，并使用逗号连接成一个字符串
      const keys = this.inputs
        .filter(input => input.first !== "")
        .map(input => input.first);
      return keys.join(", ");
    },
    isJsonObjEmpty() {
      const obj = this.generatedJson();
      return Object.keys(obj).length === 0;
    },

    // getselectAgentTypes() {
    //   if (this.selectedType === 1) {
    //     this.selectedAgent = ''
    //     return this.agentName1
    //   }
    //   else {
    //     this.selectedAgent = ''
    //     return this.agentName2
    //   }
    // },
    // getprompt() {
    //   if (this.selectedType === 1) {
    //     return true
    //   }
    //   else {
    //     return false
    //   }
    // },

    isShow() {
      if (this.selectedType === 2) {
        return true
      }
      else {
        return false
      }
    },

    isButtonDisabled() {
      return this.selectedData === '' || this.selectedAgent === '' || ((this.role === '' || this.task_prompt === '' || this.bg_prompt === '' || this.isJsonObjEmpty) && this.selectedType === 2) || this.selectedType === '';
    },
  },
  watch: {
    // selectedAgent() {
    //   if (this.selectedAgent !== this.agent_name) {
    //     this.agent_name = this.selectedAgent
    //     this.prompt = this.gpt_prompt[this.selectedAgent]
    //   }
    // },
  },
  created() {
    //this.getSelectedAgents()
  },
  mounted() {
    this.firstSearch()
    this.getSelectList()
  },

  methods: {
    generatedJson() {
      let jsonObj = {};
      // 假设 `inputs` 是你的数据源
      this.inputs.forEach(input => {
        if (input.first !== "") {
          jsonObj[input.first] = "xxxx";
        }
      });
      return jsonObj;
    },

    handleTypeChange(value) {
      console.log("Selected Type ID:", value);
      this.resultArray.forEach(item => {
        if (item.agentResultType === value) {
          // 找到匹配项，将其names赋值给agent_names
          this.agent_names = item.names;
        }
      });
      console.log("agent_names...", this.agent_names)
    },

    handleAgentChange(value) {
      console.log("Selected agent ID:", value);
      const selectedAgentItem = this.agent_names.find(agent => agent.agentType === value);
      if (selectedAgentItem) {
        // 更新 selectedAgent 为选中的 agent_name
        this.selectedAgentName = selectedAgentItem.agent_name;
      } else {
        // 如果没有找到，可能需要一个逻辑来处理（比如清空 selectedAgent 或设置为默认值）
        this.selectedAgentName = ''; // 或任何你认为合适的默认值
      }
    },


    addRow() {
      this.inputs.push({ first: '', second: '' });
    },

    removeRow(index) {
      this.inputs.splice(index, 1);
    },

    getSelectList(currentPage) {
      this.isDataLoading = true
      getAgentSelectList().then(response => {
        // 使用reduce方法处理responseData,构建结果对象
        this.isDataLoading = false
        const categorizedData = response.data.reduce((acc, item) => {
          // 如果acc中还没有当前agentResultType对应的键，就初始化一个空数组
          if (!acc[item.agentResultType]) {
            acc[item.agentResultType] = {
              typeText: item.agentResultTypeText,
              names: []
            };
          }

          // 向对应类型的数组中添加当前项的name
          acc[item.agentResultType].names.push({ agent_name: item.name, agentType: item.agentType });

          return acc;
        }, {});

        // 将结果对象转换为数组形式，如果需要
        this.resultArray = Object.entries(categorizedData).map(([type, data]) => ({
          agentResultType: parseInt(type),
          agentResultTypeText: data.typeText,
          names: data.names
        }));

        console.log(this.resultArray);
      }).finally()
    },

    firstSearch() {
      this.currentPageNum = 1
      this.searchData(1)
    },

    // 从服务端获取数据集
    searchData(currentPage, type) {
      this.isDataLoading = true
      const param = {}
      param.current = currentPage
      param.size = this.currentPageSize
      param.typr = type

      getImageDataSet(param).then(response => {
        // endLoading()
        this.isDataLoading = false
        console.log(response)
        if (response.code === 0) {

          for (const r of response.data.records) {
            // this.tableData.push(r)
            if (r.type === 1){
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
      console.log("开始测试按钮")
      for (var i = 0; i < this.datasets.length; i++) {
        if (this.datasets[i].id === this.selectedData) {
          this.dataSetName = this.datasets[i].name
          break;
        }
      }

      if (this.selectedType === 1) {
        prompt = ''
      }
      else {
        const content = document.querySelector('.custom-text').innerHTML;
        const evaluation_dimensions = this.inputs.map(input => `@${input.first}:${input.second}`).join('\n');
        // 进行替换操作
        const assistAAnswer = this.assistantAAnswer.replace("{assistanA_answer}", "&&");
        const assistBAnswer = this.assistantBAnswer.replace("{assistanB_answer}", "**");
        const meger_prompt = "<task> \n" + this.task_prompt + "<task/> \n" + "<background> \n" + this.bg_prompt + "<background/> \n" + "<evaluation dimensions> \n" + evaluation_dimensions + "<evaluation dimensions/> \n" + "<answer> \n" + assistAAnswer + "\n" + assistBAnswer + "<answer/>\n" + content
        const prompt1 = { "prompt": meger_prompt, "role": this.role, }
        prompt = JSON.stringify(prompt1)
        console.log("prompt---->", prompt)
      }
      //this.selectedAgent = "猫狗印记"
      console.log("agentType---->", this.selectedType)
      const data = { "dataSetId": this.selectedData, "dataSetName": this.dataSetName, "agentName": this.selectedAgentName, "agentMarker": this.selectedAgent, "prompt": prompt, "agentType": this.selectedType }
      console.log("prompt---->", this.prompt)
      agentSendData(data).then(response => {
        if (response.code === 0) {
          alert('验证已开始，请到"agent验证结果"界面查看');
          this.selectedData = ''
          this.dataSetName = ''
          this.selectedAgent = null
          this.task_prompt = ''
          this.bg_prompt = ''
          this.inputs = [{ first: '', second: '' }]
          this.role = ''
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
.custom-text {
  font-size: 14px;
  font-weight: normal;
  color: #5c5b5b;
}

.custom-dropdown-item {
  font-size: 30px;
  /* 设置字体大小为12 */
  white-space: nowrap;
  /* 禁止换行 */
  overflow: hidden;
  /* 溢出隐藏 */
  text-overflow: ellipsis;
  /* 超出部分以省略号表示 */
}

.custom-textarea textarea {
  font-size: 30px;
  /* 设置文本框的字体大小为 16 像素 */
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
  max-height: 200px;
  /* 固定下拉框高度，根据需要调整 */
  overflow-y: auto;
  /* 内容超过高度时可滚动 */
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
  text-align: left;
  /* 将文本左对齐 */
}

.queryItem {
  margin-top: 1%;
  margin-left: 10px;
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
