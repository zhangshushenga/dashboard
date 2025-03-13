<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="clickHandleAddUserButton"
    >New User
    </el-button>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogAddUserVisible">
      <el-form ref="user" :model="user" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="公司名称" prop="domainName">
          <el-input v-model="user.domainName" placeholder="公司名称" />
        </el-form-item>
        <el-form-item
          label="Ai配置"
          :prop="'agentParam'"
        >

          <!--          <el-form-->
          <!--            :model="user.agentParam"-->
          <!--            :rules="rules"-->
          <!--            label-position="left"-->
          <!--            label-width="120px"-->
          <!--            style="width: 400px; margin-left:50px;"-->
          <!--          >-->
          <el-form-item
            prop="agentParam.descType"
            label="简述"
            style="width: 400px;"
          >
            <el-input v-model.number="user.agentParam.descType" placeholder="简述" style="width: 200px" autocomplete="off" />
          </el-form-item>
          <el-form-item
            prop="agentParam.summaryType"
            label="摘要"
            style="margin-top: 18px;"
          >
            <el-input v-model.number="user.agentParam.summaryType" placeholder="摘要" style="width: 200px;" autocomplete="off" />
          </el-form-item>
          <el-form-item
            prop="agentParam.newsType"
            label="新闻稿"
            style="margin-top: 18px;"
          >
            <el-input v-model.number="user.agentParam.newsType" placeholder="新闻稿" style="width: 200px;" autocomplete="off" />
          </el-form-item>
          <!--          </el-form>-->

        </el-form-item>
        <el-form-item
          v-for="(param, index) in user.deviceParamList"
          :key="param.key"
          :label="'设备' + (index +1 )"
          :prop="'deviceParamList.' + index + '.deviceId'"
        >

          <!--          <el-form-->
          <!--            :model="param"-->
          <!--            :rules="rules"-->
          <!--            label-position="left"-->
          <!--            label-width="120px"-->
          <!--            style="width: 400px; margin-left:50px;"-->
          <!--          >-->
          <el-form-item
            :prop="'deviceParamList.' + index + '.deviceId'"
            label="设备Id"
            style="width: 400px"
            :rules="{required: true, message: 'Device Id不能为空', trigger: 'blur'}"
          >
            <el-input v-model="param.deviceId" placeholder="上图设备" style="width: 200px" />
          </el-form-item>
          <el-form-item
            :prop="'deviceParamList.' + index + '.audioDeviceId'"
            label="收音设备"
            style="margin-top: 18px;width: 400px"
          >
            <el-input v-model="param.audioDeviceId" placeholder="收音设备" style="width: 200px" />
          </el-form-item>
          <el-form-item
            :prop="'deviceParamList.' + index + '.deviceName'"
            label="设备名称"
            style="margin-top: 18px;"
            :rules="{required: true, message: '设备名称不能为空', trigger: 'blur'}"
          >
            <el-input v-model="param.deviceName" placeholder="设备名称" style="width: 200px;" />
          </el-form-item>
          <el-form-item
            :prop="'deviceParamList.' + index + '.positionType'"
            label="设备位置"
            style="margin-top: 18px; "
            :rules="[{required: true, message: '设备位置不能为空' , trigger: 'blur'},
                     { type: 'number', message: '设备位置必须为数字值', trigger: 'blur'}
            ]"
          >
            <el-input v-model.number="param.positionType" placeholder="设备位置" autocomplete="off" style="width: 200px" />
          </el-form-item>
          <div style="margin-top: 18px;" />
          <el-button v-if="index >0" @click.prevent="removeParam(param)">删除</el-button>
          <el-button @click.prevent="addParam(param)">add</el-button>
          <!--          </el-form>-->

        </el-form-item>

        <el-form-item label="App 抽帧上传 URL" prop="appConfig.imageUrl">
          <el-input v-model="user.appConfig.imageUrl" placeholder="app弹幕抽帧上传图片的地址" />
        </el-form-item>

        <el-form-item label="App 角色切换 URL" prop="appConfig.roleUrl">
          <el-input v-model="user.appConfig.roleUrl" placeholder="app弹幕角色切换的地址" />
        </el-form-item>

        <el-form-item label="App 抽帧报警地址" prop="appConfig.errorUrl">
          <el-input v-model="user.appConfig.errorUrl" placeholder="app弹幕异常时报警发送地址" />
        </el-form-item>
        <el-form-item label="App 启用角色" prop="appConfig.enableRole">
          <el-switch v-model="user.appConfig.enableRole" placeholder="app弹幕是否启用角色切换功能" />
        </el-form-item>

        <el-form-item style="text-align: right">
          <el-button
            type="danger"
            @click="cancel()"
          >Cancel
          </el-button>
          <el-button
            type="primary"
            @click="dialogStatus==='create'?clickCreateUserButton(user):clickUpdateUserButton(user)"
          >Confirm
          </el-button>
        </el-form-item>
      </el-form>
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
        :key="fruit.prop"
        :label="fruit.label"
        :width="columnWith(fruit.prop)"
      >
        <template slot-scope="scope">
          {{ scope.row[fruit.prop] }}
        </template>
      </el-table-column>
      <el-table-column :min-width="350" align="center" label="Operations">
        <template slot-scope="{row,$index}">
          <el-button size="small" type="primary" @click="handleUpdateUser(row,$index)">配置</el-button>
          <el-button size="small" type="primary" @click="clickConfigButton(row.id)">展厅开关</el-button>
          <el-button size="small" type="primary" @click="clickAppUserButton(row.id)">app用户配置</el-button>
          <el-button size="small" type="danger" @click="clickDeleteUserButton(row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addUser, deleteUser, getCorporateList, updateUser } from '@/api/corporate-user.js'
