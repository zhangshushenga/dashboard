/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const eventImageRouter = {
  path: '/picture-recognition',
  component: Layout,
  redirect: '/table/complex-table',
  name: '事件图片',
  meta: {
    title: '事件图片',
    icon: 'el-icon-timer'
  },
  children: [
    {
      path: 'device-event-image',
      component: () => import('@/views/picture-recognition/device-event-image'),
      name: '设备事件图片列表',
      meta: { title: '设备事件图片列表' }
    }
  ]
}
export default eventImageRouter
