import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout/index'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

let menuMap = {
  // device
  // 'device': Layout,
  // 'data': Layout,
  // 'metrics': Layout,
  // 'data2': Layout,
  // 'table': Layout,
  'permission': Layout,
  //
  'menu': () => import('@/views/permission/menu'),
  'role': () => import('@/views/permission/role'),
  'project': () => import('@/views/permission/project'),
  'user': () => import('@/views/permission/user'),
  'get-feedback': () => import('@/views/feedback/get-feedback'),
  // 'trouble-trans': () => import('@/views/trouble/trans'),
  'trouble-look': () => import('@/views/trouble/list'),
  // 'trouble-stat': () => import('@/views/trouble/aggs-by-query'),
  'configuration-knowledge': () => import('@/views/configuration/knowledge'),
  'issue-category': () => import('@/views/configuration/feedback/feedback-config'),
  'openai-hot-question': () => import('@/views/configuration/intelligentQA/topQuestions'),
  'faq-setting': () => import('@/views/configuration/intelligentQA/welcomeMessage'),
  // 'phone-num': () => import('@/views/track/phone-num'),
  // 'phone-version': () => import('@/views/track/phone-version'),
  // 'open-app': () => import('@/views/track/open-app'),
  // 'open-app-by-phone': () => import('@/views/track/open-app-by-phone'),
  // 'event-tracking-list': () => import('@/views/track/event-tracking-list'),
  // 'use-path': () => import('@/views/track/use-path')
  'app-data-stat-churned': () => import('@/views/stat/app-data-stat-churned'),
  'app-data-stat-activate': () => import('@/views/stat/app-data-stat-activate'),
  'app-data-stat-connect': () => import('@/views/stat/app-data-stat-connect'),
  'app-data-stat-help-feedback': () => import('@/views/stat/app-data-stat-help-feedback'),
  'app-data-stat-device-status': () => import('@/views/stat/app-data-stat-deviceStatus'),
  'app-data-stat-firmware-upgrade': () => import('@/views/stat/app-data-stat-firmwareUpgrade'),
  'app-data-stat-view-live': () => import('@/views/stat/app-data-stat-viewLive'),
  'app-data-stat-view-event': () => import('@/views/stat/app-data-stat-viewEvent'),
  'app-data-usage-preferences': () => import('@/views/stat/app-data-usage-preferences'),
  'app-data-stat-view-playback': () => import('@/views/stat/app-data-stat-viewPlayback'),
  'app-data-stat-ble-pair': () => import('@/views/stat/app-data-stat-blePair'),
  'app-data-stat-device-bind': () => import('@/views/stat/app-data-stat-deviceBind'),
  'app-data-stat-app-use': () => import('@/views/stat/app-data-stat-appUse'),
  'app-data-stat-daily-user': () => import('@/views/stat/app-data-stat-daily-user'),
  'app-data-stat-daily-device': () => import('@/views/stat/app-data-stat-daily-device'),
  'app-data-stat-off-iot': () => import('@/views/stat/app-data-stat-off-iot'),
  'device-data-stat-ai-sql': () => import('@/views/stat/device-data-stat-ai-sql'),
  'device-event-image': () => import('@/views/picture-recognition/device-event-image'),
  'beta-device-event-image': () => import('@/views/picture-recognition/beta-device-event-image'),
  'user-highlight': () => import('@/views/agents/user-highlight'),
  'agent-config': () => import('@/views/agents/agent-config'),
  'agent-test': () => import('@/views/agents/agent-test'),
  'agent-log': () => import('@/views/agents/agent-log'),
  'agent-log-beta': () => import('@/views/agents/agent-log-beta'),
  'feedback-white': () => import('@/views/feedback/feedback-white'),
  'food-critic': () => import('@/views/agents/food-critic'),
  'pet-imprint': () => import('@/views/agents/pet-imprint'),
  'birds-eye': () => import('@/views/agents/birds-eye'),
  'car-recognize': () => import('@/views/agents/car-recognize'),
  'magic-mirror': () => import('@/views/agents/magic-mirror'),
  'infant-cry': () => import('@/views/agents/infant-cry'),
  'baby-face': () => import('@/views/agents/baby-face'),
  'wear-wisdom': () => import('@/views/agents/wear-wisdom'),
  'baby-talk': () => import('@/views/agents/baby-talk'),
  'pet-moment': () => import('@/views/agents/pet-moment'),
  'view-say-stat': () => import('@/views/stat/view-say-stat'),
  'om-stat': () => import('@/views/picture-recognition/om-qps-stat'),
  'model-stat': () => import('@/views/picture-recognition/model-stat'),
  'device-event-group': () => import('@/views/picture-recognition/device-event-group'),
  'ai_image_all_tag': () => import('@/views/picture-recognition/image_all_tag'),
  'text_search_group': () => import('@/views/picture-recognition/text_search_group'),
  'search_image': () => import('@/views/picture-recognition/search-image'),
  'search-image-history': () => import('@/views/picture-recognition/search-image-history'),
  'app-user': () => import('@/views/summary/app-user.vue'),
  'corporate-user': () => import('@/views/summary/corporate-user.vue'),

  // 'query_once': () => import('@/views/aiep/query_once'),
  // 'image_2_text': () => import('@/views/aiep/image_2_text'),
  // 'eval_tasks': () => import('@/views/aiep/eval_tasks'),

  'qa_list': () => import('@/views/aiep/qa_list'),
  'dataset': () => import('@/views/aiep/clip_test_list'),
  'smart_prompt_test': () => import('@/views/aiep/smart_prompt_test'),
  'evaluate-agent-data': () => import('@/views/evaluate/evaluate.vue'),

  'timeCurator-stat': () => import('@/views/agentsStat/timeCurator-stat'),
  'foodCritic-stat': () => import('@/views/agentsStat/foodCritic-stat'),
  'team': () => import('@/views/permission/team'),
  // 'team-member': () => import('@/views/permission/team-member'),
  'weekreport': () => import('@/views/permission/team-manage')
}

