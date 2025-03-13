<template>
  <el-select
    v-model="childStatusList"
    :placeholder="$t('label22')"
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
  name: 'SelectStatus',
  model: {
    prop: 'fatherStatusList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherStatusList: Array
  },
  data() {
    return {
      optionsStatus: [
        {
          'label': 'label23',
          'value': 0
        },
        {
          'label': 'label24',
          'value': 1
        },
        {
          'label': 'label25',
          'value': 2
        },
        {
          'label': 'label26',
          'value': 4
        },
        {
          'label': 'label27',
          'value': 5
        }
      ],
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
  },
  methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childStatusList)
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
