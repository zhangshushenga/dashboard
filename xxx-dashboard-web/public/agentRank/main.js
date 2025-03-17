// 从localStorage读取数据
function loadConfig() {
    try {
        const savedConfig = localStorage.getItem('agentConfig');
        return savedConfig ? JSON.parse(savedConfig) : { agents: [] };
    } catch (error) {
        console.error('Error loading config:', error);
        return { agents: [] };
    }
}


// 保存配置到localStorage
function saveConfig(config) {
    try {
        localStorage.setItem('agentConfig', JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('Error saving config:', error);
        return false;
    }
}

// 计算综合得分
function calculateScore(stats) {
    // 这里可以根据需要调整得分计算公式
//   如果数据是0的话就不进行log10计算

    totalUsers = stats.totalUsers === 0 ? 0 : Math.log10(stats.totalUsers);
    serviceUsers = stats.serviceUsers === 0 ? 0 : Math.log10(stats.serviceUsers);
    thirtyDayUsers = stats.thirtyDayUsers === 0 ? 0 : Math.log10(stats.thirtyDayUsers);
    complexUsers = stats.complexUsers === 0 ? 0 : Math.log10(stats.complexUsers);
    const score = (totalUsers * 0.3 + thirtyDayUsers * 0.2 + serviceUsers * 0.3 + complexUsers * 0.2);
    // console.log('score: ',score);
    return score.toFixed(2);
}

// 渲染排行榜
function renderRanking() {
    const config = loadConfig();
    const rankingList = document.querySelector('.ranking-list');
    // console.log('config: ', config);
    // console.log('rankingList: ', rankingList);
    // 计算得分并排序
    const sortedAgents = config.agents
        .map(agent => ({
            ...agent,
            score: calculateScore(agent.stats)
        }))
        .sort((a, b) => b.score - a.score);

    rankingList.innerHTML = sortedAgents.map((item, index) => `
        <div class="ranking-item">
            <div class="rank">
                ${index < 3 
                    ? `<img src="resources/rank_${index + 1}.png" class="rank-badge" alt="Rank ${index + 1}">` 
                    : `<div class="rank-badge">${index + 1}</div>`
                }
            </div>
            <div class="avatar" style="background: ${item.avatar ? `url('${item.avatar}')` : 'white'}; background-size: cover; background-position: center;"></div>
            <div class="agent-name">${item.name}</div>
            <div class="badges">            
                ${item.members.map(member => {
                    const badgeConfig = [
                        { class: 'pm', label: 'PM'},
                        { class: 'ux', label: 'UX'},
                        { class: 'dev', label: 'DEV'}
                    ];
                    const badge = badgeConfig.find(b => b.class === member.role);
                    return `
                        <span class="badge ${badge.class}" style="background-color: ${badge.color}">
                            ${member.name}
                            <span class="badge-label ${badge.class}">${badge.label}</span>
                        </span>
                    `;
                }).join('')}
            </div>
            <div class="score">${item.score}</div>
            <div class="stats">
                <div class="stat">${item.stats.totalUsers}</div>
                <div class="stat">${index >= 5 ? '*' : item.stats.currentUsers}</div>
                <div class="stat">${index >= 5 ? '*' : item.stats.thirtyDayUsers}</div>
                <div class="stat">${index >= 5 ? '*' : item.stats.serviceUsers}</div>
                <div class="stat">${index >= 5 ? '*' : item.stats.complexUsers}</div>
            </div>
            <div class="date">${item.launchDate || '未上线'}</div> <!-- 显示上线时间 -->
        </div>
    `).join('');
}

// 调用接口获取数据的函数
async function fetchDailyStats() {
    try {
        const response = await fetch('https://prod-api-dashboard.atomtech.co.jp/api/stat/agents/data_stat_agent_detail_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization':'500fea98b333b51b11c5e1df6b000b749969cec697e8bffece38b7e6885ef0e6933566b351a8413aa7b058335e63df45'
                // 其他需要的headers
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        //打印data数据
        console.log(data);

// 上面是从接口返回的数据data，下面需要解析数据并更新到本地存储
    agent_info_list = data.data;
    // console.log(agent_info_list);
    const config = loadConfig();
    //获取当前日期，格式为yyyy-MM-dd
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate()-1;
    const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    // console.log('today: ',today);
    //获取agent_info_list中date是前一天的数据
    agent_today_data = agent_info_list.filter(agent => agent.date === today);


    console.log('agent_today_data:',agent_today_data);

    // console.log('local config: ',config);

    // 遍历config.agents，更新stats数据
    config.agents = config.agents.map(agent => {
        // console.log('agent id: ',agent.agentId);
        // 读取agent_today_data中对应agentId的数据

        const remoteAgent = agent_today_data.find(agent_today => agent_today.agentTypes === parseInt(agent.agentId));


        // console.log('remoteAgent: ',remoteAgent);
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
    }


    // config.agents = agent_today_data.map(agent => {
    //     const newStats = agent;
    //     if (newStats) {
    //         agent.stats = {
    //             totalUsers: newStats.totalUserCount,
    //             currentUsers: newStats.userCount,
    //             thirtyDayUsers: 0,
    //             serviceUsers: newStats.uniqueUsers,
    //             complexUsers: 0
    //         };
    //     }
    //     return agent;
    // }
    );

    // console.log('new config agent: ',config.agents);
    saveConfig(config);
    renderRanking(); // 重新渲染排行榜




        
    } catch (error) {
        console.error('Error fetching daily stats:', error);
    }
}

// 每天固定时间调用一个函数
function scheduleDailyUpdate() {
    const now = new Date();
    const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()+1,
        1, // 1点
        0, // 0分
        0 // 0秒
    );
    console.log('targetTime: ',targetTime);
    console.log('now: ',now);
    const timeout = targetTime.getTime() - now.getTime();
    console.log('timeout: ',timeout);
    if (timeout < 0) {
        fetchDailyStats();
        return;
    }
    else {
        setTimeout(() => {
            // fetchDailyStats();
            scheduleDailyUpdate();
        }, timeout);
    }
    
}

// 页面加载时初始化
if (typeof document !== 'undefined') {
  
    document.addEventListener('DOMContentLoaded', function() {
        // scheduleDailyUpdate(); 
        // 启动定时任务
        fetchDailyStats(); // 调用接口获取数据
        //每天凌晨1点更新一次数据，而不是固定的24小时更新一次
        scheduleDailyUpdate();
        // setInterval(fetchDailyStats,24*60*60*1000); // 每隔24小时更新一次数据
        setInterval(scheduleDailyUpdate,60*1000); // 每隔24小时更新一次数据


        // renderRanking();
        // 标题点击事件（跳转到配置页面）
        let clickCount = 0;
        let lastClickTime = 0;
        const CLICK_RESET_TIME = 2000; // 2秒内需要完成3次点击
        const TARGET_URL = 'config.html';

        document.querySelector('.title').addEventListener('click', function() {
            const currentTime = new Date().getTime();
            
            if (currentTime - lastClickTime > CLICK_RESET_TIME) {
                clickCount = 0;
            }
            
            clickCount++;
            lastClickTime = currentTime;
            
            if (clickCount === 3) {
                window.location.href = TARGET_URL;
                clickCount = 0;
            }
        });
    });

}