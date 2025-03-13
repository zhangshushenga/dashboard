import request from '@/utils/ts-request'

export function getLastImportTime() {
  return request({
    url: `/ts-api/issue/latest-import-time`,
    method: 'get'
  })
}

export function importToServer(data) {
  return request({
    url: '/ts-api/issue/import_from_wdc',
    method: 'post',
    data
  })
}

export function getTSList(param) {
  return request({
    url: `/ts-api/issue/list`,
    method: 'get',
    params: param
  })
}

export function getTSDetail(issueId) {
  return request({
    url: `/ts-api/issue/${issueId}`,
    method: 'get'
  })
}

export function getAssignUserList(showAll) {
  return request({
    url: `/ts-api/user/select-list?showAll=` + showAll,
    method: 'get'
  })
}

export function modifyTsCat(data) {
  return request({
    url: `/ts-api/issue/issue-type`,
    method: 'put',
    data
  })
}

export function modifyTsAssignUser(issueId, newAssignUserId) {
  return request({
    url: `/ts-api/issue/${issueId}/assign/${newAssignUserId}`,
    method: 'put'
  })
}

export function modifyTsPriority(issueId, newPriority) {
  return request({
    url: `/ts-api/issue/${issueId}/priority/${newPriority}`,
    method: 'put'
  })
}

export function modifyTsStatus(issueId, newStatus) {
  return request({
    url: `/ts-api/issue/${issueId}/status/${newStatus}`,
    method: 'put',
    data: {}
  })
}

export function sendWeekReportToSelf() {
  return request({
    url: `/ts-api/issue/week-report-to-self`,
    method: 'get'
  })
}

export function sendWeekReport() {
  return request({
    url: `/ts-api/issue/week-report`,
    method: 'get'
  })
}

export function aggsByParam(type, param) {
  if (type === 2) {
    return request({
      url: `/ts-api/issue-stat/search-by-pie`,
      method: 'post',
      data: param
    })
  } else {
    return request({
      url: `/ts-api/issue-stat/search-by-bar`,
      method: 'post',
      data: param
    })
  }
}

export function getOperationHistory(issueId) {
  return request({
    url: `/ts-api/issue/${issueId}/history`,
    method: 'get'
  })
}

export function sendComment(issueId, data) {
  return request({
    url: `/ts-api/issue/${issueId}/comment`,
    method: 'post',
    data
  })
}

export function deleteIssue(issueId) {
  return request({
    url: `/ts-api/issue/${issueId}`,
    method: 'delete'
  })
}
