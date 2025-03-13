import request from '@/utils/ts-request'

export function importFromWdc(data) {
  return request({
    url: '/ts-api/issue/import_from_wdc',
    method: 'post',
    data: data
  })
}

export function getTotpCode() {
  return request({
    url: '/ts-api/wdc/totp',
    method: 'get'
  })
}
