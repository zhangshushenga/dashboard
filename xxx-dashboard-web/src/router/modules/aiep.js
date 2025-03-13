/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const aiepRouter = {
  path: '/aiep',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'ai验证',
  meta: {
    title: 'ai',
    icon: 'el-icon-video-camera-solid'
  },
  children: [
    {
      path: 'query_once',
      component: () => import('@/views/aiep/query_once'),
      name: '模型测试-RAG',
      meta: { title: '模型测试-RAG' }
    },
    {
      path: 'query_once_text_2_text',
      component: () => import('@/views/aiep/query_once_text_2_text'),
      name: '模型测试-文生文',
      meta: { title: '模型测试-文生文' }
    },
    {
      path: 'query_once_image_2_text',
      component: () => import('@/views/aiep/query_once_image_2_text'),
      name: '模型测试-图生文',
      meta: { title: '模型测试-图生文' }
    },
    {
      path: 'image_2_text',
      component: () => import('@/views/aiep/image_2_text'),
      name: '图生文测试',
      meta: { title: '图生文测试' }
    },
    {
      path: 'eval_tasks',
      component: () => import('@/views/aiep/eval_tasks'),
      name: '任务列表',
      meta: { title: '任务列表' }
    },
    {
      path: 'qa_list',
      component: () => import('@/views/aiep/qa_list'),
      name: '客服问答列表',
      meta: { title: '客服问答列表' }
    },
    {
      path: 'clip_test_list',
      component: () => import('@/views/aiep/clip_test_list'),
      name: '图片测试集列表',
      meta: { title: '图片测试集列表' }
    },
    {
      path: 'smart_cus_test',
      component: () => import('@/views/aiep/smart_cus_test'),
      name: '智能客服测试',
      meta: { title: '智能客服测试' }
    }
  ]
}
export default aiepRouter
