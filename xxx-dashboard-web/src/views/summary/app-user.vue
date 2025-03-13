<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="clickHandleAddUserButton"
    >New User
    </el-button>

    <el-dialog :title="'New User'" :visible.sync="dialogAddUserVisible">
      <el-form :model="user" label-position="left" label-width="115px">
        <el-form-item label="Name">
          <el-input v-model="user.userName" placeholder="User Name" />
        </el-form-item>
        <!--        <el-form-item label="corporate user">-->
        <!--          <el-select-->
        <!--            v-model="user.corporateId"-->
        <!--            placeholder="Please Select"-->
        <!--            style="width: 100%"-->
        <!--          >-->
        <!--            <el-option-->
        <!--              v-for="item in allCorporateList"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="Email">
          <el-input v-model="user.email" placeholder="User Email" />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button
          type="danger"
          @click="dialogAddUserVisible = false"
        >Cancel
        </el-button>
        <el-button
          type="primary"
          @click="clickCreateUserButton(user)"
        >Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'Edit User'" :visible.sync="dialogEditUserVisible">
      <el-form :model="user" label-position="left" label-width="100px">
        <el-form-item label="Name">
          <el-input v-model="user.userName" placeholder="User name" />
        </el-form-item>
        <!--        <el-form-item label="corporate user">-->
        <!--          <el-select-->
        <!--            v-model="user.corporateId"-->
        <!--            placeholder="请选择"-->
        <!--            style="width: 100%"-->
        <!--          >-->
        <!--            <el-option-->
        <!--              v-for="item in allCorporateList"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="Email">
          <el-input v-model="user.email" placeholder="User Email" />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button
          type="danger"
          @click="dialogEditUserVisible = false"
        >Cancel
        </el-button>
        <el-button
          type="primary"
          @click="clickUpdateUserButton(user)"
        >Confirm
        </el-button>
      </div>
    </el-dialog>

    <div class="filter-container">
      <el-row :gutter="20" />
    </div>
    <el-table
      :key="key"
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        v-for="fruit in formThead"
        :key="fruit"
        :label="fruit"
        :width="columnWith(fruit)"
      >
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
      <el-table-column :width="240" align="center" label="Operations">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleUpdataUser(scope)">Edit</el-button>
          <el-button size="small" type="danger" @click="clickDeleteUserButton(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addUser, deleteUser, getUserList, updateUser } from '@/api/app-user'
import { endLoading, startLoading } from '@/utils/loading'
import { getCorporateList } from '@/api/corporate-user'

const defaultFormThead = [
  'userName',
  'corporateUser',
  'email'
  // 'roleNameList'
  // 'createTime',
  // 'updateTime'
]

const defaultUser = {
  id: '',
  userName: '',
  corporateId: '',
  email: '',
  corporateUser: ''
}
export default {
  props: ['corporateId'],
  data() {
    return {
      listLoading: false,
      user: Object.assign({}, defaultUser),
      dialogAddUserVisible: false,
      dialogEditUserVisible: false,
      allCorporateList: [],
      tableData: [],
      key: 1,
      formThead: defaultFormThead
    }
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.search()
    })
  },
  methods: {
    open() {
      this.$message('No Data')
    },
    columnWith(item) {
      // console.log(item);
      let widthStr = ''
      switch (item) {
        case 'email':
          widthStr = '350'
          break
        case 'corporateUser':
          widthStr = '350'
          break
        default:
          break
      }
      return widthStr
    },
    clickHandleAddUserButton() {
      this.user = Object.assign({}, defaultUser)
      this.user.id = ''
      this.user.userName = ''
      // this.user.corporateId = ''
      this.user.email = ''
      this.user.corporateUser = ''
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogAddUserVisible = true
    },
    handleUpdataUser(data) {
      console.log(data)
      this.user = Object.assign(defaultUser, data.row)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'edit'
      this.dialogEditUserVisible = true
    },
    search() {
      console.log('search')
      this.listLoading = true
      this.tableData = []
      getCorporateList().then((response) => {
        this.allCorporateList = []
        for (let i = 0; i < response.data.length; i++) {
          this.allCorporateList.push({
            label: response.data[i].domainName,
            value: response.data[i].id
          })
        }
        console.log(this.allCorporateList)
      }).finally(() => {
        this.getAppUserList()
      })
    },
    getAppUserList() {
      this.listLoading = true
      getUserList(this.corporateId).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log('ttt', response.data[i])
          this.tableData.push({
            id: response.data[i].id,
            userName: response.data[i].userName,
            email: response.data[i].email,
            createTime: response.data[i].createTime,
            updateTime: response.data[i].updateTime,
            corporateId: response.data[i].corporateId,
            corporateUser: this.getNameListByRoleIdList(
              response.data[i].corporateId
            )
          })
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    getNameListByRoleIdList(corporateId) {
      console.log(this.allCorporateList)
      console.log(corporateId)
      var corporateUser = ''
      if (corporateId === undefined) {
        return
      }
      for (let i = 0; i < this.allCorporateList.length; i++) {
        if (corporateId === this.allCorporateList[i].value) {
          corporateUser = this.allCorporateList[i].label
        }
      }
      return corporateUser
    },
    //
    clickDeleteUserButton(id) {
      this.$confirm('Confirm to remove the App User?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        startLoading()
        deleteUser(id).then((response) => {
          endLoading()
          console.log(response)
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: 'Delete successed!'
            })
            this.search()
            return
          } else {
            alert(response.message)
          }
        })
      })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: 'clean out'
          // })
        })
    },
    clickUpdateUserButton(user) {
      console.log('xxx', user)
      if (
        user.userName === '' ||
          user.corporateId === '' ||
          user.email === ''
      ) {
        this.open()
        return
      }
      startLoading()
      var dataUser = {
        id: user.id,
        userName: user.userName,
        corporateId: this.corporateId,
        email: user.email
      }
      updateUser(user.id, dataUser).then((response) => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Update successed!'
          })
          this.dialogEditUserVisible = false
          this.search()
          return
        } else {
          alert(response.message)
        }
      })
    },
    clickCreateUserButton(user) {
      console.log(user)
      if (user.userName === '' || user.email === '') {
        this.open()
        return
      }
      var dataUser = {
        userName: user.userName,
        corporateId: this.corporateId,
        email: user.email
      }
      console.log(dataUser)
      startLoading()
      addUser(dataUser).then((response) => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Add successed!'
          })
          this.dialogAddUserVisible = false
          this.search()
          return
        } else {
          alert(response.message)
        }
      })
    }
  }
}
</script>
<style scoped>
.el-row {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
