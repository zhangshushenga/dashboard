import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/api/user/list',
    method: 'get'
  })
}

export function getRoleList() {
  return request({
    url: '/api/role/list',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: '/api/user/' + id,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/api/user/' + id,
    method: 'delete'
  })
}
