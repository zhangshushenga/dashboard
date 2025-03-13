import request from '@/utils/request'

export function sendCode(data) {
  return request({
    url: '/api/sys/sendVerCode',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/api/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/profile',
    method: 'get',
    params: { token }
  })
}

export function bindWechat(code) {
  return request({
    url: '/api/user/profile/bind_wechat',
    method: 'get',
    params: { code }
  })
}

export function loginByWechat(code) {
  return request({
    url: '/api/sys/login_by_wechat',
    method: 'get',
    params: { code }
  })
}

export function logout() {
  return {
    'code': 1,
    'data': 'success'
  }
}

export function getAllUser() {
  return request({
    url: '/api/user/list',
    method: 'get'
  })
}

export function getIssueUserList() {
  return request({
    url: '/api/issue/user/list',
    method: 'get'
  })
}

export function loginByOw(token) {
  return request({
    url: '/api/sys/loginByOw',
    method: 'get',
    params: { token }
  })
}
