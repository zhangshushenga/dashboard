<template>
  <el-dialog title="请输入信息" :visible.sync="dialogVisible" :before-close="handleDialogClose">
    <el-form ref="dataForm" :model="formData" :rules="formRules">
      <template v-if="name === ''">
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="数据集名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <template v-if="formData.type === 1">
        <el-form-item label="请选择Agent" prop="agentName">
          <el-select v-model="formData.agentName" placeholder="请选择agent" style="width: 100%;" @change="AgentChange">
            <el-option
              v-for="item in this.agents"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitData">确定</el-button>
    </span>
  </el-dialog>
</template>
  
<script>
import agentConfig from '@/views/agents/agent-config.vue';
import selectExcel from '@/views/excel/select-excel.vue';
import { data } from 'jquery';


export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    // 添加从主页面传递的type,name和remark属性
    type: {
      type: Number,
    },
    name: {
      type: String,
      default: ''
    },
    remark: {
      type: String,
      default: ''
    },
    agentName:{
      type:String,
      default:''
    },
    agentType:{
      type:Number,
      default:0
    },
    agents:{
      type: Object
    }
  },
  data() {
    return {
      options: [{
          value: 1,
          label: 'pic'
        }, {
          value: 2,
          label: 'video'
        }, {
          value: 3,
          label: 'text'
        }, ],
      selectedAgent: '',
      formData: {
        name: this.name,
        remark: this.remark,
        type: this.type,
        agentName:this.agentName,
        agentType: this.agentType,
        agnets: this.agents
      },
      formRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        type: [{ required: true, message: '请选择一个选项', trigger: 'change' }]
      }
    };
  },

  watch: {
    // 监听 name 和 remark 的变化，并更新 formData
    type(newType) {
      this.formData.type = newType;
    },
    name(newName) {
      this.formData.name = newName;
    },
    remark(newRemark) {
      this.formData.remark = newRemark;
    },
    agentName(newAgentName){
      this.formData.agentName = newAgentName
    }
  },

  methods: {
    getType(type){
      if (type ===1)
        return "pic"
      if (type ===2)
        return "video"
      if (type === 3)
        return "text" 
      if (type ===-1)
        return ""
    },
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
    AgentChange(){
      for(var i=0; i<this.agents.length; i++){
        if (this.formData.agentName === this.agents[i].name){
          this.formData.agentType = this.agents[i].type
          this.formData.agentName = this.agents[i].name
          break
        }
      }
    }
  }
};
</script>
  