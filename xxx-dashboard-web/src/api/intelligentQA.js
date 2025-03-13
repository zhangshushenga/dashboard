import request from '@/utils/request'

/**
   * 获取热门问题
   * @param param 支持传以下4个字段 正常来说用前两个就够了
   * [{
   *     "id": "",
   *     "question": "",
   *     "answer": "",
   *     "multiLanguageMap": {
   *        "en": {
   *            "question": "",
   *            "answer": ""
   *        }
   *    }
   * }]
   * @returns {*}
   */
export function getHotQuestionList(param) {
    return request({
      url: `/api/openai_hot_question/list`,
      method: 'get',
      params: param
    })
  }

/**
 * 创建热门问题
 * @param data
{
   *     "question": "",
   *     "answer": "",
   *     "multiLanguageMap": {
   *        "en": {
   *            "question": "",
   *            "answer": ""
   *        }
   *    }
   * }
 * @returns {*}
 */
export function createHotQuestion(data) {
    return request({
      url: `/api/openai_hot_question`,
      method: 'post',
      data
    })
  }

/**
 * 更新热门问题
 * @param categoryId
 * @param data
 {
   *     "question": "",
   *     "answer": "",
   *     "multiLanguageMap": {
   *        "en": {
   *            "question": "",
   *            "answer": ""
   *        }
   *    }
   * }
 * @returns {*}
 */
export function updateHotQuestion(questionId, data) {
    return request({
      url: `/api/openai_hot_question/${questionId}`,
      method: 'put',
      data
    })
  }
  
  /**
   * 删除热门问题
   * @param questionId
   * @returns {*}
   */
  export function deleteHotQuestion(questionId) {
    return request({
      url: `/api/openai_hot_question/${questionId}`,
      method: 'delete'
    })
  }

  
/**
 * 获取欢迎语列表
 * @param {*} param 
 * @returns 
 */
  export function getWelcomeMessageList(param) {
    return request({
      url: `/api/faq_setting/list`,
      method: 'get',
      params: param
    })
  }


  /**
   * 更新欢迎语
   * @param {*} messageId 
   * @param {*} data 
   * @returns 
   */
  export function updateWelcomeMessage(messageId, data) {
    return request({
      url: `/api/faq_setting/${messageId}`,
      method: 'put',
      data
    })
  }