import request from '@/utils/request'

export function getPhoneVersionNum(param) {
  return request({
    url: `/api/event_track/get_phone_version_num`,
    method: 'get',
    params: param
  })
}

export function getPhoneNum(param) {
  return request({
    url: `/api/event_track/get_phone_num`,
    method: 'get',
    params: param
  })
}

export function getOpenAppTimesByDay() {
  return request({
    url: `/api/event_track/get_open_app_times_by_day`,
    method: 'get'
  })
}

export function getOpenAppTimesByPhoneByDay() {
  return request({
    url: `/api/event_track/get_open_app_times_by_phone_by_day`,
    method: 'get'
  })
}

export function getOpenAppUsePath(param) {
  return request({
    url: `/api/event_track/get_app_use_path`,
    method: 'get',
    params: param
  })
}

export function getIssueList(param) {
  return request({
    url: `/api/issue/list`,
    method: 'get',
    params: param
  })
}

export function acceptIssue(data) {
  return request({
    url: '/api/issue/accept',
    method: 'post',
    data
  })
}

export function getIssueAllCategory() {
  return request({
    url: '/api/issue/category/list',
    method: 'get'
  })
}

export function getIssueCategories() {
  return request({
    url: '/api/issue/categories',
    method: 'get'
  })
}

export function getIssueDetail(issueId) {
  return request({
    url: `/api/issue/${issueId}`,
    method: 'get'
  })
}

export function updateIssue(data) {
  return request({
    url: `/api/issue/`,
    method: 'put',
    data
  })
}

export function getIssueComment(issueId, param) {
  return request({
    url: `/api/issue/${issueId}/comment/list`,
    method: 'get',
    params: param
  })
}

export function addIssueComment(issueId, data) {
  return request({
    url: `/api/issue/${issueId}/comment`,
    method: 'post',
    data
  })
}

export function closeIssue(issueId) {
  const data = {
    'id': issueId
  }
  return request({
    url: `/api/issue/close`,
    method: 'post',
    data
  })
}

export function faqSearch(content) {
  const data = {
    content: content
  }
  return request({
    url: `/api/faq/search`,
    method: 'post',
    data
  })
}

export function getDownloadfile(dowloadUrl) {
  return request({
    url: dowloadUrl,
    method: 'get',
    responseType: 'blob'
  })
}

export function importToTb(data) {
  return request({
    url: `/api/issue/import_to_tb`,
    method: 'post',
    data
  })
}

export function analysisIssueLog(issueId) {
  return request({
    url: `/api/issue/${issueId}/analysis_log`,
    method: 'get'
  })
}
export function analysisIssueLogResult(issueId) {
  return request({
    url: `/api/issue/${issueId}/analysis_log/result`,
    method: 'get'
  })
}

export function resendDeviceLog(issueId) {
  return request({
    url: `/api/issue/${issueId}/resend_log`,
    method: 'get'
  })
}
