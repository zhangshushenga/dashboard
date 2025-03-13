import request from '@/utils/request'

export function timecuratorGenerate(param) {
    return request({
        url: `/api/stat/agents_timeCurator_generate_data`,
        method: 'get',
        params: param
    })
}

export function timecuratorRecommend(param) {
    return request({
        url: `/api/stat/agents_timeCurator_recommend_data`,
        method: 'get',
        params: param
    })
}


export function timecuratorEnter(param) {
    return request({
        url: `/api/stat/agents_timeCurator_enter_data`,
        method: 'get',
        params: param
    })
}  


export function foodCriticTrigger(param) {
    return request({
        url: `/api/stat/agents/foodCritic-trigger`,
        method: 'get',
        params: param
    })
}  

export function foodCriticGenerateDay(param) {
    return request({
        url: `/api/stat/agents/foodCritic-generate-day`,
        method: 'get',
        params: param
    })
}  

export function foodCriticGenerate(param) {
    return request({
        url: `/api/stat/agents/foodCritic-generate`,
        method: 'get',
        params: param
    })
}  