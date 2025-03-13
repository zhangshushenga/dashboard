import request from '@/utils/request'

export function queryOnce(data) {
    return request({
      url: `/api/stat/llm/do_ai_test`,
      method: 'post',
      data
    })
}

export function getQaList(param) {
  return request({
    url: `/api/openai/getSmartCusQaList`,
    method: 'get',
    params: param
  })
}

//获取测试集列表
export function getImageDataSet(param) {
  return request({
    url: `api/dataset/list`,
    method: 'get',
    params: param
  })
}
//添加图片到测试集
export function addImageToDataSet(dataSetId,data) {
  return request({
    url: `api/dataset/${dataSetId}/image`,
    method: 'post',
    data
  })
}

//获取数据集的图片列表
export function getDataSetImageList(dataSetId,param) {
  return request({
    url: `api/dataset/${dataSetId}/image/list`,
    method: 'get',
    params: param
  })
}

//删除数据集的图片
export function deleteDataSetImage(id) {
  return request({
    url: `api/dataset/image/${id}`,
    method: 'delete'
  })
}

//创建数据集
export function createDataSet(data) {
  return request({
    url: `api/dataset`,
    method: 'post',
    data
  })
}

//创建数据集
export function updateDataSet(dataSetId,data) {
  return request({
    url: `api/dataset/${dataSetId}`,
    method: 'put',
    data
  })
}

//删除数据集
export function deleteDataSet(dataSetId) {
  return request({
    url: `api/dataset/${dataSetId}`,
    method: 'delete'
  })
}

//测试智能客服的prompt
export function openaiChat(data) {
  return request({
    url: `/api/openai/chat`,
    method: 'post',
    data: data
  })
}