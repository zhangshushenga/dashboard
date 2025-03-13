/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const dataRouter = {
  path: '/data',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Data',
  meta: {
    title: 'Data',
    icon: 'table'
  },
  children: [
    // {
    //   path: 'days30',
    //   component: () => import('@/views/charts/days30'),
    //   name: 'Days30Chart',
    //   meta: { title: '清扫次数按类型每天分布', noCache: true }
    // },
    {
      path: 'days-records',
      component: () => import('@/views/charts/days-records'),
      name: 'DaysRecordsChart',
      meta: { title: '清扫记录每天分布', noCache: true }
    },
    {
      path: 'days30-num-rate',
      component: () => import('@/views/charts/days30-num-rate'),
      name: 'Days30NumRateChart',
      meta: { title: '清扫类型的次数和比率', noCache: true }
    },
    {
      path: 'week7',
      component: () => import('@/views/charts/week7'),
      name: 'Week7Chart',
      meta: { title: '清扫次数按周几分布', noCache: true }
    },
    {
      path: 'hours24',
      component: () => import('@/views/charts/hours24'),
      name: 'Hours24Chart',
      meta: { title: '清扫次数按小时分布', noCache: true }
    },
    {
      path: 'days30-time-size',
      component: () => import('@/views/charts/days30-time-size'),
      name: 'Days30TimeSizeChart',
      meta: { title: '清扫时间面积', noCache: true }
    },
    {
      path: 'days30-time-size-avg',
      component: () => import('@/views/charts/days30-time-size-avg'),
      name: 'Days30TimeSizeAvgChart',
      meta: { title: '清扫时间面积--平均', noCache: true }
    },
    {
      path: 'aggs-sweep-record',
      component: () => import('@/views/data/aggs-sweep-record-by-query'),
      name: '清扫记录统计',
      meta: { title: '清扫记录统计', noCache: true }
    },
    {
      path: 'user-map-aggs',
      component: () => import('@/views/data/aggs-user-map'),
      name: '地图数据统计',
      meta: { title: '地图数据统计', noCache: true }
    }
  ]
}

export default dataRouter
