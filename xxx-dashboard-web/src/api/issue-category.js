import request from '@/utils/request'
/**
 * 创建问题分类
 * @param {*} name 标签/分类名称
 * @returns 
 */
export function creatIssueCategory(data) {
  return request({
    url: `/api/issue/category`,
    method: 'post',
    data
  })
}

/**
 * 获取反馈配置
 * @returns 反馈配置列表
 */
export function getIssueCategoryList(param) {
    return request({
        url: `/api/issue/category/list`,
        method: 'get',
        params: param
    })
}

/**
 * 删除分类
 * @param {*} categoryId 标签/分类id
 * @returns 
 */
export function deleteIssueCategory(categoryId) {
    return request({
        url: `/api/issue/category/${categoryId}`,
        method: 'delete'
    })
}

/**
 * 排序分类
 * @param {*} data 排序后的列表
 * @returns 
 */
export function sortIssueCategory(data) {
    return request({
        url: `/api/issue/category/sort`,
        method: 'post',
        data
    })
}


/**
 * 更新分类
 * @param {*} categoryId 分类id
 * @param {*} data 分类数据
 * @returns 
 */
export function updateIssueCategory(categoryId, data) {
    return request({
        url: `/api/issue/category/${categoryId}`,
        method: 'put',
        data
      })
}

/**
 * 批量更新分类
 * @param {*} data 批量修改好的数据
 */
export function batchUpdateIssueCategories(data) {
    return request({
        url: `/api/issue/category/update`,
        method: 'put',
        data
    })
}