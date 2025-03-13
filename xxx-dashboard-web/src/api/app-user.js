import request from '@/utils/request'

export function getUserList(corporateId) {
  return request({
    url: '/api/appUser/list/' + corporateId,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/api/appUser',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: '/api/appUser/' + id,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/api/appUser/' + id,
    method: 'delete'
  })
}
