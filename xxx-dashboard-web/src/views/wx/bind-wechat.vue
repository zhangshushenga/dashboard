<template>
  <div id="wx_reg" style="text-align: center;height: 100%" />

</template>

<script>

import { bindWechat } from '@/api/user'

export default {
  watch: {
    $route(to) {
      if (to.query.code) {
        bindWechat(to.query.code).then(response => {
          this.$router.push({ path: '/', query: {}})
        }).catch(error => {
          console.log('ee', error)
        })
      }
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    // new WwLogin({
    //   'id': 'wx_reg',
    //   'appid': 'wxd0ddf8cc07ba002b',
    //   'agentid': '1000002',
    //   'redirect_uri': encodeURIComponent('https://wrv.wyzecam.com/#/bind-wechat?'),
    //   // 'redirect_uri': 'https://wrv.1222.com/',
    //   'state': '',
    //   'href': '',
    //   'lang': 'zh'
    // })
  },
  methods: {}
}
</script>

<style scoped>

</style>
