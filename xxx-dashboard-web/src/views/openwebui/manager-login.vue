<template>
  <div id="" v-loading="loading" class="errPage-container">
    <div v-show="showError" class="errPage-container">
      <!--      <el-button class="pan-back-btn" icon="el-icon-arrow-left" @click="backToIndex">-->
      <!--        返回到首页-->
      <!--      </el-button>-->
      <el-row>
        <el-col :span="12">
          <h1 class="text-jumbo text-ginormous">
            Oops!
          </h1>
          <h1 class="" style="color: red">
            {{ errorMessage }}
          </h1>
          <!--          <h2>很抱歉，您目前无法访问这个页面。如需进一步的信息或帮助，请与管理员联系。我们感谢您的理解与合作。</h2>-->
          <h6 />
        </el-col>
        <el-col :span="12">
          <img :src="errGif" alt="Girl has dropped her ice cream." height="428" width="313">
        </el-col>
      </el-row>

    </div>

  </div>
</template>
<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  data() {
    return {
      errorMessage: '',
      showError: false,
      loading: true, // 进度条加载标志
      redirect: '', // 重定向目标路径
      otherQuery: {}, // 其他参数
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false,
      hasHandledLogin: false // 新增的标识，防止重复登录
    }
  },
  watch: {
  },
  mounted() {
    // 初次加载时判断 URL 是否有 token 参数，且只处理一次
    if (this.$route.query.token && !this.hasHandledLogin) {
      this.hasHandledLogin = true // 设置标识，防止死循环
      this.handleLogin(this.$route.query.token)
    }
  },
  methods: {
    backToIndex() {
      // window.open(this.videoUrl, '_blank')
      window.open(this.videoUrl, '_blank')

      // this.$router.push({ path: '/' })
    },
    handleLogin(token) {
      this.$store.dispatch('user/loginByOw', token)
        .then((response) => {
          console.log('Login successful:', response)
          // 服务器返回的路径在 response 中
          // const { redirectPath } = response
          this.$router.push({ path: response.path, query: this.otherQuery })
          this.loading = false // 登录完成，关闭加载标志
        })
        .catch((e) => {
          this.errorMessage = e.message
          console.log('Login failed:', e)
          this.loading = false
          this.showError = true
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
