import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

/* Router Modules */
import statRouter from './modules/stat'
import troubleRouter from './modules/trouble'
import configRouter from './modules/config'
import eventImageRouter from './modules/event-image'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/WWW_verify_DLMtfIw72dpaoEhm.txt',
    component: () => import('@/views/wx/verify'),
    hidden: true
  },
  {
    path: '/wechat-help',
    component: () => import('@/views/wx/help'),
    hidden: true
  },
  {
    path: '/login-by-ow',
    component: () => import('@/views/openwebui/manager-login'),
    hidden: true
  },
  {
    path: '/bind-wechat',
    component: () => import('@/views/wx/bind-wechat'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/creat-faq',
    meta: { title: '新增知识' },
    component: () => import('@/views/configuration/knowledge-creat'),
    hidden: true
  },
  {
    path: '/faq_detail',
    meta: { title: '编辑知识' },
    component: () => import('@/views/configuration/knowledge-creat'),
    hidden: true
  },
  {
    path: '/trouble_detail',
    component: () => import('@/components/Trouble/DialogIssueDetail'),
    hidden: true
  },
  {
    path: '/data-stat-dashboard',
    component: () => import('@/views/stat/data-stat-dashboard'),
    hidden: true
  },
  {
    path: '/summary-config',
    meta: { title: 'Config' },
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/summary/summary-config'),
      props: route => ({ corporateId: route.query.corporateId }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/team-member',
    meta: { title: 'Config' },
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/permission/team-member'),
      props: route => ({ team_id: route.query.team_id, team_name: route.query.team_name }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/app-user',
    meta: { title: 'AppUser' },
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/summary/app-user.vue'),
      props: route => ({ corporateId: route.query.corporateId }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/device-event-group-image',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/picture-recognition/event-group-detail'),
      props: route => ({ groupId: route.query.group_id }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/evaluate-agentLog-detail',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/evaluate/evaluate-agentLog-detail'),
      props: route => ({ id: route.query.id }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/image_tag_detail',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/picture-recognition/image_tag_detail'),
      props: route => ({ id: route.query.id, label: route.query.label }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/text_search_image',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/picture-recognition/text_search_image'),
      props: route => ({ searchContent: route.query.searchContent }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/search_image',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/picture-recognition/search-image'),
      // searchKey: row.id, deviceId: row.deviceId, userId: row.userId
      props: route => ({
        content: route.query.content,
        searchKey: route.query.searchKey,
        deviceId: route.query.deviceId,
        userId: route.query.userId
      }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/search-image-history',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/picture-recognition/search-image-history'),
      // searchKey: row.id, deviceId: row.deviceId, userId: row.userId
      props: route => ({
        content: route.query.content,
        searchKey: route.query.searchKey,
        deviceId: route.query.deviceId,
        userId: route.query.userId
      }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  {
    path: '/team-member',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/permission/team-member'),
      props: route => ({ team_id: route.query.team_id, team_name: route.query.team_name }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/trouble-look'
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/data_set_detail',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/aiep/data_set_detail'),
      props: route => ({ dataSetId: route.query.data_set_id, dataSetType: route.query.data_set_type, dataSetName: route.query.data_set_name }) // 使用 props 函数来传递路由参数
    }],
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/

  troubleRouter,
  statRouter,
  configRouter,
  eventImageRouter,
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/permission/menu'),
        name: 'MenuPermission',
        meta: {
          title: 'Menu Permission',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      },
      {
        path: 'project',
        component: () => import('@/views/permission/project'),
        name: 'ProjectPermission',
        meta: {
          title: 'Project Permission',
          roles: ['admin']
        }
      },
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'UserPermission',
        meta: {
          title: 'User Permission',
          roles: ['admin']
        }
      },
      {
        path: 'team',
        component: () => import('@/views/permission/team'),
        name: 'TeamPermission',
        meta: {
          title: 'Team Permission',
          roles: ['admin']
        }
      },
      {
        path: 'team-manage',
        component: () => import('@/views/permission/team-manage'),
        name: 'team-manage',
        meta: {
          title: 'Team Manage',
          roles: ['admin']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
