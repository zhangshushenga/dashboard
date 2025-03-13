import request from '@/utils/request'

export function getFeedBackWhiteList(param) {
  return request({
    url: `/api/feed_back_white/list`,
    method: 'get',
    params: param
  })
}

export function deleted(id) {
  return request({
    url: `/api/feed_back_white/${id}`,
    method: 'delete'
  })
}

export function create(data) {
  return request({
    url: `/api/feed_back_white`,
    method: 'post',
    data
  })
}

