import request from '@/utils/request'

export function getActivateUsers(param) {
    return request({
      url: `/api/stat/daily_activate`,
      method: 'get',
      params: param
    })
  }

export function getChurnedUsers(param) {
  return request({
    url: `/api/stat/churned_users`,
    method: 'get',
    params: param
  })
}


export function getDeviceP2pConnect(param) {
  return request({
    url: `/api/stat/p2p_connect`,
    method: 'get',
    params: param
  })
}

export function getDeviceP2pConnectByInput(param) {
  return request({
    url: `/api/stat/p2p_connect_by_input`,
    method: 'get',
    params: param
  })
}

export function getDeviceP2pConnectWithAiSql(param) {
  return request({
    url: `/api/stat/p2p_connect_by_ai_sql`,
    method: 'get',
    params: param
  })
}

export function getDeviceP2pConnectWithSql(param) {
  return request({
    url: `/api/stat/p2p_connect_by_sql_ai`,
    method: 'get',
    params: param
  })
}

export function getDeviceDataWithSql(param) {
  return request({
    url: `/api/stat/device_data_by_sql_ai`,
    method: 'get',
    params: param
  })
}

export function getSelectChartByUser(param){
  return request({
    url: `/api/stat/charts_by_sql_ai`,
    method: 'get',
    params: param
  })
}

export function getHelpFeedBackClickData(param) {
  return request({
    url: `/api/stat/help_feedback`,
    method: 'get',
    params: param
  })
}

export function getDeviceStatusData(param) {
  return request({
    url: `/api/stat/device_status`,
    method: 'get',
    params: param
  })
}

export function getFirmwareUpgradeData(param) {
  return request({
    url: `/api/stat/firmware_upgrade`,
    method: 'get',
    params: param
  })
}

export function getViewLiveData(param) {
  return request({
    url: `/api/stat/view_live`,
    method: 'get',
    params: param
  })
}

export function getViewEventData(param) {
  return request({
    url: `/api/stat/view_event`,
    method: 'get',
    params: param
  })
}

export function getVideoFrameData(param) {
  return request({
    url: `/api/stat/video_frame`,
    method: 'get',
    params: param
  })
}

export function getFaceTrackData(param) {
  return request({
    url: `/api/stat/face_track`,
    method: 'get',
    params: param
  })
}

export function getViewPlaybackData(param) {
  return request({
    url: `/api/stat/view_playback`,
    method: 'get',
    params: param
  })
}

export function getDailyOffIotData(param) {
  return request({
    url: `/api/stat/daily_off_iot_data`,
    method: 'get',
    params: param
  })
}

export function getBlePairData(param) {
  return request({
    url: `/api/stat/ble_pair`,
    method: 'get',
    params: param
  })
}

export function getDeviceBindData(param) {
  return request({
    url: `/api/stat/device_bind`,
    method: 'get',
    params: param
  })
}
export function getAppUseData(param) {
  return request({
    url: `/api/stat/app_use_time`,
    method: 'get',
    params: param
  })
}
export function getDailyUserData(param) {
  return request({
    url: `/api/stat/daily_user_data`,
    method: 'get',
    params: param
  })
}
export function getDailyDeviceData(param) {
  return request({
    url: `/api/stat/daily_device_data`,
    method: 'get',
    params: param
  })
}

export function getAlarmData(param) {
  return request({
    url: `/api/stat/alarm_data`,
    method: 'get',
    params: param
  })
}

export function getDataBoardBase(param) {
  return request({
    url: `/api/stat/data_board_base`,
    method: 'get',
    params: param
  })
}

export function getDataBoardUseApp(param) {
  return request({
    url: `/api/stat/data_board_use_app`,
    method: 'get',
    params: param
  })
}

export function getDataBoardCount(param) {
  return request({
    url: `/api/stat/data_board_count`,
    method: 'get',
    params: param
  })
}

export function getDataBoardMapCount(param) {
  return request({
    url: `/api/stat/data_board_map_count`,
    method: 'get',
    params: param
  })
}

export function getQuickSearchList(param) {
  return request({
    url: `/api/stat/quick_search/list`,
    method: 'get',
    params: param
  })
}

export function addQuickSearch(data) {
  return request({
    url: `/api/stat/quick_search/create`,
    method: 'post',
    data: data
  })
}

export function updateQuickSearch(data) {
  return request({
    url: `/api/stat/quick_search/update`,
    method: 'post',
    data: data
  })
}

export function deleteQuickSearch(data) {
  return request({
    url: `/api/stat/quick_search/delete`,
    method: 'post',
    data: data
  })
}
 
export function getDailyFirstActivityDevice(param) {
  return request({
    url: `/api/stat/daily_first_activity_devices`,
    method: 'get',
    params: param
  })
}

export function getDailyNewUsers(param) {
  return request({
    url: `/api/stat/daily_new_users`,
    method: 'get',
    params: param
  })
}

export function getUserBindDevices(param) {
  return request({
    url: `/api/stat/user_bind_devices`,
    method: 'get',
    params: param
  })
}

export function getRviBaseData(param) {
  return request({
    url: `/api/stat/rvi_users_devices_data`,
    method: 'get',
    params: param
  })
}

export function getRviBehaviorData(param) {
  return request({
    url: `/api/stat/rvi_user_behavior_data`,
    method: 'get',
    params: param
  })
}

