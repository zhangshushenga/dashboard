<template>
    <el-drawer :visible.sync="isShowDrawer" :with-header="false" :size="drawderWidth" @closed="closed"
        v-loading="loading">
        <div style="display: flex; height: 100vh; flex-direction: column;  overflow: hidden;">
            <div class="flex_row" style="justify-content: space-between; margin: 16px 24px 16px 24px;">
                <div class="drawTitle">{{ configurationData === null ? '新建配置项' : '编辑配置项' }}</div>
                <img width="12px" height="12px" src="../../../assets/draw_close.png" @click="close" />
            </div>
            <el-divider></el-divider>
            <div class="flex_row" style="width: 100%; flex: 1; overflow: auto;">
                <div class="flex_column" style="padding-left: 32px; flex: 1;">
                    <div class="flex_row" style="margin-bottom: 8px;">
                        <div class="configTitle">一级配置项</div>
                        <div class="requiredMark">*</div>
                    </div>
                    <div class="flex_row" v-for="(language, index) in firstLevel.multiLanguageNameList"
                        :key="language.code">
                        <el-input style="margin-bottom: 15px; width: 85%;" v-model="language.name"
                            :placeholder="language.placeholder" @input="updateFirstLevelLanguage($event, index)" />
                        <img v-if="index === 0" width="32px" height="32px" src="../../../assets/add_serviceType.png"
                            style="margin-right: 32px; margin-left: 8px;" @click="addSecondLevel" />
                    </div>
                    <div class="flex_row" style="margin-bottom: 8px;">
                        <div class="configTitle">产品型号</div>
                        <div class="requiredMark">*</div>
                    </div>
                    <el-input v-model="firstLevel.deviceModel" placeholder="请输入内容"
                        style="margin-bottom: 24px; padding-right: 72px;"></el-input>
                    <div class="flex_row" style="margin-bottom: 8px;">
                        <div class="configTitle">所属标签</div>
                        <div class="requiredMark">*</div>
                    </div>
                    <el-select v-model="firstLevel.parentId" placeholder="请选择标签" style="margin-right: 72px;">
                        <el-option v-for="item in tabOptions" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="isShowSecondLevel" style="flex: 1;">
                    <div class="flex_row" style="margin-bottom: 8px;">
                        <div class="configTitle">二级配置项</div>
                        <div class="requiredMark">*</div>
                    </div>
                    <div v-for="(item, secondLevelIndex) in secondAndThirdLevel"
                        :key="item.id">
                        <div class="flex_row" v-for="(language, secondLanguageIndex) in item.multiLanguageNameList"
                            :key="language.code">
                            <el-popover v-if="secondLanguageIndex === 0" placement="bottom" width="350" trigger="manual"
                                v-model="item.isShowPopover">
                                <img slot="reference" width="8px" height="8px" class="deleteLevel"
                                    src="../../../assets/draw_close.png" @click="deleteSecondLevelPopover(item)" />
                                <div>
                                    <div class="flex_row" style="margin: 10px;">
                                        <img width="17px" height="17px" src="../../../assets/warn.png"
                                            style="margin-right: 9px;" />
                                        <div style="font-size: 16px; color: rgba(0, 0, 0); margin-top: -3px;">温馨提示</div>
                                    </div>
                                    <div
                                        style="color: rgba(0, 0, 0, 0.6); font-size: 12px; margin-left: 44px; margin-right: 16px;">
                                        删除这个配置项后，包含的三级配置项也会全部删除，请谨慎删除操作。</div>
                                    <div class="flex_row" style="justify-content: end;">
                                        <el-button size="small" class="button-style1"
                                            @click="cancelDeleteSecondLevel(item)">取消</el-button>
                                        <el-button size="small" class="button-style2"
                                            @click="deleteSecondLevel(item)">确认</el-button>
                                    </div>
                                </div>
                            </el-popover>
                            <el-input
                                :style="{ 'margin-left': secondLanguageIndex !== 0 ? '20px' : '0', 'width': '75%', 'height': '52px'}"
                                :placeholder="language.placeholder" v-model="language.name"
                                @input="updateSecondLevelLanguage(secondLevelIndex)" />
                            <img v-if="secondLanguageIndex === 0" width="32px" height="32px"
                                src="../../../assets/add_serviceType.png" style="margin-right: 32px; margin-left: 8px;"
                                @click="addThirdLevel(item)" />
                        </div>
                        <div v-for="(index) in item.sub.length - 1 > 0 ? item.sub.length - 1 : 0" :key="index"
                            :style="{ width: '100%', height: `${52 * (getNumOfLanguages())}px`}">
                        </div>
                    </div>
                </div>
                <div v-if="isShowThirdLevel" style="flex: 1;">
                    <div class="flex_row" style="margin-bottom: 8px;">
                        <div class="configTitle">三级配置项</div>
                        <div class="requiredMark">*</div>
                    </div>
                    <div v-for="(secondLevel, secondLevelIndex) in secondAndThirdLevel" :key="secondLevel.id"
                        style="margin-right: 32px;">
                        <div v-if="secondLevel.sub.length === 0" :style="{ width: '100%', height: `${52 * (getNumOfLanguages())}px`}"></div>
                        <div v-for="(thridLevel, thirdLanguageIndex) in secondLevel.sub" :key="thridLevel.id">
                            <div v-for="(language, languageIndex) in thridLevel.multiLanguageNameList"
                                :key="language.code" class="flex_row">
                                <img v-if="languageIndex === 0" width="8px" height="8px" class="deleteLevel"
                                    src="../../../assets/draw_close.png"
                                    @click="deleteThridLevel(secondLevel, thridLevel)" />
                                <el-input
                                    :style="{ 'margin-left': languageIndex !== 0 ? '20px' : '0', 'width': '75%', 'height': '52px'}"
                                    :placeholder="language.placeholder" v-model="language.name"
                                    @input="updateThirdLevelLanguage(secondLevelIndex, thirdLanguageIndex)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 1px; background-color: #E7E7E7;">
            </div>
            <div class="flex_row" style="justify-content: end; margin: 12px 24px 12px 24px;">
                <el-button class="button-style1" @click="close">取消</el-button>
                <el-button class="button-style4" :disabled='!isCreatable' @click="finish">{{ configurationData === null
        ? '确认创建' : '确认' }}</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script>

