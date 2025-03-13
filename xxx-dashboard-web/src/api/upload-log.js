import request from '@/utils/request'

export function sendUploadLogAction(deviceId) {
  return request({
    url: `/api/iot/upload_log/${deviceId}`,
    method: 'post'
  })
}

export function getUploadLogList(deviceId) {
  return request({
    url: `/api/iot/upload_log/${deviceId}/list`,
    method: 'get'
  })
}
export function getLogDownloadUrl(deviceId, fileId) {
  return request({
    url: `/api/iot/upload_log/${deviceId}/${fileId}/download`,
    method: 'get'
  })
}
export function checkAndGetDownloadUrl(deviceId, fileId) {
  return request({
    url: `/api/iot/upload_log/${deviceId}/${fileId}/check`,
    method: 'get'
  })
}
