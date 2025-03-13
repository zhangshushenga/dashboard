import request from '@/utils/request'

export function getReportSearchData(param) {
  return request({
    url: 'api/reports/search',
    method: 'get',
    params: param
  })
}

export function getYearMonthData() {
  return request({
    url: 'api/reports/week',
    method: 'get',
    params: {}
  })
}