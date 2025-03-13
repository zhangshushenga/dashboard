<template>
  <el-dialog title="修改内容" :visible.sync="dialogVisible" :before-close="handleDialogClose" width="800px" :style="{ height: '1000px' }">
    <el-form ref="dataForm" :model="formData" :rules="formRules">
      <el-form-item label="id" prop="content.id">
        <el-input v-model="content.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="text" prop="content.text ">
        <el-input v-model="content.text " ></el-input>
      </el-form-item>
      <el-form-item label="label" prop="content.label">
        <el-input v-model="content.label" ></el-input>
      </el-form-item>
      <!-- <el-form-item 
          v-for="key in textKey"
          :key="key"
          :prop="`content.${key}`"
          :label="key">
          <el-input v-model="formData.content[key]" type = "textarea" :rows = "2"></el-input>
        </el-form-item> -->

    </el-form>
    <span slot="footer" class="dialog-footer-flex">
      <el-button @click="closeDialog" style="margin-left: auto;">取消</el-button>
      <el-button type="primary" @click="submitData">确定</el-button>
    </span>
  </el-dialog>
</template>
    
<script>
import List from '@/views/example/list.vue';



export default {
  
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    content:{
      type: Array,
    },
    textKey:{
      type: Array
    }
  },
  mounted(){
  },
  data() {
    return {
      formData: {
        id: this.id,
        content: this.content,
        textKey: this.textKey
      },

      dialogVisible: false,
      formRules: {
        // label: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        // remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        // type: [{ required: true, message: '请选择一个选项', trigger: 'change' }]
      },
    };
  },

  watch: {
    content(newValue){
      console.log("content---->",this.formData.content)
      this.formData.content = newValue
    },
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
    
    submitData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          console.log("formData------>",this.formData)
          // 这里执行请求操作
          this.$emit('submit', this.formData);
          console.log("formData------>",this.formData)
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

<style>
.dialog-footer-flex {
  display: flex;
  justify-content: space-between;
}
</style>
  
