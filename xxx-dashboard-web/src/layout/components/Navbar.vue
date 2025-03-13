<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->

    <div
      style="margin-left: 24px; line-height: 46px;height: 100%;float: left;font-family: 'PingFang SC';font-style: normal;font-weight: 500;font-size: 24px;color: #FFFFFF;"
    >
      {{ $t('navbar.dashboard') }}
    </div>
    <div class="right-menu">
      <div class="right-menu-item hover-effect" style="margin-right: 20px;">
        <el-select v-if="projectList.length != 0" v-model="currentProject" placeholder="请选择" @change="handleSelectChange">
          <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </div>
      <div class="right-menu-item hover-effect" style="font-size:25px; margin-right: 30px;">
        <el-popover v-model="visible" placement="bottom" style="margin-top: 0" trigger="click" width="550">
          <div class="el-tabs el-tabs--top" data-v-d16d6306="" style="margin-left: 4px;">
            <div class="el-tabs__header is-top">
              <div class="el-tabs__nav-wrap is-top">
                <div class="el-tabs__nav-scroll">
                  <div class="el-tabs__nav is-top" role="tablist" style="transform: translateX(0px);">
                    <div
                      v-if="showType === 1"
                      class="el-tabs__active-bar is-top"
                      style="width: 56px; transform: translateX(0px);"
                    />
                    <div
                      v-else-if="showType === 2"
                      class="el-tabs__active-bar is-top"
                      style="width: 56px; transform: translateX(96px);"
                    />
                    <div
                      :class="showType === 1 ? 'is-active' : ''"
                      class="el-tabs__item is-top "
                      role="tab"
                      tabindex="0"
                      @click="handleTabClick(1)"
                    >{{ $t('label85') }}
                    </div>
                    <sup v-show="unreadCount.publicCount > 0" class="badge-public-item" style="">{{
                      unreadCount.publicCount > 99 ? "99+" : unreadCount.publicCount
                    }}</sup>
                    <div
                      id="tab-内部对话"
                      :class="showType === 2 ? 'is-active' : ''"
                      aria-controls="pane-内部对话"
                      class="el-tabs__item"
                      role="tab"
                      tabindex="-1"
                      @click="handleTabClick(2)"
                    >
                      {{ $t('label86') }}
                    </div>
                    <sup v-show="unreadCount.innerCount > 0" class="badge-innter-item" style="">{{
                      unreadCount.innerCount > 99 ? "99+" : unreadCount.innerCount
                    }}</sup>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-tabs__content">
              <div class="el-tab-pane" data-v-d16d6306="" role="tabpanel" style="">
                <div
                  v-infinite-scroll="loadNotification"
                  :infinite-scroll-disabled="ongoing"
                  class=""
                  style="width:520px;max-height: 500px;overflow-y:auto;overflow-x: hidden"
                >
                  <div
                    v-for="(notification, index) in notificationList"
                    :key="index"
                    class="notification_item"
                    @click="showDetail(notification)"
                  >

                    <div>
                      <el-col :span="23">
                        <div :class="notification.userRead === 1 ? 'read' : ''" class=" notification_item_top">
                          {{ notification.issueId }} {{ notification.serviceTypeText }}/{{
                            notification.categoryText
                          }}/{{ notification.subCategoryText }}
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <img v-if="notification.userRead === 0" :src="unReadBadge" class="un-read-badge">
                      </el-col>
                    </div>
                    <el-row>
                      <el-col :span="2">
                        <el-avatar
                          v-if="notification.createUserType !== 99"
                          :src="commonUserAvatar"
                          style="margin: 8px 8px 8px 8px;width: 24px;height: 24px"
                        />
                        <div v-else class="el-col el-col-2" data-v-d16d6306="">
                          <p
                            :style="{ background: BackGroundColor(notification.createUserName) }"
                            class="avatar-user el-avatar el-avatar--circle"
                            style="margin: 8px; width: 24px; height: 24px;"
                          >
                            <span style="-webkit-transform:scale(0.833);font-size: 12px;display:inline-block">
                              {{
                                userNameRule(notification.createUserName)
                              }}
                            </span>
                          </p>

                        </div>
                      </el-col>
                      <el-col :span="22">
                        <div :class="notification.userRead === 1 ? 'read' : ''" class="notification_content">
                          {{
                            notification.createUserName
                          }}：{{ getNotificationType(notification.type, notification.content) }}
                        </div>
                        <div :class="notification.userRead === 1 ? 'read' : ''" class="notification_time">
                          {{ notification.createTimeString }}
                        </div>
                      </el-col>
                    </el-row>

                  </div>
                </div>
                <p v-if="loading">loading...</p>
                <p v-if="noData">There is no more data to load.</p>
              </div>
            </div>
          </div>
          <!--          slot="reference"-->
          <span slot="reference" class=" el-popover__reference-wrapper">
            <div
              aria-describedby="el-popover-3467"
              class="el-badge el-popover__reference"
              data-v-d16d6306=""
              tabindex="0"
            >
              <img :src="bell" class="bell-class" @click="initNotification">
              <sup v-show="unreadCount.totalCount > 0" class="badge-item" style="">{{
                unreadCount.totalCount > 99 ? "99+" : unreadCount.totalCount
              }}</sup>
            </div>
          </span>
        </el-popover>

      </div>
      <lang-select class="right-menu-item hover-effect" style="margin-right: 15px" />

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :style="{ background: BackGroundColor(myName) }">{{ userNameRule(myName) }}
          </el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--          <el-dropdown-item divided @click.native="bindWecaht">-->
          <!--            <span style="display:block;">绑定微信</span>-->
          <!--          </el-dropdown-item>-->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
          <el-dropdown-item v-if="language==='zh' " divided @click.native="handleSetLanguage('en')">
            <span style="display:block;">Switch to EN</span>
          </el-dropdown-item>
          <el-dropdown-item v-if="language==='en' " divided @click.native="handleSetLanguage('zh')">
            <span style="display:block;">Switch to CN</span>
          </el-dropdown-item>
          <el-dropdown-item v-if="language!=='zh' && language!=='en'" divided @click.native="handleSetLanguage('en')">
            <span style="display:block;">Switch to EN</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'
