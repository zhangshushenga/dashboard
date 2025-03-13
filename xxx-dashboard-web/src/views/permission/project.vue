<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="clickHandleAddRoleButton"
    >New Project
    </el-button>

    <el-dialog :title="'New Project'" :visible.sync="dialogAddVisible">
      <el-form :model="project" label-position="left" label-width="120px">
        <el-form-item label="Name">
          <el-input v-model="project.name" placeholder="Project Name" />
        </el-form-item>
        <el-form-item label="ServiceType">
          <el-select
            v-model="project.serviceType"
            filterable
            placeholder="请选择设备型号"
            style="width: 100%"
          >
            <el-option
              v-for="item in modelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>

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
          @click="clickCreateRoleButton(project)"
        >Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'Edit Project'" :visible.sync="dialogEditRoleVisible">
      <el-form :model="project" label-position="left" label-width="100px">
        <el-form-item label="Name">
          <el-input v-model="project.name" placeholder="Project name" />
        </el-form-item>
        <el-form-item label="ServiceType">
          <el-select
            v-model="project.serviceType"
            filterable
            placeholder="请填写设备型号 回车创建"
            style="width: 100%"
          >
            <el-option
              v-for="item in modelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>

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
          @click="clickUpdateRoleButton(project)"
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
      :data="dataList"
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
import { addProject, deleteProject, getProjects, getServiceTypeList, updateProject } from '@/api/project'
import { endLoading, startLoading } from '@/utils/loading'

const defaultFormThead = ['name']

const defaultRole = {
  id: '',
  name: '',
  serviceType: ''
}
export default {
  data() {
    return {
      listLoading: false,
      project: Object.assign({}, defaultRole),
      dialogAddVisible: false,
      dialogEditRoleVisible: false,
      openOrNot: true,
      dataList: [],
      modelList: [],
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
      this.getServiceTypeList()
    })
  },
  methods: {
    open() {
      this.$message('No Data')
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
      this.project = Object.assign({}, defaultRole)
      this.project.id = ''
      this.project.name = ''
      this.project.serviceType = ''
      this.dialogAddVisible = true
    },
    handleUpdataRole(data) {
      this.openOrNot = false
      this.project = data
      this.dialogType = 'edit'
      this.dialogEditRoleVisible = true
      this.openOrNot = true
    },
    getServiceTypeList() {
      getServiceTypeList()
        .then((response) => {
          this.modelList = response.data
          // this.dataList = []
          // for (let i = 0; i < response.data.length; i++) {
          //   this.dataList = response.data
          // }
        }).finally(() => {
        // this.listLoading = false
        })
    },
    search() {
      this.listLoading = true
      getProjects()
        .then((response) => {
          this.dataList = []
          for (let i = 0; i < response.data.length; i++) {
            this.dataList = response.data
          }
        }).finally(() => {
          this.listLoading = false
        })
    },
    //
    clickDeleteRoleButton(id) {
      startLoading()
      this.$confirm('Confirm to remove the project?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteProject(id).then((response) => {
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
    clickUpdateRoleButton(project) {
      startLoading()
      updateProject(project.id, project).then((response) => {
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
    clickCreateRoleButton(project) {
      const serviceType = this.modelList.find(e => e.id === project.serviceType)

      var dataRole = {
        name: project.name,
        serviceType: project.serviceType,
        deviceModel: serviceType.deviceModel
      }
      startLoading()
      addProject(dataRole).then((response) => {
        endLoading()
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Add successed!'
          })
          this.dialogAddVisible = false
          this.search()
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
