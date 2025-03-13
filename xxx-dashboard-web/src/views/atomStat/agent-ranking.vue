<template>
<div>
    <el-container>
    <el-header>
        <el-row>
        <el-col :span="24">
            <h1 class="title" @click="handleTitleClick">Agent排行榜</h1>
        </el-col>
        </el-row>
    </el-header>
    <el-main>
        <el-row class="header">
        <el-col :span="2">排名</el-col>
        <el-col :span="4">Agent名称</el-col>
        <el-col :span="4">团队成员</el-col>
        <el-col :span="2">综合得分</el-col>
        <el-col :span="12">
            <el-row>
            <el-col :span="4">总订阅用户</el-col>
            <el-col :span="4">当前订阅用户</el-col>
            <el-col :span="4">30日新增用户</el-col>
            <el-col :span="4">服务调用用户</el-col>
            <el-col :span="4">复购用户</el-col>
            <el-col :span="4">上线时间</el-col>
            </el-row>
        </el-col>
        </el-row>
        <el-row class="ranking-list">
        <el-col :span="24" v-for="(item, index) in sortedAgents" :key="item.id" class="ranking-item">
            <el-row>
            <el-col :span="2">
                <img v-if="index < 3" :src="`resources/rank_${index + 1}.png`" class="rank-badge" :alt="`Rank ${index + 1}`">
                <div v-else class="rank-badge">{{ index + 1 }}</div>
            </el-col>
            <el-col :span="4">
                <div class="avatar" :style="{ backgroundImage: `url('${item.avatar}')` }"></div>
            </el-col>
            <el-col :span="4">{{ item.name }}</el-col>
            <el-col :span="4">
                <el-badge v-for="member in item.members" :key="member.name" :value="member.name" class="badge">
                <span :class="`badge-label ${member.role}`">{{ member.role.toUpperCase() }}</span>
                </el-badge>
            </el-col>
            <el-col :span="2">{{ item.score }}</el-col>
            <el-col :span="12">
                <el-row>
                <el-col :span="4">{{ item.stats.totalUsers }}</el-col>
                <el-col :span="4">{{ index >= 5 ? '*' : item.stats.currentUsers }}</el-col>
                <el-col :span="4">{{ item.stats.thirtyDayUsers === 0 ? '-' : (index >= 5 ? '*' : item.stats.thirtyDayUsers) }}</el-col>
                <el-col :span="4">{{ index >= 5 ? '*' : item.stats.serviceUsers }}</el-col>
                <el-col :span="4">{{ item.stats.complexUsers === 0 ? '-' : (index >= 5 ? '*' : item.stats.complexUsers) }}</el-col>
                <el-col :span="4">{{ item.launchDate || '未上线' }}</el-col>
                </el-row>
            </el-col>
            </el-row>
        </el-col>
        </el-row>
    </el-main>
    </el-container>
</div>
</template>

<script>
import { getAgentDetailData } from '@/api/atom-stat'

export default {
data() {
    return {
    agents: [],
    clickCount: 0,
    lastClickTime: 0,
    CLICK_RESET_TIME: 2000,
    TARGET_URL: 'config.html'
    };
},
computed: {
    sortedAgents() {
    return this.agents
        .map(agent => ({
        ...agent,
        score: this.calculateScore(agent.stats)
        }))
        .sort((a, b) => b.score - a.score);
    }
},
methods: {
    loadConfig() {
    try {
        const savedConfig = localStorage.getItem('agentConfig');
        return savedConfig ? JSON.parse(savedConfig) : { agents: [] };
    } catch (error) {
        console.error('Error loading config:', error);
        return { agents: [] };
    }
    },
    saveConfig(config) {
    try {
        localStorage.setItem('agentConfig', JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('Error saving config:', error);
        return false;
    }
    },
    calculateScore(stats) {
    const totalUsers = stats.totalUsers === 0 ? 0 : Math.log10(stats.totalUsers);
    const serviceUsers = stats.serviceUsers === 0 ? 0 : Math.log10(stats.serviceUsers);
    const score = (totalUsers * 0.3 + serviceUsers * 0.3);
    return score.toFixed(2);
    },

    async getAgentDetailData() {
    try {
        const response = await getAgentDetailData();
        const agent_info_list = response.data;
        const config = this.loadConfig();
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate() - 1;
        const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        const agent_today_data = agent_info_list.filter(agent => agent.date === today);
        config.agents = config.agents.map(agent => {
        const remoteAgent = agent_today_data.find(agent_today => agent_today.agentTypes === parseInt(agent.agentId));
        if (remoteAgent) {
            agent.stats = {
            totalUsers: remoteAgent.totalUserCount,
            currentUsers: remoteAgent.userCount,
            thirtyDayUsers: remoteAgent.newUserCount,
            serviceUsers: remoteAgent.uniqueUsers,
            complexUsers: remoteAgent.repeatUserCount
            };
        }
        return agent;
        });
        this.saveConfig(config);
        this.agents = config.agents;
    } catch (error) {
        console.error('Error fetching agent detail data:', error);
    }
    },
    scheduleDailyUpdate() {
    const now = new Date();
    const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        1,
        0,
        0
    );
    const timeout = targetTime.getTime() - now.getTime();
    if (timeout < 0) {
        this.getAgentDetailData();
        return;
    } else {
        setTimeout(() => {
        this.scheduleDailyUpdate();
        }, timeout);
    }
    },
    handleTitleClick() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastClickTime > this.CLICK_RESET_TIME) {
        this.clickCount = 0;
    }
    this.clickCount++;
    this.lastClickTime = currentTime;
    if (this.clickCount === 3) {
        window.location.href = this.TARGET_URL;
        this.clickCount = 0;
    }
    }
},
mounted() {
    this.getAgentDetailData();
    this.scheduleDailyUpdate();
    setInterval(this.scheduleDailyUpdate, 60 * 1000);
}
};
</script>

