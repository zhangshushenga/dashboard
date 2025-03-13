<template>
  <el-select
    v-model="childStatusList"
    :placeholder="$t('label21')"
    class="tag-select"
    clearable
    collapse-tags
    filterable
    multiple
    style="width: 100%"
    @change="childValueChange"
  >
    <el-option
      v-for="item in optionsStatus"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getIssueUserList } from '@/api/user'

export default {
  name: 'SelectAssignUser',
  model: {
    prop: 'fatherStatusList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherStatusList: Array
  },
  data() {
    return {
      optionsStatus: [],
      childStatusList: this.fatherStatusList
    }
  },
  watch: {
    fatherStatusList(newVal, oldVal) {
      this.childStatusList = newVal
      console.log(newVal, oldVal)
    }
  },
  mounted() {
    this.getAllUserFromServer()
  },
  methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childStatusList)
    },
    getAllUserFromServer() {
      getIssueUserList().then(response => {
        if (response.code === 0) {
          for (const d of response.data) {
            this.optionsStatus.push({
              label: d.name,
              value: d.id
            })
          }
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.tag-select {
  ::v-deep .el-select__tags {
    flex-wrap: nowrap;
    overflow: hidden;
    margin-left: 5px;
  }

  ::v-deep .el-select__tags-text {
    display: inline-block;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::v-deep .el-select__tags .el-tag {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 60%;
    margin: 2px 0 2px 6px;
    text-overflow: ellipsis;
    background: #f0f2f5;
  }
}
</style>

