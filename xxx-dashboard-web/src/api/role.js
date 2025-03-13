import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/api/menu/list',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/api/role/list ',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/api/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/api/role/'+id,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/api/role/'+id,
    method: 'delete'
  })
}
