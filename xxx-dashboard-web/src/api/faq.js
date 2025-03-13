import request from '@/utils/request'

export function faqSearch(content) {
  const data = {
    content: content
  }
  return request({
    url: `/api/faq/search`,
    method: 'post',
    data
  })
}

/**
 * 获取faq分类
 * @param param
 * @returns {*}
 */
export function getFaqCategories(param) {
  return request({
    url: `/api/faq/categories`,
    method: 'get',
    params: param
  })
}

/**
 * faq分类排序
 * @param data 参数如下按排序好顺序传递id
 * [
 *     {
 *         "id": 1
 *     },
 *     {
 *         "id": 2
 *     },
 *     {
 *         "id": 3
 *     },
 *     {
 *         "id": 4
 *     }
 * ]
 *
 * @returns {*}
 */
export function sortFaqCategory(data) {
  return request({
    url: `/api/faq/category/sort`,
    method: 'post',
    data
  })
}

/**
 * 创建faq分类
 * @param data
 * {
 *     "parentId": 0, // 如果是二级分类需要传一级的id，一级可以不传
 *     "name": "名称",
 *     "icon": "iconUrl"
 * }
 * @returns {*}
 */
export function createFaqCategory(data) {
  return request({
    url: `/api/faq/category`,
    method: 'post',
    data
  })
}

/**
 * 更新faq分类
 * @param categoryId
 * @param data
 * {
 *     "name": "名称",
 *     "icon": "iconUrl"
 * }
 * @returns {*}
 */
export function updateFaqCategory(categoryId, data) {
  return request({
    url: `/api/faq/category/${categoryId}`,
    method: 'put',
    data
  })
}

/**
 * 删除faq分类
 * @param categoryId
 * @returns {*}
 */
export function deleteFaqCategory(categoryId) {
  return request({
    url: `/api/faq/category/${categoryId}`,
    method: 'delete'
  })
}

/**
 * 获取faq list
 * @param param 支持传以下4个字段 正常来说用前两个就够了
 * {
 *     "category": 1,
 *     "subCategory": 2,
 *     "categoryList": [
 *         1,
 *         2
 *     ],
 *     "subCategoryList": [
 *         1,
 *         2
 *     ]
 * }
 * @returns {*}
 */
export function getFaqList(param) {
  return request({
    url: `/api/faq/list`,
    method: 'get',
    params: param
  })
}

/**
 * faq排序
 * @param data 参数如下按排序好顺序传递id
 * [
 *     {
 *         "id": 1
 *     },
 *     {
 *         "id": 2
 *     },
 *     {
 *         "id": 3
 *     },
 *     {
 *         "id": 4
 *     }
 * ]
 * @returns {*}
 */
export function sortFaq(data) {
  return request({
    url: `/api/faq/sort`,
    method: 'post',
    data
  })
}

/**
 * 获取faq 详情
 * @param faqId
 * @returns {*}
 */
export function getFaqDetail(faqId, param) {
  return request({
    url: `/api/faq/${faqId}`,
    method: 'get',
    params: param
  })
}

/**
 * 创建faq
 * @param data 参数如下
 * {
 *     "category": 1,
 *     "subCategory": 2,
 *     "title": "title",
 *     "content": "content"
 * }
 * @returns {*}
 */
export function createFaq(data) {
  return request({
    url: `/api/faq/`,
    method: 'post',
    data
  })
}

/**
 * 更新faq
 * @param faqId
 * @param data
 * {
 *     "category": 1,
 *     "subCategory": 2,
 *     "title": "title",
 *     "content": "content"
 * }
 * @returns {*}
 */
export function updateFaq(faqId, data) {
  return request({
    url: `/api/faq/${faqId}`,
    method: 'put',
    data
  })
}

/**
 * 删除faq
 * @param faqId
 * @returns {*}
 */
export function deleteFaq(faqId) {
  return request({
    url: `/api/faq/${faqId}`,
    method: 'delete'
  })
}

/**
 * 发布faq
 * @param faqId
 * @returns {*}
 */
export function deployFaq(faqId) {
  return request({
    url: `/api/faq/${faqId}/deploy`,
    method: 'post'
  })
}

/**
 * 停用faq
 * @param faqId
 * @returns {*}
 */
export function undeployFaq(faqId) {
  return request({
    url: `/api/faq/${faqId}/undeploy`,
    method: 'post'
  })
}

/**
 * 批量删除faq
 * @param faqIdList 比如 [2,3,4]
 * @returns {*}
 */
export function batchDeleteFaq(faqIdList) {
  return request({
    url: `/api/faq/batch`,
    method: 'delete',
    data: faqIdList
  })
}

/**
 * 批量发布faq
 * @param faqIdList 比如 [2,3,4]
 * @returns {*}
 */
export function batchDeployFaq(faqIdList) {
  return request({
    url: `/api/faq/batch/deploy`,
    method: 'post',
    data: faqIdList
  })
}

/**
 * 批量停用faq
 * @param faqIdList 比如 [2,3,4]
 * @returns {*}
 */
export function batchUndeployFaq(faqIdList) {
  return request({
    url: `/api/faq/batch/undeploy`,
    method: 'post',
    data: faqIdList
  })
}

