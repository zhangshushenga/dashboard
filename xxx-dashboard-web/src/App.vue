<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

const baseScreenWidth = 1920
const baseFontSize = 14

import $ from 'jquery';
window.$ = $;
window.jQuery = $;

export default {
  name: 'App',

  mounted() {
    this.fontFix()
    window.onresize = () => {//当页面尺寸改变的时候生效
      this.fontFix()
    }
  },
  //注销window.onresize事件
  destroyed() {
    window.onresize = null;
  },
  methods: {
    fontFix() {
      let width = $("body").width();
      let scale = width / baseScreenWidth;
      let fontsize = Math.min(scale, 3) * baseFontSize;//fontsize为当前屏幕的基数字体，相对于设计稿计算得到的。
      $("html").css("font-size", `${fontsize}px`)
    }
  }

}
</script>
