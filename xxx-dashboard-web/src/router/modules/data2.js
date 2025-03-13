/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const dataRouter = {
  path: '/data2',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Data2',
  meta: {
    title: 'Lab',
    icon: 'el-icon-s-platform'
  },
  children: [
    {
      path: 'omtm',
      component: () => import('@/views/charts/lineOmtm'),
      name: 'lineOmtmChart',
      meta: { title: '清扫完成率', noCache: true }
    },
    {
      path: 'days31',
      component: () => import('@/views/charts/days31'),
      name: 'Days31Chart',
      meta: { title: '不同入网时间设备清扫分布', noCache: true }
    },
    {
      path: 'device-profile',
      component: () => import('@/views/charts/device-profile'),
      name: 'DeviceProfile',
      meta: { title: '设备资料', noCache: true }
    },
    {
      path: 'device-hour-record',
      component: () => import('@/views/charts/device-hour-record'),
      name: 'DeviceHourRecord',
      meta: { title: '设备动起来', noCache: true }
    }
  ]
}

export default dataRouter