<style >
.background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-image: url('../resources/224f9eeb0c5209a7e476a74391a14879.png'); */
    background-size: cover;
    background-position: center -160px;
    background-repeat: no-repeat;
    opacity: 0.1;
    z-index: 1;
    pointer-events: none;
}

.background-overlay2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/Users/zhangshusheng/Desktop/github_item/Dashboard/xxx-dashboard-web/src/agentRank/resources/image 8.png');
    background-size: cover;
    background-position: center -160px;
    background-repeat: no-repeat;
    opacity: 0.1;
    z-index: 1;
    pointer-events: none;
}

.container {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
}

.title {
text-align: center;
margin: 20px 0;
font-size: 28px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: opacity 0.3s;
}

.title::before {
content: "✦";
margin-right: 10px;
}

.title::after {
content: "✦";
margin-left: 10px;
}

.title:hover {
opacity: 0.8;
}

.ranking-list {
display: flex;
flex-direction: column;
width: hug;
height: hug;
top: 198px;
/* left: 197px; */
gap: 16px;
}

.ranking-item {
display: flex;
align-items: center;
background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
margin: 8px 0;
padding: 15px 20px;
border-radius: 32px;
border-width: 1px;
position: relative;
min-height: 70px;
height: auto;
}

.ranking-item:hover {
background: linear-gradient(90deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
}

.rank {
width: 60px;
display: flex;
align-items: center;
justify-content: flex-start;
padding-left: 0px;
}

.rank-badge {
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
font-size: 24px;
color: white;
}

/* .rank:nth-child(1) .rank-badge { background: #ffd700; }
.rank:nth-child(2) .rank-badge { background: #c0c0c0; }
.rank:nth-child(3) .rank-badge { background: #cd7f32; } */


.avatar {
width: 40px;
height: 40px;
border-radius: 50%;
margin: 0 5px;
object-fit: cover;
}

.agent-name {
width: 170px;
text-align: left;
/* background: #ffffff; */
}

.badges {
display: flex;
gap: 8px;
width: 210px;
/* margin-right: 20px; */
/* 显示不开的话换行 */
flex-wrap: wrap;
}

.badge {
padding: 6px;
width: 36px;
height: 36px;
border-radius: 50%;
font-size: 12px;
background: rgba(255, 255, 255,);
display: flex;
align-items: flex-start;
justify-content: center;
text-align: center;
line-height: 1;
position: relative;
padding-top: 8px;
overflow: hidden;
}

.badge-label {
position: absolute;
bottom: 0px;
left: 0;
width: 100%;
height: 10px;
font-size: 8px;
color: white;
text-align: center;
background: rgb(255, 255, 255, 0.5);
display: flex;  /* 使用flex布局 */
align-items: center;  /* 垂直居中 */
justify-content: center;  /* 水平居中 */
}

.badge-label.pm {
color: #005DFF;
}
.badge-label.ux {
color: #7700FF;
}
.badge-label.dev {
color: #FAAB00;
}

.badge.pm { background: #005DFF; }
.badge.ux { background: #7700FF; }
.badge.dev { background: #FAAB00; }

.score {
width: 100px;
text-align: left;
/* margin: 0 40px; */
font-size: 20px;
margin-left: 5px;
font-weight: bold;
}

.stats {
display: flex;
margin-left:  20px;
gap: 5px;
}

.stat {
width: 125px;
text-align: left;
padding: 0 10px;
/* background: #ffffff; */

}

.date {
width: 100px;
text-align: left;
color: #8e8e8e;
font-size: 14px;
}

/* 表头样式 */
.header {
width: 100%;
height: 18px;
display: flex;
align-items: left;
/* padding: 10px 20px; */
color: #ffffff;
font-size: 13px;
margin-bottom: 10px;
}

.header-rank {
width: 40px;
text-align: left;
margin-left: 20px;
}


.header-name {
width: 298px;
margin-left: 40px;
text-align: left;
/* background: #ffffff; */
}

.header-members {
width: 300px;
/* margin-left: 40px; */
text-align: left;
}

.header-score {
width: 80px;
text-align: left;
/* margin-left:40px; */
}

.header-stats {
display: flex;
margin-left: 50px;
}

.header-stat {
width: 130px;
text-align: left;
padding: 0 10px;
}

/* 排行榜头部样式 */
.ranking-header {
text-align: center;
margin-bottom: 10px;
padding: 20px;
}

.title {
margin: 0;
font-size: 54px;
font-weight: bold;
color: #fff;
}

.subtitle {
color: #8e8e8e;
font-size: 14px;
}

.header-right {
display: flex;
gap: 20px;
}

.filter-item {
display: flex;
align-items: center;
gap: 10px;
}

.filter-label {
color: #8e8e8e;
font-size: 14px;
}

.filter-select {
background: rgba(255, 255, 255, 0.1);
border: none;
color: white;
padding: 8px 15px;
border-radius: 8px;
font-size: 14px;
cursor: pointer;
}

.filter-select:hover {
background: rgba(255, 255, 255, 0.15);
}

.filter-select option {
background: #1a0841;
color: white;
}
</style>