<template>
  <el-cascader
    v-model="childStatusList"
    :options="optionsCategories"
    :placeholder="$t('label20')"
    :props="props"
    :show-all-levels="false"
    class="tag-select"
    clearable
    collapse-tags
    filterable
    style="width: 100%"
    @change="childValueChange"
  />
</template>

<script>
import { getIssueCategories } from '@/api/track'
import { projectChannel } from '@/utils/util-broadcast'

export default {
  name: 'SelectIssueCategories',
  model: {
    prop: 'fatherStatusList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherStatusList: Array
  },
  data() {
    return {
      props: { multiple: true },
      optionsCategories: [],
      childStatusList: this.fatherStatusList,
      channel: new BroadcastChannel(projectChannel.name)
    }
  },
  watch: {
    fatherStatusList(newVal, oldVal) {
      this.childStatusList = newVal
      console.log(newVal, oldVal)
    }
  },
  created() {
    this.addProjectChangeListener()
  },
  beforeUnmount() {
    // 关闭通道，以避免内存泄漏
    this.channel.close()
  },
  mounted() {
    this.getIssueCategoriesFromServer()
  },
  methods: {
    addProjectChangeListener() {
      // 监听通道消息
      this.channel.addEventListener('message', (event) => {
        if (event.data.action === projectChannel.changeAction) {
          console.log('toubleList +' + projectChannel.changeAction)
          // 更换项目信息后重置搜索
          this.getIssueCategoriesFromServer()
        }
      })
    },
    childValueChange() {
      this.$emit('childValueChange', this.childStatusList)
    },
    getIssueCategoriesFromServer() {
      getIssueCategories().then(response => {
        console.log(response)
        if (response.code === 0) {
          this.optionsCategories = []
          for (const d of response.data) {
            console.log(d)
            for (const sub of d.sub) {
              var subOption1 = []
              for (const sub1 of sub.sub) {
                var subOption2 = []
                for (const sub2 of sub1.sub) {
                  subOption2.push({
                    value: sub2.id,
                    label: sub2.name
                  })
                }
                if (subOption2.length > 0) {
                  subOption1.push({
                    value: sub1.id,
                    label: sub1.name,
                    children: subOption2
                  })
                } else {
                  subOption1.push({
                    value: sub1.id,
                    label: sub1.name
                  })
                }
              }
              this.optionsCategories.push({
                value: sub.id,
                label: sub.name,
                children: subOption1
              })
            }
          }
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.tag-select {
  ::v-deep .el-cascader__tags {
    flex-wrap: nowrap;
    overflow: hidden;
    margin-left: 2px;
  }

  ::v-deep .el-cascader__tags-text {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::v-deep .el-tag_close .el-icon-close {
    margin-bottom: 15px;
  }

  ::v-deep .el-cascader__tags .el-tag {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 56%;
    margin: 2px 0 2px 6px;
    text-overflow: ellipsis;
    background: #f0f2f5;
  }
}
</style>
