import request from '@/utils/request'

export function getUnreadCount() {
  return request({
    url: '/api/notification/count',
    method: 'get'
  })
}

export function getNotificationList(param) {
  return request({
    url: `/api/notification/search`,
    method: 'get',
    params: param
  })
}

export function markNotificationRead(data) {
  return request({
    url: `/api/notification/mark_read`,
    method: 'post',
    data
  })
}
