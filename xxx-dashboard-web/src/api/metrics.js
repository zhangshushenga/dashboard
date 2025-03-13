import request from '@/utils/request'

export function getActionAggsBy15M(query) {
  return request({
    url: '/api/action/aggs_by_15m',
    method: 'get',
    params: query
  })
}

export function getScheduleChange(query) {
  return request({
    url: '/api/sweep_record/schedule_change',
    method: 'get',
    params: query
  })
}

export function getUserLabelChange(query) {
  return request({
    url: '/api/metrics/user-label-change',
    method: 'get',
    params: query
  })
}
