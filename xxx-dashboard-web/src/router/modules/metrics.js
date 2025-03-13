/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const metricsRouter = {
  path: '/metrics.js',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Metrics',
  meta: {
    title: 'Metrics',
    icon: 'el-icon-warning'
  },
  children: [
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: '整点在线率', noCache: true }
    },
    {
      path: 'offline-reason',
      component: () => import('@/views/charts/offline-reason'),
      name: 'OfflineReasonChart',
      meta: { title: '离线数据和原因', noCache: true }
    },
    {
      path: 'offline-query',
      component: () => import('@/views/charts/offline-query'),
      name: 'OfflineQueryChart',
      meta: { title: '离线数据查询', noCache: true }
    },
    {
      path: 'device-fault',
      component: () => import('@/views/charts/device-fault'),
      name: 'DeviceFaultChart',
      meta: { title: '每天故障情况', noCache: true }
    },
    {
      path: 'device-action',
      component: () => import('@/views/metrics/aggs-device-action'),
      name: 'deviceAction',
      meta: { title: 'deviceAction', noCache: true }
    },
    {
      path: 'schedules-change',
      component: () => import('@/views/metrics/aggs-schedules-change'),
      name: '定时使用什么什么的',
      meta: { title: '定时使用什么什么的', noCache: true }
    },
    {
      path: 'user-label-change',
      component: () => import('@/views/metrics/aggs-user-label-change'),
      name: '用户标签变化',
      meta: { title: '用户标签变化', noCache: true }
    }
  ]
}

export default metricsRouter
