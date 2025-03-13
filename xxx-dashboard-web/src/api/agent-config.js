import request from '@/utils/request'

export function getAgentList(param) {
  return request({
    url: `/api/agent_config/list`,
    method: 'get',
    params: param
  })
}

export function getLogList(param) {
  return request({
    url: `/api/agent_test/agent_config_log/list`,
    method: 'get',
    params: param
  })
}

export function getAgentLogList(param) {
  return request({
    url: `/api/agent_log/list`,
    method: 'get',
    params: param
  })
}

export function getBetaAgentLogList(param) {
  return request({
    url: `/api/agent_log/list/beta`,
    method: 'get',
    params: param
  })
}

export function getAgentLogInfo(param) {
  return request({
    url: `/api/agent_log/info`,
    method: 'get',
    params: param
  })
}

export function getAgentSelectList(param) {
  return request({
    url: `/api/agent_config/select_list`,
    method: 'get',
    params: param
  })
}

export function getAgentBetaSelectList(param) {
  return request({
    url: `/api/agent_config/select_list/beta`,
    method: 'get',
    params: param
  })
}

export function createAgentConfig(data) {
  return request({
    url: `/api/agent_config`,
    method: 'post',
    data
  })
}

/**
 * 更新
 * @param agentCofigId
 * @param data
 * @returns {*}
 */
export function updateAgentConfig(agentCofigId, data) {
  return request({
    url: `/api/agent_config/${agentCofigId}`,
    method: 'put',
    data
  })
}

/**
 * 更新 prompt
 * @param agentCofigId
 * @param data
 * @returns {*}
 */
export function updateAgentConfigPrompt(agentCofigId, data) {
  return request({
    url: `/api/agent_config/${agentCofigId}/prompt`,
    method: 'put',
    data
  })
}

export function generateRequest(data) {
  return request({
    url: `/api/agent_test/generate`,
    method: 'post',
    data
  })
}

export function getResult(requestId) {
  return request({
    url: `/api/agent_test/` + requestId,
    method: 'get'
  })
}

export function getImageUrl(param) {
  return request({
    url: `/api/agent_test/image`,
    method: 'get',
    params: param
  })
}
