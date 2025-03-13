import request from '@/utils/request'

export function getAllDeviceNum() {
  return request({
    url: '/api/device/device_num',
    method: 'get'
  })
}

export function getActivatedDeviceTotalNum() {
  return request({
    url: '/api/device/activated_device_num',
    method: 'get'
  })
}

export function getAllMemoryMapNum() {
  return request({
    url: '/api/device/memory_map_num',
    method: 'get'
  })
}

export function getAllCleanRecordNum() {
  return request({
    url: '/api/device/sweep_record_num',
    method: 'get'
  })
}

export function getActiveDeviceNum() {
  return request({
    url: '/api/device/active_device_num',
    method: 'get'
  })
}

export function getBindData() {
  return request({
    url: '/api/device/aggs_bind_data',
    method: 'get'
  })
}

export function getDeviceNumByDay() {
  return request({
    url: '/api/device/device_num_by_day',
    method: 'get'
  })
}

export function getNewDeviceNumByDay() {
  return request({
    url: '/api/device/new_device_num_by_day',
    method: 'get'
  })
}

export function getNewDeviceNumByDayAndVersion() {
  return request({
    url: '/api/device/aggs_bind_device_fw_by_day',
    method: 'get'
  })
}

export function getOnlineData() {
  return request({
    url: '/api/device/online_data',
    method: 'get'
  })
}

export function getActiveDeviceNumByDay() {
  return request({
    url: '/api/device/active_device_by_day',
    method: 'get'
  })
}

export function getActiveDeviceNumByWeek() {
  return request({
    url: '/api/device/active_device_by_week',
    method: 'get'
  })
}

export function getActiveDeviceNumByMonth() {
  return request({
    url: '/api/device/active_device_by_month',
    method: 'get'
  })
}

export function getFWVersion() {
  return request({
    url: '/api/device/aggs_fw',
    method: 'get'
  })
}

export function getHourCleanData() {
  return request({
    url: '/api/device/aggs_hour_data',
    method: 'get'
  })
}

export function getDayCleanData() {
  return request({
    url: '/api/device/aggs_days_clean_data',
    method: 'get'
  })
}

export function getDayCleanDataByCleanTime() {
  return request({
    url: '/api/device/aggs_days_clean_data_by_clean_time',
    method: 'get'
  })
}

export function getDayCleanDataByCleanSize() {
  return request({
    url: '/api/device/aggs_days_clean_data_by_clean_size',
    method: 'get'
  })
}

export function getDayCleanDataByRechargeNum() {
  return request({
    url: '/api/device/aggs_days_clean_data_by_recharge_num',
    method: 'get'
  })
}

export function getDayCleanDataByCleanMode() {
  return request({
    url: '/api/device/aggs_days_clean_data_by_clean_mode',
    method: 'get'
  })
}

export function getWeekCleanData() {
  return request({
    url: '/api/device/aggs_week_clean_data',
    method: 'get'
  })
}

export function getAccessoryData() {
  return request({
    url: '/api/device/aggs_accessory',
    method: 'get'
  })
}

export function getOfflineAndReason(data) {
  return request({
    url: '/api/device/aggs_offline_and_reason' + data,
    method: 'get'
  })
}

export function getOfflineDeviceNum(data) {
  return request({
    url: '/api/device/aggs_offline_device_num' + data,
    method: 'get'
  })
}

export function aggsRecordsCleanTimeAndSize() {
  return request({
    url: '/api/device/aggs_records_clean_time_and_size',
    method: 'get'
  })
}

export function aggsError() {
  var startTs = new Date().getTime() - 1000 * 60 * 60 * 24 * 60
  return request({
    url: '/api/device/aggs_error?startTs=' + startTs,
    method: 'get'
  })
}

export function getActionLog() {
  return request({
    url: 'api/device/aggs_action_log',
    method: 'get'
  })
}

export function getCleanRecordsByFault() {
  return request({
    url: 'api/device/aggs_days_clean_data_by_error_times',
    method: 'get'
  })
}

export function countCleanRecordsByDeviceBorn(data) {
  return request({
    url: 'api/data/count_clean_data_days_by_device_born' + data,
    method: 'get'
  })
}

export function getAvgCleanData() {
  return request({
    url: '/api/device/avg_clean_data',
    method: 'get'
  })
}

export function getAvgCleanDataByDay() {
  return request({
    url: '/api/device/avg_clean_data_by_day',
    method: 'get'
  })
}
