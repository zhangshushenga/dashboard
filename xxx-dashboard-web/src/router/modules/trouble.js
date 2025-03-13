/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const troubleRouter = {
  path: '/trouble',
  component: Layout,
  redirect: '/trouble',
  name: 'Trouble',
  meta: {
    title: '反馈池',
    icon: 'el-icon-folder-opened'
  },
  children: [
    {
      path: 'trouble-look',
      component: () => import('@/views/trouble/list'),
      name: 'TroubleList',
      meta: { title: '全部反馈' }
    },
    // {
    //   path: 'trouble-look',
    //   component: () => import('@/views/trouble/list'),
    //   name: 'TroubleList',
    //   meta: { title: '新反馈' }
    // },
    {
      path: 'trouble-week-report',
      component: () => import('@/views/trouble/week-report'),
      name: '新反馈',
      meta: { title: '新反馈' }
    },
    // {
    //   path: 'trouble-kanban',
    //   component: () => import('@/views/trouble/kanban'),
    //   name: '看板',
    //   meta: { title: '看板' }
    // }
  ]
}
export default troubleRouter
