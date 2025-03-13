import request from '@/utils/request'

export function atomActivateDevices() {
    return request({
        url: `/api/atomStat/device/activate`,
        method: 'get'
    })
}

export function atomDailyActivateDevices(param) {
    return request({
        url: `/api/atomStat/device/activate/daily`,
        method: 'get',
        params: param
    })
}

export function atomActivateUsers() {
    return request({
        url: `/api/atomStat/user/activate`,
        method: 'get'
    })
}

export function atomDailyActivateUsers(param) {
    return request({
        url: `/api/atomStat/user/activate/daily`,
        method: 'get',
        params: param
    })
}

export function atomDailyActiveUsers(param) {
    return request({
        url: `/api/atomStat/activeUsers/daily`,
        method: 'get',
        params: param
    })
}

export function atomMonthlyActiveUsers(param) {
    return request({
        url: `/api/atomStat/activeUsers/monthly`,
        method: 'get',
        params: param
    })
}

export function atomPhoneosActiveUsers(param) {
    return request({
        url: `/api/atomStat/activeUsers/phoneOs`,
        method: 'get',
        params: param
    })
}

export function atomSDCardInstall(param) {
    return request({
        url: `/api/atomStat/SDCard/install`,
        method: 'get',
        params: param
    })
}

export function atomSDCardCapacity(param) {
    return request({
        url: `/api/atomStat/SDCard/capacity`,
        method: 'get',
        params: param
    })
}

export function atomUseAppAverageTime(param) {
    return request({
        url: `/api/atomStat/useApp/averageTime`,
        method: 'get',
        params: param
    })
}

export function atomUseAppTimeDistributed(param) {
    return request({
        url: `/api/atomStat/useApp/timeDistributed`,
        method: 'get',
        params: param
    })
}

export function atomLive(param) {
    return request({
        url: `/api/atomStat/live`,
        method: 'get',
        params: param
    })
}

export function atomEventPerPersonPerDayCount(param) {
    return request({
        url: `/api/atomStat/event/perPersonPerDay/distribution/count`,
        method: 'get',
        params: param
    })
}

export function atomEventPerEventPerDayTime(param) {
    return request({
        url: `/api/atomStat/event/perEventPerDay/distribution/time`,
        method: 'get',
        params: param
    })
}

export function atomPlaybackForRerEventPerDayTime(param) {
    return request({
        url: `/api/atomStat/playback/perPersonPerDay/distribution/time`,
        method: 'get',
        params: param
    })
}

export function atomAgentStream(param) {
    return request({
        url: `/api/stat/agent-stream/enter-agent-stream`,
        method: 'get',
        params: param
    })
}
export function atomClickAgentStream(param) {
    return request({
        url: `/api/stat/agent-stream/click-agent-stream`,
        method: 'get',
        params: param
    })
}
export function atomPurchaseMethods(param) {
    return request({
        url: `/api/stat/agent-stream/purchase-methods`,
        method: 'get',
        params: param
    })
}
export function atomHomepagetime(param) {
    return request({
        url: `/api/stat/agent-stream/homepage-dwell-time`,
        method: 'get',
        params: param
    })
}

export function atomAgenttime(param) {
    return request({
        url: `/api/stat/agent-stream/agent-dwell-time`,
        method: 'get',
        params: param
    })
}

export function atomAgentService(param) {
    return request({
        url: `/api/stat/agents/device_user_service`,
        method: 'get',
        params: param
    })
}

export function atomAgentLogData(param) {
    return request({
        url: `/api/stat/agents/data_stat_agent_log`,
        method: 'get',
        params: param
    })
}

export function atomTrackData(param) {
    return request({
        url: `/api/stat/agents/data_stat_track_click`,
        method: 'get',
        params: param
    })
}

export function atomUserBehaviour(param) {
    return request({
        url: `/api/stat/agents/data_stat_user_behaviour`,
        method: 'get',
        params: param
    })
}

export function getAgentDetailData(param) {
    return request({
        url: `/api/stat/agents/data_stat_agent_detail_data`,
        method: 'get',
        params: param
    })
}

export function getAgentName(param) {
    return request({
        url: `/api/stat/agents/data_stat_agent_name`,
        method: 'get',
        params: param
    })
}