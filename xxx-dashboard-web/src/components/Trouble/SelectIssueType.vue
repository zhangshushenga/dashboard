<template>
  <el-select
    v-model="childValueList"
    :placeholder="$t('label38')"
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
      :label="$t(item.label)"
      :value="item.value"
    />
  </el-select>
</template>

<script>

export default {
  name: 'SelectIssueType',
  model: {
    prop: 'fatherValueList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherValueList: Array
  },
  data() {
    return {
      optionsStatus: [
        {
          'label': 'label34',
          'value': 0
        },
        {
          'label': 'label39',
          'value': 1
        },
        {
          'label': 'label40',
          'value': 2
        }
      ],
      childValueList: this.fatherValueList
    }
  },
  watch: {
    fatherValueList(newVal, oldVal) {
      this.childValueList = newVal
      console.log(newVal, oldVal)
    }
  },
  mounted() {
  },
  methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childValueList)
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

