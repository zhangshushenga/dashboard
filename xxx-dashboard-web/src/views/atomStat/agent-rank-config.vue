<template>
    <iframe
      :src="htmlUrl"
      frameborder="0"
      style="width: 100%; height: 100vh;"
    ></iframe>
  </template>
  
  <script>
  export default {
    computed: {
      htmlUrl() {
        return process.env.BASE_URL + 'agentRank/agent-config.html'
      }
    }
  }
  </script>