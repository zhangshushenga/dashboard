<template>
  <div class="team-management">
    <div class="container" id="headb">
      <div class="c-head">
        <el-button
          type="primary"
          class="add"
          size="medium"
          @click="addRow"
          style="margin-bottom: 10px"
        >
          添加团队
        </el-button>
      </div>

      <el-table
        :data="tableInfo.dataList"
        border
        style="width: 100%"
        stripe
        :header-cell-style="{ background: '#f8f8f8', color: '#606266' }"
      >
        <el-table-column
          prop="teamId"
          label="团队ID"
          align="center"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="teamName"
          label="团队名称"
          align="center"
        ></el-table-column>
        <!-- 原“团队评分提示语”列，重命名为“团队管理者设置的评分提示语”，并使用teamManagerScorePrompt字段 -->
        <el-table-column
          prop="teamManagerScorePrompt"
          label="团队管理者设置的评分提示语"
          align="center"
        ></el-table-column>
        <!-- 新增“高层管理者设置的评分提示语”列，使用seniorManagerScorePrompt字段 -->
        <el-table-column
          prop="seniorManagerScorePrompt"
          label="高层管理者设置的评分提示语"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="400px" align="center">
          <template slot-scope="scope">
            <span
              class="operation-item cursor p-r-10"
              @click="goTeamMembers(scope.row)"
              >团队成员管理</span
            >
            <span
              class="operation-item cursor p-r-10"
              @click="editRow(scope.row)"
              >编辑</span
            >
            <span class="operation-item cursor" @click="handleDelete(scope.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 使用 el-dialog 替代 slide-out -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="团队名称" prop="teamName">
          <el-input
            placeholder="请输入团队名称"
            v-model="form.teamName"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 原“团队评分提示语”字段，改为“团队管理者设置的评分提示语”，prop 和 v-model 改为teamManagerScorePrompt -->
        <el-form-item
          label="团队管理者设置的评分提示语"
          prop="teamManagerScorePrompt"
        >
          <el-input
            placeholder="请输入团队评分提示语"
            v-model="form.teamManagerScorePrompt"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 新增一项，用于编辑“高层管理者设置的评分提示语” -->
        <el-form-item
          label="高层管理者设置的评分提示语"
          prop="seniorManagerScorePrompt"
        >
          <el-input
            placeholder="请输入高层管理者提示语"
            v-model="form.seniorManagerScorePrompt"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item class="sub-btn">
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="clearSelection">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addTeam, getTeamList, deleteTeam, updateScorePrompt } from "@/api/team-list";

export default {
  data() {
    return {
      tableInfo: {
        dataList: [],
      },
      dialogVisible: false,
      dialogTitle: "",
      form: {
        teamId: "",
        teamName: "",
        // 原 scorePrompt 改为 teamManagerScorePrompt
        teamManagerScorePrompt: "",
        // 新增字段
        seniorManagerScorePrompt: "",
      },
      rules: {
        teamName: [
          { required: true, message: "请输入团队名称", trigger: "blur" },
        ],
        // 同时将验证规则中的 scorePrompt 改为 teamManagerScorePrompt
        teamManagerScorePrompt: [
          { required: true, message: "请输入团队评分提示语", trigger: "blur" },
        ],
        // 新增对 seniorManagerScorePrompt 的检验规则，可按需求选择是否必填
        seniorManagerScorePrompt: [
          { required: true, message: "请输入高层评分提示语", trigger: "blur" },
        ],
      },
      loadingInstance: null,
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.startLoading();
      getTeamList({})
        .then((res) => {
          this.tableInfo.dataList = res.data;
          this.endLoading();
        })
        .catch((error) => {
          this.endLoading();
          this.$message.error(error.$message || "获取数据失败");
        });
    },
    addRow() {
      this.dialogTitle = "添加团队";
      this.dialogVisible = true;
      this.form = {
        teamId: "",
        teamName: "",
        teamManagerScorePrompt: "",
        seniorManagerScorePrompt: "",
      };
    },
    clearSelection() {
      this.dialogVisible = false;
    },
    editRow(row) {
      this.form.teamId = row.teamId;
      this.form.teamName = row.teamName;
      // 原 scorePrompt 改为 teamManagerScorePrompt
      this.form.teamManagerScorePrompt = row.teamManagerScorePrompt;
      // 新增字段 seniorManagerScorePrompt
      this.form.seniorManagerScorePrompt = row.seniorManagerScorePrompt;
      this.dialogTitle = "编辑团队";
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm(`确认删除 ${row.teamName} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.startLoading();
          deleteTeam({ teamId: row.teamId })
            .then(() => {
              this.getdata();
              this.endLoading();
              this.$message.success("删除成功");
            })
            .catch((error) => {
              this.endLoading();
              this.$message.error(error.$message || "删除失败");
            });
        })
        .catch(() => {});
    },
    goTeamMembers(row) {
      const routeUrl = this.$router.resolve({
        path: "/team-member",
        query: {
          team_id: row.teamId,
          team_name: row.teamName,
        },
      });
      window.open(routeUrl.href, "_blank");
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.startLoading();
          const addParam = {
            teamName: this.form.teamName,
            // 原 scorePrompt 改为 teamManagerScorePrompt
            teamManagerScorePrompt: this.form.teamManagerScorePrompt,
            // 新增：seniorManagerScorePrompt
            seniorManagerScorePrompt: this.form.seniorManagerScorePrompt,
          };
          const updateParam = {
            teamId: this.form.teamId,
            teamManagerScorePrompt: this.form.teamManagerScorePrompt,
            seniorManagerScorePrompt: this.form.seniorManagerScorePrompt,
          };
          // 如果没有 teamId 则 addTeam，否则 updateScorePrompt
          let requestPromise = !this.form.teamId
            ? addTeam(addParam)
            : updateScorePrompt(updateParam);

          requestPromise
            .then(() => {
              this.getdata();
              this.dialogVisible = false;
              this.endLoading();
              this.$message.success(
                !this.form.teamId ? "添加成功" : "更新成功"
              );
            })
            .catch((error) => {
              this.endLoading();
              this.$message.error(
                error.$message || (!this.form.teamId ? "添加失败" : "更新失败")
              );
            });
        }
      });
    },
    startLoading() {
      this.loadingInstance = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    endLoading() {
      if (this.loadingInstance) {
        this.loadingInstance.close();
      }
    },
  },
};
</script>

<style scoped>
.team-management {
  padding: 20px;
}
.p-r-10 {
  padding-right: 10px;
}
.cursor {
  cursor: pointer;
}
.sub-btn {
  text-align: center;
}
.operation-item {
  color: #4fa2ff;
  font-weight: bold;
}
</style>
