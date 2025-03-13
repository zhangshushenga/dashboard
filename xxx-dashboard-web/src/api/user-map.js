import request from '@/utils/request'

export function aggsUserMapByParam(query) {
  return request({
    url: '/api/user_map/aggs_by_param',
    method: 'post',
    data: query
  })
}
