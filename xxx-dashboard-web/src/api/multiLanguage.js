import request from '@/utils/request'

/**
 * 获取当前平台支持的多语言
 * @param param
 * @returns {*}
 */
export function getMultiLanguage() {
  return request({
    url: `/api/multi_language`,
    method: 'get'
  })
}