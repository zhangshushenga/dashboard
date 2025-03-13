<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="clickHandleAddUserButton"
    >New User
    </el-button>

    <el-dialog :title="'New User'" :visible.sync="dialogAddUserVisible">
      <el-form :model="user" label-position="left" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="user.name" placeholder="User Name" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select
            v-model="user.roleIdList"
            multiple
            placeholder="Please Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in allRoleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
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
          <el-input v-model="user.name" placeholder="User name" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select
            v-model="user.roleIdList"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in allRoleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
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
import { addUser, deleteUser, getRoleList, getUserList, updateUser } from '@/api/user-list'
import { endLoading, startLoading } from '@/utils/loading'

const defaultFormThead = [
  'name',
  'email',
  'roleNameList'
  // 'createTime',
  // 'updateTime'
]

const defaultUser = {
  id: '',
  name: '',
  roleIdList: [],
  email: '',
  routes: []
}
export default {
  data() {
    return {
      listLoading: false,
      user: Object.assign({}, defaultUser),
      dialogAddUserVisible: false,
      dialogEditUserVisible: false,
      allRoleList: [],
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
          widthStr = '240'
          break
        case 'roleNameList':
          widthStr = '240'
          break
        default:
          break
      }
      return widthStr
    },
    clickHandleAddUserButton() {
      this.user = Object.assign({}, defaultUser)
      this.user.id = ''
      this.user.name = ''
      this.user.roleIdList = []
      this.user.email = ''
      this.user.routes = []
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
      getRoleList().then((response) => {
        this.allRoleList = []
        for (let i = 0; i < response.data.length; i++) {
          this.allRoleList.push({
            label: response.data[i].name,
            value: response.data[i].id
          })
        }
        console.log(this.allRoleList)
        getUserList().then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            console.log('ttt', response.data[i])
            this.tableData.push({
              id: response.data[i].id,
              name: response.data[i].name,
              email: response.data[i].email,
              createTime: response.data[i].createTime,
              updateTime: response.data[i].updateTime,
              roleIdList: response.data[i].roleIdList,
              roleNameList: this.getRoleNameListByRoleIdList(
                response.data[i].roleIdList
              )
            })
          }
        })
      }).finally(() => {
        this.listLoading = false
      })
    },
    getRoleNameListByRoleIdList(roleIdList) {
      console.log(this.allRoleList)
      console.log(roleIdList)
      var roleNameList = []
      if (roleIdList === undefined) {
        return
      }
      for (let j = 0; j < roleIdList.length; j++) {
        for (let i = 0; i < this.allRoleList.length; i++) {
          if (roleIdList[j] === this.allRoleList[i].value) {
            roleNameList.push(this.allRoleList[i].label)
          }
        }
      }
      return roleNameList
    },
    //
    clickDeleteUserButton(id) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
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
        user.name === '' ||
          user.roleIdList.length === 0 ||
          user.email === ''
      ) {
        this.open()
        return
      }
      startLoading()
      var dataUser = {
        id: user.id,
        name: user.name,
        roleIdList: user.roleIdList,
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
      if (
        user.name === '' ||
          user.roleIdList.length === 0 ||
          user.email === ''
      ) {
        this.open()
        return
      }
      var dataUser = {
        name: user.name,
        roleIdList: user.roleIdList,
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
