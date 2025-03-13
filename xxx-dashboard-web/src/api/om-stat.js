import request from '@/utils/request'

export function aggsOmStat(query) {
  return request({
    url: '/api/om/stat/qps',
    method: 'get',
    params: query
  })
}

export function aggsModelStat(query) {
  return request({
    url: '/api/om/stat/model',
    method: 'get',
    params: query
  })
}

export function getViewSayUserNum(query) {
  return request({
    url: '/api/stat/viewsay/user_num',
    method: 'get',
    params: query
  })
}

export function getViewSayDeviceNum(query) {
  return request({
    url: '/api/stat/viewsay/device_num',
    method: 'get',
    params: query
  })
}