import { batchUpdateIssueCategories } from '../../../api/issue-category'
import { getLocalMultiLanguage, getLanguageContentFromCode } from '@/utils/multiLanguage'

export default {

    props: {
        //当前一级分类数据（空：新增  非空：编辑）
        /**
         * deviceModel: 设备model
         * id
         * name
         * parentId: 所属父id
         * sub[]: 子分类集合，集合中还是这个结构
         */
        configurationData: Object,

        //标签集合
        tabOptions: Array
    },
    data() {
        return {
            loading: false,
            isShowDrawer: false,
            //一级配置项数据
            firstLevel: {
                name: '',//内容
                deviceModel: '',//型号
                parentId: '',//标签id
                multiLanguageNameList: [] //多语配置
            },
            //二级/三极标签集
            /**
             * [{name: '', isShowPopover: false, sub: [{name: ''}]}]
             */
            secondAndThirdLevel: [],

            /**
             * 记录删除项的id
             */
            deleteIdList: []
        };
    },
    mounted() {
        if (this.configurationData != null) {
            this.handleUpdateData()
        } else {
            this.handleAddData()
        }
    },
    methods: {
        getRandomColor() {
            // 生成随机颜色的方法
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        },
        getNumOfLanguages() {
            return getLanguageContentFromCode().length
        },
        //返回根据平台多语配置返回数据源
        getOriginLanguageSource() {
            return getLanguageContentFromCode().map(language => {
                const key = Object.keys(language)[0];
                return { name: "", placeholder: language[key], code: key };
            });
        },
        //整合新增数据
        handleAddData() {
            this.firstLevel.multiLanguageNameList = this.getOriginLanguageSource()
        },
        //更新一级分类多语配置
        updateFirstLevelLanguage(value, index) {
            //把默认语言的name赋值
            this.firstLevel.name = this.firstLevel.multiLanguageNameList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
        },
        //更新二级分类多语配置
        updateSecondLevelLanguage(secondLevelIndex) {
            let secondLevel = this.secondAndThirdLevel[secondLevelIndex]
            secondLevel.name = secondLevel.multiLanguageNameList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
        },
        updateThirdLevelLanguage(secondLevelIndex, thirdLevelIndex) {
            let secondLevel = this.secondAndThirdLevel[secondLevelIndex]
            let thirdLevel = secondLevel.sub[thirdLevelIndex]
            thirdLevel.name = thirdLevel.multiLanguageNameList.find(item => item.code === getLocalMultiLanguage().defaultLanguage).name
        },
        //整合编辑数据
        handleUpdateData() {
            // 一级配置项
            this.firstLevel.name = this.configurationData.name
            this.firstLevel.id = this.configurationData.id
            this.firstLevel.parentId = this.configurationData.parentId
            this.firstLevel.deviceModel = this.configurationData.deviceModel

            if (this.configurationData.multiLanguageMap === undefined || Object.keys(this.configurationData.multiLanguageMap).length === 0) {
                //兼容之前的数据：将name填写到默认的语言中
                this.firstLevel.multiLanguageNameList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    if (key === getLocalMultiLanguage().defaultLanguage) {
                        return { name: this.configurationData.name, placeholder: language[key], code: key };
                    } else {
                        return { name: "", placeholder: language[key], code: key };
                    }
                });

            } else {
                //有多语配置的时候则正常构建数据源
                this.firstLevel.multiLanguageNameList = getLanguageContentFromCode().map(language => {
                    const key = Object.keys(language)[0];
                    return { name: this.configurationData.multiLanguageMap[key] === undefined ? "" : this.configurationData.multiLanguageMap[key], placeholder: language[key], code: key };
                });
            }

            //二三级配置项
            this.secondAndThirdLevel = this.mapAndAddFieldsToList(this.configurationData.sub)
            console.log(this.secondAndThirdLevel)
        },
        mapAndAddFieldsToList(list) {
            // 深拷贝输入列表，以免改变原始数据
            const clonedList = JSON.parse(JSON.stringify(list));

            function mapMultiLanguageMap(obj) {
                if (!obj.multiLanguageMap || Object.keys(obj.multiLanguageMap).length === 0) {
                    obj.multiLanguageNameList = getLanguageContentFromCode().map(language => {
                        const key = Object.keys(language)[0];
                        if (key === getLocalMultiLanguage().defaultLanguage) {
                            return { name: obj.name, placeholder: language[key], code: key };
                        } else {
                            return { name: "", placeholder: language[key], code: key };
                        }
                    });
                } else {
                    obj.multiLanguageNameList = getLanguageContentFromCode().map(language => {
                        const key = Object.keys(language)[0];
                        return { name: obj.multiLanguageMap[key] === undefined ? "" : obj.multiLanguageMap[key], placeholder: language[key], code: key };
                    });
                }
                delete obj.multiLanguageMap;
            }

            function mapList(list) {
                for (const item of list) {
                    mapMultiLanguageMap(item);
                    if (item.sub && item.sub.length > 0) {
                        mapList(item.sub);
                    }
                }
            }

            mapList(clonedList);

            // 为最外层对象添加 isShowPopover 字段
            for (const item of clonedList) {
                item.isShowPopover = false;
            }

            return clonedList;
        },
        //关闭抽屉
        close() {
            this.isShowDrawer = false
        },
        //Drawer 关闭动画结束时的回调
        closed() {
            this.$emit('closeDrawer', false)
        },
        open() {
            this.isShowDrawer = true
        },
        addSecondLevel() {
            let secondLevel = {
                name: '',
                isShowPopover: false,
                sub: []
            }
            secondLevel.multiLanguageNameList = this.getOriginLanguageSource()
            this.secondAndThirdLevel.push(secondLevel)
        },
        /**
         * 删除二级分类弹框操作
         * @param {*} item 
         */
        deleteSecondLevelPopover(item) {
            for (const secondLevel of this.secondAndThirdLevel) {
                secondLevel.isShowPopover = false
            }
            item.isShowPopover = true
        },
        /**
         * 取消删除二级分类
         * @param {*} item 
         */
        cancelDeleteSecondLevel(item) {
            item.isShowPopover = false
        },
        /**
         * 删除二级标签
         * @param {*} item 二级标签
         */
        deleteSecondLevel(item) {
            this.secondAndThirdLevel.splice(this.secondAndThirdLevel.indexOf(item), 1)
            if (item.id != null) {
                this.deleteIdList.push(item.id)
            }
        },
        /**
         * 添加三极标签
         * @param {*} secondLevel 对应的二级标签
         */
        addThirdLevel(secondLevel) {
            let thirdLevel = {
                name: '',
            }
            thirdLevel.multiLanguageNameList = this.getOriginLanguageSource()

            let sub = secondLevel.sub
            if (sub === undefined || sub === null) {
                secondLevel.sub = [thirdLevel]
            } else {
                secondLevel.sub.push(thirdLevel)
            }
        },
        /**
         * 删除三极标签
         * @param {*} secondLevel 所属二级标签
         * @param {*} thridLevel 
         */
        deleteThridLevel(secondLevel, thridLevel) {
            let sub = secondLevel.sub
            sub.splice(sub.indexOf(thridLevel), 1)
            if (thridLevel.id != null) {
                this.deleteIdList.push(thridLevel.id)
            }
        },
        /**
         * 新增/编辑完成
         */
        finish() {
            this.loading = true
            let data = Object.assign({}, this.firstLevel)
            data.sub = JSON.parse(JSON.stringify(this.secondAndThirdLevel))

            //新增
            if (this.configurationData == null) {

                let param = {
                    updateList: [this.convertMultiLanguageListToMap(data)]
                }

                console.log(param)

                batchUpdateIssueCategories(param).then(respose => {
                    this.loading = false
                    if (respose.code === 0) {
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        })
                        this.$emit('finish')
                        this.close()
                    } else {

                    }
                    console.log(respose)
                }).catch(error => {
                    this.loading = false
                    console.log(error)
                })
            } else {
                //编辑
                let param = {
                    updateList: [this.convertMultiLanguageListToMap(data)],
                    deleteIdList: this.deleteIdList
                }

                console.log(param)

                batchUpdateIssueCategories(param).then(respose => {
                    this.loading = false
                    if (respose.code === 0) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.$emit('finish')
                        this.close()
                    } else {

                    }
                    console.log(respose)
                }).catch(error => {
                    this.loading = false
                    console.log(error)
                })
            }
        },
        convertMultiLanguageListToMap(obj) {
            // 如果对象为空或不是对象，则直接返回
            if (typeof obj !== 'object' || obj === null) {
                return obj;
            }

            // 如果对象是数组，则遍历数组中的每个元素并递归调用该函数
            if (Array.isArray(obj)) {
                return obj.map(item => this.convertMultiLanguageListToMap(item));
            }

            // 否则，遍历对象的每个属性
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // 如果属性值是multiLanguageNameList，则转换为map形式
                    if (key === 'multiLanguageNameList') {
                        obj['multiLanguageMap'] = obj[key].reduce((map, lang) => {
                            map[lang.code] = lang.name;
                            return map;
                        }, {});
                        delete obj[key]; // 删除原始属性
                    } else {
                        // 否则，递归调用该函数处理该属性值
                        obj[key] = this.convertMultiLanguageListToMap(obj[key]);
                    }
                }
            }

            return obj;
        }

    },
    computed: {
        drawderWidth() {
            if (this.secondAndThirdLevel.length === 0) {
                return '20%'
            } else {
                for (const secondLevel of this.secondAndThirdLevel) {
                    if (secondLevel.sub.length != 0) {
                        return '60%'
                    }
                }
            }
            return '40%'
        },
        isShowSecondLevel() {
            if (this.drawderWidth === '20%') {
                return false
            } else {
                return true
            }
        },
        isShowThirdLevel() {
            if (this.drawderWidth === '60%') {
                return true
            } else {
                return false
            }
        },
        //是否可以创建
        isCreatable() {
            if (this.firstLevel.name === '' || this.firstLevel.deviceModel === '' || this.firstLevel.parentId === '') {
                return false
            }

            for (const secondLevel of this.secondAndThirdLevel) {
                if (secondLevel.name === '') {
                    return false
                }
                for (const thridLevel of secondLevel.sub) {
                    if (thridLevel.name === '') {
                        return false
                    }
                }
            }
            return true
        }
    }
};
</script>
<style scoped>
.drawTitle {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
}

.configTitle {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
}

.requiredMark {
    font-size: 20px;
    color: #D54941;
    margin-left: 3px;
}

.deleteLevel {
    margin-top: 15px;
    margin-right: 12px;
}
</style>