// import eChartTheme from '@/components/EchartTheme'
import commonUserAvatar from '@/assets/avatar.png'
import unReadBadge from '@/assets/badge.png'
import bell from '@/assets/bell.png'
import cnchar from 'cnchar'
import store from '@/store'
import { getNotificationList, getUnreadCount, markNotificationRead } from '@/api/notification'
import { userNameRule } from '../../utils/user-name'
import { setCurrentProject, getCurrentProject } from '@/utils/project'
import { projectChannel } from '@/utils/util-broadcast'
import LangSelect from '@/components/LangSelect'
import i18n from '@/lang'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // eChartTheme,
    // Search
  },
  data() {
    return {
      ongoing: false,
      issueId: 0,
      visible: false,
      listLoading: true,
      loading: false,
      unreadCount: { totalCount: 0, publicCount: 0, innerCount: 0 },
      currentPage: 1,
      showType: 1,
      interval: null,
      noData: false,
      activeName: '公开对话',
      notificationList: [],
      myName: '',
      commonUserAvatar: commonUserAvatar,
      bell: bell,
      unReadBadge: unReadBadge,
      currentProject: '',
      channel: new BroadcastChannel(projectChannel.name)
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'projectList',
      'device'
    ]),
    // debounceAddItem() {
    //   return _.debounce(this.initNotification, 500)
    // },
    // debounceHandleTabClick() {
    //   return _.debounce(this.handleTabClick, 500)
    // }
    language() {
      return this.$store.getters.language
    }
  },
  created() {

  },
  beforeUnmount() {
    // 关闭通道，以避免内存泄漏
    this.channel.close()
  },
  mounted() {
    this.getUserNameFromStroe()
    this.updateCount()
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
      this.updateCount()
    }, 60000)

    // 监听通道消息
    this.channel.addEventListener('message', (event) => {
      if (event.data.action === projectChannel.changeAction) {
        console.log(projectChannel.changeAction)
        this.currentProject = getCurrentProject().name
      }
    })
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })

      console.log(this.$i18n.locale)
    },
    getNotificationType(type, content) {
      switch (type) {
        case 1:
          return i18n.t('label87')
        case 2:
          return i18n.t('label88')
        default:
          return content
      }
    },
    showDetail(notification) {
      const param = {
        issueId: notification.issueId,
        targetUserId: notification.targetUserId,
        showType: this.showType
      }
      if (notification.userRead === 0) {
        markNotificationRead(param).then((response) => {
        }).finally(() => {
          this.updateCount()
        })
      }

      this.issueId = notification.issueId
      this.visible = false

      const routeUrl = this.$router.resolve({
        path: '/trouble_detail',
        query: {
          issue_id: this.issueId
        }
      })

      window.open(routeUrl.href, '_blank')
    },
    initNotification() {
      if (this.ongoing) {
        // 如果正在进行搜索操作，则直接返回
        return
      }
      console.log(1)
      this.loading = true
      this.listLoading = true
      this.notificationList.splice(0, this.notificationList.length)
      this.currentPage = 1
      this.showType = 1
      this.loadNotification()
    },
    loadNotification() {
      this.ongoing = true
      const param = {
        'current': this.currentPage,
        'targetUserId': store.getters.userId,
        'userReadSort': true,
        'createTimeSort': false,
        'showType': this.showType,
        'size': 20
      }
      // console.log(store.getters.userId)
      this.loading = true
      this.noData = false
      getNotificationList(param).then((response) => {
        if (response.code === 0) {
          if (response.data.records.length > 0) {
            this.currentPage++
            this.noData = false
          } else {
            this.noData = true
          }
          for (const item of response.data.records) {
            this.notificationList.splice(this.notificationList.length, 0, item)
          }
        }
      }).finally(() => {
        this.loading = false
        this.listLoading = false
        this.ongoing = false
      })
    },
    handleTabClick(tab) {
      if (this.ongoing) {
        // 如果正在进行搜索操作，则直接返回
        return
      }
      this.noData = false
      this.showType = tab
      this.notificationList.splice(0, this.notificationList.length)
      this.currentPage = 1
      this.loadNotification()
    },
    updateCount() {
      getUnreadCount().then((response) => {
        if (response.code === 0) {
          this.unreadCount = response.data
        }
      }).finally(() => {
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async bindWecaht() {
      this.$router.push(`/bind-wechat`)
    },
    BackGroundColor: function(userName) {
      if (userName) {
        const nameIndex = cnchar.stroke(userName) % 4
        switch (nameIndex) {
          case 0:
            return '#56C08D'
          case 1:
            return '#F6685D'
          case 2:
            return '#FA9550'
          case 3:
            return '#366EF4'
          case 4:
            return ''
        }
      } else {
        return 'white'
      }
    },
    getUserNameFromStroe() {
      this.myName = store.getters.name
      this.currentProject = getCurrentProject().name
    },
    userNameRule(name) {
      return userNameRule(name)
    },
    handleSelectChange(value) {
      // 当选中值改变时，触发该回调函数
      this.$store.dispatch('user/changeCurrentProject', this.projectList.find(item => item.name === value))
      this.channel.postMessage({
        action: projectChannel.changeAction
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.read {
  color: rgba(0, 0, 0, 0.4) !important;;
}

.avatar-user {
  //position: absolute;
  //left: 0%;
  //right: 0%;
  //top: 16.67%;
  //bottom: 16.67%;
  //-webkit-transform: scale(0.5);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  /* or 180% */

  //display: flex;
  //align-items: center;
  text-align: center;

  color: #FFFFFF;
}

.badge-item {
  background-color: #ff4949;
  border-radius: 10px;
  color: #FFFFFF;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  //border: 1px solid #FFFFFF;
  position: absolute;
  top: 11px;
  right: 3px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}

.badge-public-item {
  background-color: #ff4949;
  border-radius: 10px;
  color: #FFFFFF;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  //border: 1px solid #FFFFFF;
  position: absolute;
  top: 11px;
  left: 40px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}

.badge-innter-item {
  background-color: #ff4949;
  border-radius: 10px;
  color: #FFFFFF;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  //border: 1px solid #FFFFFF;
  position: absolute;
  top: 11px;
  right: 20px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}

.bell-class {
  Width: 18px;
  Height: 23.57px;
}

.notification_item {
  box-sizing: border-box;
  width: 510px;
  max-height: 104px;
  border-bottom: 1px solid #E7E7E7;
  margin-bottom: 16px;
  margin-left: -8px;
}

.notification_item_top {
  margin-left: 8px;
  overflow: hidden;
  /*溢出的部分隐藏*/
  white-space: nowrap;
  /*文本不换行*/
  text-overflow: ellipsis;
  /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
  width: 462px;
  height: 20px;
  color: rgba(0, 0, 0, 0.6);
  /* Inside auto layout */
}

.un-read-badge {
  width: 8px;
  height: 8px;
}

.notification_content {

  //margin-left: 8px;
  margin-top: 8px;
  width: 421px;
  max-height: 44px;
  font-family: 'PingFang SC', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
  /*溢出的部分隐藏*/
  text-overflow: ellipsis;
  /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.notification_time {
  height: 24px;
  //margin-left: 8px;
  font-family: 'PingFang SC', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #242424;
  //background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 0px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
