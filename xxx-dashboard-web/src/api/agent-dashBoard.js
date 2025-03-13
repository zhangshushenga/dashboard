import request from '@/utils/agentDashboard-request'

export function agentDashboardStat(param) {
  return request({
    url: `/api/v1/screen/ai/agent_log/stat`,
    method: 'get',
    params: param
  })
}

export function agentDashboardTotal(param) {
  return request({
    url: `/api/v1/screen/ai/agent_log/total`,
    method: 'get',
    params: param
  })
}

export function agentDashboardGpuList(param) {
  return request({
    url: `/api/v1/screen/ai/gpu/list`,
    method: 'get',
    params: param
  })
}

export function agentDashboardEventSumaryGenerate(data) {
  return request({
    url: `/api/v1/screen/ai/position/event/summary/generate`,
    method: 'post',
    data
  })
}

export function agentDashboardEventSumaryResult(param, requestId) {
  return request({
    url: `/api/v1/screen/ai/position/event/summary/` + requestId,
    method: 'get',
    params: param
  })
}

export function agentDashboardPressReleaseGenerate(data) {
  return request({
    url: `/api/v1/screen/ai/position/event/news/generate`,
    method: 'post',
    data
  })
}

export function agentDashboardPressReleaseResult(param, requestId) {
  return request({
    url: `/api/v1/screen/ai/position/event/news/` + requestId,
    method: 'get',
    params: param
  })
}

export function agentDashboardPressReleaseImageList(param, requestId) {
  return request({
    url: `/api/v1/screen/ai/position/event/image/list`,
    method: 'get',
    params: param
  })
}

export function agentDashboardEventsImageList(param, requestId) {
  return request({
    url: `/api/v1/screen/ai/event/image/list`,
    method: 'get',
    params: param
  })
}