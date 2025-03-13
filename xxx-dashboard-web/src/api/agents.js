import request from '@/utils/request'

export function generateUserHighlight(param) {
  return request({
    url: `/api/agents/user_highlight/generate`,
    method: 'get',
    params: param
  })
}

export function getUserHighlight(requestId) {
  return request({
    url: `/api/agents/user_highlight/` + requestId,
    method: 'get'
  })
}

export function generateFoodCritic(data) {
  return request({
    url: `/api/agents/food_critic/generate`,
    method: 'post',
    data
  })
}

export function getFoodCritic(requestId) {
  return request({
    url: `/api/agents/food_critic/` + requestId,
    method: 'get'
  })
}

export function generatePetImprint(data) {
  return request({
    url: `/api/agents/pet_imprint/generate`,
    method: 'post',
    data
  })
}

export function getPetImprint(requestId) {
  return request({
    url: `/api/agents/pet_imprint/` + requestId,
    method: 'get'
  })
}

export function generateBaByFace(data) {
  return request({
    url: `/api/agents/baby_face/generate`,
    method: 'post',
    data
  })
}

export function getBaByFace(requestId) {
  return request({
    url: `/api/agents/baby_face/` + requestId,
    method: 'get'
  })
}

export function getBaByFaceImage() {
  return request({
    url: `/api/agents/baby_face/image`,
    method: 'get'
  })
}

export function generateWearWisdom(data) {
  return request({
    url: `/api/agents/wear_wisdom/generate`,
    method: 'post',
    data
  })
}

export function getWearWisdom(requestId) {
  return request({
    url: `/api/agents/wear_wisdom/` + requestId,
    method: 'get'
  })
}

export function getWearWisdomImage() {
  return request({
    url: `/api/agents/wear_wisdom/image`,
    method: 'get'
  })
}

export function generateBabyTalk(data) {
  return request({
    url: `/api/agents/baby_talk/generate`,
    method: 'post',
    data
  })
}

export function getBabyTalk(requestId) {
  return request({
    url: `/api/agents/baby_talk/` + requestId,
    method: 'get'
  })
}

export function getBabyTalkImage() {
  return request({
    url: `/api/agents/baby_talk/image`,
    method: 'get'
  })
}

export function generatePetMoment(data) {
  return request({
    url: `/api/agents/pet_moment/generate`,
    method: 'post',
    data
  })
}

export function getPetMoment(requestId) {
  return request({
    url: `/api/agents/pet_moment/` + requestId,
    method: 'get'
  })
}

export function getPetMomentImage() {
  return request({
    url: `/api/agents/pet_moment/image`,
    method: 'get'
  })
}


export function generateMagicMirror(data) {
  return request({
    url: `/api/agents/magic_mirror/generate`,
    method: 'post',
    data
  })
}

export function getMagicMirror(requestId) {
  return request({
    url: `/api/agents/magic_mirror/` + requestId,
    method: 'get'
  })
}

export function getMagicMirrorImage() {
  return request({
    url: `/api/agents/magic_mirror/image`,
    method: 'get'
  })
}

export function generateInfantCry(data) {
  return request({
    url: `/api/agents/infant_cry/generate`,
    method: 'post',
    data
  })
}

export function getInfantCry(requestId) {
  return request({
    url: `/api/agents/infant_cry/` + requestId,
    method: 'get'
  })
}

export function getInfantCryImage() {
  return request({
    url: `/api/agents/infant_cry/image`,
    method: 'get'
  })
}

export function generateBirdsEye(data) {
  return request({
    url: `/api/agents/birds_eye/generate`,
    method: 'post',
    data
  })
}

export function getBirdsEye(requestId) {
  return request({
    url: `/api/agents/birds_eye/` + requestId,
    method: 'get'
  })
}

export function getBirdsEyeImage() {
  return request({
    url: `/api/agents/birds_eye/image`,
    method: 'get'
  })
}


export function generateCarRecognize(data) {
  return request({
    url: `/api/agents/car_recognize/generate`,
    method: 'post',
    data
  })
}

export function getCarRecognize(requestId) {
  return request({
    url: `/api/agents/car_recognize/` + requestId,
    method: 'get'
  })
}

export function getCarRecognizeImage() {
  return request({
    url: `/api/agents/car_recognize/image`,
    method: 'get'
  })
}
