<template>
    <div class="container">
        <div class="view">
            <div class="title">热门问题配置</div>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <el-select class="changeLanguage" v-model="currentLanguage" placeholder="请选择语言"
                    @change="changeCurrentLanguage">
                    <el-option v-for="item in selectMultiLanguage" :key="item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="button-style2" style="margin-right: 24px;" @click="addHotQuestion">新建热门问题</el-button>
            </div>
            <el-table :data="hotQuestionList"
                :header-cell-style="{ 'color': '#000000', 'text-align': 'left', 'background-color': '#FAFAFA' }"
                :pagination-layout="'prev, pager, next'" row-key="id" style="margin: 20px; width: 95%;">
                <el-table-column label="热门问题" min-width="70%">
                    <template slot-scope="scope">
                        {{ scope.row.question }}
                    </template>
                </el-table-column>
                <el-table-column label="cahtbot 问题" min-width="10%">
                    <template slot-scope="scope">
                        <span>{{ scope.row.brandType === 3 ? '是' : '否' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="isAdd === true ? '创建热门问题' : '编辑热门问题'" :visible.sync="editQuestionVisible" width="30%"
                :show-close="false">
                
                <el-form ref="hotQuestionForm" :model="hotQuestionForm" :rules="rules" label-width="100px">
                    <el-form-item label="Chatbot 问题" prop="brandType">
                        <el-radio-group v-model="isChatbotQuestion" @change="toggleAnswerField">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="问题名称" prop="question">
                        <el-input v-for="(language, index) in hotQuestionForm.multiLanguageQuestionList"
                            :key="language.code" style="margin-bottom: 10px;" v-model="language.name"
                            @input="updateQuestion($event, index)" :placeholder="language.placeholder" />
                    </el-form-item>
                    <el-form-item v-if="!isChatbotQuestion"  label="问题答案" prop="answer">
                        <el-input v-for="(language, index) in hotQuestionForm.multiLanguageAnswerList"
                            :key="language.code" style="margin-bottom: 10px;" v-model="language.name"
                            @input="updateAnswer($event, index)" :placeholder="language.placeholder" />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="button-style1" @click="cancelSubmitQuestion">取消</el-button>
                    <el-button class="button-style2" @click="submitForm('hotQuestionForm')">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog :show-close="false" :visible.sync="deleteQuestionVisible" style="border-radius: 6px;"
                width="30%">
                <span style="display: flex; flex-direction: row;">
                    <span style="display: flex; flex-direction: column;">
                        <span
                            style="color: #000000; margin-bottom: 15px; font-size: 14px; color: rgba(0, 0, 0, 0.9);">{{
                    '删除热门问题'
                }}</span>
                        <span style="font-size: 12px; color: rgba(0, 0, 0, 0.6); line-height: 20px;">{{
                        '请谨慎删除操作。' }}</span>
                    </span>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button class="button-style1" @click="deleteQuestionVisible = false">取 消</el-button>
                    <el-button class="button-style2" @click="deleteQuestion">确认删除</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { endLoading, startLoading } from '@/utils/loading'
import { MUITLANGUAGE_NOTIFICATION, getLocalMultiLanguage, getLanguageContentFromCode } from '@/utils/multiLanguage'
import { getHotQuestionList, createHotQuestion, updateHotQuestion, deleteHotQuestion } from '@/api/intelligentQA'
import { EventBus } from '@/utils/event-bus';
import es from '@/lang/es';

export default {
    components: {

    },
    data() {
        return {
            //热门问题列表
            hotQuestionList: [],

            //新增还是编辑
            isAdd: true,

            //编辑弹窗
            editQuestionVisible: false,

            //删除弹窗
            deleteQuestionVisible: false,

            //配置项数据源
            hotQuestionForm: {
                question: '',
                answer: '',
                multiLanguageQuestionList: [],
                multiLanguageAnswerList: []
            },

            //当前删除问题id
            deleteQuestionId: 0,

            rules: {
                question: [
                    { required: true, message: '请输入问题名称', trigger: 'blur' },
                ],
                answer: [
                    { required: true, message: '请输入问题答案', trigger: 'blur' },
                ]
            },
            //当前语言
            currentLanguage: "",
            //切换多语数据源
            selectMultiLanguage: [],
            isChatbotQuestion: false // 默认为否
        };
    },
    mounted() {
        this.initLanguageConfig()
        this.getHotQuestionListData()
    },
    beforeDestroy() {
        // 在组件销毁之前解除事件监听，以防内存泄漏
        EventBus.$off(MUITLANGUAGE_NOTIFICATION, this.handleNotification);
    },
    created() {
        EventBus.$on(MUITLANGUAGE_NOTIFICATION, this.handleNotification);
    },

    methods: {
        handleNotification(data) {
            if (this.currentLanguage === "" || this.currentLanguage === undefined) {
                this.initLanguageConfig()
                this.getHotQuestionListData()
            }
        },
        /**
         *  初始化多语配置
         */
        initLanguageConfig() {
            this.currentLanguage = getLocalMultiLanguage().defaultLanguage
            this.selectMultiLanguage = getLanguageContentFromCode().map(language => {
                const key = Object.keys(language)[0];
                return { label: language[key], value: key };
            });
        },
        /**
        * 切换当前语言
        */
        changeCurrentLanguage() {
            this.getHotQuestionListData()
        },
        /**
         *获取热门问题列表 
         */
        async getHotQuestionListData() {
            startLoading()

            const param = {
                languageCode: this.currentLanguage
            }
            console.log(param)

            const response = await getHotQuestionList(param)

            if (response.code !== undefined && response.code === 0 && response.data != undefined) {
                this.hotQuestionList = response.data
            }

            endLoading()
        },
        /**
         * 初始化新增问题数据源
         */
        initAddQuestionForm() {
            this.hotQuestionForm.question = ''
            this.hotQuestionForm.answer = ''
            this.hotQuestionForm.multiLanguageQuestionList = getLanguageContentFromCode().map(language => {
                const key = Object.keys(language)[0];
                return { name: "", placeholder: language[key], code: key };
            });

            this.hotQuestionForm.multiLanguageAnswerList = getLanguageContentFromCode().map(language => {
                const key = Object.keys(language)[0];
                return { name: "", placeholder: language[key], code: key };
            });
        },
        /**
         * 初始化编辑问题数据源
         * hotQuestion
         */
        initEditQuestionForm(hotQuestion) {
            this.hotQuestionForm.id = hotQuestion.id

            if (hotQuestion.multiLanguageMap === undefined || Object.keys(hotQuestion.multiLanguageMap).length === 0) {
                //兼容之前的数据：将name填写到默认的语言中
                this.hotQuestionForm.multiLanguageQuestionList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    if (key === getLocalMultiLanguage().defaultLanguage) {
                        return { name: hotQuestion.question, placeholder: language[key], code: key };
                    } else {
                        return { name: "", placeholder: language[key], code: key };
                    }
                });

                this.hotQuestionForm.multiLanguageAnswerList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    if (key === getLocalMultiLanguage().defaultLanguage) {
                        return { name: hotQuestion.answer, placeholder: language[key], code: key };
                    } else {
                        return { name: "", placeholder: language[key], code: key };
                    }
                });

                this.hotQuestionForm.question = hotQuestion.question
                this.hotQuestionForm.answer = hotQuestion.answer

            } else {
                //有多语配置的时候则正常构建数据源
                this.hotQuestionForm.multiLanguageQuestionList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    return { name: hotQuestion.multiLanguageMap[key] === undefined ? "" : hotQuestion.multiLanguageMap[key].question, placeholder: language[key], code: key };
                });

                this.hotQuestionForm.multiLanguageAnswerList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    return { name: hotQuestion.multiLanguageMap[key] === undefined ? "" : hotQuestion.multiLanguageMap[key].answer, placeholder: language[key], code: key };
                });

                this.hotQuestionForm.question = this.hotQuestionForm.multiLanguageQuestionList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
                this.hotQuestionForm.answer = this.hotQuestionForm.multiLanguageAnswerList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
            }

            console.log(JSON.stringify(this.hotQuestionForm))

        },
        /**
         * 编辑问题
         * @param {*} hotQuestion 
         */
        edit(hotQuestion) {
            this.isAdd = false
            this.editQuestionVisible = true
            console.info(hotQuestion,3)
            if(hotQuestion.brandType == 3){
                this.isChatbotQuestion = true
            }else{
                this.isChatbotQuestion = false
            }
            this.initEditQuestionForm(hotQuestion)
        },
        /**
         * 删除问题
         * @param {*} hotQuestion 
         */
        remove(hotQuestion) {
            this.deleteQuestionVisible = true
            this.deleteQuestionId = hotQuestion.id
        },
        /**
         * 新增热门问题
         */
        addHotQuestion() {
            this.isAdd = true
            this.editQuestionVisible = true
            this.initAddQuestionForm()
        },
        /**
         * 将问题和答案更新到name上
         * @param {*} value 
         * @param {*} index 
         */
        updateQuestion(value, index) {
            //把默认语言的name赋值
            this.hotQuestionForm.question = this.hotQuestionForm.multiLanguageQuestionList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
        },
        updateAnswer(value, index) {
            this.hotQuestionForm.answer = this.hotQuestionForm.multiLanguageAnswerList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    startLoading()

                   
                    let param = {
                        question: this.hotQuestionForm.question
                    }
                    if(this.isChatbotQuestion){
                        param.brandType = 3
                    }else{
                        param.brandType = 0
                        param.answer = this.hotQuestionForm.answer

                    }

                    if (this.isAdd) {

                        param.multiLanguageMap = this.hotQuestionForm.multiLanguageQuestionList.reduce((acc, cur) => {
                            const correspondingAnswer = this.hotQuestionForm.multiLanguageAnswerList.find(item => item.code === cur.code);
                            if (correspondingAnswer) {
                                if(!this.isChatbotQuestion){
                                    acc[cur.code] = { question: cur.name, answer: correspondingAnswer.name };
                                }else{
                                    acc[cur.code] = { question: cur.name};
                                }
                            }
                            return acc;
                        }, {});

                        console.log(JSON.stringify(param))

                        createHotQuestion(param).then(response => {
                            endLoading()
                            if (response.code == 0) {
                                this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                })
                                this.editQuestionVisible = false
                                this.getHotQuestionListData()
                            } else {
                                this.$message.error(response.message);
                            }
                        }
                        ).catch(error => {
                            this.$message.error('创建失败');
                        }
                        )
                    } else {
                        param.multiLanguageMap = this.hotQuestionForm.multiLanguageQuestionList.reduce((acc, cur) => {
                            const correspondingAnswer = this.hotQuestionForm.multiLanguageAnswerList.find(item => item.code === cur.code);
                            if (correspondingAnswer) {
                                if(!this.isChatbotQuestion){
                                    acc[cur.code] = { question: cur.name, answer: correspondingAnswer.name };
                                }else{
                                    acc[cur.code] = { question: cur.name};
                                }
                            }
                            return acc;
                        }, {});

                        console.log(JSON.stringify(param))

                        updateHotQuestion(this.hotQuestionForm.id, param).then(response => {
                            endLoading()
                            if (response.code == 0) {
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success'
                                })
                                this.editQuestionVisible = false
                                this.getHotQuestionListData()
                            } else {
                                this.$message.error(response.message);
                            }
                        }
                        ).catch(error => {
                            this.$message.error('编辑失败');
                        }
                        )
                    }
                } else {
                    endLoading()
                    console.log('error submit!!');
                    return false;
                }
            });
            this.isChatbotQuestion = false
        },
        deleteQuestion() {
            startLoading()
            deleteHotQuestion(this.deleteQuestionId).then(response => {
                endLoading()
                if (response.code == 0) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.deleteQuestionVisible = false
                    this.getHotQuestionListData()
                } else {
                    this.$message.error(response.message);
                }
            }
            ).catch(error => {
                endLoading()
                this.$message.error('创建失败');
            }
            )
        },
        cancelSubmitQuestion() {
            this.editQuestionVisible = false
        },
    }
};
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

.configTable {
    margin-top: 16px;
}
</style>