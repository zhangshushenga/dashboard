<template>
  <el-dialog title="请输入标注信息" :visible.sync="dialogVisible" :before-close="handleDialogClose" width="1000px" :style="{ height: '2000px' }">
    <el-form ref="dataForm" :model="formData" :rules="formRules">
        <template v-if="agentType === 1">
          <el-form-item label="label" prop="label" >
            <el-select v-model="formData.label" placeholder="请选择标签" style="width: 100%;" >
              <el-option
                v-for="item in default_labels"
                :key="item.value"
                :value="item.value"
                :label="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <!-- 使用template包裹条件，这里判断type值决定是否显示gpt4Json列 -->
        <template  v-else-if="agentType === 2">
          <el-form-item 
              v-for="key in labelKey"
              :key="key"
              :prop="`gpt4Json.${key}`"
              :label="key">
            <el-input v-model="formData.gpt4Json[key]" type = "textarea" :rows = "2"></el-input>
          </el-form-item>
        </template>
        <!-- 使用template包裹条件，这里判断type值决定是否显示gpt4Json列 -->
        <template v-else>
          <el-form-item label="label" prop="label" >
            <el-select v-model="formData.label" placeholder="请选择标签" style="width: 100%;" >
              <el-option
                v-for="item in default_labels"
                :key="item.value"
                :value="item.value"
                :label="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
    </el-form>
    <span slot="footer" class="dialog-footer-flex">
      <el-button @click="gptAnswerButton" v-show="getGptLabelButtonShow(agentType)">GPT辅助标注</el-button>
      <el-button @click="closeDialog" style="margin-left: auto;">取消</el-button>
      <el-button type="primary" @click="submitData">确定</el-button>
    </span>
    <prompt-dialog :dialog-visible.sync="promptDialogVisible"  :agentName="agentName" :agentMarker="this.agentMarkerValue"
      @submit="promptDialogSubmit">
    </prompt-dialog>
  </el-dialog>
</template>
    
<script>
import { number } from 'echarts';
import { getGptAnswer } from '../../api/api-aiep'
import PromptDialog from '../../components/Aiep/PromptDialog.vue'

export default {
  components: {
    // DrawRectImage,
    "Prompt-dialog" :PromptDialog
  },

  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    label: {
      type: Number,
      default: ''
    },  
    gpt4Json: {
      type: Object,
    default: () => ({})
    },
    agentType:{
      type: Number,
      default: 0
    },
    labelKey:{
      type: Array,
      default: () =>[]
    },
    imageId:{
      type: Number,
      default: 0
    },
    agentName:{
      type: String,
      default: ''
    },
    dataSetId:{
      type: Number,
      default: ''
    },
    dataSetName:{
      type: String,
      default: ''
    },
    agentMarker:{
      type: Number
    }
  },
  
  data() {
    return {
      formData: {
        label: this.label,
        gpt4Json: this.gpt4Json,
        agentType: this.agentType,
        labelKey: this.labelKey,
        imageId: this.imageId,
        agentName: this.agentName,
        dataSetId: this.dataSetId,
        dataSetName: this.dataSetName,
        agentMarker: this.agentMarker
      },
      default_labels:[
        {"value": 0},
        {"value": 1},
      ],
      formRules: {
        // label: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        // remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        // type: [{ required: true, message: '请选择一个选项', trigger: 'change' }]
      },
      promptDialogVisible: false,
      agentMarkerValue: -1
    };
  },

  watch: {
    label(newLabel) {
      this.formData.label = newLabel;
    },
    gpt4Json(newGpt4Json) {
      this.formData.gpt4Json = newGpt4Json;
    }
  },

  methods: {
    handleDialogClose(done) {
      // 在对话框关闭前触发的事件处理程序
      // 这里可以进行必要的处理
      // 在这个示例中，我们简单地将 dialogVisible 设置为 false
      this.$emit('update:dialogVisible', false);
      // 调用 done() 表示允许关闭对话框
      done();
    },

    closeDialog() {
      this.$emit('update:dialogVisible', false);
    },
    // GPT 辅助生成按钮功能
    gptAnswerButton(){
      this.agentName = this.agentName
      this.agentMarkerValue = this.formData.agentMarker
      console.log("agentName", this.agentName)
      this.promptDialogVisible = true
    },
    // prompt
    promptDialogSubmit(promptData){
      // 在这里处理提交的数据
      console.log('prompt提交的数据:', promptData);
      this.getGptResult(promptData)
    },
    // GPT辅助生成答案
    getGptResult(promptData){
      const param = {}
      const prompt = promptData.prompt
      const role = promptData.role
      param.dataSetId = this.dataSetId
      param.dataSetName = this.dataSetName
      param.imageTotalCount = 1
      param.agentType = this.agentType
      param.imageId = this.imageId
      param.prompt = JSON.stringify({"prompt":prompt, "role":role})
      param.agentName = this.agentName
      console.log("param", param)
      getGptAnswer(param).then(response => {
        console.log(response)
        if (response.code === 0) {
          this.$message({
            message: 'GPT get label successfully',
            type: 'success',
            duration: 2000
          }),
          this.closeDialog()
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        console.log("error")
      })
    },
    submitData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          // 这里执行请求操作
          this.$emit('submit', this.formData);
          this.closeDialog();
        } else {
          console.log('输入有误!');
          return false;
        }
      });
    },
    getGptLabelButtonShow(agentType){
      if (agentType === 1){
        return false
      }
      else{
        return true
      }
    },
  }
};
</script>

<style>
.dialog-footer-flex {
  display: flex;
  justify-content: space-between;
}
</style>
  
