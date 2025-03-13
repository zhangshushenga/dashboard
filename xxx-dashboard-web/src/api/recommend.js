import request from '@/utils/request'

export function getDataList(env) {
  return request({
    url: '/api/recommend/data/list?env=' + env,
    method: 'get'
  })
}

export function getDataDetail(key, env) {
  return request({
    url: '/api/recommend/detail?key=' + key + '&env=' + env,
    method: 'get'
  })
}

export function getAttrDownUrl(key, env) {
  return request({
    url: '/api/recommend/attr/url?key=' + key + '&env=' + env,
    method: 'get'
  })
}

export function updateDataDetail(data) {
  return request({
    url: '/api/recommend/detail',
    method: 'put',
    data
  })
}

export function addRecommend(data) {
  return request({
    url: '/api/recommend/add-recommend',
    method: 'post',
    data
  })
}

export function addActivity(data) {
  return request({
    url: '/api/activity',
    method: 'post',
    data
  })
}

export function addActivityPlan(data) {
  return request({
    url: '/api/activity/plan',
    method: 'post',
    data
  })
}

export function previewActivityPlanDeviceNum(data) {
  return request({
    url: '/api/activity/plan/preview_num',
    method: 'post',
    data
  })
}

export function getActivityAllList() {
  return request({
    url: '/api/activity/list',
    method: 'get'
  })
}

export function getActivityList() {
  return request({
    url: '/api/activity/select_list',
    method: 'get'
  })
}

export function getActivityPlanList(params) {
  return request({
    url: '/api/activity/plan/list',
    method: 'get',
    params: params
  })
}

export function getActivityPlanProgressList(params) {
  return request({
    url: '/api/activity/plan/progress/list?planIdList=' + params,
    method: 'get'
  })
}

export function getAggsActivityPlanList(params) {
  return request({
    url: '/api/activity/plan/aggs',
    method: 'get',
    params: params
  })
}

export function getActivityPlanListAll() {
  return request({
    url: '/api/activity/plan/select_list',
    method: 'get'
  })
}

export function opActivityPlan(planId, status) {
  return request({
    url: `/api/activity/plan/${planId}/${status}`,
    method: 'put'
  })
}

