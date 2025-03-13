import request from '@/utils/request'

export function getSchedules(device_id) {
  return request({
    url: '/api/debug/' + device_id + '/schedule',
    method: 'get'
  })
}

export function getDeviceLog(env, deviceId, startDate, endDate, timezone, typeList) {
  return request({
    url: '/api/debug/device_log/list?' + 'deviceId=' + deviceId + '&env=' + env + '&startDate=' + startDate + '&endDate=' + endDate + '&timezone=' + timezone + '&typeList=' + typeList + '&repeatTypeList=' + 1,
    method: 'get'
  })
}

// export function getMapLog(deviceId, startDate, endDate, timezone) {
//   return request({
//     url: '/api/debug/map_log/list?' + 'deviceId=' + deviceId + '&startDate=' + startDate + '&endDate=' + endDate + '&timezone=' + timezone,
//     method: 'get'
//   })
// }

export function getMapLog(param) {
  return request({
    url: '/api/debug/map_log/list',
    method: 'get',
    params: param
  })
}

export function getDownload(data) {
  return request({
    url: '/api/debug/map_log/batch_download',
    method: 'post',
    data
  })
}
