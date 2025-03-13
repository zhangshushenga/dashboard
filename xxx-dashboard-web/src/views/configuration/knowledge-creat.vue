<template>
  <div :class="classObj" class="app-wrapper">
    <navbar class="nav" />
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div class="container">
        <div :style="{ height: (screenHeight) + 'px' }" style="flex: 1" />
        <div class="dataArea">
          <div class="margin-all addKnow">新增知识</div>
          <div style="height: 1px; background-color: rgb(240, 240, 240); width: 100%;" />
          <div class="margin-all" style="display: flex; flex-direction: row;">
            <div class="textFont">创建路径：</div>
            <div v-if="this.isAddKnowLedge()" class="textFont">
              <div v-if="this.isExistSubCategory()">{{ categoryName }}</div>
              <div v-else>{{ categoryName + ' > ' + subCategoryName }}</div>
            </div>
            <div v-else>
              <div class="textFont">{{ categoryName }}</div>
            </div>
          </div>
          <div v-if="this.isExistSubCategory() || !this.isAddKnowLedge()" class="margin-all"
            style="display: flex; flex-direction: row;">
            <div class="textFont">所属类目</div>
            <div style="margin-left: 5px; margin-right: 5px; color: rgba(213, 73, 65, 1);">*</div>
            <el-select v-model="subCategoryName" placeholder="请选择类目" style="width: 50%; margin-top: -10px;">
              <el-option v-for="item in currentSubCategorys" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
          </div>
          <div class="margin-all" style="display: flex; flex-direction: row;">
            <div class="textFont">知识标题</div>
            <div style="margin-left: 5px; margin-right: 5px; color: rgba(213, 73, 65, 1);">*</div>
            <el-input v-model="knowLedgeTitle" placeholder="请输入内容" style="width: 50%; margin-top: -10px;" />
          </div>
          <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption" class="margin-all" />
          <div style="display: flex; flex-direction: row; justify-content: end; margin: 10px; height: 40px;">
            <el-button type="primary" :disabled='!saveAbled' @click="saveKnowLedge">保存</el-button>
            <el-button type="info" @click="handleRichText">预览</el-button>
          </div>
        </div>
        <div style="flex: 1" />
        <div v-if="dialogPreviewVisible" class="dialog">
          <div :style="previewStyle" v-html="richContent" />
          <div style="margin-top: 5%;" @click="closePreView"><img src="../../assets/knowledge_preview_close.png"
              style="width: 40px; height: 40px; margin-left: 50px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module' // 调整富文本图片大小插件
import { createFaq, getFaqDetail, updateFaq, getFaqCategories } from '@/api/faq'
import { endLoading, startLoading } from '@/utils/loading'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import '../../styles/RanyFonts.css'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from '@/layout/components'
import RightPanel from '@/components/RightPanel'
import { mapState } from 'vuex'


Quill.register('modules/imageResize', ImageResize) // 注册插件

// 字体大小自定义配置
const fontSize = ['12px', '14px', '16px', '18px', '24px', '32px', '36px']
const SizeStyle = Quill.import('attributors/style/size')
SizeStyle.whitelist = fontSize
Quill.register(SizeStyle, true)

// 设置字体样式
// let fontFamily =['Rany','Rany-Bold','Rany-Medium'];
// Quill.imports['formats/font'].whitelist = fontFamily;
// Quill.register(Quill.imports['formats/font'],true)

// 标题字体颜色
const titleColor = 'rgb(47, 49, 51)'
// 正文字体颜色
const textColor = 'rgb(100, 109, 120)'
// 富文本背景色
const richTextBGColor = 'rgb(255,255,255)'

// 工具栏
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  [{ size: fontSize }],
  // [{ font: fontFamily }],
  [{ header: [] }], // 标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  ['link', 'image'] // 图片,链接
]

