import request from '@/utils/request'

export function getDeviceSettingCleanLevel() {
  return request({
    url: '/api/device/aggs_device_clean_level',
    method: 'get'
  })
}

export function getDeviceSettingMute() {
  return request({
    url: '/api/device/aggs_device_mute',
    method: 'get'
  })
}

export function getDeviceNightSettingMute() {
  return request({
    url: '/api/device/aggs_night_device_mute',
    method: 'get'
  })
}

export function getDeviceSchedule(query_value) {
  return request({
    url: '/api/device/aggs_device_schedule' + '?' + 'query_value=' + query_value,
    method: 'get'
  })
}

export function getDeviceVersion(versions) {
  return request({
    url: '/api/data/count_device_version' + '?' + 'versions=' + versions,
    method: 'get'
  })
}

export function getDeviceProfile(deviceId) {
  return request({
    url: 'api/data/get_device_profile' + '?' + 'device_id=' + deviceId,
    method: 'get'
  })
}

export function countRecordsByDeviceId(deviceId, timezone) {
  return request({
    url: 'api/data/count_clean_data_by_device' + '?' + 'device_id=' + deviceId + '&' + 'time_zone=' + timezone,
    method: 'get'
  })
}

export function getDashboardData() {
  return request({
    url: '/api/schedule/dashboard',
    method: 'get'
  })
}
