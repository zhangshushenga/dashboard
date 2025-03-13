import Layout from '@/layout'

const omtmRouter = {
    path: '/omtm',
    component: Layout,
    redirect: 'noRedirect',
    name: 'OMTM',
    meta: {
      title: 'OMTM',
      icon: 'el-icon-monitor'
    },
    children: [
      {
        path: 'omtm',
        component: () => import('@/views/charts/lineOmtm'),
        name: 'lineOmtmChart',
        meta: { title: 'OMTM', noCache: true }
      },
    ]
  }
  
  export default omtmRouter