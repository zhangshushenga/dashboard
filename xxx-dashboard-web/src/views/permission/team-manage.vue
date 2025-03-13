<template>
  <div class="team-management-page">
    <!-- 筛选区域 -->
    <div class="filter-section">
      <!-- 级联选择（年/月/周） -->
      <el-cascader
        v-model="selectedWeek"
        :options="weekCascaderOptions"
        placeholder="选择年/月/周"
        @change="handleSearch"
        style="width: 250px"
      />
      <!-- 多选部门 -->
      <el-select
        v-model="selectedDepartments"
        multiple
        filterable
        placeholder="选择部门"
        
        style="margin-left: 10px; width: 200px"
        @change="handleSearch"
      >
        <el-option
          v-for="dep in departments"
          :key="dep.teamId"
          :label="dep.teamName"
          :value="dep.teamId"
        />
      </el-select>
      <!-- 多选人员 -->
      <el-select
        v-model="selectedPersons"
        multiple
        filterable
        placeholder="选择人员"
        style="margin-left: 10px; width: 200px"
        @change="handleSearch"
      >
        <el-option
          v-for="person in filteredPersonOptions"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <!-- 评分状态复选框 -->
      <!-- <el-checkbox-group
        v-model="selectedRatedFilters"
        @change="handleSearch"
        style="margin-left: 10px"
      >
        <el-checkbox label="rated">已评分</el-checkbox>
        <el-checkbox label="notRated">未评分</el-checkbox>
      </el-checkbox-group> -->
      <!-- 原来的提交状态复选框已改为单选按钮 -->
      <div class="status-filter" style="margin-left: 10px">
        <el-radio-group
          v-model="selectedStatus"
          size="medium"
          @change="handleSearch"
        >
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="submitted">已提交</el-radio-button>
          <el-radio-button label="notSubmitted">未提交</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 周报内容搜索（暂时注释） -->
      <!-- <el-input
        v-model="searchContent"
        placeholder="输入周报内容搜索"
        clearable
        style="margin-left: 10px; width:200px"
        @keyup.enter.native="handleSearch"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input> -->
    </div>

    <!-- 用时间线替代卡片展示部门及其团队成员 -->
    <div
      class="member-list"
      v-infinite-scroll="loadMoreMembers"
      infinite-scroll-disabled="infiniteScrollDisabled"
      infinite-scroll-distance="10"
    >
      <el-timeline>
        <el-timeline-item v-for="group in displayedGroups" :key="group.teamName">
  <div class="group-header" style="display: flex; justify-content: space-between; align-items: center;">
    <div>
      <template v-if="teamRatingTips[group.teamName]">
        <el-tooltip
          effect="dark"
          :content="'评分提示语：' + teamRatingTips[group.teamName]"
          placement="bottom-start"
          popper-class="custom-tooltip-arrow"
        >
          <span>{{ group.teamName }}</span>
        </el-tooltip>
      </template>
      <template v-else>
        <span>{{ group.teamName }}</span>
      </template>
    </div>
    <div class="department-stats">
      应交：{{ group.aggregate.totalEmployees }}&nbsp;
      实交：{{ group.aggregate.submittedEmployees }}&nbsp;
      未交：{{ group.aggregate.totalEmployees - group.aggregate.submittedEmployees }}
    </div>
  </div>

  <div class="team-members">
    <div
      v-for="member in group.members"
      :key="member.reportId"
      class="member-item"
    >
              <!-- 修改：在成员信息中增加提交时间展示 -->
              <div class="member-info">
                <div>
                  <strong>{{ member.name }}</strong>
                  <template v-if="member.position"
                    >/ {{ member.position }}</template
                  >
                </div>
                <div v-if="member.isSubmitted" class="submit-time">
                  {{  `提交时间：`+ member.update_time }}
                </div>
              </div>
              <!-- 周报内容（点击弹出详情） -->
              <div
                class="member-report"
                v-if="member.isSubmitted"
                @click="openReportDialog(member)"
                style="cursor: pointer"
              >
                <vue-markdown>{{ member.latestReportContent }}</vue-markdown>
              </div>
              <div class="no-report" v-else>无周报</div>

              <!-- 评分结果 -->
              <div class="rating-result">
                <template v-if="member.isRated">
                  <div class="team-manager-rating">
                    <span>团队管理者评分: </span>
                    <!-- 修改：移除 show-score 属性，只显示星星 -->
                    <el-rate
                      v-model="member.teamManagerRating"
                      disabled
                      style="vertical-align: middle"
                    ></el-rate>
                  </div>
                  <div class="high-level-rating">
                    <span>高层管理者评分: </span>
                    <!-- 修改：移除 show-score 属性，只显示星星 -->
                    <el-rate
                      v-model="member.highLevelRating"
                      disabled
                      style="vertical-align: middle"
                    ></el-rate>
                  </div>
                  <!-- <div class="rating-comment">
                    <span>评语: {{ member.ratingComment }}</span>
                  </div> -->
                </template>
                <template v-else>
                  <span style="color: #999">未评分</span>
                </template>
              </div>
              <!-- 历史记录 -->
              <div class="history-list" v-if="isHistoryExpanded(member)">
                <div
                  v-for="(history, index) in member.historyList"
                  :key="index"
                  class="history-item"
                >
                  <div class="history-header">
                    <span class="history-time">{{ history.submitTime }}</span>
                    <span class="history-title">{{ history.title }}</span>
                  </div>
                  <vue-markdown>{{ history.content }}</vue-markdown>
                </div>
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <!-- 加载动画 -->
      <div class="loading-animation" v-if="isLoading">
        <i class="el-icon-loading loading-icon"></i>
        <span>加载中...</span>
      </div>
    </div>

    <!-- 悬浮按钮：修改团队评分提示语 -->
    <el-button
      v-draggable
      class="floating-btn"
      type="primary"
      icon="el-icon-setting"
      circle
      @click="openRatingTipDialog"
    ></el-button>

    <!-- 周报详情弹窗 -->
    <el-dialog title="周报详情" :visible.sync="reportDialogVisible" width="70%">
      <div class="report-dialog-content">
        <div class="report-text">
          <h3>{{ currentReport.personName }} 的周报</h3>
          <!-- 添加动态 key，保证内容更新时会重新渲染 vue-markdown -->
          <vue-markdown :key="currentReport.content">
            {{ currentReport.content }}
          </vue-markdown>
          <!-- <div v-html="renderMarkdown(currentReport.content)"></div> -->
        </div>
        <div class="report-rating">
          <div class="team-manager-rating">
            <span>团队管理者评分: </span>
            <el-rate
              v-model="currentReport.teamManagerRating"
              disabled
              allow-half
              show-score
              style="vertical-align: middle"
            ></el-rate>
          </div>
          <div class="high-level-rating" style="margin-top: 10px">
            <span>高层管理者评分: </span>
            <el-rate
              v-model="currentReport.highLevelRating"
              disabled
              allow-half
              show-score
              style="vertical-align: middle"
            ></el-rate>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 修改团队评分提示语弹窗 -->
    <el-dialog
      title="修改团队评分提示语"
      :visible.sync="ratingTipDialogVisible"
      width="40%"
    >
      <div>
        <el-select
          v-model="selectedTeamForTip"
          placeholder="选择团队"
          style="width: 100%"
        >
          <el-option
            v-for="dep in departments"
            :key="dep.teamId"
            :value="dep.teamId"
            :label="dep.teamName"
          />
        </el-select>
        <el-input
          type="textarea"
          v-model="tipContent"
          placeholder="输入评分提示语"
          style="margin-top: 10px"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ratingTipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRatingTip">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getScorePrompt, updateScorePromptAll } from "@/api/team-list";
