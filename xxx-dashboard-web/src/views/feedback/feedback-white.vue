<template>
  <div class="container">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">feedback白名单</div>
    <div style="display: flex; flex-direction: row; margin-bottom: 20px;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 7">
        <el-input v-model="queryRegular" style="width: 30%;margin-left: 20px;" placeholder="请输入邮箱/域名进行搜索" />
      </div>
      <div style="display: flex; flex-direction: row; flex: 1">
        <el-button class="button-style4" @click="queryAction">查询</el-button>
        <el-button class="button-style4" @click="createOneClass">新增</el-button>
        <el-button class="button-style1" @click="resetAction">重置</el-button>
      </div>
    </div>
    <el-table :data="currentData" border style="margin: 10px;">
      <el-table-column label="id" prop="id" />
      <el-table-column label="邮箱/域名" prop="regular" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="创建用户" prop="createUserName" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="remove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="currentData.length != 0"
      :current-page.sync="currentPage"
      :page-size="currentPageSize"
      :total="totalData"
      background
      layout="total,sizes,prev,pager,next,jumper"
      style="margin: 20px"
      class="custom-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :show-close="false" :visible.sync="deleteDialogVisible" style="border-radius: 6px;" width="30%">
      <span style="display: flex; flex-direction: row;">
        <el-image :src="warn" size="mini" fit='scale-down' style="height: 30px; width: 30px; margin-right: 10px; margin-top: -8px;" />
        <span style="display: flex; flex-direction: column;">
          <span style="color: #000000; margin-bottom: 15px; font-size: 14px;">删除反馈白名单</span>
          <span style="font-size: 12px; line-height: 25px;">确定删除该白名单？请谨慎删除操作。</span>
        </span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button class="button-style1" @click="cancelDelete">取消</el-button>
        <el-button class="button-style2" type="primary" @click="deleted">确认删除</el-button>
      </span>
    </el-dialog>
    <el-dialog :show-close="false" :title="创建反馈白名单" :visible.sync="dialogOneClassCreateVisible" width="40%">
      <div style=" width: 90%;">
        <el-form ref="form" :model="form">
          <el-form-item
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '规则不能为空', trigger: 'blur' }]"
            label="规则"
            prop="regular"
          >
            <el-input v-model="form.regular" placeholder="请输入规则邮箱或者域名" />
          </el-form-item>
          <el-form-item
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '规则类型不可为空', trigger: 'blur' }]"
            label="规则类型"
            prop="type"
          >
            <el-radio-group v-model="form.type">
              <el-radio :label="0">邮箱</el-radio>
              <el-radio :label="1">域名</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOneClassCreateVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAdd( 'form')">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { endLoading, startLoading } from '@/utils/loading'
import { getFeedBackWhiteList, deleted, create } from '@/api/feedback-while'
import warn from '@/assets/warn.png'

export default {
  data() {
    return {
      currentPage: 1,
      totalData: 0,
      currentPageSize: 10,
      dataSource: {},
      currentData: [],
      queryRegular: '',
      deleteDialogVisible: false,
      form: {
        regular: '',
        type: 0
      },
      dialogOneClassCreateVisible: false,
      warn: warn, // 当前选中的节点
      currentSelectedNode: null
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    queryAction() {
      this.dataSource = {}
      this.currentData = []
      this.getList(1)
    },
    getList(currentPage) {
      startLoading()
      const param = {
        current: currentPage,
        size: this.currentPageSize
      }
      if (this.queryRegular != null && this.queryRegular.length > 0) {
        param.regular = this.queryRegular
      }
      console.log(param)

      getFeedBackWhiteList(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.totalData = response.data.total
          this.dataSource[currentPage.toString()] = response.data.records
          this.currentPage = response.data.current
          this.currentData = this.dataSource[this.currentPage]
        }
      }).catch(error => {
        endLoading()
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 当前数据已经请求过
      // eslint-disable-next-line no-prototype-builtins
      if (this.dataSource.hasOwnProperty(val.toString())) {
        this.currentPage = val
        this.currentData = this.dataSource[this.currentPage]
      } else {
        this.getList(val)
      }
    },
    handleSizeChange(val) {
      console.log('handleSizeChange', val)
      this.currentPageSize = val
      this.getList(1)
    },
    resetAction() {
      this.queryRegular = ''
      this.dataSource = {}
      this.currentData = []

      this.getList(1)
    },
    cancelDelete() {
      this.deleteDialogVisible = false
    },
    remove(node, data) {
      this.deleteDialogVisible = true
      this.currentSelectedNode = data
    },
    createOneClass() {
      this.dialogOneClassCreateVisible = true
      this.form = { regular: '', type: 0 }
    },
    submitAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var saveParam = {
            regular: this.form.regular,
            type: this.form.type
          }
          console.log(saveParam)
          startLoading()
          create(saveParam).then(response => {
            console.log(response)
            if (response.code === 0) {
              this.dialogOneClassCreateVisible = false
              this.resetAction()
            }
          }).catch((error) => {
            endLoading()
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleted() {
      startLoading()
      deleted(this.currentSelectedNode.id).then(response => {
        endLoading()
        if (response.code === 0) {
          this.deleteDialogVisible = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.resetAction()
        } else {
          this.$message.error(response.message)
        }
      }).catch(error => {
        endLoading()
        this.$message.error('删除失败')
      })
    }
  }
}
</script>
