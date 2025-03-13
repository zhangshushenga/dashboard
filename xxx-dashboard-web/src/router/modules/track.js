/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const trackRouter = {
  path: '/track',
  component: Layout,
  redirect: '/track/open-app',
  name: 'Track',
  meta: {
    title: 'Event Track',
    icon: 'el-icon-video-camera-solid'
  },
  children: [
    {
      path: 'phone-num',
      component: () => import('@/views/track/phone-num'),
      name: 'PhoneNum',
      meta: { title: 'phone num' }
    },
    {
      path: 'phone-version',
      component: () => import('@/views/track/phone-version'),
      name: 'PhoneVersion',
      meta: { title: 'phone version' }
    },
    {
      path: 'open-app',
      component: () => import('@/views/track/open-app'),
      name: 'OpenApp',
      meta: { title: 'open app' }
    },
    {
      path: 'open-app-by-phone',
      component: () => import('@/views/track/open-app-by-phone'),
      name: 'OpenAppByPhone',
      meta: { title: 'open app by phone' }
    },
    {
      path: 'event-tracking-list',
      component: () => import('@/views/track/event-tracking-list'),
      name: 'event-tracking-list',
      meta: { title: 'event-tracking-list' }
    },
    {
      path: 'use-path',
      component: () => import('@/views/track/use-path'),
      name: 'use-path',
      meta: { title: '用户路径' }
    }
  ]
}
export default trackRouter
