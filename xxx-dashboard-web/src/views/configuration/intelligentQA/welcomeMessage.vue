<template>
  <div class="container">
    <div class="view">
      <div class="title">自动回复多语配置</div>
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <el-select
          v-model="currentLanguage"
          class="changeLanguage"
          placeholder="请选择语言"
          @change="changeCurrentLanguage"
        >
          <el-option
            v-for="item in selectMultiLanguage"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-table
        :data="messageList"
        :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
        :pagination-layout="'prev, pager, next'"
        row-key="id"
        style="margin: 20px; width: 95%;"
      >
        <el-table-column label="欢迎语" min-width="80%">
          <template slot-scope="scope">
            {{ scope.row.welcome }}
          </template>
          x
        </el-table-column>
        <el-table-column label="反馈超时自动回复" min-width="80%">
          <template slot-scope="scope">
            {{ scope.row.autoReplyText }}
          </template>
        </el-table-column>
        <el-table-column label="反馈关闭自动回复" min-width="80%">
          <template slot-scope="scope">
            {{ scope.row.autoCloseText }}
          </template>
        </el-table-column>
        <el-table-column label="无法解答默认回复" min-width="80%">
          <template slot-scope="scope">
            {{ scope.row.openaiUnknown }}
          </template>
        </el-table-column>
        <el-table-column label="chatbot欢迎语" min-width="80%">
        <template slot-scope="scope">
          <div v-if="scope.row.chatbotWelcome">
            <div v-for="(line, index) in getChatbotWelcomeLines(scope.row.chatbotWelcome)" :key="index">
              {{ line }}
            </div>
          </div>
        </template>
      </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="编辑自动回复"
        :visible.sync="editMessageVisible"
        width="50%"
        :show-close="false"
        class="el-dialog__wrapper"
      >
        <el-form ref="messageForm" :model="messageForm" :rules="rules" label-width="20%">
          <el-form-item label="欢迎语" prop="welcome" style="margin-bottom: 15px">
            <el-input
              v-for="(language, index) in messageForm.multiLanguageList"
              :key="language.code"
              v-model="language.welcome"
              style="margin-bottom: 5px;"
              :placeholder="language.placeholder"
              @input="updateWelcome($event, index)"
            />
          </el-form-item>
          <el-form-item label="反馈超时自动回复" prop="autoReplyText" style="margin-bottom: 15px">
            <el-input
              v-for="(language, index) in messageForm.multiLanguageList"
              :key="language.code"
              v-model="language.autoReplyText"
              style="margin-bottom: 5px;"
              :placeholder="language.placeholder"
              @input="updateWelcome($event, index)"
            />
          </el-form-item>
          <el-form-item label="反馈关闭自动回复" prop="autoCloseText" style="margin-bottom: 15px">
            <el-input
              v-for="(language, index) in messageForm.multiLanguageList"
              :key="language.code"
              v-model="language.autoCloseText"
              style="margin-bottom: 5px;"
              :placeholder="language.placeholder"
              @input="updateWelcome($event, index)"
            />
          </el-form-item>
          <el-form-item label="无法解答默认回复" prop="openaiUnknown" style="margin-bottom: 15px">
            <el-input
              v-for="(language, index) in messageForm.multiLanguageList"
              :key="language.code"
              v-model="language.openaiUnknown"
              style="margin-bottom: 5px;"
              :placeholder="language.placeholder"
              @input="updateWelcome($event, index)"
            />
          </el-form-item>
          <el-form-item
            v-for="(item, paramIndex) in messageForm.chatbotWelcomeList"
            :key="paramIndex"
            :label="'chatbot欢迎语 ' + (paramIndex + 1)"
            :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
          >
          <!-- <el-form-item :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"> -->
            <el-input
              v-for="(language, langIndex) in item"
              :key="language.code"
              style="margin-bottom: 5px;"
              v-model="item[langIndex].welcome"
              :placeholder="language.placeholder"
              @input="updateChatbotWelcome($event, paramIndex, langIndex)"
            />
          <!-- </el-form-item> -->

            <div style="margin-top: 18px;"></div>
            <el-button v-if="paramIndex > 0" @click.prevent="removeParam(paramIndex)">删除</el-button>
            <el-button @click.prevent="addParam(paramIndex)">添加</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="button-style1" @click="cancelSubmitMessage">取消</el-button>
          <el-button class="button-style2" @click="submitForm('messageForm')">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { endLoading, startLoading } from '@/utils/loading'
