<template>
  <el-select v-model="childTemplateId" style="width: 400px" placeholder="请选择点击推送后打开的页面" @change="childValueChange">
    <el-option
      v-for="item in routeList"
      :key="item.id"
      clear
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>

export default {
  name: 'AppPushTemplateRouteSelect',
  model: {
    prop: 'fatherRouteKey', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherRouteKey: {
      type: [Number, String],
      default: () => null
    }
  },
  data() {
    return {
      optionsAssignUser: [],
      childTemplateId: this.fatherRouteKey,
      routeList: [
        {
          label: '进首页',
          value: ''
        }, {
          label: '推荐活动页',
          value: 'recommend_activity'
        },
        {
          label: '设置页',
          value: 'SettingPage'
        },
        {
          label: '编辑地图页',
          value: 'CustomizeRoomsPage'
        }, {
          label: '定时列表页',
          value: 'ScheduleListPage'
        }, {
          label: '新增定时页',
          value: 'AddSchedulePage'
        }, {
          label: '设置页选择模式/吸力页',
          value: 'SettingSetModePage'
        },
        {
          label: '通知页',
          value: 'NotificationPage'
        },
        {
          label: '勿扰设置页',
          value: 'SetDisturbPage'
        }, {
          label: '清扫记录列表页',
          value: 'HistoryListPage'
        }, {
          label: '耗材列表页',
          value: 'AccessoriesListPage'
        }, {
          label: 'Alexa帮助页',
          value: 'AlexaHelpPage'
        }, {
          label: 'DeviceInfo页',
          value: 'DeviceInfoPage'
        }, {
          label: 'FAQ页',
          value: 'FAQPage'
        }
      ]
    }
  },
  mounted() {
  }, methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childTemplateId)
    }
  }

}
</script>

<style scoped>

</style>
