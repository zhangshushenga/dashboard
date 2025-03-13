import request from '@/utils/request'
export function getEventTracking(data) {
  return request({
    url: '/api/event_track/list?',
    method: 'get',
    params: data
  })
}

