import request from '@/utils/request'

export function getMapRooms() {
  return request({
    url: '/api/device/aggs_room_num',
    method: 'get'
  })
}

export function getMapVms() {
  return request({
    url: '/api/device/aggs_vw',
    method: 'get'
  })
}