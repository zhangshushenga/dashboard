<template>
  <el-dialog title="意图识别结果统计" :visible.sync="dialogVisible" :before-close="handleDialogClose ">
    <el-form ref="dataForm" :model="formData" :rules="formRules">
      <template>
        <div style="font-size: 14px; font-weight: 500; ">文本测试集数量: {{ totalNumber }}</div>
      </template>

      <el-table ref="multipleTable" :data=formData.typeData tooltip-effect="dark" style="width: 120%" class="table" :fit="true" :show-overflow="'tooltip'"
      v-loading="islistDataLoading" >
        <el-table-column prop="name" label="类别" min-width="20%">
        </el-table-column>
        <el-table-column prop="correct" label="识别正确数" min-width="15%">
        </el-table-column>
        <el-table-column prop="error" label="识别错误数" min-width="15%">
        </el-table-column>
        <el-table-column prop="total" label="总数量" min-width="15%">
        </el-table-column>
        <el-table-column prop="accuracy" label="准确率(%)" min-width="15%">
        </el-table-column>
      </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
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
    typeData: {
      type: Array,
    },
    totalNumber: {
      type: Number,
    },
  },
  data() {
    return {
      formData: {
        typeData: this.typeData,
        totalNumber: this.totalNumber,
      },
      formRules: {
      }
    };
  },

  watch: {
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
          // 这里执行请求操作
          this.$emit('submit', this.formData);
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
  