import request from '@/utils/request'

export function getTestDevice() {
  return request({
    url: '/api/device/test_device',
    method: 'get'
  })
}
