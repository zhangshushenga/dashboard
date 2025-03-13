import request from '@/utils/request'

export function getTeamList(data) {
  return request({
    url: '/api/team/list',
    method: 'post',
    data
  })
}

export function addTeam(data) {
  return request({
    url: '/api/team/add ',
    method: 'post',
    data
  })
}

export function deleteTeam(data) {
  return request({
    url: '/api/team/delete',
    method: 'post',
    data
  })
}

export function updateScorePrompt(data) {
  return request({
    url: '/api/team/score-prompt/update',
    method: 'post',
    data
  })
}

export function getScorePrompt(data) {
  return request({
    url: 'api/team/score-prompt/get',
    method: 'post',
    data
  })
}

export function updateScorePromptAll(data) {
  return request({
    url: 'api/team/score-prompt/update-all',
    method: 'post',
    data
  })
}