export default {
  components: {
    quillEditor,
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  data() {
    return {
      screenHeight: document.documentElement.clientHeight, // 屏幕高度
      knowLedgeId: -1,
      categoryId: -1,
      subCategoryId: -1,
      currentLanguage: "",
      categorys: [],
      subCategoryName: '', // 二级类目标题
      knowLedgeTitle: '', // 知识标题
      content: '<h2>标题</h2><p>内容</p>', // 初始富文本
      richContent: null, // 预览富文本
      editorOption: {
        modules: {
          imageResize: {},
          toolbar: {
            container: toolbarOptions
          }
        },
        placeholder: '添加问题' // 提示
      },
      dialogPreviewVisible: false,// 预览框是否可见
      saveAbled: true //保存按钮是否可用
    }
  },
  computed: {
    // 一级分类标题
    categoryName() {
      return this.queryCategoryTitle(this.categoryId)
    },
    // 当前二级分类组
    currentSubCategorys() {
      return this.querySubCategories(this.categoryId)
    },
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    previewStyle() {
      return {
        width: '375px',
        height: '812px',
        borderRadius: '10px',
        padding: '5px',
        overflow: 'auto',
        backgroundColor: richTextBGColor,
        marginTop: '5%',
        border: '3px solid #000'
      }
    }
  },
  mounted() {
    this.categoryId = this.$route.query.prop_categoryId
    this.subCategoryId = this.$route.query.prop_subCategoryId
    this.knowLedgeId = this.$route.query.knowLedgeId
    this.currentLanguage = this.$route.query.languageCode
    this.initialData()

    const editor = this.$refs.myQuillEditor.quill;
    const Container = editor.container;
    Container.style.backgroundColor = richTextBGColor;
    editor.root.style.color = 'rgb(47, 49, 51)';
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    /**
     * 是否是新增
     * @returns {bool}
     */
    isAddKnowLedge() {
      return this.knowLedgeId == -1
    },
    /**
     * 是否有一级分类
     */
    isExistCategory() {
      return this.categoryId == -1
    },
    /**
     * 是否有二级分类
     */
    isExistSubCategory() {
      return this.subCategoryId == -1
    },
    /**
     * 初始化数据
     */
    initialData() {
      const categoriesParam = {
        'languageCode': this.currentLanguage
      }

      // 新增
      if (this.isAddKnowLedge()) {
        startLoading()
        getFaqCategories(categoriesParam).then(response => {
          console.log('getFaqCategories')
          console.log(JSON.stringify(response))
          if (response.code === 0) {
            this.data = []
            this.categorys = eval(response.data)
            this.subCategoryName = this.querySubCategoryTitle(this.categoryId, this.subCategoryId)
          }
          endLoading()
        }).catch((error) => {
          endLoading()
        })
      } else {
        startLoading()

        const faqDetailParam = {
          'languageCode': this.currentLanguage
        }
        getFaqDetail(this.knowLedgeId, faqDetailParam).then(response => {
          console.log('getFaqDetail')
          console.log(response)
          if (response.code == 0) {
            const data = response.data
            this.categoryId = data.category
            this.subCategoryId = data.subCategory
            this.knowLedgeTitle = data.title
            this.content = data.content
            console.log('getFaqCategories')
            getFaqCategories(categoriesParam).then(response => {
              console.log(JSON.stringify(response))
              if (response.code === 0) {
                this.data = []
                this.categorys = eval(response.data)
                this.subCategoryName = this.querySubCategoryTitle(this.categoryId, this.subCategoryId)
              }
              endLoading()
            }).catch((error) => {
              console.log(error)
              endLoading()
            })
          }
        }).catch(error => {
          endLoading()
        })
      }
    },
    /**
     * 根据一级类目id查询一级类目标题
     */
    queryCategoryTitle(categoryId) {
      for (const category of this.categorys) {
        if (category.id == categoryId) {
          return category.name
        }
      }
      return ''
    },
    /**
     * 根据一级类目id查询对应二级类目集合
     */
    querySubCategories(categoryId) {
      for (const category of this.categorys) {
        if (category.id == categoryId) {
          return category.sub == null ? [] : category.sub
        }
      }
      return []
    },
    /**
     * 根据一级类目id和二级类目id查询二级类目标题
     */
    querySubCategoryTitle(categoryId, subCategoryId) {
      for (const category of this.categorys) {
        console.log(category.id)
        if (category.id == categoryId && category.sub != null) {
          for (const subCategory of category.sub) {
            if (subCategory.id == subCategoryId) {
              return subCategory.name
            }
          }
        }
      }
      return ''
    },
    /**
     * 根据一级类目id和二级类目标题查询二级类目id
     */
    querySubCategoryId(categoryId, subCategoryTitle) {
      for (const category of this.categorys) {
        if (category.id == categoryId && category.sub != null) {
          for (const subCategory of category.sub) {
            if (subCategory.name == subCategoryTitle) {
              return subCategory.id
            }
          }
        }
      }
      return 0
    },
    /**
     * 处理富文本预览
     */
    handleRichText() {
      const defaultRichText = this.setRichTextDefaultColor(this.content)
      this.richContent = this.formatRichText(defaultRichText)
      console.log(this.richContent)
      this.dialogPreviewVisible = true
      window.scrollTo(0, 0)
    },

    /**
     * 关闭预览
     */
    closePreView() {
      this.dialogPreviewVisible = false
    },

    /**
     * 保存操作
     */
    saveKnowLedge() {
      if (this.subCategoryName == '') {
        this.$message.error('请选择所属类目')
        return
      }

      if (this.knowLedgeTitle == '') {
        this.$message.error('请填写知识标题')
        return
      }

      if (this.isNull(this.content)) {
        this.$message.error('请填写内容')
        return
      }

      console.log(this.content)

      const defaultRichText = this.setRichTextDefaultColor(this.content)

      const param = {
        'category': this.categoryId,
        'subCategory': this.querySubCategoryId(this.categoryId, this.subCategoryName),
        'title': this.knowLedgeTitle,
        'content': defaultRichText,
        'languageCode': this.currentLanguage
      }
      console.log(param)
      startLoading()

      if (this.isAddKnowLedge()) {
        createFaq(param).then(response => {
          endLoading()
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.saveAbled = false
          let href = window.location.origin;
          window.opener.postMessage("knowledge-creat", href);
        }).catch(error => {
          endLoading()
        }
        )
      } else {
        updateFaq(this.knowLedgeId, param).then(response => {
          endLoading()
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.saveAbled = false
          let href = window.location.origin;
          window.opener.postMessage("knowledge-update", href);
        }).catch(error => {
          endLoading()
        })
      }
    },

    /**
     * 处理富文本里的图片宽度自适应
     * 1.去掉img标签里的style、width、height属性
     * 2.img标签添加style属性：max-width:100%;height:auto
     * 3.修改所有style里的width属性为max-width:100%
     * 4.去掉<br/>标签
     * @param html
     * @returns {void|string|*}
     */
    formatRichText(html) {
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
        return match
      })
      newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;')
        return match
      })
      newContent = newContent.replace(/<br[^>]*\/>/gi, '')
      newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%; max-height:100%; display:block; margin:auto"')
      return newContent
    },

    /**
     * 1.添加富文本背景色
     * 2.添加文字默认颜色
     */
    setRichTextDefaultColor(html) {
      if (html.indexOf('<body') == -1) {
        const result = this.insertStr(html, 0, `<body style='height: 100%;margin: 0;padding:0;background-color: ${richTextBGColor}; color: rgb(47, 49, 51); font-family: outfit, Helvetica, sans-serif; word-break: keep-all;'>`)
        return this.insertStr(result, result.length, '</body>')
      } else {
        return html
      }
    },

    /**
     * 插入字符串到指定位置
     */
    insertStr(soure, start, newStr) {
      return soure.slice(0, start) + newStr + soure.slice(start)
    },

    // 判断富文本编辑器输入是否为空或回车
    getText(str) {
      return str
        .replace(/<[^<p>]+>/g, '') // 将所有<p>标签 replace ''
        .replace(/<[</p>$]+>/g, '')// 将所有</p>标签 replace ''
        .replace(/<[^<h1>]+>/g, '')// 将所有<h1>标签 replace ''
        .replace(/<[^</h1>]+>/g, '')// 将所有</h1>标签 replace ''
        .replace(/<[^<h2>]+>/g, '')// 将所有<h2>标签 replace ''
        .replace(/<[^</h2>]+>/g, '')// 将所有</h2>标签 replace ''
        .replace(/<[^<h3>]+>/g, '')// 将所有<h3>标签 replace ''
        .replace(/<[^</h3>]+>/g, '')// 将所有</h3>标签 replace ''
        .replace(/&nbsp;/gi, '') // 将所有 空格 replace ''
        .replace(/<[^<br/>]+>/g, '') // 将所有 换行符 replace ''
    },
    isNull(str) {
      const replaceText = this.getText(str)
      if (replaceText == '') return true
      var regu = '^[ ]+$'
      var re = new RegExp(regu)
      return re.test(replaceText)
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  background-color: rgb(241, 241, 241);
  margin-top: 50px;
}

.dataArea {
  flex: 4;
  background-color: white;
  margin-top: 2%;
  border-radius: 6px 6px 0px 0px;
  flex-direction: column;
}

.margin-all {
  margin: 24px
}

.addKnow {
  font-size: 20px;
}

.textFont {
  font-size: 14px;
}

.dialog {
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>

<style>
.ql-container {
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  margin: 0px;
  height: 800px;
}

.ql-editor .ql-font-Rany {
  font-family: "Rany";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Rany]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Rany]::before {
  content: "Rany";
  font-family: 'Rany'
}

.ql-editor .ql-font-Rany-Bold {
  font-family: "Rany-Bold";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Rany-Bold]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Rany-Bold]::before {
  content: "Rany-Bold";
  font-family: 'Rany-Bold'
}

.ql-editor .ql-font-Rany-Medium {
  font-family: "Rany-Medium";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Rany-Medium]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Rany-Medium]::before {
  content: "Rany-Medium";
  font-family: 'Rany-Medium'
}
</style>

<style lang="scss" scoped>
.quill-editor {

  ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: attr(data-value);
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.nav {
  position: fixed;
  width: 100%;
  height: 50px;
  left: 0;
  top: 0;
  z-index: 1000;
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>