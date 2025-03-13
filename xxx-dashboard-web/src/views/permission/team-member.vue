<template>
    <div class="team-member-management">
      <div class="container" id="headb">
        <div class="c-head">
          <!-- <el-button
            type="primary"
            class="add"
            size="medium"
            @click="$router.go(-1)"
          >
            返回
          </el-button> -->
          <el-button
            type="primary"
            class="add"
            size="medium"
            @click="addRow"
            style="margin-bottom: 10px"
          >
            添加成员
          </el-button>
  
          <!-- 搜索栏 -->
          <div class="search-container">
            <el-select
              v-model="searchQuery.filter"
              class="narrow-select"
              @change="handleSearch"
            >
              <el-option label="用户邮箱" value="userEmail"></el-option>
              <el-option label="用户名称" value="userName"></el-option>
              <el-option label="用户职级" value="rankLevel"></el-option>
              <!-- 新增用户职位搜索项 -->
              <el-option label="用户职位" value="userPosition"></el-option>
            </el-select>
            <el-input
              placeholder="请输入查询条件"
              v-model="searchQuery.keyword"
              class="input-with-select"
              @keyup.enter.native="handleSearch"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleSearch"
              ></el-button>
            </el-input>
          </div>
        </div>
        <el-descriptions class="team-description" :column="2" border>
          <el-descriptions-item>
            <template slot="label">团队ID</template>
            {{ team_id }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">团队名称</template>
            {{ team_name }}
          </el-descriptions-item>
        </el-descriptions>
  
        <el-table
          :data="filteredDataList"
          border
          stripe
          :header-cell-style="{ background: '#f8f8f8', color: '#606266' }"
        >
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="userEmail" label="用户邮箱" align="center"></el-table-column>
          <el-table-column prop="rankLevel" label="用户职级" align="center">
            <template slot-scope="scope">
              {{ getRankLevelText(scope.row.rankLevel) }}
            </template>
          </el-table-column>
          <!-- 新增：用户职位列 -->
          <el-table-column prop="userPosition" label="用户职位" align="center">
          </el-table-column>
  
          <el-table-column label="操作" width="300px" align="center">
            <template slot-scope="scope">
              <span class="cursor operation-item" @click="handleDelete(scope.row)">删除</span>
              <span class="cursor operation-item" @click="openRankLevelDialog(scope.row)">修改</span>
            </template>
          </el-table-column>
        </el-table>
  
        <!-- 添加成员的Dialog -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="用户邮箱" prop="userEmail">
              <el-input
                placeholder="请输入用户邮箱"
                v-model="form.userEmail"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="用户职级" prop="rankLevel">
              <el-select v-model="form.rankLevel" placeholder="请选择用户职级">
                <el-option label="普通员工" value="普通员工"></el-option>
                <el-option label="团队管理者" value="团队管理者"></el-option>
                <!-- <el-option label="高层管理者" value="高层管理者"></el-option> -->
              </el-select>
            </el-form-item>
            <!-- 新增：用户职位 -->
            <el-form-item label="用户职位">
              <el-input v-model="form.userPosition" placeholder="请输入用户职位"></el-input>
            </el-form-item>
            <el-form-item class="sub-btn">
              <el-button type="primary" @click="onSubmit('form')">保存</el-button>
              <el-button @click="clearSelection">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
  
        <!-- 修改职级的Dialog（增加对用户职位的修改） -->
        <el-dialog
          title="修改职级/职位"
          :visible.sync="rankLevelDialogVisible"
          width="30%"
        >
          <el-form ref="rankLevelForm" :model="currentMember" label-width="120px">
            <el-form-item label="用户邮箱">
              <el-input v-model="currentMember.userEmail" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户职级">
              <el-select
                v-model="currentMember.rankLevel"
                placeholder="请选择用户职级"
              >
                <el-option label="普通员工" value="普通员工"></el-option>
                <el-option label="团队管理者" value="团队管理者"></el-option>
                <!-- <el-option label="高层管理者" value="高层管理者"></el-option> -->
              </el-select>
            </el-form-item>
            <!-- 新增：用户职位 -->
            <el-form-item label="用户职位">
              <el-input v-model="currentMember.userPosition"></el-input>
            </el-form-item>
            <el-form-item class="sub-btn">
              <el-button type="primary" @click="updateRankLevel()">保存</el-button>
              <el-button @click="rankLevelDialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import {
    addTeamMember,
    getTeamMemberList,
    deleteTeamMember,
    updateTeamMemberRank,
  } from "@/api/team-member";
  
  export default {
    data() {
      return {
        tableInfo: {
          dataList: [],
        },
        searchQuery: {
          filter: "userEmail",
          keyword: "",
        },
        dialogVisible: false,
        rankLevelDialogVisible: false,
        dialogTitle: "",
        team_id: this.$route.query.team_id || "",
        team_name: this.$route.query.team_name || "",
        form: {
          userEmail: "",
          rankLevel: "",
          userPosition: "",
        },
        currentMember: {},
        rules: {
          userEmail: [
            { required: true, message: "请输入用户邮箱", trigger: "blur" },
          ],
          rankLevel: [
            { required: true, message: "请选择用户职级", trigger: "change" },
          ],
        },
        loadingInstance: null,
      };
    },
    created() {
      console.log(this.team_id);
      this.getdata();
    },
    computed: {
      filteredDataList() {
        if (!this.searchQuery.keyword) {
          return this.tableInfo.dataList;
        }
        const keyword = this.searchQuery.keyword.toLowerCase();
  
        // 职级映射表，用于将数字转换为对应的职级名称
        const rankLevelMap = { 0: "普通员工", 1: "团队管理者", 2: "高层管理者" };
  
        // 辅助函数：根据rankLevel获取职级名称
        const getRankLevelText = (rankLevel) => rankLevelMap[rankLevel] || "";
  
        return this.tableInfo.dataList.filter((item) => {
          switch (this.searchQuery.filter) {
            case "userEmail":
              return item.userEmail.toLowerCase().includes(keyword);
            case "userName":
              return item.userName.toLowerCase().includes(keyword);
            case "rankLevel":
              const rankLevelText = getRankLevelText(item.rankLevel).toLowerCase();
              return rankLevelText.includes(keyword);
            // 新增：用户职位筛选
            case "userPosition":
              if (!item.userPosition) return false;
              return item.userPosition.toLowerCase().includes(keyword);
            default:
              return true;
          }
        });
      },
    },
    methods: {
      getRankLevelText(rankLevel) {
        const rankLevelMap = { 0: "普通员工", 1: "团队管理者", 2: "高层管理者" };
        return rankLevelMap[rankLevel] || "";
      },
      getdata() {
        this.startLoading();
        // 将Number(this.team_id)放到一个数组
        let arr = [];
        arr.push(Number(this.team_id));
        
        const param = {
          teamIdList: arr,
        };
        getTeamMemberList(param)
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
        this.dialogTitle = "添加成员";
        this.dialogVisible = true;
        this.form = {
          userEmail: "",
          rankLevel: "",
          userPosition: "",
        };
      },
      clearSelection() {
        this.dialogVisible = false;
      },
      handleDelete(row) {
        this.$confirm(`确认删除 ${row.userName}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.startLoading();
            let param = {
              userId: row.userId,
              teamId: Number(this.team_id),
            };
            deleteTeamMember(param)
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
      openRankLevelDialog(row) {
        const rankLevelMap = { 0: "普通员工", 1: "团队管理者", 2: "高层管理者" };
        this.currentMember = { ...row };
        // 将数字类型的 rankLevel 转换为字符串
        this.currentMember.rankLevel = rankLevelMap[this.currentMember.rankLevel] || "";
        // userPosition 直接取原值即可
        this.rankLevelDialogVisible = true;
      },
      updateRankLevel() {
        const rankLevelValueMap = { 普通员工: 0, 团队管理者: 1, 高层管理者: 2 };
        const rankLevelValue = rankLevelValueMap[this.currentMember.rankLevel];
        this.startLoading();
        const param = {
          userId: this.currentMember.userId,
          teamId: Number(this.team_id),
          rankLevel: rankLevelValue,
          userPosition: this.currentMember.userPosition,
        };
        updateTeamMemberRank(param)
          .then(() => {
            this.getdata();
            this.rankLevelDialogVisible = false;
            this.endLoading();
            this.$message.success("信息更新成功");
          })
          .catch((error) => {
            this.endLoading();
            this.$message.error(error.$message || "信息更新失败");
          });
      },
      onSubmit(dataForm) {
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
            const rankLevelValueMap = {
              普通员工: 0,
              团队管理者: 1,
              高层管理者: 2,
            };
            const rankLevelValue = rankLevelValueMap[this.form.rankLevel];
            this.startLoading();
            const param = {
              teamId: Number(this.team_id),
              userEmail: this.form.userEmail.replaceAll(" ", ""),
              rankLevel: rankLevelValue,
              userPosition: this.form.userPosition,
            };
            console.log(param);
            addTeamMember(param)
              .then(() => {
                this.getdata();
                this.dialogVisible = false;
                this.endLoading();
                this.$message.success("添加成功");
              })
              .catch((error) => {
                this.endLoading();
                this.$message.error(error.$message || "添加失败");
              });
          }
        });
      },
      handleSearch() {
        // 无需额外操作，过滤逻辑已在 computed 中实现
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
  .team-member-management {
    padding: 20px;
  }
  .cursor {
    cursor: pointer;
  }
  .sub-btn {
    text-align: center;
  }
  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .narrow-select {
    width: 120px;
    margin-right: 0px;
  }
  
  .operation-item {
    color: #4fa2ff;
    margin-right: 15px;
    font-weight: bold;
  }
  
  .team-description {
    margin-bottom: 20px;
  }
  </style>