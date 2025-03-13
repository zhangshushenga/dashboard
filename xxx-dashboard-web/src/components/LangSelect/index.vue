<!--<template>-->
<!--  <el-dropdown class="international" trigger="click" @command="handleSetLanguage">-->
<!--    <div v-if="language==='en'" style="color: white">-->
<!--      中文-->
<!--    </div>-->
<!--    <div v-if="language==='zh'" style="color: white">-->
<!--      English-->
<!--    </div>-->
<!--    <div v-else style="color: white">-->
<!--      {{ language }}-->
<!--    </div>-->
<!--    <el-dropdown-menu slot="dropdown">-->
<!--      <el-dropdown-item :disabled="language==='zh'" command="zh">-->
<!--        中文-->
<!--      </el-dropdown-item>-->
<!--      <el-dropdown-item :disabled="language==='en'" command="en">-->
<!--        English-->
<!--      </el-dropdown-item>-->
<!--      &lt;!&ndash;      <el-dropdown-item :disabled="language==='es'" command="es">&ndash;&gt;-->
<!--      &lt;!&ndash;        Español&ndash;&gt;-->
<!--      &lt;!&ndash;      </el-dropdown-item>&ndash;&gt;-->
<!--      &lt;!&ndash;      <el-dropdown-item :disabled="language==='ja'" command="ja">&ndash;&gt;-->
<!--      &lt;!&ndash;        日本語&ndash;&gt;-->
<!--      &lt;!&ndash;      </el-dropdown-item>&ndash;&gt;-->
<!--    </el-dropdown-menu>-->
<!--  </el-dropdown>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  computed: {-->
<!--    language() {-->
<!--      return this.$store.getters.language-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleSetLanguage(lang) {-->
<!--      this.$i18n.locale = lang-->
<!--      this.$store.dispatch('app/setLanguage', lang)-->
<!--      this.$message({-->
<!--        message: 'Switch Language Success',-->
<!--        type: 'success'-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
