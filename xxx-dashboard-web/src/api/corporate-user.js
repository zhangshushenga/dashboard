import request from '@/utils/request'

export function getCorporateList() {
  return request({
    url: '/api/corporateUser/list',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/api/corporateUser',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: '/api/corporateUser/' + id,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/api/corporateUser/' + id,
    method: 'delete'
  })
}
