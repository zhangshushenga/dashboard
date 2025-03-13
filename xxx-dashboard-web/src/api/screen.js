import request from '@/utils/request'

export function getScreenCleanCount() {
  return request({
    url: '/api/screen/clean_count',
    method: 'get'
  })
}

export function getScreenCleanRate() {
  return request({
    url: '/api/screen/clean_rate',
    method: 'get'
  })
}

export function getScreenCleanType() {
  return request({
    url: '/api/screen/clean_type',
    method: 'get'
  })
}

export function getScreenDeviceLocation() {
  return request({
    url: '/api/screen/device_location',
    method: 'get'
  })
}
