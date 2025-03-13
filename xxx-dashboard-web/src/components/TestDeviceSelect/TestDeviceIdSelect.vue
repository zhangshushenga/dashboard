<template>
  <el-select
    v-model="childDeviceId"
    clearable
    filterable
    :allow-create="allowCreate"
    default-first-option
    placeholder="设备id"
    style="width: 100%"
    @change="childValueChange"
  >
    <el-option
      v-for="item in testDeviceList"
      :key="item"
      :label="item"
      :value="item"
    />

  </el-select>
</template>

<script>

import { getTestDevice } from '@/api/test-device.js'
export default {
  name: 'TestDeviceIdSelect',
  model: {
    prop: 'fatherDeviceId', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherDeviceId: String,
    allowCreate: {
      type: [Boolean],
      default: () => true
    }
  },
  data() {
    return {
      testDeviceList: [],
      childDeviceId: this.fatherDeviceId
    }
  },
  mounted() {
    this.getTestDevice()
  }, methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childDeviceId)
    },
    getTestDevice() {
      getTestDevice().then((response) => {
        this.testDeviceList = response.data
      })
    }
  }

}
</script>

<style scoped>

</style>