import { endLoading, startLoading } from '@/utils/loading'

const defaultFormThead = [
  {
    prop: 'id',
    label: 'Id'
  },
  {
    prop: 'domainName',
    label: '公司名称'
  },
  {
    prop: 'deviceParam',
    label: '设备配置'
  },
  {
    prop: 'agentParam',
    label: 'AI配置'
  }
]

const defaultUser = {
  id: '',
  domainName: '',
  agentParam: {
    descType: null,
    summaryType: null,
    newsType: null
  },
  deviceIdList: [],
  deviceParamList: [{
    deviceId: '',
    audioDeviceId: '',
    deviceName: '',
    positionType: null
  }],
  appConfig: {
    imageUrl: null,
    roleUrl: null,
    errorUrl: null,
    enableRole: null
  }
}
export default {
  data() {
    return {
      listLoading: false,
      user: Object.assign({}, defaultUser),
      dialogAddUserVisible: false,
      allRoleList: [],
      tableData: [],
      key: 1,
      rules: {
        domainName: [{ required: true, message: 'domainName is required', trigger: 'blur' }],
        // deviceId: [{ required: true, message: '设备Id不能为空', trigger: 'blur' }],
        // deviceName: [{ required: true, message: '设备名称不能为空', trigger: 'blur' }],
        'agentParam.descType': [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }],
        'agentParam.summaryType': [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }],
        'agentParam.newsType': [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }],
        // 'deviceParamList.*.positionType': [
        //   { required: true, message: '设备位置不能为空', trigger: 'blur' },
        //   { type: 'number', message: '设备位置必须为数字值', trigger: 'blur' }
        // ]

        'appConfig.imageUrl': [
          // { required: true, message: '请输入 App 抽帧上传 URL', trigger: 'blur' },
          { type: 'url', message: '请输入有效的 URL', trigger: ['blur', 'change'] }
        ],
        'appConfig.roleUrl': [
          // { required: true, message: '请输入 App 角色切换 URL', trigger: 'blur' },
          { type: 'url', message: '请输入有效的 URL', trigger: ['blur', 'change'] }
        ],
        'appConfig.errorUrl': [
          // { required: true, message: '请输入 App 抽帧报警地址', trigger: 'blur' },
          { type: 'url', message: '请输入有效的 URL', trigger: ['blur', 'change'] }
        ]
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
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
    clickConfigButton(id) {
      const routeUrl = this.$router.resolve({
        path: '/summary-config',
        query: {
          corporateId: id
        }
      })

      window.open(routeUrl.href, '_blank')
    },
    clickAppUserButton(id) {
      const routeUrl = this.$router.resolve({
        path: '/app-user',
        query: {
          corporateId: id
        }
      })

      window.open(routeUrl.href, '_blank')
    },
    columnWith(item) {
      // console.log(item);
      let widthStr = ''
      switch (item) {
        case 'id':
          widthStr = '60'
          break
        case 'agentParam':
          widthStr = '400'
          break
        case 'deviceList':
          widthStr = '200'
          break
        default:
          break
      }
      return widthStr
    },
    clickHandleAddUserButton() {
      this.user = {
        id: '',
        domainName: '',
        agentParam: { // 初始化 agentParam
          descType: null,
          summaryType: null,
          newsType: null
        },
        deviceParamList: [{ // 初始化 deviceParamList
          deviceId: '',
          deviceName: '',
          positionType: null
        }],
        appConfig: {
          imageUrl: '',
          roleUrl: '',
          errorUrl: '',
          enableRole: false
        }
      }
      // this.user = JSON.parse(JSON.stringify(defaultUser))
      this.dialogStatus = 'create'
      this.dialogAddUserVisible = true
      // 清除表单验证状态
      this.$nextTick(() => {
        this.$refs['user'].clearValidate()
      })
    },
    addParam() {
      this.user.deviceParamList.push({
        value: '',
        key: Date.now()
      })
    },
    removeParam(item) {
      var index = this.user.deviceParamList.indexOf(item)
      if (index !== -1) {
        this.user.deviceParamList.splice(index, 1)
      }
    },
    handleUpdateUser(data) {
      console.log(data)
      data.deviceParamList = data.deviceList
      // this.user = JSON.parse(JSON.stringify(data))

      this.user = Object.assign(defaultUser, data)
      // if (!this.user.deviceParamList || this.user.deviceParamList.length === 0) {
      //   this.user.deviceParamList = JSON.parse(JSON.stringify(defaultUser.deviceParamList))
      // }
      // if (!this.user.agentParam) {
      //   this.user.agentParam = JSON.parse(JSON.stringify(defaultUser.agentParam))
      // }
      // if (!this.user.appConfig || Object.keys(this.user.appConfig).length === 0) {
      //   this.user.appConfig = Object.assign({}, defaultUser.appConfig)
      //   console.log('???????')
      // } else {
      //   console.log('??')
      // }
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogStatus = 'update'
      this.dialogAddUserVisible = true
      this.$nextTick(() => {
        this.$refs['user'].clearValidate()
      })
    },
    cancel() {
      this.dialogAddUserVisible = false
      this.$nextTick(() => {
        this.$refs['user'].clearValidate()
      })
    },
    search() {
      console.log('search')
      this.listLoading = true
      this.tableData = []
      console.log(this.allRoleList)
      getCorporateList().then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log('ttt', response.data[i])
          this.tableData.push({
            id: response.data[i].id,
            domainName: response.data[i].domainName,
            createTime: response.data[i].createTime,
            updateTime: response.data[i].updateTime,
            deviceList: response.data[i].deviceParamList,
            appConfig: response.data[i].appConfig,
            //  deviceParam: response.data[i].deviceParamList,
            agentParam: response.data[i].agentParam,
            deviceParam: this.getDevice(
              response.data[i].deviceParamList
            )
          })
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    getDevice(deviceParamList) {
      console.log(deviceParamList)
      var deviceId = []
      if (deviceParamList === undefined) {
        return
      }
      for (let j = 0; j < deviceParamList.length; j++) {
        deviceId.push(deviceParamList[j].deviceId)
      }
      return deviceId
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
      if (user.domainName === '' || user.deviceParamList.length === 0 || user.id == '') {
        this.open()
        return
      }
      this.$refs['user'].validate((valid) => {
        if (valid) {
          startLoading()
          updateUser(user.id, user).then((response) => {
            endLoading()
            console.log(response)
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: 'Update successed!'
              })
              this.dialogAddUserVisible = false
              this.search()
              return
            } else {
              alert(response.message)
            }
          })
        } else {
          console.log('输入有误!')
          return false
        }
      })
    },

    clickCreateUserButton(user) {
      console.log(user)
      if (user.domainName === '' || user.deviceParamList.length === 0) {
        this.open()
        return
      }
      this.$refs['user'].validate((valid) => {
        if (valid) {
          startLoading()
          addUser(user).then((response) => {
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
        } else {
          console.log('输入有误!')
          return false
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