import {
  MUITLANGUAGE_NOTIFICATION,
  getLocalMultiLanguage,
  getLanguageContentFromCode
} from '@/utils/multiLanguage'
import { getWelcomeMessageList, updateWelcomeMessage } from '@/api/intelligentQA'
import { EventBus } from '@/utils/event-bus'

export default {
  components: {},
  data() {
    return {
      // 热门欢迎语列表
      messageList: [],

      // 编辑弹窗
      editMessageVisible: false,

      // 配置项数据源
      messageForm: {
        welcome: '',
        autoReplyText: '',
        autoCloseText: '',
        openaiUnknown: '',
        multiLanguageList: [],
        chatbotWelcomeList: []
      },

      rules: {
        welcome: [
          { required: true, message: '请输入欢迎语', trigger: 'blur' }
        ],
        autoReplyText: [
          { required: true, message: '请输入反馈超时自动回复', trigger: 'blur' }
        ],
        autoCloseText: [
          { required: true, message: '请输入反馈关闭自动回复', trigger: 'blur' }
        ],
        openaiUnknown: [
          { required: true, message: '请输入无法解答默认回复', trigger: 'blur' }
        ]
      },
      // 当前语言
      currentLanguage: '',
      // 切换多语数据源
      selectMultiLanguage: []
    }
  },
  beforeDestroy() {
    // 在组件销毁之前解除事件监听，以防内存泄漏
    EventBus.$off(MUITLANGUAGE_NOTIFICATION, this.handleNotification)
  },
  created() {
    EventBus.$on(MUITLANGUAGE_NOTIFICATION, this.handleNotification)
  },
  mounted() {
    this.initLanguageConfig()
    this.getMessageListData()
  },
  methods: {
    handleNotification(data) {
      if (this.currentLanguage === '' || this.currentLanguage === undefined) {
        this.initLanguageConfig()
        this.getMessageListData()
      }
    },
    /**
     *  初始化多语配置
     */
    initLanguageConfig() {
      this.currentLanguage = getLocalMultiLanguage().defaultLanguage
      this.selectMultiLanguage = getLanguageContentFromCode().map(language => {
        const key = Object.keys(language)[0]
        return { label: language[key], value: key }
      })
    },
    getChatbotWelcomeLines(chatbotWelcome) {
      const languageData = chatbotWelcome[this.currentLanguage] || [];
      return languageData;
    },
    /**
     * 切换当前语言
     */
    changeCurrentLanguage() {
      this.getMessageListData()
    },
    /**
     *获取欢迎语列表
     */
    async getMessageListData() {
      startLoading()

      const param = {
        languageCode: this.currentLanguage
      }
      console.log(param)

      const response = await getWelcomeMessageList(param)

      JSON.stringify(response.data)

      if (response.code !== undefined && response.code === 0 && response.data != undefined) {
        this.messageList = response.data
      }

      endLoading()
    },
    /**
     * 初始化编辑欢迎语数据源
     * message
     */
    initEditMessageForm(message) {
      this.messageForm.id = message.id

      if (message.multiLanguageMap === undefined || Object.keys(message.multiLanguageMap).length === 0) {
        // 兼容之前的数据：将welcome填写到默认的语言中
        this.messageForm.multiLanguageList = getLanguageContentFromCode().map(language => {
          const key = Object.keys(language)[0]
          if (key === getLocalMultiLanguage().defaultLanguage) {
            return { welcome: message.welcome, autoReplyText: message.autoReplyText, autoCloseText: message.autoCloseText,
              openaiUnknown: message.openaiUnknown, placeholder: language[key], code: key }
          } else {
            return { welcome: '', autoReplyText: '', autoCloseText: '', openaiUnknown: '', placeholder: language[key], code: key }
          }
        })

        this.messageForm.welcome = message.welcome
        this.messageForm.autoReplyText = message.autoReplyText
        this.messageForm.autoCloseText = message.autoCloseText
        this.messageForm.openaiUnknown = message.openaiUnknown
      } else {
        // 有多语配置的时候则正常构建数据源
        this.messageForm.multiLanguageList = getLanguageContentFromCode().map(language => {
          const key = Object.keys(language)[0]
          return {
            welcome: message.multiLanguageMap[key] === undefined ? '' : message.multiLanguageMap[key].welcome,
            autoReplyText: message.multiLanguageMap[key] === undefined ? '' : message.multiLanguageMap[key].autoReplyText,
            autoCloseText: message.multiLanguageMap[key] === undefined ? '' : message.multiLanguageMap[key].autoCloseText,
            openaiUnknown: message.multiLanguageMap[key] === undefined ? '' : message.multiLanguageMap[key].openaiUnknown,
            placeholder: language[key],
            code: key
          }
        })

        this.messageForm.welcome = this.messageForm.multiLanguageList.find(
          item => item.code === getLocalMultiLanguage().defaultLanguage).welcome
        this.messageForm.autoReplyText = this.messageForm.multiLanguageList.find(
          item => item.code === getLocalMultiLanguage().defaultLanguage).autoReplyText
        this.messageForm.autoCloseText = this.messageForm.multiLanguageList.find(
          item => item.code === getLocalMultiLanguage().defaultLanguage).autoCloseText
        this.messageForm.openaiUnknown = this.messageForm.multiLanguageList.find(
          item => item.code === getLocalMultiLanguage().defaultLanguage).openaiUnknown
      }

      this.messageForm.chatbotWelcomeList = this.transformChatbotWelcome(message.chatbotWelcome);

      console.log(JSON.stringify(this.messageForm))
    },
    // 处理输入事件
    updateChatbotWelcome(event, paramIndex, langIndex) {
      console.log(event)
      console.log(paramIndex)
      console.log(langIndex)
      // 更新指定项的内容
      this.$set(this.messageForm.chatbotWelcomeList[paramIndex], langIndex, {
        ...this.messageForm.chatbotWelcomeList[paramIndex][langIndex],
        welcome: event
      });
    },
    // 删除某个项目
    removeParam(index) {
      // 从列表中删除指定项
      this.messageForm.chatbotWelcomeList.splice(index, 1);
    },

    // 添加新项目
    addParam(index) {
      // 创建一个新的条目
      const newItem = {};

      // 创建所有支持语言的空条目
      this.selectMultiLanguage.forEach(language => {
        console.log(JSON.stringify(language))
        newItem[language.value] = {
          placeholder: language.label,
          code: language.value,
          welcome: ''  // 初始化为空
        };
      });
      console.log(JSON.stringify(newItem))

      // 在当前位置插入新条目
      this.messageForm.chatbotWelcomeList.splice(index + 1, 0, newItem);
    },
    // 转换 chatbotWelcome 数据为目标格式
    transformChatbotWelcome(chatbotWelcome) {
      // 获取支持的语言列表
      const languageContent = getLanguageContentFromCode();

      // 提取语言代码和名称
      const languageMap = languageContent.reduce((acc, item) => {
        const code = Object.keys(item)[0];
        acc[code] = item[code];
        return acc;
      }, {});

      // 计算每个条目的欢迎语
      const result = [];

      // 遍历每个欢迎语条目
      for (let i = 0; i < (chatbotWelcome.en || []).length; i++) {
        const entry = [];

        // 遍历每种语言
        for (const [code, name] of Object.entries(languageMap)) {
          const welcome = chatbotWelcome[code] ? chatbotWelcome[code][i] || '' : '';
          entry.push({
            placeholder: name,
            code: code,
            welcome: welcome
          });
        }

        result.push(entry);
      }

      return result;
    },
    /**
     * 编辑欢迎语
     * @param {*} message
     */
    edit(message) {
      console.info(message, 1)
      this.editMessageVisible = true
      this.initEditMessageForm(message)
    },
    /**
     * 将欢迎语和答案更新到welcome上
     * @param {*} value
     * @param {*} index
     */
    updateWelcome(value, index) {
      // 把默认语言的welcome赋值
      this.messageForm.welcome = this.messageForm.multiLanguageList.find(
        item => item.code === getLocalMultiLanguage().defaultLanguage).welcome
      this.messageForm.autoReplyText = this.messageForm.multiLanguageList.find(
        item => item.code === getLocalMultiLanguage().defaultLanguage).autoReplyText
      this.messageForm.autoCloseText = this.messageForm.multiLanguageList.find(
        item => item.code === getLocalMultiLanguage().defaultLanguage).autoCloseText
      this.messageForm.openaiUnknown = this.messageForm.multiLanguageList.find(
        item => item.code === getLocalMultiLanguage().defaultLanguage).openaiUnknown
      console.log(this.messageForm, 2)
    },
    transformData(input) {
        console.log('Input:', JSON.stringify(input));
        const result = {};

        input.forEach(item => {
            if (Array.isArray(item)) {
                // 处理数组中的每个项目
                item.forEach(subItem => {
                    if (subItem.welcome.trim() !== "") {
                        if (!result[subItem.code]) {
                            result[subItem.code] = [];
                        }
                        result[subItem.code].push(subItem.welcome);
                    }
                });
            } else if (typeof item === 'object') {
                // 处理对象
                Object.keys(item).forEach(key => {
                    const subItem = item[key];
                    if (subItem.welcome.trim() !== "") {
                        if (!result[key]) {
                            result[key] = [];
                        }
                        result[key].push(subItem.welcome);
                    }
                });
            }
        });

        return result;
    },
    submitForm(formName) {
      console.log(JSON.stringify(this.messageForm))


      this.$refs[formName].validate((valid) => {
        if (valid) {
          startLoading()

          const param = {
            welcome: this.messageForm.welcome,
            autoReplyText: this.messageForm.autoReplyText,
            autoCloseText: this.messageForm.autoCloseText,
            openaiUnknown: this.messageForm.openaiUnknown
          }
          param.chatbotWelcome = this.transformData(this.messageForm.chatbotWelcomeList)
          console.log(param.chatbotWelcome)
          if(param.chatbotWelcome == null || JSON.stringify(param.chatbotWelcome) === "{}"){
            endLoading()
            this.$message.error('必须有一组chatbot欢迎语')
            return
          }

          param.multiLanguageMap = this.messageForm.multiLanguageList.reduce((acc, item) => {
            // 确保 code 不为空且不重复
            if (item.code && !acc[item.code]) {
              // 将 code welcome 作为值添加到结果对象中
              acc[item.code] = item
            }
            return acc
          }, {})
          console.log(JSON.stringify(param), 4)

          updateWelcomeMessage(this.messageForm.id, param).then(response => {
            endLoading()
            if (response.code == 0) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.editMessageVisible = false
              this.getMessageListData()
            } else {
              this.$message.error(response.message)
            }
          }
          ).catch(error => {
            this.$message.error('编辑失败')
          }
          )

        } else {
          endLoading()
          console.log('error submit!!')
          return false
        }
      })
      this.$nextTick(() => {
        this.$refs['messageForm'].clearValidate()
      })
    },
    cancelSubmitMessage() {
      // 清除表单验证状态
      this.$nextTick(() => {
        this.$refs['messageForm'].clearValidate()
      })
      this.editMessageVisible = false
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: rgb(241, 241, 241);
  display: flex
}

.view {
  margin: 20px;
  flex: 1;
  background-color: #fff;
  border-radius: 6px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.title {
  margin: 24px 24px 8px 24px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.9);
}

.changeLanguage {
  margin-left: 24px;
  margin-top: 10px;
}

.el-dialog__wrapper {
  top: -60px; /* 调整这个值来控制向上移动的距离 */
}

.configTable {
  margin-top: 16px;
}
</style>
