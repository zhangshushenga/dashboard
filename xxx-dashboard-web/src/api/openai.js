import request from '@/utils/request'

/**
 * 智能回复
 * @param question 提问内容
 * @returns 返回的 data 是回复
 */
export function openaiChat(question) {
  const data = {
    'question': question
  }
  return request({
    url: `/api/openai/chat`,
    method: 'post',
    data: data
  })
}

/**
 * 翻译反馈内容
 * @param issueId issueId
 * @param content 翻译内容
 * @returns 返回的 data 是翻译
 */
export function translationIssueContent(issueId, content) {
  const data = {
    'content': content,
    'type': 1,
    'refId': issueId
  }
  return request({
    url: `/api/openai/translation`,
    method: 'post',
    data: data
  })
}

/**
 * 翻译反馈内容
 * @param commentId commentId
 * @param content 翻译内容
 * @returns 返回的 data 是翻译
 */
export function translationComment(commentId, content) {
  const data = {
    'content': content,
    'type': 2,
    'refId': commentId
  }
  return request({
    url: `/api/openai/translation`,
    method: 'post',
    data: data
  })
}
/**
 * 翻译内容
 * @param content 翻译内容
 * @returns 返回的 data 是翻译
 */
export function translation(languageType, content) {
  const data = {
    'content': content,
    'type': 0,
    'languageType': languageType
  }

  console.log(data)
  return request({
    url: `/api/openai/translation`,
    method: 'post',
    data: data
  })
}
