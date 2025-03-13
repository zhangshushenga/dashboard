<template>
    <div class="custom-tree-container">
        <div class="flex_row" style="background-color: #FAFAFA; height: 55px; border-bottom: 1px solid #E7E7E7">
            <div style="width: 24px;"></div>
            <div class="flex_row" style="flex: 1; align-items: center;">
                <div style="width: 1px; height: 25px; background-color: #E7E7E7;"></div>
                <div style="font-size: 14px; margin-left: 16px;">配置名称</div>
            </div>
            <div class="flex_row" style="width: 120px; align-items: center;">
                <div style="width: 1px; height: 25px; background-color: #E7E7E7;"></div>
                <div style="font-size: 14px; margin-left: 16px;">操作</div>
            </div>
        </div>
        <el-tree :data="data" node-key="id" :expand-on-click-node="false" draggable :allow-drop="allowDrop"
            :props="{ label: 'name', children: 'sub' }" @node-drop="handleDrop">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="node.level === 1">
                    <el-button type="text" size="mini" @click="() => edit(data)">
                        编辑
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">
                        删除
                    </el-button>
                </span>
            </span>
        </el-tree>
        <el-dialog :show-close="false" :visible.sync="deleteDialogVisible" style="border-radius: 6px;" width="30%">
            <span style="display: flex; flex-direction: row;">
                <el-image :src="warn" size="mini" fit='scale-down'
                    style="height: 30px; width: 30px; margin-right: 10px; margin-top: -8px;" />
                <span style="display: flex; flex-direction: column;">
                    <span style="color: #000000; margin-bottom: 15px; font-size: 14px;">删除配置项</span>
                    <span
                        style="font-size: 12px; line-height: 25px;">删除这个配置项后，包含的二级、三级配置项也会全部删除，已上线的配置项也会同步删除，请谨慎删除操作。</span>
                </span>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="button-style1" @click="cancelDelete">取消</el-button>
                <el-button class="button-style2" type="primary" @click="deleteLevel">确认删除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import warn from '@/assets/warn.png'
import { deleteIssueCategory, sortIssueCategory } from '../../../api/issue-category'
import { endLoading, startLoading } from '@/utils/loading'

export default {
    props: {
        configData: Array,
    },
    watch: {
        configData: function (newVal, oldVal) {
            console.log(newVal)
            this.data = newVal
        }
    },
    data() {
        return {
            data: [],
            deleteDialogVisible: false,
            warn: warn,
            //当前选中的节点
            currentSelectedNode: null
        }
    },
    methods: {
        edit(data) {
            this.$emit('editConfiguration', data)
        },

        remove(node, data) {
            this.deleteDialogVisible = true
            this.currentSelectedNode = data
        },
        allowDrop(draggingNode, dropNode, type) {
            return draggingNode.parent.id === dropNode.parent.id && type != 'inner'
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('handleDrop')
            let sortData
            for (const config of this.data) {
                if (config.id === draggingNode.data.id) {
                    sortData = this.data
                    break
                } else {
                    for (const secondConfig of config.sub) {
                        if (secondConfig.id === draggingNode.data.id) {
                            sortData = config.sub
                            break
                        } else {
                            for (const thirdConfig of secondConfig.sub) {
                                if (thirdConfig.id === draggingNode.data.id) {
                                    sortData = secondConfig.sub
                                    break
                                }
                            }
                        }
                    }
                }
            }
            console.log(sortData)
            let resultList = []
            for (const result of sortData) {
                resultList.push({id: result.id})
            }
            console.log(resultList)
            sortIssueCategory(resultList).then(response => {
                console.log(response)
            }
            ).catch(error => {
                console.log(error)
            }
            )
        },
        cancelDelete() {
            this.deleteDialogVisible = false
        },
        deleteLevel() {
            startLoading()
            deleteIssueCategory(this.currentSelectedNode.id).then(response => {
                endLoading()
                if (response.code === 0) {
                    this.deleteDialogVisible = false
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.data.splice(this.data.indexOf(this.currentSelectedNode), 1)
                } else {
                    this.$message.error(response.message);
                }
            }
            ).catch(error => {
                endLoading()
                this.$message.error('删除失败');
            }
            )
        }
    }
}
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 40px;
    border-bottom: 1px solid #E7E7E7;
}
</style>

<style>
/* 自定义树形节点高度 */
.el-tree-node__content {
    height: 50px;
    line-height: 50px;
}

.el-tree-node__icon {
    height: 50px;
    font-size: 24px;
    line-height: 50px;
}
</style>