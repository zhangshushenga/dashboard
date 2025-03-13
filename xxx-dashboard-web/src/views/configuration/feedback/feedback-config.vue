<template>
    <div class="container">
        <div class="view">
            <div class="title">提交反馈配置</div>
            <el-select class="changeLanguage" v-model="currentLanguage" placeholder="请选择语言"
                @change="changeCurrentLanguage">
                <el-option v-for="item in selectMultiLanguage" :key="item.value" :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-tabs style="padding: 24px;" v-model="activeName" @tab-click="changeTab">
                <el-tab-pane label="配置项" name="configuration">
                    <div class="flex_row " style="justify-content: flex-end; ">
                        <el-button class="button-style2" style="margin-right: 24px;"
                            @click="addConfiguration">新建配置项</el-button>
                    </div>
                    <ConfigTable ref="ConfigTable" class="configTable" @editConfiguration="editConfiguration"
                        :configData="configList" v-loading="loading" />
                    <Drawer v-if="isloadDrawer" ref="Drawer" :configurationData="currentConfigurationData"
                        :tabOptions="labelsList" @closeDrawer="closeDrawer" @finish="refreshConfigData" />
                </el-tab-pane>
                <el-tab-pane label="所属标签" name="Labels">
                    <div class="flex_row " style="justify-content: flex-end; ">
                        <el-button class="button-style2" style="margin-right: 24px;" @click="addLabel">新建标签</el-button>
                    </div>
                    <LabelTable ref="LabelTable" class="configTable" :labelsData="labelsList"
                        @refreshData="getIssueList" v-loading="loading" />
                    <el-dialog :title="'新建标签'" :visible.sync="addLevelVisible" width="30%">
                        <el-form ref="addLevelForm" :model="addLevelForm" :rules="rules" label-width="100px">
                            <el-form-item label="名称" prop="name">
                                <el-input style="margin-bottom: 10px;"
                                    v-for="(language, index) in addLevelForm.multiLanguageNameList" :key="language.code"
                                    :value="language.name" @input="updateLabelLanguage($event, index)"
                                    :placeholder="language.placeholder" /> </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button class="button-style1" @click="cancelSubmitLevel">取消</el-button>
                            <el-button class="button-style2" @click="submitForm('addLevelForm')">确定</el-button>
                        </div>
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { of } from 'rxjs';
import Drawer from './drawer.vue'
import ConfigTable from './configTable.vue'
import LabelTable from './labelsTable.vue'
import { creatIssueCategory, getIssueCategoryList } from '../../../api/issue-category'
import { endLoading, startLoading } from '@/utils/loading'
import { MUITLANGUAGE_NOTIFICATION, getLocalMultiLanguage, getLanguageContentFromCode } from '@/utils/multiLanguage'
import { EventBus } from '@/utils/event-bus';

export default {
    components: {
        Drawer,
        ConfigTable,
        LabelTable
    },
    data() {
        return {
            loading: false,
            activeName: 'configuration',
            //配置项列表
            configList: [],
            //标签列表
            labelsList: [],
            isloadDrawer: false,
            currentConfigurationData: null,
            addLevelVisible: false,
            addLevelForm: {
                name: '',
                multiLanguageNameList: []
            },
            rules: {
                name: [
                    { required: true, message: '请输入标签名称', trigger: 'blur' },
                ]
            },
            //当前语言
            currentLanguage: "",
            //切换多语数据源
            selectMultiLanguage: []
        };
    },
    mounted() {
        this.initLanguageConfig()
        this.getIssueList()
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
                this.getIssueList()
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
         * 初始化新增标签数据源
         */
        initAddLevelForm() {
            this.addLevelForm = {
                name: ''
            }
            this.addLevelForm.multiLanguageNameList = getLanguageContentFromCode().map(language => {
                const key = Object.keys(language)[0];
                return { name: "", placeholder: language[key], code: key };
            });
        },
        /**
         * 切换当前语言
         */
        changeCurrentLanguage() {
            this.getIssueList()
        },
        updateLabelLanguage(value, index) {
            this.addLevelForm.multiLanguageNameList[index].name = value;
            //把默认语言的name赋值
            this.addLevelForm.name = this.addLevelForm.multiLanguageNameList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
            this.addLevelForm = { ...this.addLevelForm };
        },
        /**
         * 获取反馈配置项列表
         */
        getIssueList() {
            this.loading = true
            const param = {
                'languageCode': this.currentLanguage
            }
            console.log(param)
            getIssueCategoryList(param).then(response => {
                this.loading = false
                console.log(response)
                if (response.code == 0) {
                    this.handleIssueList(response.data)
                }
            }).catch(error => {
                this.loading = false
            }
            )
        },
        /**
         * 处理列表数据
         * @param {*} listData 反馈列表数据
         */
        handleIssueList(listData) {
            //标签列表
            this.labelsList = listData
            this.configList = []
            //配置项列表
            for (const labelData of listData) {
                let config = labelData.sub
                if (config.length != 0) {
                    this.configList.push.apply(this.configList, config)
                }
            }
        },
        changeTab(tab, event) {
            console.log(tab, event);
        },
        loadDrawer() {
            this.isloadDrawer = true
            this.$nextTick(() => {
                this.$refs.Drawer.open()
            })
        },
        closeDrawer() {
            this.isloadDrawer = false
        },
        addConfiguration() {
            this.currentConfigurationData = null
            this.loadDrawer()
        },
        editConfiguration(data) {
            this.currentConfigurationData = data
            this.loadDrawer()
        },
        refreshConfigData() {
            this.getIssueList()
        },
        addLabel() {
            this.initAddLevelForm()
            this.addLevelVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    startLoading()
                    console.log(this.addLevelForm)
                    const param = {
                        name: this.addLevelForm.name
                    }
                    param.multiLanguageMap = this.addLevelForm.multiLanguageNameList.reduce((acc, item) => {
                        // 确保 code 不为空且不重复
                        if (item.code && !acc[item.code]) {
                            // 将 code 作为键，name 作为值添加到结果对象中
                            acc[item.code] = item.name;
                        }
                        return acc;
                    }, {});
                    console.log(param)
                    creatIssueCategory(param).then(response => {
                        endLoading()
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        this.addLevelVisible = false
                        this.getIssueList()
                    }).catch(error => {
                        endLoading()
                        console.log(error)
                    }
                    )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelSubmitLevel() {
            this.initAddLevelForm()
            this.addLevelVisible = false
        }
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