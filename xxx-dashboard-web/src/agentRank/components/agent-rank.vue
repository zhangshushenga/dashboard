<template>
  <div class="agent-rank">
    <div class="title" @click="handleTitleClick">Agent排行榜</div>
    <div class="ranking-list"></div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
// import { fetchDailyStats, renderRanking, scheduleDailyUpdate } from '@/agentRank/js/agent-rank-app.js';

export default {
  name: 'AgentRank',
  setup() {
    console.log('setup 开始执行');

    // 点击计数逻辑
    let clickCount = 0;
    let lastClickTime = 0;
    const CLICK_RESET_TIME = 2000; // 2秒内需要完成3次点击
    const TARGET_URL = 'config.html';

    const handleTitleClick = () => {
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
    };

    onMounted(() => {
      console.log('组件挂载，开始获取每日统计数据...');
      fetchDailyStats().then((msg) => {
        console.log(msg);
        console.log('数据获取成功，开始渲染排行榜...');
        renderRanking();
      }).catch(error => {
        console.error('获取每日统计数据出错：', error);
      });

      console.log('启动每日更新调度任务...');
      scheduleDailyUpdate(); // 启动定时任务
      setInterval(scheduleDailyUpdate, 60 * 1000); // 每隔1分钟检查一次是否到达更新时间
    });

    return {
      handleTitleClick
    };
  }
};
</script>

<style scoped>
.agent-rank {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>