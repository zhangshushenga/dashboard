/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const configRouter = {
  path: '/config',
  component: Layout,
  redirect: '/config',
  name: 'configuration',
  meta: {
    title: '后台配置',
    icon: 'el-icon-folder-opened'
  },
  children: [
    {
      path: 'issue-category',
      component: () => import('@/views/configuration/feedback/feedback-config'),
      name: '提交反馈配置',
      meta: { title: '提交反馈配置' }
    },
    {
      path: 'configuration-knowledge',
      component: () => import('@/views/configuration/knowledge'),
      name: '知识库配置',
      meta: { title: '知识库配置' }
    },
  ]
}
export default configRouter
