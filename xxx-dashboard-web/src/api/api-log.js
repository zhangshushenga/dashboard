import request from '@/utils/request'

export function aggsByParam(param) {
  return request({
    url: `/api/api_log/aggs_by_param`,
    method: 'get',
    params: param
  })
}

export function getApiLogList(param) {
  return request({
    url: `/api/api_log/list`,
    method: 'get',
    params: param
  })
}
