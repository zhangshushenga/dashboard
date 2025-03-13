/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Data source',
    icon: 'el-icon-video-camera-solid'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/data-source/data-log'),
      name: 'DynamicTable',
      meta: { title: 'data log' }
    },
    {
      path: 'UnfixedThread-table',
      component: () => import('@/views/data-source/map-log'),
      name: 'UnfixedThread',
      meta: { title: 'map log' }
    },
    {
      path: 'upload-log',
      component: () => import('@/views/upload-log/list'),
      name: 'firmware log',
      meta: { title: 'firmware log', noCache: true }
    }
    // {
    //   path: 'drag-table',
    //   component: () => import('@/views/table/drag-table'),
    //   name: 'DragTable',
    //   meta: { title: 'Drag Table' }
    // },
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inline-edit-table'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'Inline Edit' }
    // },
    // {
    //   path: 'complex-table',
    //   component: () => import('@/views/table/complex-table'),
    //   name: 'ComplexTable',
    //   meta: { title: 'Complex Table' }
    // }
  ]
}
export default tableRouter
