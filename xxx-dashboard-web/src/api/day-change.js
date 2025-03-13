import request from '@/utils/request'

export function getDayChange(query) {
  return request({
    url: '/api/day_change/vw_change',
    method: 'get',
    params: query
  })
}
