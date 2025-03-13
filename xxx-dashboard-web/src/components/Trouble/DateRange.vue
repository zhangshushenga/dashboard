<template>
  <el-date-picker
    v-model="childQueryDate"
    :picker-options="pickerOptions"
    align="right"
    end-placeholder="结束日期"
    range-separator="至"
    start-placeholder="开始日期"
    style="width: 100%"
    type="datetimerange"
    value-format="yyyy-MM-dd HH:mm:ss"
    @change="childValueChange"
  />

  <!--  <el-select-->
  <!--    v-model="childAssignUserIdList"-->
  <!--    clearable-->
  <!--    multiple-->
  <!--    filterable-->
  <!--    placeholder="分配给"-->
  <!--    style="width: 100%"-->
  <!--    @change="childValueChange"-->
  <!--  >-->
  <!--    <el-option-->
  <!--      v-for="item in optionsAssignUser"-->
  <!--      :key="item.value"-->
  <!--      :label="item.label"-->
  <!--      :value="item.value"-->
  <!--    />-->
  <!--  </el-select>-->
</template>

<script>
import i18n from '@/lang'

export default {
  name: 'DateRange',
  model: {
    prop: 'fatherChildQueryDate', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherChildQueryDate: Array
  },
  data() {
    return {
      optionsAssignUser: [],
      childQueryDate: this.fatherChildQueryDate
    }
  },
  computed: {
    pickerOptions() {
      return {
        shortcuts: [{
          text: i18n.t('label66'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: i18n.t('label67'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: i18n.t('label68'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
  }, methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childQueryDate)
    }
  }

}
</script>

<style scoped>

</style>
