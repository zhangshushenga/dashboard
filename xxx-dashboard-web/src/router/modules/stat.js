/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const statRouter = {
  path: '/stat',
  component: Layout,
  redirect: '/table/complex-table',
  name: '数据统计',
  meta: {
    title: '数据统计',
    icon: 'el-icon-video-camera-solid'
  },
  children: [
    {
      path: 'app-data-stat-activate',
      component: () => import('@/views/stat/app-data-stat-activate'),
      name: 'APP活跃用户',
      meta: { title: 'APP活跃用户' }
    },
    {
      path: 'app-data-stat-churned',
      component: () => import('@/views/stat/app-data-stat-churned'),
      name: 'APP流失用户',
      meta: { title: 'APP流失用户' }
    },
    {
      path: 'app-data-stat-connect',
      component: () => import('@/views/stat/app-data-stat-connect'),
      name: '设备连接数',
      meta: { title: '设备连接数' }
    },
    {
      path: 'app-data-stat-help-feedback',
      component: () => import('@/views/stat/app-data-stat-help-feedback'),
      name: '反馈功能数据统计',
      meta: { title: '反馈功能数据统计' }
    },
    {
      path: 'app-data-stat-device-status',
      component: () => import('@/views/stat/app-data-stat-deviceStatus'),
      name: '设备状态统计',
      meta: { title: '设备状态统计' }
    },
    {
      path: 'app-data-stat-firmware-upgrade',
      component: () => import('@/views/stat/app-data-stat-firmwareUpgrade'),
      name: '设备状态统计',
      meta: { title: '设备状态统计' }
    },
    {
      path: 'app-data-stat-view-live',
      component: () => import('@/views/stat/app-data-stat-viewLive'),
      name: '观看直播统计',
      meta: { title: '观看直播统计' }
    },
    {
      path: 'app-data-stat-view-event',
      component: () => import('@/views/stat/app-data-stat-viewEvent'),
      name: '观看直播统计',
      meta: { title: '观看直播统计' }
    },
    {
      path: 'app-data-usage-preferences',
      component: () => import('@/views/stat/app-data-usage-preferences'),
      name: '使用偏好',
      meta: { title: '使用偏好' }
    },
    {
      path: 'app-data-stat-view-playback',
      component: () => import('@/views/stat/app-data-stat-viewPlayback'),
      name: '观看回放统计',
      meta: { title: '观看回放统计' }
    },
    {
      path: 'app-data-stat-ble-pair',
      component: () => import('@/views/stat/app-data-stat-blePair'),
      name: '蓝牙配对统计',
      meta: { title: '蓝牙配对统计' }
    },
    {
      path: 'app-data-stat-device-bind',
      component: () => import('@/views/stat/app-data-stat-deviceBind'),
      name: '设备绑定统计',
      meta: { title: '设备绑定统计' }
    },
    {
      path: 'app-data-stat-app-use',
      component: () => import('@/views/stat/app-data-stat-appUse'),
      name: 'app使用时长',
      meta: { title: 'app使用时长' }
    },
    {
      path: 'app-data-stat-daily-user',
      component: () => import('@/views/stat/app-data-stat-daily-user'),
      name: '每日用户统计',
      meta: { title: '每日用户统计' }
    },
    {
      path: 'app-data-stat-daily-device',
      component: () => import('@/views/stat/app-data-stat-daily-device'),
      name: '每日设备统计',
      meta: { title: '每日设备统计' }
    },
    {
      path: 'app-data-stat-off-iot',
      component: () => import('@/views/stat/app-data-stat-off-iot'),
      name: 'iot连接问题统计',
      meta: { title: 'iot连接问题统计' }
    },
    {
      path: 'device-data-stat-ai-sql',
      component: () => import('@/views/stat/device-data-stat-ai-sql'),
      name: '设备智能搜索',
      meta: { title: '设备智能搜索' }
    }
  ]
}
export default statRouter
