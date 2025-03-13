import request from '@/utils/request'

export function addPush(data) {
  return request({
    url: '/api/dev-help/push',
    method: 'post',
    data
  })
}

export function addCmd(data) {
  return request({
    url: '/api/dev-help/cmd',
    method: 'post',
    data
  })
}
