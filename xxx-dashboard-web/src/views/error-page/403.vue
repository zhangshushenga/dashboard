<template>
  <div class="errPage-container">
    <el-button class="pan-back-btn" icon="el-icon-arrow-left" @click="backToIndex">
      返回到首页
    </el-button>
    <!--    <el-button class="pan-back-btn" icon="el-icon-arrow-left" @click="back">-->
    <!--      首页-->
    <!--    </el-button>-->
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <!--        gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面-->
        <h2>为了确保安全和符合公司的访问标准，本页面的访问需要通过使用公司分配的美国固定IP的VPN。感谢您的理解和配合。</h2>
        <h6 />
        <!--        <ul class="list-unstyled">-->
        <!--          <li>或者你可以去:</li>-->
        <!--          <li class="link-type">-->
        <!--            <router-link to="/dashboard">-->
        <!--              回首页-->
        <!--            </router-link>-->
        <!--          </li>-->
        <!--          <li class="link-type">-->
        <!--            <a href="https://www.taobao.com/">随便看看</a>-->
        <!--          </li>-->
        <!--          <li><a href="#" @click.prevent="dialogVisible=true">点我看图</a></li>-->
        <!--        </ul>-->
      </el-col>
      <el-col :span="12">
        <img :src="errGif" alt="Girl has dropped her ice cream." height="428" width="313">
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    },
    backToIndex() {
      this.$router.push({ path: '/' })
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
