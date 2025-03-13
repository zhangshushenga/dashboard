import request from '@/utils/request';

export function getTeamMemberList(data) {
    return request({
        url: 'api/team-member/list',
        method: 'post',
        data
    });
}

export function addTeamMember(data) {
    return request({
        url: 'api/team-member/add',
        method: 'post',
        data
    });
}

export function deleteTeamMember(data) {
    return request({
        url: 'api/team-member/delete',
        method: 'post',
        data
    });
}

export function updateTeamMemberRank(data) {
    return request({
        url: 'api/team-member/rank/update',
        method: 'post',
        data
    });
}

export function getManagedTeams(data) {
    return request({
        url: 'api/team-member/managed-teams/get',
        method: 'post',
        data
    });
}


