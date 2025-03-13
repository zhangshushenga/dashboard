import request from '@/utils/request'

export function aggsSweepRecordByParam(query) {
  return request({
    url: '/api/sweep_record/aggs_by_param',
    method: 'post',
    data: query
  })
}
