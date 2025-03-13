<template>
  <div class="login-container" style=" display: flex;align-items: center;justify-content: center;">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      class="login-form"
      label-position="left"
    >

      <div class="title-container">
        <h2 class="title">Psyncup</h2>
      </div>
      <!--      <div id="wx_reg" style="text-align: center" />-->

      <!--      <div style="text-align: center;">-->
      <!--        <a href="/#/wechat-help" style="text-align: center;color: red" target="_blank">-->
      <!--          微信登录使用教程-->
      <!--        </a></div>-->
      <!--      <br>-->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          autocomplete="on"
          name="username"
          placeholder="Email"
          tabindex="1"
          type="text"
        />
        <span class="send-code" @click="sendCode">
          <svg-icon :icon-class="'guide'" />
        </span>
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" manual placement="right">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="message" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            autocomplete="on"
            name="password"
            placeholder="Verify Code"
            tabindex="2"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        style="width:100%;margin-bottom:30px;"
        type="primary"
        @click.native.prevent="handleLogin"
      >Login
      </el-button>

    </el-form>

    <el-dialog :visible.sync="showDialog" title="Or connect with">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>

  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import { endLoading, startLoading } from '@/utils/loading'
import { sendCode } from '@/api/user'
// import { WwLogin } from '@/assets/http_wwcdn.weixin.qq.com_node_wework_wwopen_js_wwLogin-1.2.4.js'
export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      callback()
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: '',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
        if (query.code !== undefined) {
          console.log(query.code)
          this.loading = true
          this.$store.dispatch('user/loginByWechat', query.code)
            .then((e) => {
              debugger
              console.log('e', this.redirect)
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((e) => {
              this.loading = false
              console.log('ee', e)
            })
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }

    // eslint-disable-next-line no-undef
    // new WwLogin({
    //   'id': 'wx_reg',
    //   'appid': 'wxd0ddf8cc07ba002b',
    //   'agentid': '1000002',
    //   'redirect_uri': encodeURIComponent('https://wrv.wyzecam.com/#/login?'),
    //   // 'redirect_uri': 'https://wrv.1222.com/',
    //   'state': '',
    //   'href': '',
    //   'lang': 'zh'
    // })
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    sendCode() {
      startLoading()
      sendCode({ email: this.loginForm.username.trim() }).then(response => {
        console.log(response)
        endLoading()
      }).catch((error) => {
        console.log('err:', error)
        endLoading()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 10px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .send-code {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
