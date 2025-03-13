<template>
    <div>
        <div class="flex_row" style="background-color: #FAFAFA; height: 55px; border-bottom: 1px solid #E7E7E7">
            <div class="flex_row" style="flex: 1; align-items: center;">
                <div style="font-size: 14px; margin-left: 16px;">标签名称</div>
            </div>
            <div class="flex_row" style="width: 120px; align-items: center;">
                <div style="width: 1px; height: 25px; background-color: #E7E7E7;"></div>
                <div style="font-size: 14px; margin-left: 16px;">操作</div>
            </div>
        </div>
        <div v-for="label in data"
            style="height: 55px; display: flex; flex-direction: column; justify-content: center; margin-left: 16px;">
            <div style="display: flex; flex-direction: row; margin-bottom: 5px;">
                <div style="flex: 1; font-size: 14px; color: rgba(0, 0, 0, 0.85)">{{ label.name }}</div>
                <div style="display: flex; flex-direction: row; width: 100px;">
                    <el-button type="text" size="mini" @click="() => edit(label)">
                        编辑
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(label)">
                        删除
                    </el-button>
                </div>
            </div>
            <div style="width: 100%; height: 1px; background-color: #E7E7E7;"></div>
        </div>
        <el-dialog :title="'编辑标签'" :visible.sync="editLabelVisible" width="30%" :show-close="false">
            <el-form ref="editLabelForm" :model="editLabelForm" :rules="rules" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input style="margin-bottom: 10px;"
                        v-for="(language, index) in editLabelForm.multiLanguageNameList" :key="language.code"
                        :value="language.name" @input="updateLabelLanguage($event, index)"
                        :placeholder="language.placeholder" /> </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="button-style1" @click="cancelSubmitLevel">取消</el-button>
                <el-button class="button-style2" @click="submitForm('editLabelForm')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :show-close="false" :visible.sync="deleteLabelVisible" style="border-radius: 6px;" width="30%">
            <span style="display: flex; flex-direction: row;">
                <el-image :src="warn" size="mini" style="height: 17px; width: 17px; margin-right: 10px;" />
                <span style="display: flex; flex-direction: column;">
                    <span style="color: #000000; margin-bottom: 15px; font-size: 14px; color: rgba(0, 0, 0, 0.9);">{{
            '删除标签'
        }}</span>
                    <span style="font-size: 12px; color: rgba(0, 0, 0, 0.6); line-height: 20px;">{{
                '删除这个标签后，已上线的标签也会同步删除，请谨慎删除操作。' }}</span>
                </span>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="button-style1" @click="deleteLabelVisible = false">取 消</el-button>
                <el-button class="button-style2" @click="deleteLabel">确认删除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import warn from '@/assets/warn.png'
import { updateIssueCategory, deleteIssueCategory } from '../../../api/issue-category'
import { endLoading, startLoading } from '@/utils/loading'
import { getLocalMultiLanguage, getLanguageContentFromCode } from '@/utils/multiLanguage'

export default {
    props: {
        labelsData: Array,
    },
    watch: {
        labelsData: function (newVal, oldVal) {
            this.data = newVal
        }
    },
    data() {
        return {
            data: this.labelsData,
            editLabelVisible: false,
            editLabelForm: {
                name: '',
                multiLanguageNameList: []
            },
            rules: {
                name: [
                    { required: true, message: '请输入标签名称', trigger: 'blur' },
                ]
            },
            //当前选中的标签
            currentLabel: null,
            warn: warn,
            deleteLabelVisible: false
        }
    },
    methods: {
        updateLabelLanguage(value, index) {
            this.editLabelForm.multiLanguageNameList[index].name = value;
            //把默认语言的name赋值
            this.editLabelForm.name = this.editLabelForm.multiLanguageNameList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
            this.editLabelForm = { ...this.editLabelForm };
        },
        edit(label) {
            // console.log(label)
            // console.log(JSON.stringify(label))
            if (label.multiLanguageMap === undefined || Object.keys(label.multiLanguageMap).length === 0) {
                //兼容之前的数据：将name填写到默认的语言中
                this.editLabelForm.multiLanguageNameList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    if (key === getLocalMultiLanguage().defaultLanguage) {
                        return { name: label.name, placeholder: language[key], code: key };
                    } else {
                        return { name: "", placeholder: language[key], code: key };
                    }
                });

            } else {
                //有多语配置的时候则正常构建数据源
                this.editLabelForm.multiLanguageNameList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    return { name: label.multiLanguageMap[key] === undefined ? "" : label.multiLanguageMap[key], placeholder: language[key], code: key };
                });
            }

            this.editLabelVisible = true
            this.currentLabel = label
            this.editLabelForm.name = label.name
        },
        remove(label) {
            this.currentLabel = label
            this.deleteLabelVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    startLoading()
                    let param = { id: this.currentLabel.id, name: this.editLabelForm.name }
                    param.multiLanguageMap = this.editLabelForm.multiLanguageNameList.reduce((acc, item) => {
                        // 确保 code 不为空且不重复
                        if (item.code && !acc[item.code]) {
                            // 将 code 作为键，name 作为值添加到结果对象中
                            acc[item.code] = item.name;
                        }
                        return acc;
                    }, {});
                    console.log(param)
                    updateIssueCategory(this.currentLabel.id, param).then(response => {
                        endLoading()
                        if (response.code == 0) {
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            })
                            this.editLabelVisible = false
                            this.$emit('refreshData')
                        } else {
                            this.$message.error(response.message);
                        }
                    }
                    ).catch(error => {
                        this.$message.error('编辑失败');
                    }
                    )
                } else {
                    endLoading()
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /**
         * 更新本地数据
         */
        // updateLocalData() {
        //     for (const label of this.data) {
        //         if (label.id === this.currentLabel.id) {
        //             label.name = this.editLabelForm.name
        //             return
        //         }
        //     }
        // },
        cancelSubmitLevel() {
            this.editLabelVisible = false
        },
        deleteLabel() {
            startLoading()
            deleteIssueCategory(this.currentLabel.id).then(response => {
                endLoading()
                if (response.code === 0) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.deleteLabelVisible = false
                    this.deleteLocalData()
                    this.$emit('refreshData')
                } else {
                    this.$message.error(response.message);
                }
            }
            ).catch(error => {
                console.log(error)
                endLoading()
                this.$message.error('删除失败');
            })
        },
        /**
         * 删除本地数据
         */
        deleteLocalData() {
            for (const label of this.data) {
                if (label.id === this.currentLabel.id) {
                    this.data.splice(this.data.indexOf(label), 1)
                    return
                }
            }
        }
    }
}
</script>

<style scoped></style>