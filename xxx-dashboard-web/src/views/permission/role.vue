<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="clickHandleAddRoleButton"
    >New Role
    </el-button>

    <el-dialog :title="'New Role'" :visible.sync="dialogAddVisible">
      <el-form :model="role" label-position="left" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Project">
          <el-select
            v-model="role.projectIdList"
            multiple
            placeholder="Please Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :data="allMenuList"
            :default-expand-all="false"
            :props="defaultProps"
            class="permission-tree"
            node-key="path"
            show-checkbox
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button
          type="danger"
          @click="dialogAddVisible = false"
        >Cancel
        </el-button>
        <el-button
          type="primary"
          @click="clickCreateRoleButton(role)"
        >Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'Edit Role'" :visible.sync="dialogEditRoleVisible">
      <el-form :model="role" label-position="left" label-width="100px">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role name" />
        </el-form-item>
        <el-form-item label="Project">
          <el-select
            v-model="role.projectIdList"
            multiple
            placeholder="Please Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            v-if="openOrNot"
            ref="tree"
            :data="allMenuList"
            :default-checked-keys="defaultCheckedKeys"
            :default-expand-all="true"
            :props="defaultProps"
            class="permission-tree"
            node-key="id"
            show-checkbox
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button
          type="danger"
          @click="dialogEditRoleVisible = false"
        >Cancel
        </el-button>
        <el-button
          type="primary"
          @click="clickUpdateRoleButton(role)"
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
      :data="allRoleList"
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
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleUpdataRole(scope.row)"
          >Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="clickDeleteRoleButton(scope.row.id)"
          >Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addRole, deleteRole, getMenuList, getRoles, updateRole } from '@/api/role'
import { endLoading, startLoading } from '@/utils/loading'
import { getProjects } from '@/api/project'

const defaultFormThead = ['name']

const defaultRole = {
  id: '',
  name: '',
  menuIdList: [],
  projectIdList: []
}

export default {
  data() {
    return {
      listLoading: false,
      role: Object.assign({}, defaultRole),
      dialogAddVisible: false,
      dialogEditRoleVisible: false,
      openOrNot: true,
      allRoleList: [],
      allMenuList: [],
      projectList: [],
      key: 1,
      formThead: defaultFormThead,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultCheckedKeys: []
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
      this.$message.error('name 不能为空')
    },
    columnWith(item) {
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
    clickHandleAddRoleButton() {
      this.role = Object.assign({}, defaultRole)
      this.role.id = ''
      this.role.name = ''
      this.dialogAddVisible = true
    },
    handleUpdataRole(data) {
      this.openOrNot = false
      this.role = Object.assign({}, defaultRole)
      this.role = Object.assign(defaultRole, data)

      this.changeMenuIdListToDisplay(this.role.menuIdList)

      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes(this.defaultCheckedKeys)
      }
      this.dialogType = 'edit'
      this.dialogEditRoleVisible = true
      this.openOrNot = true
    },
    changeMenuIdListToDisplay(menuIdList) {
      this.defaultCheckedKeys = []
      if (menuIdList !== undefined) {
        for (let i = 0; i < menuIdList.length; i++) {
          for (let j = 0; j < this.allMenuList.length; j++) {
            for (let k = 0; k < this.allMenuList[j].children.length; k++) {
              if (menuIdList[i] === this.allMenuList[j].children[k].menuId) {
                this.defaultCheckedKeys.push(this.allMenuList[j].children[k].id)
              }
            }
          }
        }
      }
    },
    search() {
      this.allMenuList = []
      this.projectList = []
      this.listLoading = true
      getRoles()
        .then((response) => {
          this.allRoleList = []
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].name === '超级管理员') {
              continue
            }
            this.allRoleList.push({
              id: response.data[i].id,
              name: response.data[i].name,
              value: response.data[i].id,
              projectIdList: response.data[i].projectIdList,
              menuIdList: response.data[i].menuIdList
            })
          }
          getProjects()
            .then((response) => {
              this.projectList = response.data
            }).finally(() => {
            })

          getMenuList().then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].title.toLowerCase() === 'permission') {
                continue
              }
              var subMenuList = []
              for (let j = 0; j < response.data[i].subMenuList.length; j++) {
                subMenuList.push({
                  id: response.data[i].subMenuList[j].id,
                  label: response.data[i].subMenuList[j].title,
                  menuId: response.data[i].subMenuList[j].id
                })
              }
              this.allMenuList.push({
                id: response.data[i].id,
                label: response.data[i].title,
                menuId: response.data[i].id,
                children: subMenuList
              })
            }
          })
        }).finally(() => {
          this.listLoading = false
        })
    },
    //
    clickDeleteRoleButton(id) {
      startLoading()
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then((response) => {
          endLoading()
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
          endLoading()
          this.$message({
            type: 'info',
            message: 'clean out'
          })
        })
    },
    clickUpdateRoleButton(role) {
      var checkedMenu = this.$refs.tree.getCheckedNodes()
      if (role.name.trim() === '') {
        this.open()
        return
      }
      startLoading()
      var menuIdList = []
      for (let i = 0; i < checkedMenu.length; i++) {
        menuIdList.push(checkedMenu[i].menuId)
      }

      var dataRole = {
        name: role.name,
        menuIdList: menuIdList,
        projectIdList: role.projectIdList
      }
      updateRole(role.id, dataRole).then((response) => {
        endLoading()
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Update successed!'
          })
          this.dialogEditRoleVisible = false
          this.search()
          return
        } else {
          alert(response.message)
        }
      })
    },
    clickCreateRoleButton(role) {
      var halfCheckedMenu = this.$refs.tree.getHalfCheckedNodes()
      var checkedMenu = this.$refs.tree.getCheckedNodes()

      if (role.name.trim() === '') {
        this.open()
        return
      }
      var menuIdList = []
      for (let i = 0; i < halfCheckedMenu.length; i++) {
        menuIdList.push(halfCheckedMenu[i].menuId)
      }
      for (let i = 0; i < checkedMenu.length; i++) {
        menuIdList.push(checkedMenu[i].menuId)
      }
      var dataRole = {
        name: role.name,
        menuIdList: menuIdList
      }
      startLoading()
      addRole(dataRole).then((response) => {
        endLoading()
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Add successed!'
          })
          this.dialogAddVisible = false
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
