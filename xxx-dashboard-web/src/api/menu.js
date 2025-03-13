import request from '@/utils/request'

export function addMenu(data) {
  return request({
    url: '/api/menu',
    method: 'post',
    data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/api/menu/' + id,
    method: 'put',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: '/api/menu/' + id,
    method: 'delete'
  })
}

export function batchUpdateMenu(data) {
  return request({
    url: '/api/menu/batch',
    method: 'put',
    data
  })
}
