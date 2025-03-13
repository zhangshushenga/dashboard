<template>
  <el-select
    v-model="childPriorityList"
    :placeholder="$t('label33')"
    class="tag-select"
    clearable
    collapse-tags
    filterable
    multiple
    style="width: 100%"
    @change="childValueChange"
  >
    <el-option
      v-for="item in optionsPriority"
      :key="item.value"
      :label="$t(item.label)"
      :value="item.value"
    />
  </el-select>
</template>

<script>

export default {
  name: 'SelectPriority',
  model: {
    prop: 'fatherPriorityList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherPriorityList: Array
  },
  data() {
    return {
      optionsPriority: [
        {
          'label': 'label34',
          'value': 0
        }, {
          'label': 'label35',
          'value': 1
        }, {
          'label': 'label36',
          'value': 2
        }, {
          'label': 'label37',
          'value': 3
        }],
      childPriorityList: this.fatherPriorityList
    }
  },
  watch: {
    fatherPriorityList(newVal, oldVal) {
      this.childPriorityList = newVal
      console.log(newVal, oldVal)
    }
  },
  mounted() {
  },
  methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childPriorityList)
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