const atomMenuMap = {
  'agent-rank': () => import('@/views/atomStat/agent-rank.vue'),
  'agent-rank-config': () => import('@/views/atomStat/agent-rank-config.vue'),
  'atom-device': () => import('@/views/atomStat/atom-device.vue'),
  'atom-users':  () => import('@/views/atomStat/atom-users'),
  'atom-SDCard':  () => import('@/views/atomStat/atom-SDCard'),
  'atom-app': () => import('@/views/atomStat/atom-app'),
  'atom-live': () => import('@/views/atomStat/atom-live'),
  'atom-event': () => import('@/views/atomStat/atom-event'),
  'atom-playback': () => import('@/views/atomStat/atom-playback'),
  'atom-agent-stream': () => import('@/views/atomStat/atom-agent-stream'),
  'atom-agent-stream-card': () => import('@/views/atomStat/atom-agent-stream-card'),
  'atom-agent-buy': () => import('@/views/atomStat/atom-agent-buy'),
  'atom-store-time': () => import('@/views/atomStat/atom-store-time'),
  'atom-agent-time': () => import('@/views/atomStat/atom-agent-time'),
  'atom-agent-service': () => import('@/views/atomStat/atom-agent-service-statistics.vue'),
  'atom-agent-logs': () => import('@/views/atomStat/atom-agent-log-data.vue'),
  'atom-track-data': () => import('@/views/atomStat/atom-track-data.vue'),
  'atom-user-behaviour': () => import('@/views/atomStat/atom-user-behaviour.vue'),
  'atom-agent-detail-data': () => import('@/views/atomStat/atom-agent-detail-data.vue')
}

menuMap = {...menuMap, ...atomMenuMap}

const actions = {
  generateRoutes({ commit }, menuList) {
    return new Promise(resolve => {
      const env = process.env.NODE_ENV
      let firstSubMenu
      let accessedRoutes = []
      if (env !== 'development') {
        if (menuList !== undefined) {
          for (const menu of menuList) {
            const { subMenuList } = menu
            const subMenu = []
            if (subMenuList) {
              for (const sub of subMenuList) {
                if (menuMap[sub.path] === undefined) {
                  continue
                }
                if (firstSubMenu === undefined) {
                  firstSubMenu = '/' + sub.path
                }
                subMenu.push({
                  path: '/' + sub.path,
                  component: menuMap[sub.path],
                  name: sub.name,
                  meta: {
                    title: sub.title,
                    slug: sub.slug,

                    noCache: true
                  }
                })
              }
            }
            if (subMenu.length === 0) {
              accessedRoutes.push({
                path: '/' + menu.path,
                component: Layout,
                children: [{
                  path: '/' + menu.path,
                  component: menuMap[menu.path],
                  name: menu.name,
                  slug: menu.slug,
                  meta: { title: menu.title, icon: menu.icon, noCache: true }
                }]
              })
            } else {
              accessedRoutes.push({
                path: '/' + menu.path,
                component: menuMap[menu.path] || Layout,
                // component: Layout,
                redirect: 'noRedirect',
                name: menu.name,
                meta: {
                  slug: menu.slug,
                  title: menu.title,
                  icon: menu.icon
                },
                children: subMenu
              })
            }
          }
        }
      } else {
        accessedRoutes = asyncRoutes || []
      }
      // accessedRoutes = asyncRoutes || []
      // const test = asyncRoutes
      // accessedRoutes.push({
      //   path: '/403',
      //   component: import('@/views/error-page/403'),
      //   hidden: true
      // })
      accessedRoutes.push({
        path: '/',
        component: Layout,
        redirect: firstSubMenu
      })
      accessedRoutes.push({ path: '*', redirect: '/401', hidden: true })

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
