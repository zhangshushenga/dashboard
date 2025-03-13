import request from '@/utils/request'

export function getAgentVoteList(data) {
  return request({
    url: `/api/v1/ai/agent/vote/list`,
    method: 'post',
    data
  })
}

export function getLabelList() {
  return request({
    url: '/api/v1/ai/agent/vote/label',
    method: 'get'
  })
}

