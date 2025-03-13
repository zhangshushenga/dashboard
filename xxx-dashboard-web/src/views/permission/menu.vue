<template>
  <div class="custom-tree-container">
    <div class="block">
      <p />
      <el-button
        type="primary"
        @click="clickHandleParentMenuButton"
      >New Parent Menu
      </el-button>
      <el-row :gutter="20">
        <el-col
          :span="12"
        >
          <div class="grid-content bg-purple">
            <el-tree
              :allow-drop="allowDrop"
              :data="allMenuList"
              :expand-on-click-node="false"
              :props="defaultProps"
              default-expand-all
              draggable
              highlight-current
              node-key="id"
              @node-drop="nodeDrop"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>{{ data.title }}</span>
                <span>
                  <el-button
                    v-if="node.level === 1"
                    circle
                    icon="el-icon-plus"
                    size="mini"
                    type="primary"
                    @click="clickHandleAddMenuButton(node)"
                  />
                  <el-button
                    circle
                    icon="el-icon-edit"
                    size="mini"
                    type="info"
                    @click="clickUpdateMenuButton(data, node)"
                  />
                  <el-button
                    circle
                    icon="el-icon-close"
                    size="mini"
                    type="danger"
                    @click="clickDeteleMenuButton(data.id)"
                  />
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
      </el-row>
      <el-dialog :title="'New Parent Menu'" :visible.sync="dialogAddParentMenuVisible">
        <el-form :model="menu" label-position="left" label-width="80px">
          <el-form-item label="Name">
            <el-input v-model="menu.name" placeholder="Parent Name" />
          </el-form-item>
          <el-form-item label="Title">
            <el-input v-model="menu.title" placeholder="Parent Title" />
          </el-form-item>
          <el-form-item label="Slug">
            <el-input v-model="menu.slug" placeholder="唯一标识" />
          </el-form-item>
          <el-form-item label="Path">
            <el-input v-model="menu.path" placeholder="Parent Path" />
          </el-form-item>
          <el-form-item label="icon">
            <el-input v-model="menu.icon" placeholder="Parent icon" />
          </el-form-item>
        </el-form>
        <div style="text-align: right">
          <el-button
            type="danger"
            @click="dialogAddParentMenuVisible = false"
          >Cancel
          </el-button>
          <el-button
            type="primary"
            @click="() => append(menu)"
          >Confirm
          </el-button>
        </div>
      </el-dialog>
      <el-dialog :title="'New Menu'" :visible.sync="dialogAddMenuVisible">
        <el-form :model="menu" label-position="left" label-width="80px">
          <el-form-item label="Name">
            <el-input v-model="menu.name" placeholder="Menu Name" />
          </el-form-item>
          <el-form-item label="Title">
            <el-input v-model="menu.title" placeholder="Menu Title" />
          </el-form-item>
          <el-form-item label="Slug">
            <el-input v-model="menu.slug" placeholder="Menu Slug" />
          </el-form-item>
          <el-form-item label="Path">
            <el-input v-model="menu.path" placeholder="Menu Path" />
          </el-form-item>
          <el-form-item label="icon">
            <el-input v-model="menu.icon" placeholder="Menu icon" />
          </el-form-item>
        </el-form>
        <div style="text-align: right">
          <el-button
            type="danger"
            @click="dialogAddMenuVisible = false"
          >Cancel
          </el-button>
          <el-button
            type="primary"
            @click="() => append(menu)"
          >Confirm
          </el-button>
        </div>
      </el-dialog>
      <el-dialog :title="'Update Menu'" :visible.sync="dialog">
        <el-form :model="menu" label-position="left" label-width="80px">
          <el-form-item label="Name">
            <el-input v-model="menu.name" placeholder="Menu Name" />
          </el-form-item>
          <el-form-item label="Title">
            <el-input v-model="menu.title" placeholder="Menu Title" />
          </el-form-item>
          <el-form-item label="Slug">
            <el-input v-model="menu.slug" placeholder="Menu Slug" />
          </el-form-item>
          <el-form-item label="Path">
            <el-input v-model="menu.path" placeholder="Menu Path" />
          </el-form-item>
          <el-form-item label="icon">
            <el-input v-model="menu.icon" placeholder="Menu icon" />
          </el-form-item>
        </el-form>
        <div style="text-align: right">
          <el-button
            type="danger"
            @click="dialog= false"
          >Cancel
          </el-button>
          <el-button
            type="primary"
            @click="() => clickUpdateMenu(menu)"
          >Update
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getMenuList } from '@/api/role'
import { endLoading, startLoading } from '@/utils/loading'
import { addMenu, batchUpdateMenu, deleteMenu, updateMenu } from '@/api/menu'

