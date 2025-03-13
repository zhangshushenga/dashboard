import request from '@/utils/request'

export function saveDate(data) {
  return request({
    url: `/api/screen/demo_event/start_time`,
    method: 'put',
    data
  })
}

export function getTime() {
  return request({
    url: `/api/screen/demo_event/start_time`,
    method: 'get'
  })
}

export function saveDemoConfig(data) {
  return request({
    url: `/api/screen/demo_event/config`,
    method: 'put',
    data
  })
}

export function getDemoConfig() {
  return request({
    url: `/api/screen/demo_event/config`,
    method: 'get'
  })
}