import { getTeamMemberList, getManagedTeams } from "@/api/team-member";
import { getReportSearchData, getYearMonthData } from "@/api/team-manage";
import VueMarkdown from "vue-markdown";

export default {
  name: "TeamManage",
  directives: {
    // 自定义拖拽指令，支持悬浮按钮拖拽
    draggable: {
      inserted(el) {
        el.style.cursor = "move";
        el.onmousedown = function (e) {
          let disX = e.clientX - el.offsetLeft;
          let disY = e.clientY - el.offsetTop;
          document.onmousemove = function (e) {
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            el.style.left = left + "px";
            el.style.top = top + "px";
            el.style.transition = "none";
          };
          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            el.style.transition = "all 0.2s ease";
          };
          return false;
        };
      },
    },
  },
  components: {
    // 注册组件
    VueMarkdown,
  },
  data() {
    return {
      selectedWeek: [],
      weekCascaderOptions: [], // 由接口数据动态生成
      selectedDepartments: [],
      departments: [],
      selectedPersons: [],
      allTeamMembers: {},
      selectedRatedFilters: [],
      selectedStatus: "all", // 使用单选按钮来替换原有复选框
      searchContent: "",
      tableData: [],
      loadedGroupCount: 2, // 初始加载2组数据
      isLoading: false,
      infiniteScrollDisabled: false,
      expandedMembers: [],
      reportDialogVisible: false,
      currentReport: {
        personName: "",
        content: "",
        teamManagerRating: 0,
        highLevelRating: 0,
        ratingComment: "",
      },
      ratingTipDialogVisible: false,
      selectedTeamForTip: "",
      tipContent: "",
      teamRatingTips: {},
      scorePromptMapping: {},
      departments: [],
      teamAggregates: {}
    };
  },
  watch: {
    selectedTeamForTip(newVal) {
      if (newVal) {
        // 当选中某个团队后，根据映射自动填充提示语（如果存在）
        this.tipContent = this.scorePromptMapping[newVal] || "";
      } else {
        this.tipContent = "";
      }
    },
    // 添加 watcher ，以防部门数据加载较晚时，再次更新评分提示语显示
    departments(newDeps) {
      if (
        newDeps.length > 0 &&
        Object.keys(this.scorePromptMapping).length > 0
      ) {
        const tips = {};
        newDeps.forEach((dep) => {
          if (this.scorePromptMapping[dep.teamId]) {
            tips[dep.teamName] = this.scorePromptMapping[dep.teamId];
          }
        });
        this.teamRatingTips = tips;
      }
    },
  },
  computed: {
    selectedTeamIds() {
      return this.selectedDepartments;
    },
    groupedMembers() {
      let groups = {};
      this.tableData.forEach((member) => {
        if (!groups[member.teamName]) {
          groups[member.teamName] = [];
        }
        groups[member.teamName].push(member);
      });
      return Object.keys(groups).map((teamName) => ({
        teamName,
        members: groups[teamName],
        aggregate: this.teamAggregates[teamName] || {
        totalEmployees: groups[teamName].length,
        submittedEmployees: groups[teamName].filter(member => member.isSubmitted).length
      }
      }));
    },
    displayedGroups() {
      // return this.groupedMembers.slice(0, this.loadedGroupCount);
      return this.groupedMembers;
    },
    filteredPersonOptions() {
      let allPersons = [];
      // 遍历所有部门的人员
      Object.entries(this.allTeamMembers).forEach(([teamId, members]) => {
        members.forEach((member) => {
          allPersons.push({
            // label: `${member.userName} (${member.userPosition})`,
            label: `${member.userName}`,
            value: member.userEmail,
            teamId: Number(teamId),
          });
        });
      });
      // 如果选择了部门，则仅显示属于选中部门的人员
      if (this.selectedDepartments && this.selectedDepartments.length > 0) {
        allPersons = allPersons.filter((person) =>
          this.selectedDepartments.includes(person.teamId)
        );
      }
      // 根据用户 email 去重
      const dedupedPersons = [];
      const seenEmails = new Set();
      allPersons.forEach((person) => {
        if (!seenEmails.has(person.value)) {
          seenEmails.add(person.value);
          dedupedPersons.push(person);
        }
      });
      return dedupedPersons;
    },
  },
  methods: {
    handleSearch() {
      // 部门和人员相关入参处理
      let teamIds =
        Array.isArray(this.selectedDepartments) &&
        this.selectedDepartments.length
          ? this.selectedDepartments
          : this.departments.map((dep) => dep.teamId);

      let persons =
        Array.isArray(this.selectedPersons) && this.selectedPersons.length
          ? this.selectedPersons
          : [];
      // if (persons.length === 0) {
      //   for (const team in this.allTeamMembers) {
      //     this.allTeamMembers[team].forEach((member) => {
      //       if (!persons.includes(member.userEmail)) {
      //         persons.push(member.userEmail);
      //       }
      //     });
      //   }
      // }

      var commitStatus = -1;
      var isCommit = false;
      if (this.selectedStatus !== "all") {
        commitStatus = this.selectedStatus === "submitted" ? 1 : 0;
        isCommit = this.selectedStatus === "submitted";
      }

      var rateStatus = -1;
      var isRated = false;
      if (this.selectedRatedFilters.length === 1) {
        rateStatus = this.selectedRatedFilters[0] === "rated" ? 1 : 0;
        isRated = this.selectedRatedFilters[0] === "rated";
      }

      var param = {};
      if (rateStatus === -1 && commitStatus === -1) {
        param = {
          teamIds: teamIds,
        };
      } else if (rateStatus === -1) {
        param = {
          teamIds: teamIds,
          submitted: isCommit,
        };
      } else if (commitStatus === -1) {
        param = {
          teamIds: teamIds,
          evaluated: isRated,
        };
      } else {
        param = {
          teamIds: teamIds,
          submitted: isCommit,
          evaluated: isRated,
        };
      }

      if (persons.length > 0) {
        param = {
          ...param,
          persons: persons,
        };
      }

      // 如果选择了周，则加入 year 和 week 参数
      if (this.selectedWeek && this.selectedWeek.length === 3) {
        param.year = parseInt(this.selectedWeek[0], 10);
        // 从 selectedWeek[2] 中去掉 "week" 前缀，提取周数
        const weekStr = this.selectedWeek[2];
        param.week = parseInt(weekStr.replace("week", ""), 10);
      }

      console.log("调用筛选查询接口，参数:", param);
      this.loadTeamData(param);
    },
    loadMoreMembers() {
      // if (this.loadedGroupCount >= this.groupedMembers.length) {
      //   this.infiniteScrollDisabled = true;
      //   return;
      // }
      // this.isLoading = true;
      // setTimeout(() => {
      //   this.loadedGroupCount++;
      //   this.isLoading = false;
      // }, 1000);
    },
    // renderMarkdown(content) {
    //   if (!content) return "";
    //   return marked(content);
    // },
    openReportDialog(member) {
      this.currentReport = {
        personName: member.name,
        content: member.latestReportContent,
        teamManagerRating: member.teamManagerRating,
        highLevelRating: member.highLevelRating,
        ratingComment: member.ratingComment,
      };
      this.reportDialogVisible = true;
    },
    toggleHistory(member) {
      const index = this.expandedMembers.indexOf(member.id);
      if (index === -1) {
        this.expandedMembers.push(member.id);
      } else {
        this.expandedMembers.splice(index, 1);
      }
    },
    isHistoryExpanded(member) {
      return this.expandedMembers.includes(member.id);
    },
    openRatingTipDialog() {
      this.ratingTipDialogVisible = true;
      this.selectedTeamForTip = "";
      this.tipContent = "";
    },
    saveRatingTip() {
      // 判断是否选择了团队
      if (!this.selectedTeamForTip) {
        this.$message.warning("请选择团队");
        return;
      }

      // 判断评分提示语是否为空
      if (!this.tipContent || !this.tipContent.trim()) {
        this.$message.warning("评分提示语不能为空");
        return;
      }

      // 查找对应的团队
      const team = this.departments.find(
        (item) => item.teamId === this.selectedTeamForTip
      );
      if (team) {
        const param = {
          teamId: team.teamId,
          scorePrompt: this.tipContent,
        };
        updateScorePromptAll(param)
          .then(() => {
            // 更新本地评分提示数据：
            // 同时更新 scorePromptMapping 与 teamRatingTips，确保自动填充时能
            // 获取到最新的评分提示语
            this.$set(this.scorePromptMapping, team.teamId, this.tipContent);
            this.$set(this.teamRatingTips, team.teamName, this.tipContent);

            this.$message.success("评分提示语更新成功");
            // API 请求成功后关闭对话框
            this.ratingTipDialogVisible = false;
          })
          .catch((error) => {
            // API 请求失败时保持对话框开启，让用户重新修改
            this.$message.error(error.message || "评分提示语更新失败");
          });
      } else {
        this.$message.error("未找到对应的团队");
      }
    },
    loadDepartmentsAndMembers() {
      this.departments = [];
      this.allTeamMembers = {};
      getManagedTeams({})
        .then((res) => {
          if (
            res.code === 0 &&
            res.data &&
            res.data.managedTeams &&
            res.data.managedTeams.length
          ) {
            this.departments = res.data.managedTeams;

            this.departments.forEach((team) => {
              getTeamMemberList({ teamIdList: [team.teamId] }).then(
                (memberRes) => {
                  if (memberRes.code === 0 && memberRes.data) {
                    // 为每个成员添加 teamId 信息
                    memberRes.data.forEach((member) => {
                      member.teamId = team.teamId;
                    });
                    this.$set(this.allTeamMembers, team.teamId, memberRes.data);
                  } else {
                    this.$set(this.allTeamMembers, team.teamId, []);
                  }
                }
              );
            });

            // // 根据this.departments获取所有teamid数组
            // const teamIds = this.departments.map((team) => team.teamId);
            // // 根据teamIds获取所有团队成员
            // getTeamMemberList({ teamIdList: teamIds }).then((memberRes) => {
            //   console.log("loadTeamData memberRes:", memberRes);
            //   if (memberRes.code === 0 && memberRes.data) {
            //     memberRes.data.forEach((member) => {
            //       member.teamId = teamIds[0].teamId;
            //     });
            //     this.$set(this.allTeamMembers, teamIds[0].teamId, memberRes.data);
            //   } else {
            //     this.$set(this.allTeamMembers, teamIds[0].teamId, []);
            //   }
            // });
          } else {
            console.error("获取团队数据失败", res);
          }
        })
        .catch((err) => {
          console.error("接口调用出错：", err);
        });
    },
    loadScorePrompt() {
      // 调用 getScorePrompt 接口获取评分提示语数据
      getScorePrompt({})
        .then((res) => {
          if (res.code === 0 && res.data) {
            // 以 teamId 为 key 构造映射
            const mapping = {};
            res.data.forEach((item) => {
              mapping[item.teamId] = item.scorePrompt;
            });
            this.scorePromptMapping = mapping;
            // 根据部门列表将 teamId 映射成团队名称作为 key
            const tips = {};
            if (this.departments && this.departments.length > 0) {
              this.departments.forEach((dep) => {
                if (mapping[dep.teamId]) {
                  tips[dep.teamName] = mapping[dep.teamId];
                }
              });
            }
            this.teamRatingTips = tips;
          } else {
            console.error("获取评分提示语失败:", res.message);
          }
        })
        .catch((err) => {
          console.error("接口调用获取评分提示语出错:", err);
        });
    },
    loadTeamData(param) {
      console.log("loadTeamData param:", param);

      // 使用 Element UI Loading 服务显示 loading 效果
      const loadingInstance = this.$loading({
        lock: true,
        // text: "加载中...",
        // spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.6)",
      });

      getReportSearchData(param)
        .then((res) => {
          loadingInstance.close();

          let apiResponse = res.data;
          this.tableData = [];
          this.teamAggregates = {};
          apiResponse.team.forEach((team) => {
            const teamName = team.name;
            this.$set(this.teamAggregates, teamName, {
              totalEmployees: team.totalEmployees,
              submittedEmployees: team.submittedEmployees
            });
            team.employees.forEach((emp) => {
              const isSubmitted =
                emp.reportContent && emp.reportContent.trim().length > 0;
              const isRated = Boolean(emp.reportId);
              this.tableData.push({
                reportId: emp.reportId,
                id: emp.id,
                teamName: teamName,
                name: emp.name,
                position: emp.position,
                isSubmitted: isSubmitted,
                latestReportContent: emp.reportContent,
                isRated: isRated,
                teamManagerRating:
                  emp.teamManagerscore != -1 ? emp.teamManagerscore : "未评分",
                highLevelRating:
                  emp.seniorManagerscore != -1
                    ? emp.seniorManagerscore
                    : "未评分",
                ratingComment: isRated ? emp.teamManagerscoreComment : "",
                update_time: emp.updateTime, // 新增：提交时间字段
                historyList: [],
              });
            });
          });
        })
        .catch((error) => {
          loadingInstance.close();
          this.$message.error(error.$message || "获取数据失败");
        });
    },
    // 新增方法：格式化提交时间（时间戳）为字符串
    formatTimestamp(timestamp) {
      if (!timestamp) return "";
      return new Date(timestamp).toLocaleString();
    },
    // loadYearMonthData() {
    //   console.log("调用获取年月数据接口");
    //   getYearMonthData()
    //     .then((res) => {
    //       if (res.code === 0 && res.data && res.data.yearMonthDataList) {
    //         const data = res.data.yearMonthDataList;
    //         const cascaderOptions = data.map((yearObj) => {
    //           return {
    //             value: yearObj.year.toString(),
    //             label: yearObj.year + "年",
    //             children: yearObj.monthDataList.map((monthObj) => {
    //               const month = monthObj.month;
    //               const monthValue = month < 10 ? "0" + month : String(month);
    //               return {
    //                 value: monthValue,
    //                 label: month + "月",
    //                 children: monthObj.weekList.map((weekObj) => {
    //                   return {
    //                     value: "week" + weekObj.weekNumber,
    //                     label: "第" + weekObj.weekNumber + "周",
    //                     startDate: weekObj.startDate,
    //                     endDate: weekObj.endDate,
    //                   };
    //                 }),
    //               };
    //             }),
    //           };
    //         });
    //         this.weekCascaderOptions = cascaderOptions;
    //       } else {
    //         console.error("获取年月数据失败", res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.error("接口调用出错", err);
    //     });
    // },
    loadYearMonthData() {
  console.log("调用获取年月数据接口 (假数据模式，多年数据)");

  // 起始年份及起始月份（用户希望假数据从2025年2月开始）
  const startYear = 2025;
  const startMonth = 2; // 2 表示2月

  // 获取指定日期所在周的周一（若当天为星期天，则调整为上周一）
  function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    // 如果周日(0)，则将其置为上周一；否则按周一计算
    const diff = day === 0 ? d.getDate() - 6 : d.getDate() - day + 1;
    return new Date(d.setDate(diff));
  }

  // 格式化日期为 YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 计算 ISO 周数
  function getWeekNumber(date) {
    const tmpDate = new Date(date.getTime());
    tmpDate.setHours(0, 0, 0, 0);
    tmpDate.setDate(tmpDate.getDate() + 3 - ((tmpDate.getDay() + 6) % 7));
    const week1 = new Date(tmpDate.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((tmpDate.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth(); // 0-indexed（例如 4 月为 3）
  const msInWeek = 7 * 24 * 60 * 60 * 1000;

  const yearOptions = [];
  let defaultWeekDataForCurrentMonth = null;

  // 遍历年份，从起始年份 startYear 到当前年份 currentYear
  for (let year = startYear; year <= currentYear; year++) {
    let monthStart = 0;
    let monthEnd = 11; // 默认全年：1月至12月

    // 如果是起始年
    if (year === startYear) {
      // 如果当前年份就是起始年，则只显示从 startMonth 开始到当前月份的数据
      if (currentYear === startYear) {
        monthStart = startMonth - 1; // 转换为0-indexed
        monthEnd = currentMonthIndex;
      }
      // 如果当前年份大于起始年，则对起始年显示全年（即使假数据真正开始于2月，但要求显示“全年”）
      else {
        monthStart = 0;
        monthEnd = 11;
      }
    } else if (year === currentYear) {
      // 当前年：只显示到当前月（0-indexed）
      monthStart = 0;
      monthEnd = currentMonthIndex;
    }
    // 对于中间年份（year > startYear 且 year < currentYear）默认显示全年

    const monthsOptions = [];
    for (let month = monthStart; month <= monthEnd; month++) {
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      // 以该月第一天所在周的周一作为起始参考
      const startMonday = getMonday(firstDayOfMonth);
      let weekIterator = new Date(startMonday);
      const weeks = [];

      // 循环生成该月所有与本月有交集的周数据
      while (weekIterator <= lastDayOfMonth) {
        const weekStart = new Date(weekIterator);
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
        if (weekEnd >= firstDayOfMonth && weekStart <= lastDayOfMonth) {
          weeks.push({
            weekNumber: getWeekNumber(weekStart),
            startDate: formatDate(weekStart),
            endDate: formatDate(weekEnd),
          });
        }
        weekIterator = new Date(weekIterator.getTime() + msInWeek);
      }

      const monthValue = (month + 1).toString().padStart(2, "0");
      const monthOption = {
        value: monthValue,
        label: (month + 1) + "月",
        children: weeks.map((week) => ({
          value: "week" + week.weekNumber,
          label: "第" + week.weekNumber + "周",
          startDate: week.startDate,
          endDate: week.endDate,
        })),
      };

      // 如果当前遍历到的就是当前年、当前月，则计算默认选中项（选择“当前周的前一周”）
      if (year === currentYear && month === currentMonthIndex) {
        const currentMonday = getMonday(currentDate);
        const candidate = new Date(currentMonday.getTime() - msInWeek);
        if (candidate < firstDayOfMonth) {
          defaultWeekDataForCurrentMonth = weeks.length > 0 ? weeks[0] : null;
        } else {
          const candidateWeekNumber = getWeekNumber(candidate);
          defaultWeekDataForCurrentMonth =
            weeks.find((week) => week.weekNumber === candidateWeekNumber) ||
            (weeks.length > 0 ? weeks[0] : null);
        }
      }

      monthsOptions.push(monthOption);
    }

    yearOptions.push({
      value: year.toString(),
      label: year + "年",
      children: monthsOptions,
    });
  }

  this.weekCascaderOptions = yearOptions;

  if (defaultWeekDataForCurrentMonth) {
    const currentYearStr = currentYear.toString();
    const currentMonthStr = (currentMonthIndex + 1).toString().padStart(2, "0");
    this.selectedWeek = [
      currentYearStr,
      currentMonthStr,
      "week" + defaultWeekDataForCurrentMonth.weekNumber,
    ];
  }
},
    endLoading() {
      this.isLoading = false;
      this.infiniteScrollDisabled = false;
    },
  },
  created() {
    function getWeekNumber(date) {
      const tmpDate = new Date(date.getTime());
      tmpDate.setHours(0, 0, 0, 0);
      tmpDate.setDate(tmpDate.getDate() + 3 - ((tmpDate.getDay() + 6) % 7));
      const week1 = new Date(tmpDate.getFullYear(), 0, 4);
      return (
        1 +
        Math.round(
          ((tmpDate.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7
        )
      );
    }

    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const targetWeek = currentWeek - 1; // 当前周的前一周
    const currentYear = now.getFullYear();

    // 调用 loadTeamData 时传入 {year, week} 参数
    this.loadTeamData({ year: currentYear, week: targetWeek });

    this.loadYearMonthData();
    this.loadDepartmentsAndMembers();
    this.loadScorePrompt();
  },
};
</script>

<style >
.team-management-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 筛选区域 */
.filter-section {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* 部门选择样式：减小高度、增大文字 */
.dept-select .el-input__inner {
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  padding: 10 0px;
}

/* .dept-select .el-input__icon {
  top: 50%;
  transform: translateY(-50%);
} */

/* 固定高度、可滚动的成员列表容器 */
.member-list {
  margin-top: 20px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 时间线主体样式 */
.el-timeline {
  padding: 20px;
  border-radius: 8px;
}

/* 新增部门名称的样式 */
.group-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  display: inline-block;
  padding: 5px 0px; /* 根据需要调整 */
}

/* 组评分提示 */
.group-rating-tip {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

/* 团队成员区域 */
.team-members {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.member-item {
  width: 100%;
  background-color: #fff;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.member-info {
  margin: 12px 0;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 新增提交时间的样式 */
.submit-time {
  font-size: 14px;
  color: #909399;
}
.member-report {
  background-color: #f9f9f9;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 8px;
}
.no-report {
  color: #c0c4cc;
  font-style: italic;
  font-size: 14px;
  margin-bottom: 8px;
}
.rating-result {
  font-size: 14px;
  margin-bottom: 8px;
}
.rating-comment {
  margin-left: 5px;
}
.history-list {
  border-top: 1px solid #ebeef5;
  padding-top: 8px;
}
.history-item {
  margin-bottom: 8px;
  font-size: 13px;
}
.history-header {
  font-weight: bold;
  margin-bottom: 4px;
}
.history-time {
  color: #909399;
  margin-right: 5px;
}

/* 悬浮按钮 */
.floating-btn {
  position: fixed;
  top: 120px;
  right: 30px;
  z-index: 2000;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2196f3, #21cbf3); /* 蓝色渐变 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* 加载动画 */
.loading-animation {
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: #666;
}
.loading-icon {
  animation: spin 1s linear infinite;
  margin-right: 5px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 周报详情弹窗排版 */
.report-dialog-content {
  display: flex;
}
.report-text {
  width: 60%;
  padding-right: 20px;
  border-right: 1px solid #ebeef5;
}
.report-rating {
  width: 40%;
  padding-left: 20px;
}
/* 设置最大宽度并允许自动换行 */
 .el-tooltip__popper{
  max-width: 300px !important; /* 根据需要调整最大宽度 */
  border: 1px solid #000 !important;
  border-radius: 8px !important;
}
/* 修改箭头的颜色，使其边框有颜色而中间透明 */
.custom-tooltip-arrow[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: transparent; /* 中间透明 */
  border-top-color: #000; /* 边框颜色 */
  
}

.custom-tooltip-arrow[x-placement^=top] .popper__arrow::after {
  border-top-color: transparent; /* 中间透明 */
  border-bottom-color: #000; /* 边框颜色 */
  
}

.custom-tooltip-arrow[x-placement^=left] .popper__arrow::after {
  border-left-color: transparent; /* 中间透明 */
  border-right-color: #999999; /* 边框颜色 */
  
}

.custom-tooltip-arrow[x-placement^=right] .popper__arrow::after {
  border-right-color: transparent; /* 中间透明 */
  border-left-color: #999999; /* 边框颜色 */
  
}

.department-stats {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}

</style>