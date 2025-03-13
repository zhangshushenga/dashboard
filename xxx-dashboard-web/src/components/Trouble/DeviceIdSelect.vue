<template>
  <el-select
    v-model="childDeviceIdList"
    clearable
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="设备id"
    style="width: 100%"
    @change="childValueChange"
  />
</template>

<script>

export default {
  name: 'DeviceIdSelect',
  model: {
    prop: 'fatherDeviceIdList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherDeviceIdList: Array
  },
  data() {
    return {
      optionsAssignUser: [],
      childDeviceIdList: this.fatherDeviceIdList
    }
  },
  mounted() {
  }, methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childDeviceIdList)
    }
  }

}
</script>

<style scoped>

</style>
