import request from '@/utils/request'

export function getProjects() {
  return request({
    url: '/api/project/list ',
    method: 'get'
  })
}

export function addProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}

export function updateProject(id, data) {
  return request({
    url: '/api/project/' + id,
    method: 'put',
    data
  })
}

export function deleteProject(id) {
  return request({
    url: '/api/project/' + id,
    method: 'delete'
  })
}

export function getServiceTypeList() {
  return request({
    url: '/api/project/service_type/list',
    method: 'get'
  })
}
