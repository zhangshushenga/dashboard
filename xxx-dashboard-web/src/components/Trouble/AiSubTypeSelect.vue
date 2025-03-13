<template>
  <el-select
    v-model="childAiIssueSubTypeList"
    clearable
    multiple
    filterable
    placeholder="问题类型"
    style="width: 100%"
    @change="childValueChange"
  >
    <el-option
      v-for="item in optionsCat"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>

export default {
  name: 'AiSubTypeSelect',
  model: {
    prop: 'fatherAiIssueSubTypeList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherAiIssueSubTypeList: Array
  },
  data() {
    return {
      optionsCat: [{
        value: 1001,
        label: '地图编辑'
      },
      {
        value: 1002,
        label: '地图错误'
      },
      {
        value: 1003,
        label: '地图丢失'
      },
      {
        value: 1004,
        label: '建图'
      },
      {
        value: 1005,
        label: '定位'
      },
      {
        value: 2001,
        label: '错误清扫'
      },
      {
        value: 2002,
        label: '漏扫'
      },
      {
        value: 3001,
        label: '硬件'
      },
      {
        value: 3002,
        label: '充电'
      },
      {
        value: 3003,
        label: '电池'
      },
      {
        value: 4001,
        label: '更新'
      },
      {
        value: 4002,
        label: '断连'
      },
      {
        value: 5001,
        label: 'App'
      },
      {
        value: 6001,
        label: '其他'
      },
      {
        value: 7001,
        label: '建议'
      },
      {
        value: 8001,
        label: 'Alexa'
      }],
      childAiIssueSubTypeList: this.fatherAiIssueSubTypeList
    }
  },
  mounted() {
  }, methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childAiIssueSubTypeList)
    }

  }

}
</script>

<style scoped>

</style>
