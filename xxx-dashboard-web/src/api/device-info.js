import request from '@/utils/request'

export function getDeviceInfo(deviceId, timezone) {
  return request({
    url: `/api/debug/${deviceId}/info?timezone=` + timezone,
    method: 'get'
  })
}

export function getDeviceRecords(params) {
  return request({
    url: `/api/data/get_device_records?` + params,
    method: 'get'
  })
}
