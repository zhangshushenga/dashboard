/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const deviceRouter = {
  path: '/device',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Device',
  meta: {
    title: 'Device',
    icon: 'chart'
  },
  children: [
    {
      path: 'device-count',
      component: () => import('@/views/charts/device-count'),
      name: 'DeviceCountChart',
      meta: { title: '设备概况', noCache: true }
    },
    {
      path: 'device-grow',
      component: () => import('@/views/charts/device-grow'),
      name: 'DeviceGrowChart',
      meta: { title: '设备增长', noCache: true }
    },
    {
      path: 'device-new',
      component: () => import('@/views/charts/device-new'),
      name: 'DeviceNewChart',
      meta: { title: '设备激活', noCache: true }
    },
    {
      path: 'device-num',
      component: () => import('@/views/charts/device-num'),
      name: 'DeviceNumChart',
      meta: { title: '设备总量', noCache: true }
    },
    {
      path: 'lineActive',
      component: () => import('@/views/charts/lineActive'),
      name: 'LineChartActive',
      meta: { title: '设备活跃', noCache: true }
    },
    // {
    //   path: 'lineActiveWeek',
    //   component: () => import('@/views/charts/lineActiveWeek'),
    //   name: 'LineChartActiveWeek',
    //   meta: { title: '设备周活', noCache: true }
    // },
    // {
    //   path: 'lineActiveMonth',
    //   component: () => import('@/views/charts/lineActiveMonth'),
    //   name: 'LineChartActiveMonth',
    //   meta: { title: '设备月活', noCache: true }
    // },
    {
      path: 'accessory',
      component: () => import('@/views/charts/accessory'),
      name: 'AccessoryChart',
      meta: { title: '耗材使用时长分布', noCache: true }
    },
    {
      path: 'map-rooms',
      component: () => import('@/views/charts/map-rooms'),
      name: 'MapRoomsChart',
      meta: { title: '地图房间', noCache: true }
    },
    {
      path: 'map-vms',
      component: () => import('@/views/charts/map-vms'),
      name: 'MapVmsChart',
      meta: { title: '地图虚拟墙', noCache: true }
    },
    {
      path: 'aggs-vm-change',
      component: () => import('@/views/device/aggs-vm-change'),
      name: '每日虚拟墙',
      meta: { title: '每日虚拟墙', noCache: true }
    },
    {
      path: 'device-setting',
      component: () => import('@/views/charts/device-setting'),
      name: 'DeviceSettingChart',
      meta: { title: '设备设置', noCache: true }
    },
    {
      path: 'device-schedule',
      component: () => import('@/views/device/schedule'),
      name: 'Schedule',
      meta: { title: '设备定时', noCache: true }
    },
    {
      path: 'device-version',
      component: () => import('@/views/charts/device-version'),
      name: 'DeviceVersionChart',
      meta: { title: '设备版本', noCache: true }
    }
  ]
}

export default deviceRouter
