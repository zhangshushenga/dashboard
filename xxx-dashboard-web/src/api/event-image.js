import request from '@/utils/request'

export function getEventImageList(param) {
  return request({
    url: `/api/ai/user/history/event/list`,
    method: 'get',
    params: param
  })
}

export function getBetaEventImageList(param) {
  return request({
    url: `/api/ai/beta_user/history/event/list`,
    method: 'get',
    params: param
  })
}

export function getEventGroupList(param) {
  return request({
    url: `/api/ai/user/history/event/group/list`,
    method: 'get',
    params: param
  })
}

export function getImageAllTag(param) {
  return request({
    url: `/api/ai/user/history/get_image_all_tag`,
    method: 'get',
    params: param
  })
}

export function getTagImageDetail(param) {
  return request({
    url: `/api/ai/user/history/image_all_tag/search`,
    method: 'get',
    params: param
  })
}

export function getTextSearchGroup(param) {
  return request({
    url: `/api/ai/user/history/text_search_image`,
    method: 'get',
    params: param
  })
}

export function getS3URL(param) {
  return request({
    url: `/api/ai/user/history/s3_url`,
    method: 'get',
    params: param
  })
}

export function getSearchImage(param) {
  return request({
    url: `/api/ai/user/history/search_image`,
    method: 'get',
    params: param
  })
}

export function getLlamaDescriptionResquest(param) {
  return request({
    url: `/api/ai/user/history/get_hl_desc`,
    method: 'get',
    params: param
  })
}