const defaultMenu = {
  icon: '',
  name: '',
  title: '',
  slug: '',
  path: ''
}
export default {
  data() {
    return {
      menu: Object.assign({}, defaultMenu),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      allMenuList: [],
      dialogAddMenuVisible: false,
      dialogAddParentMenuVisible: false,
      dialog: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.search()
    })
  },
  methods: {
    open() {
      this.$message('No Data')
    },
    allowDrop(draggingNode, dropNode, type) {
      if (type === 'inner') {
        return false
      }
      if (draggingNode.level === 1) {
        if (dropNode.level === 1) {
          return true
        }
      } else {
        if (dropNode.level !== 1) {
          return true
        }
      }
      return false
    },
    nodeDrop(draggingNode, dropNode, position, event) {
      console.log('draggingNode', draggingNode)
      console.log('dropNode', dropNode)
      console.log('type', position)
      console.log('event', event)
      console.log(this.allMenuList)
      this.updateMenuBatch(this.allMenuList)
    },
    clickHandleParentMenuButton() {
      this.menu = Object.assign({}, defaultMenu)
      this.dialogAddParentMenuVisible = true
    },
    clickHandleAddMenuButton(node) {
      console.log('node', node)
      this.menu = Object.assign({}, defaultMenu)
      this.menu.parentId = node.data.id
      this.dialogAddMenuVisible = true
    },
    clickUpdateMenuButton(data, node) {
      console.log('node', node)
      this.menu = Object.assign({}, data)
      if (node.level > 1) {
        this.menu.parentId = node.parent.data.id
      }
      console.log('menu', this.menu)
      this.dialog = true
    },
    append(menu) {
      console.log('33', menu)
      if (menu.name === '' || menu.title === '' || menu.path === '' || menu.slug === '') {
        this.open()
        return
      }
      startLoading()
      this.dialogAddParentMenuVisible = false
      this.dialogAddMenuVisible = false
      addMenu(menu).then((response) => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Add successed!'
          })
          this.allMenuList = []
          this.search()
          return
        } else {
          alert(response.message)
        }
      })
    },
    clickUpdateMenu(menu) {
      if (menu.name === '' || menu.title === '' || menu.path === '' || menu.slug === '') {
        this.open()
        return
      }
      startLoading()
      delete menu.children
      updateMenu(menu.id, menu).then((response) => {
        endLoading()
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Update successed!'
          })
          this.dialog = false
          this.allMenuList = []
          this.search()
          return
        } else {
          alert(response.message)
        }
      })
    },
    clickDeteleMenuButton(id) {
      console.log('xxx', id)
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        startLoading()
        deleteMenu(id).then((response) => {
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
        })
    },
    search() {
      this.allMenuList = []
      getMenuList().then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          var subMenuList = []
          if (response.data[i].subMenuList) {
            for (let j = 0; j < response.data[i].subMenuList.length; j++) {
              subMenuList.push({
                id: response.data[i].subMenuList[j].id,
                title: response.data[i].subMenuList[j].title,
                slug: response.data[i].subMenuList[j].slug,
                name: response.data[i].subMenuList[j].name,
                path: response.data[i].subMenuList[j].path,
                icon: response.data[i].subMenuList[j].icon

              })
            }
          }
          this.allMenuList.push({
            id: response.data[i].id,
            title: response.data[i].title,
            slug: response.data[i].slug,
            name: response.data[i].name,
            path: response.data[i].path,
            icon: response.data[i].icon,
            children: subMenuList
          })
        }
        console.log(this.allMenuList)
      })
    },
    updateMenuBatch(menu) {
      startLoading()
      var data = []
      for (const m of menu) {
        console.log(m)
        data.push({
          'id': m.id,
          'name': m.name,
          'icon': m.icon,
          'path': m.path,
          'slug': m.slug,
          'title': m.title
        })
        for (const c of m.children) {
          data.push({
            'parentId': m.id,
            'id': c.id,
            'icon': c.icon,
            'name': c.name,
            'path': c.path,
            'slug': c.slug,
            'title': c.title
          })
        }
      }
      console.log(data)
      batchUpdateMenu(data).then(response => {
        endLoading()
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: 'Update successed!'
          })
        } else {
          alert(response.message)
        }
      })
    }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
