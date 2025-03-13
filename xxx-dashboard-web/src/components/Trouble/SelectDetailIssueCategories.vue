<template>
  <el-cascader
    v-model="childStatusList"
    :options="optionsCategories"
    :props="props"
    :show-all-levels="true"
    clearable
    filterable
    placeholder="问题标签"
    style="width: 100%"
    @change="childValueChange"
  />
</template>

<script>
import { getIssueAllCategory } from '@/api/track'

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
      props: { multiple: false },
      optionsCategories: [],
      childStatusList: this.fatherStatusList
    }
  },
  mounted() {
    this.getIssueCategoriesFromServer()
  },
  methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childStatusList)
      console.log(this.childStatusList)
    },
    getIssueCategoriesFromServer() {
      getIssueAllCategory().then(response => {
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

<style scoped>

</style>
