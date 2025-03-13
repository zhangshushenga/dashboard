<template>
  <el-select v-model="childTemplateId" placeholder="请选择推送模版" @change="childValueChange">
    <el-option
      v-for="item in getTemplateList()"
      :key="item.id"
      clear
      :label="item.template_name"
      :value="item.id"
    />
  </el-select>
</template>

<script>

export default {
  name: 'AppPushTemplateSelect',
  model: {
    prop: 'fatherTemplateId', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherTemplateId: {
      type: [Number, String],
      default: () => null
    }
  },
  data() {
    return {
      optionsAssignUser: [],
      childTemplateId: this.fatherTemplateId
    }
  },
  mounted() {
  }, methods: {
    getTemplateList() {
      return getTemplateList()
    },
    childValueChange() {
      this.$emit('childValueChange', this.childTemplateId)
    }
  }

}
</script>

<style scoped>

</style>
