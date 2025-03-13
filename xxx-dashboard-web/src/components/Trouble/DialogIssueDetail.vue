<template>
  <div :class="classObj" class="app-wrapper">
    <navbar class="nav" />
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div style="margin-top: 50px;">
        <div class="header">{{ $t('label47') + ':' + this.$route.query.issue_id }}</div>
        <el-container>
          <el-aside width="23%">
            <el-row style="margin-top:20px;">
              <el-col :span="3">
                <el-button v-if="!isStart" type="primary" @click="clickAcceptIssue(detailData)">
                  {{ $t('label63') }}
                </el-button>
                <el-button v-if="isStart" :disabled="isCloseClickEnble" class="button-style1" @click="closeIssueDetail">
                  {{ handleText }}
                </el-button>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label28') }}</el-col>
              <el-col :span="12">{{ calHandleTime(detailData.status, detailData.remainingProcessingTime) }}</el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label51') }}</el-col>
              <el-col :span="12">
                <el-tag :type="getStatusType(detailData.status)" disable-transitions> {{
    getStatusContent(detailData.status)
  }}
                </el-tag>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label21') }}</el-col>
              <el-col :span="12">
                <el-select v-model="chargePerson" :disabled="isCloseClickEnble" :placeholder="$t('label69')"
                  @change="selectChargePersonUpdate" @visible-change="visibleChargePerson">
                  <el-option v-for="item in chargePersonUser" :key="item.value" :disabled="item.disabled"
                    :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label50') }}</el-col>
              <el-col :span="12">
                <template>
                  <el-select v-model="assitSelect" :disabled="isCloseClickEnble" :placeholder="$t('label69')" multiple
                    @change="selectAssistPersonUpdate" @visible-change="visibleAssistPerson">
                    <el-option v-for="item in assistUsers" :key="item.value" :disabled="item.disabled"
                      :label="item.label" :value="item.value" />
                  </el-select>
                </template>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label33') }}</el-col>
              <el-col :span="12">
                <el-select v-model="selectPriority" :disabled="!isStart" :placeholder="$t('label69')" clearable
                  @change="selectPriorityUpdate">
                  <el-option v-for="item in priorityArr" :key="item.value" :label="$t(item.label)"
                    :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label38') }}</el-col>
              <el-col :span="12">
                <el-select v-model="selectIssueType" :disabled="!isStart" :placeholder="$t('label69')" clearable
                  @change="selectIssueTypeUpdate">
                  <el-option v-for="item in issueTypeArr" :key="item.value" :label="$t(item.label)"
                    :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label20') }}</el-col>
              <el-col :span="12" style="white-space: pre-wrap;">
                <el-cascader v-model="issueCategories" :disabled="!isStart" :options="optionsCategories"
                  :show-all-levels="true" false multiple: @change="selectPromblemTabChange" />
              </el-col>
            </el-row>

            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label41') }}</el-col>
              <el-col :span="12">{{ detailData.appVersion }}</el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label42') }}</el-col>
              <el-col :span="12">{{ detailData.firmwareVersion }}</el-col>
            </el-row>

            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label70') }}</el-col>
              <el-col :span="12">{{ detailData.deviceId }}</el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label43') }}</el-col>
              <el-col :span="12">{{ detailData.phoneModel }}</el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label89') }}</el-col>
              <el-col :span="12">{{ detailData.phoneOsVersion }}</el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label90') }}</el-col>
              <el-col :span="12">{{
    fromatFeedbackTime(detailData.csInterval + detailData.csDuration +
      detailData.rdDuration)
  }}
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label100') }}</el-col>
              <el-col :span="12">{{ fromatFeedbackTime(detailData.csInterval) }}</el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label102') }}</el-col>
              <el-col :span="12">{{ fromatFeedbackTime(detailData.csDuration) }}</el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="12" class="aside_font">{{ $t('label103') }}</el-col>
              <el-col :span="12">{{ fromatFeedbackTime(detailData.rdDuration) }}</el-col>
            </el-row>
          </el-aside>
          <el-aside direction="vertical" style="background-color:#ffffff;margin-left:6px;" width="54%">
            <div>
              <el-row style="margin-top: 24px;">
                <el-col :span="24" class="center_title_text">{{ promblemTabTitle }}</el-col>
              </el-row>
              <el-row style="margin-top: 12px; ">
                <el-col :span="24" class="center_content_text">{{ feedbackContent }}</el-col>
              </el-row>
              <el-row style="margin-top: 12px; ">
                <el-button :loading="isContentTranslateLoading"
                  style="font-weight: 500;font-size: 14px;color: rgba(0, 0, 0, 0.6);" type="text"
                  @click="translateZToE()">{{
    translateBtnType === 1 ? $t('label105') : $t('label115')
  }}
                </el-button>
                <el-button :disabled="isCloseClickEnble" :loading="isGptLoading"
                  style="margin-left:16px; font-weight: 500;font-size: 14px;color: rgba(0, 0, 0, 0.6);" type="text"
                  @click="sendChatGpt(detailData.content)">{{ $t('label106') }}
                </el-button>
              </el-row>
            </div>
            <el-row style="margin-bottom: 10px;">
              <el-col :span="8">
                <el-tooltip :content="detailData.userUsername" effect="dark" open-delay="500" placement="bottom-start"
                  popper-class="atooltip">
                  <div class="decription">{{ $t('label107') + "：" + detailData.userUsername }}</div>
                </el-tooltip>
              </el-col>
              <el-col :span="8">
                <el-tooltip :content="detailData.userEmail" effect="dark" open-delay="500" placement="bottom-start"
                  popper-class="atooltip">
                  <div class="decription">{{ $t('label108') + "：" + detailData.userEmail }}</div>
                </el-tooltip>
              </el-col>
              <el-col :span="8">
                <el-tooltip :content="detailData.createTime" effect="dark" open-delay="500" placement="bottom-start"
                  popper-class="atooltip">
                  <div class="decription">{{ $t('label116') + "：" + detailData.createTime }}</div>
                </el-tooltip>
              </el-col>
            </el-row>
            <el-row>
              <div v-for="(item, i) in detailData.attrList" :key="i" style="margin-left: 10px; display: inline;">
                <VideoPlayDownload v-if="item.contentType.includes('image')" :download-url="item.downloadUrl"
                  :thumbnail-url="item.thumbnailUrl" :video-url="item.url" />
                <VideoPlayDownload v-if="item.url != '' && item.contentType.includes('video')"
                  :download-url="item.downloadUrl" :thumbnail-url="item.thumbnailUrl" :video-url="item.url" />
              </div>
            </el-row>
            <el-row>
              <div v-for="(item, i) in detailData.logAttrList" :key="i" style="margin-top: 5px;display: inline;">
                <el-link v-if="item.upload" icon="el-icon-link" type="primary" @click="downloadfile(item.url)">{{
                  item.fileName
                }}
                </el-link>

                <el-tooltip v-else-if="item.fileName === 'firmwareLog.zip'" class="item" effect="dark" content="固件未上传，可点击按钮尝试拉取" placement="top-start">
                  <el-link v-loading="resendLogBtnLoading" icon="el-icon-link" type="danger" @click="resendDeviceLog(detailData.id)">{{
                    item.fileName
                  }}
                  </el-link>
                </el-tooltip>
                <el-tooltip v-else class="item" effect="dark" content="app未上传或者上传失败" placement="top-start">
                  <el-link icon="el-icon-link" type="danger" disabled>{{
                    item.fileName
                  }}
                  </el-link>
                </el-tooltip>

              </div>
            </el-row>
            <el-row>
              <el-button
                :disabled="analysisBtnLoading"
                type="primary"
                @click="analysisDeviceLog(detailData.id)"
                v-html="analysisBtnText"
              />
            </el-row>
            <el-row>
              <div v-if="showAnalysisResult" class="content">
                <el-button @click="showJson(analysisResult ? JSON.parse(analysisResult) :'' )">查看结果</el-button>
              </div>
            </el-row>
            <el-row style="margin-top: 16px;  background-color: #ffffff;">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('label109')" name="first">
                  <div style=" margin-top: 5px; display: flex;  align-items:flex-end">
                    <el-input v-model="chatInput" :disabled="isCloseClickEnble" :placeholder="$t('label111')" autosize
                      type="textarea" @keydown.native="handleKeyCode($event)" />
                    <el-button :disabled="isCloseClickEnble || inputPublic === 1" :loading="isPublicInputSending"
                      size="mini" style="margin-left: 10px;" type="primary" @click="addPublicMessage">{{ $t('label112')
                      }}
                    </el-button>
                  </div>
                  <div style=" margin-top: 5px; display: flex; flex-direction: column;">
                    <el-button v-for="(language, index) in publicMultiLanguage" :key="index"
                      :disabled="isPublicTranslate" :loading="language.isTranslating" size="small"
                      style="margin-top: 10px; margin-left: 0px; width: 150px;"
                      @click="tanslateInputPublic(chatInput, language, 1)">
                      {{ Object.values(language)[0] + "翻译" }}
                    </el-button>
                    <div style="display: flex; flex-direction: row; align-items: flex-end">
                      <div v-if="inputTranslate"
                        style="overflow: auto;max-height: 120px;font-size: 12px;padding-left: 10px;margin-right: auto;">
                        <span>{{ inputTranslate }}</span>
                      </div>
                      <div v-if="!chatInput"
                        style="font-size: 12px;color:rgba(0, 0, 0, 0.4); width: 100%; margin-left: 10px;">{{
    $t('label114') }}
                      </div>
                      <el-button v-if="inputTranslate && !inputTranslate.includes('无法翻译')" size="mini"
                        style="margin-left: 10px;" type="text" @click="useTranslate(1)">使用
                      </el-button>
                    </div>
                  </div>
                  <template>
                    <ul v-infinite-scroll="loadpublic" class="infinite-list list" infinite-scroll-disabled="disabled"
                      infinite-scroll-distance="1" infinite-scroll-immediate="false"
                      style="overflow:auto; height:640px">
                      <!-- <li v-for="i in count" class="infinite-list-item">
                    </li> -->
                      <div v-for="(item, i) in chatStrArr" :key="i" class="author-title">
                        <el-avatar v-if="!needShowDefaultUser(item.createUserType)" :size="32"
                          :style="{ background: BackGroundColor(item.createUserName) }" class="header-img">{{
    userNameRule(item.createUserName)
  }}
                        </el-avatar>
                        <el-avatar v-else :src="commonUserAvatar" class="header-img" style="width: 32px;height: 32px" />
                        <div class="author-info">
                          <span class="author-name">{{ item.createUserName }}</span>
                          <span class="author-time">{{ item.createTime }}</span>
                        </div>
                        <div class="talk-box">
                          <!-- <p style="font-size: 14px;">{{
                            item.contextType == 1 ? item.content : item.translateContext }}</p> -->
                          <div style="white-space: pre-line;font-size: 14px;">{{
    item.contextType == 1 ? item.content :
      item.contentTranslate
  }}
                          </div>
                          <div v-for="(srcItem, i) in item.attrList" :key="i"
                            style="margin-left: 10px; margin-top:20px; display: inline;">
                            <VideoPlayDownload v-if="srcItem.contentType.includes('image')"
                              :download-url="srcItem.downloadUrl" :thumbnail-url="srcItem.thumbnailUrl"
                              :video-height="80" :video-url="srcItem.url" :video-width="80" />
                            <VideoPlayDownload v-if="srcItem.url != '' && srcItem.contentType.includes('video')"
                              :download-url="srcItem.downloadUrl" :thumbnail-url="srcItem.thumbnailUrl"
                              :video-height="80" :video-url="srcItem.url" :video-width="80" />
                          </div>
                        </div>
                        <el-row style="margin-left: 40px; ">
                          <el-button :loading="item.isPublicTranslateLoading"
                            style="font-weight: 500;font-size: 14px; color: rgba(0, 0, 0, 0.6);" type="text"
                            @click="translateItem(item)">{{ item.translateBtnType === 1 ? $t('label105') :
    $t('label115') }}
                          </el-button>
                        </el-row>
                      </div>
                    </ul>
                  </template>
                </el-tab-pane>
                <el-tab-pane :label="$t('label110')" name="second">
                  <div style=" margin-top: 5px; display: flex;  align-items:flex-end">
                    <el-input v-model="chatInterInput" :placeholder="$t('label111')" autosize type="textarea"
                      @keydown.native="handleKeyCode($event)" />
                    <el-button :disabled="inputInner === 1" :loading="isInterInputSending" size="mini"
                      style="margin-left: 10px;" type="primary" @click="addPublicMessage">{{ $t('label112') }}
                    </el-button>
                    <!-- <div contenteditable="true" style="width:100%;height:50px;background:white;color:black;"></div> -->
                  </div>
                  <div style=" margin-top: 5px; display: flex; flex-direction: column;">
                    <el-button v-for="(language, index) in internalMultiLanguage" :key="index"
                      :disabled="isInnerTranslate" :loading="language.isTranslating" size="small"
                      style="margin-top: 10px; margin-left: 0px; width: 150px;"
                      @click="tanslateInputPublic(chatInterInput, language, 2)">
                      {{ Object.values(language)[0] + "翻译" }}
                    </el-button>
                    <div style="display: flex; flex-direction: row; align-items: flex-end">
                      <div v-if="inputInnerTranslate"
                        style="overflow: auto;max-height: 120px;font-size: 12px;padding-left: 10px;margin-right: auto;">
                        <span>{{ inputInnerTranslate }}</span>
                      </div>
                      <div v-if="!chatInterInput" style="font-size: 12px;color:rgba(0, 0, 0, 0.4); width: 100%;">{{
    $t('label114')
  }}
                      </div>
                      <el-button v-if="inputInnerTranslate && !inputInnerTranslate.includes('无法翻译')" size="mini"
                        style="margin-left: 10px;" type="text" @click="useTranslate(2)">{{ $t('label121') }}
                      </el-button>
                    </div>
                  </div>

                  <template>
                    <ul v-infinite-scroll="loadInter" class="infinite-list list" infinite-scroll-disabled="!disabled"
                      infinite-scroll-distance="1" infinite-scroll-immediate="false"
                      style="overflow:auto; height:640px">
                      <!-- <li v-for="i in count" class="infinite-list-item">
                    </li> -->
                      <div v-for="(item, i) in chatStrArr" :key="i" class="author-title">
                        <el-avatar :size="32" :style="{ background: BackGroundColor(item.createUserName) }"
                          class="header-img">
                          {{ userNameRule(item.createUserName) }}
                        </el-avatar>
                        <div class="author-info">
                          <span class="author-name">{{ item.createUserName }}</span>
                          <span class="author-time">{{ item.createTime }}</span>
                        </div>
                        <div class="talk-box">
                          <div style="white-space: pre-line;font-size: 14px;">{{
    item.contextType == 1 ? item.content :
      item.contentTranslate
  }}
                          </div>
                          <div v-for="(srcItem, i) in item.attrList" :key="i"
                            style="margin-left: 10px; margin-top:20px; display: inline;">
                            <VideoPlayDownload v-if="srcItem.contentType.includes('image')"
                              :download-url="srcItem.downloadUrl" :thumbnail-url="srcItem.thumbnailUrl"
                              :video-height="80" :video-url="srcItem.url" :video-width="80" />
                            <VideoPlayDownload v-if="srcItem.url != '' && srcItem.contentType.includes('video')"
                              :download-url="srcItem.downloadUrl" :thumbnail-url="srcItem.thumbnailUrl"
                              :video-height="80" :video-url="srcItem.url" :video-width="80" />
                          </div>
                        </div>
                        <el-row style="margin-left: 40px; ">
                          <el-button :loading="item.isPublicTranslateLoading"
                            style="font-weight: 500;font-size: 14px; color: rgba(0, 0, 0, 0.6);" type="text"
                            @click="translateItem(item)">{{ item.translateBtnType === 1 ? $t('label105') :
    $t('label115') }}
                          </el-button>
                        </el-row>
                      </div>
                    </ul>
                  </template>
                </el-tab-pane>
              </el-tabs>
            </el-row>
          </el-aside>
          <el-aside style="margin-left:6px;" width="23%">
            <template>
              <el-tabs v-model="activeNameRight" @tab-click="handleClickGptKnow">
                <el-tab-pane name="first">
                  <span slot="label">{{ $t('label117') }} <el-tooltip :content="$t('label120')" effect="dark"
                      placement="bottom">
                      <div slot="content">{{ $t('label120') }}</div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip> </span>
                  <div style=" margin-top: 5px; display: flex;  align-items:flex-end">
                    <el-input v-model="chatGptText" :disabled="isCloseClickEnble" :placeholder="$t('label111')"
                      @keyup.enter.native="sendChatGpt(chatGptText)">
                      <i slot="suffix" class="el-input__icon el-icon-position" @click="sendChatGpt(chatGptText)" />
                    </el-input>
                  </div>
                  <div v-if="isGptLoading" v-loading="isGptLoading" element-loading-background="rgba(0, 0, 0, 0)"
                    style="height: 400px; width: 100%;" />
                  <el-row v-if="!isGptLoading">
                    <el-col class="faqcontent" @click.native="sendFaqContent(gptContent)">{{
    getSimpleText(gptContent)
  }}
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label118')" name="second">
                  <el-row>
                    <el-col :span="24"
                      style=" margin-top: 5px; width: 100%; text-align: left; font-size: 20px; font-weight: bold;">
                      <el-autocomplete v-model="knowInput" :debounce="0" :disabled="isCloseClickEnble"
                        :fetch-suggestions="queryFaq" :placeholder="$t('label111')" :trigger-on-focus="false" clearable
                        popper-class="search-autocpmplete" style="width: 100%;" @select="handleSelect"
                        @keyup.enter.native="handleSelect({ value: knowInput })" />
                    </el-col>
                  </el-row>
                  <div v-if="isKnowlegeLoading" v-loading="isKnowlegeLoading"
                    element-loading-background="rgba(0, 0, 0, 0)" style="height: 400px; width: 100%;" />
                  <div v-for="(item, i) in knowSearchList " v-if="isSearch && !isKnowlegeLoading" :key="i"
                    direction="vertical">
                    <el-row>
                      <el-col class="faqtitle">{{ item.value }}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="faqcontent" @click.native="sendFaqContent(item.content)">{{
                        getSimpleText(item.content)
                        }}
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
          </el-aside>
        </el-container>
      </div>
    </div>
    <el-dialog
      title="data"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <pre style="white-space: pre-wrap;"><code>{{ jsonData }}</code></pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>

import {
  acceptIssue,
  addIssueComment,
  closeIssue,
  faqSearch,
  getIssueAllCategory,
  getIssueComment,
  getIssueDetail,
  updateIssue,
  analysisIssueLog,
  analysisIssueLogResult,
  resendDeviceLog
} from '@/api/track'
import { getAllUser } from '@/api/user'
import { dateTransToString } from '@/utils/util-date'
import SelectDetailIssueCategories from './SelectDetailIssueCategories.vue'
import { openaiChat, translation, translationComment, translationIssueContent } from '@/api/openai'
import { endLoading, startLoading } from '@/utils/loading'
import store from '@/store'
import { userNameRule } from '../../utils/user-name'
import commonUserAvatar from '@/assets/avatar.png'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from '@/layout/components'
import RightPanel from '@/components/RightPanel'
import { mapState } from 'vuex'
import VideoPlayDownload from '@/components/Trouble/VideoPlayDownload'
import { handleRemainTime } from '../../views/trouble/common_business'
import { TroubleStatus } from '../../views/trouble/enum'
import { getLanguageContentFromCode } from '@/utils/multiLanguage'

import i18n from '@/lang'
import { getResult } from '@/api/agent-config'

const multiLanguageConfig = getLanguageContentFromCode()

export default {
  components: {
    SelectDetailIssueCategories,
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    VideoPlayDownload
  },
  props: {
    statusType: { // 状态类型
      type: String,
      default: '',
      required: true
    },
    title: { // 标题
      type: String,
      default: '1'
    },
    isShow: { // 弹窗是否展示
      type: Boolean,
      default: false
    },
    width: { // 弹窗宽度
      type: String,
      default: ''
    },
    cancelName: { // 取消按钮名称
      type: String,
      default: '取 消'
    },
    confirmName: { // 确定按钮名称
      type: String,
      default: '确 定'
    },
    isShowFooter: { // 是否自定底部
      type: Boolean,
      default: true
    },
    appendToBody: { // 是否将自身插入至 body 元素，有嵌套的弹窗时一定要设置
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      jsonData: '',
      showAnalysisResult: false,
      analysisResult: '',
      analysisBtnLoading: false,
      resendLogBtnLoading: false,
      analysisBtnText: 'Analysis Log',
      timer: [],
      timerFileIdList: [],
      timerCount: [],
      isKnowlegeLoading: false, // 知识库搜索
      isChangePbTabLoading: false, // 更改问题标签
      isChangeIssueTypeLoading: false, // 更改问题类型
      isChangePriorityLoading: false, // 更改优先级
      isChangeAssistLoading: false, // 更改协助人
      isChangeChargeLoading: false, // 更改负责人
      isInnerMessageLoading: false, // 内部消息
      isPublicMessageLoading: false, // 公开消息
      // isDoIssueLoading:false,//开始处理反馈
      isContentTranslateLoading: false, // 反馈内容翻译
      isPulicLoading: false, // 外部部消息英文翻译loading
      isInnerLoading: false, // 内部消息英文翻译loading
      isGptLoading: false, // Gpt查询loading
      isPublicTranslate: true,
      isInnerTranslate: true,
      gptContent: '',
      chatGptSearchList: [],
      chatGptText: '',
      disabled: false,
      currentPublicPage: 0,
      currentInterPage: 0,
      inputInnerTranslate: '',
      inputTranslate: '',
      feedbackContent: '',
      tanslateBtnText: '查看翻译',
      translateBtnType: 1,
      isSearch: false,
      knowSearchList: [],
      knowInput: '',
      optionsCategories: [],
      issueCategories: [],
      restaurants: [],
      state: '',
      timeout: null,
      chatInput: '',
      chatInterInput: '',
      selectPriority: '',
      selectIssueType: '',
      chargePerson: '',
      chargePersons: [],
      assitSelect: [],
      isStart: false,
      isCloseClickEnble: true,
      activeName: 'first',
      activeNameRight: 'first',
      chatStrArr: [],
      see: false,
      priorityArr: [{
        value: 1,
        label: 'label35'
      }, {
        value: 2,
        label: 'label36'
      }, {
        value: 3,
        label: 'label37'
      }],
      issueTypeArr: [{
        value: 1,
        label: 'label39'
      }, {
        value: 2,
        label: 'label40'
      }],
      detailData: {
        'id': 123,
        'refId': 0,
        'refType': 0,
        'issueType': 0, // 问题类型
        'newServiceType': 2,
        'newCategory': 9,
        'newSubCategory': 0,
        'newServiceTypeText': '', // 问题标签
        'newCategoryText': '',
        'newSubCategoryText': '',
        'crawAttrType': 0,
        'priority': 0, // 优先级
        'environment': 0,
        'commentNum': 5,
        'attrNum': 6,
        'deviceId': '',
        'deviceModel': '',
        'deviceTimezone': '',
        'userId': 999,
        'userEmail': '',
        'userUsername': '', // 用户昵称
        'userRead': 1,
        'firmwareVersion': '',
        'appVersion': '',
        'pluginVersion': '',
        'phoneType': 1,
        'phoneModel': '',
        'phoneOsVersion': '',
        'phoneId': '',
        'phoneFactoryModel': '',
        'content': '',
        'sendLog': 0,
        'reSendLog': 1,
        'status': 2, // 当前进度
        'csTime': '',
        'csInterval': 284055722, // 新反馈停留时长ms
        'csDuration': 142688, // 初步排查时长
        'rdTime': '2023-02-06 16:57:01',
        'rdDuration': 0, // 协作排查时长
        'lastReplyTime': '2023-02-03 10:00:22',
        'assignUserId': 1642139904001,
        'assignUserName': '陈彦瑾', // 处理人
        'assignUserRead': 1,
        'updateTime': '2023-02-09 04:15:28',
        'createTime': '2023-02-03 10:00:22',
        'createUserId': 999,
        'createUserName': 'test',
        'updateUserId': 999,
        'updateUserName': 'test',
        'logAttrList': [],
        'attrList': [],
        'assistUserList': [], // 协作人
        'remainingProcessingTime': 0 // 剩余处理时长
      },
      responseData: {},
      url: '',
      promblemTabStr: '',
      promblemTabTitle: '',
      assistUsers: [],
      chargePersonUser: [],
      konwList: [],
      chatType: 1,
      problemTabAllArr: [],
      isUpdateChargePerson: false,
      updateAssist: false,
      isUpdateService: false,
      commonUserAvatar: commonUserAvatar,
      chatInputTemp: '',
      chatInputInnerTemp: '',
      downloadFileName: 'video.mp4',
      undoCooldown: 3000,
      canUndo: true,
      lastUndoTime: 0,
      // 公开消息发送状态：1：不可发送 3：可发送
      inputPublic: 1,
      // 公开消息是否在发送中
      isPublicInputSending: false,
      // 内部消息发送状态：1：不可发送 3：可发送
      inputInner: 1,
      // 内部消息是否在发送中
      isInterInputSending: false,
      //多语配置
      publicMultiLanguage: [],
      internalMultiLanguage: []
    }
  },
  computed: {
    handleText() {
      return this.detailData.status === TroubleStatus.Finish || this.detailData.status === TroubleStatus.Internal ? i18n.t('label26') : i18n.t('label9')
    },
    visible: {
      get() {
        return this.isShow
      },
      set(val) {
        this.$emit('update:isShow', false)
      }
    },
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },

  watch: {
    // 已经选为协助人，不可以设置为负责人
    assitSelect(val) {
      for (const d of this.chargePersonUser) {
        d.disabled = false
      }
      if (val.length === 1) {
        for (const user of this.chargePersonUser) {
          // console.log(val[0])
          if (val[0] === user.value) {
            user.disabled = true
          }
        }
      } else {
        for (const user of this.chargePersonUser) {
          for (const assist of val) {
            if (assist === user.value) {
              user.disabled = true
            }
          }
        }
      }
      // console.log(this.chargePersonUser)
    },
    // 观察公共消息输入框是否为空
    chatInput(val) {
      if (this.isEmpty(val)) {
        this.isPublicTranslate = true
        this.inputTranslate = ''
        this.inputPublic = 1
      } else {
        if (this.chatInputTemp === val) {
          this.isPublicTranslate = true
        } else {
          this.isPublicTranslate = false
        }
        this.inputPublic = 3
      }
      this.chatInputTemp = val
    },
    // 观察内部消息输入框是否为空
    chatInterInput(val) {
      if (this.isEmpty(val)) {
        this.isInnerTranslate = true
        this.inputInnerTranslate = ''
        this.inputInner = 1
      } else {
        if (this.chatInputInnerTemp === val) {
          this.isInnerTranslate = true
        } else {
          this.isInnerTranslate = false
        }
        this.inputInner = 3
      }
      this.chatInputInnerTemp = val
    },
    chargePerson(val) {
      for (const d of this.assistUsers) {
        d.disabled = false
      }
      for (const user of this.assistUsers) {
        if (val === user.value) {
          user.disabled = true
        }
      }
      // console.log(this.assistUsers)
    }
  },
  created() {

  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化数据和初始化调用接口
    initData() {
      // console.log('chushihua')
      this.canUndo = true
      this.lastUndoTime = 0
      this.undoCooldown = 3000
      this.gptContent = ''
      this.chatGptSearchList = []
      this.chatGptText = ''
      this.currentPublicPage = 1
      this.currentInterPage = 1
      this.inputInnerTranslate = ''
      this.inputTranslate = ''
      this.feedbackContent = ''
      this.chatType = 1
      this.chatStrArr = []
      this.getAllUserFromServer()
      this.getIssueDetailFromServer(true)
      this.getIssueCommentFromServer(this.chatType, 1)
      this.getIssueCategoriesFromServer()
      this.knowInput = ''
      this.konwList = []
      this.knowSearchList = []
      this.chatInput = ''
      this.chatInterInput = ''
      this.activeName = 'first'
      this.activeNameRight = 'first'
      this.detailData = {}
      this.isUpdateChargePerson = false
      this.updateAssist = false
      this.isUpdateService = false
      this.selectPriority = ''
      this.selectIssueType = ''
      this.chargePerson = ''
      this.assitSelect = []
      this.issueCategories = []
      this.tanslateBtnText = '查看翻译'
      this.translateBtnType = 1

      //公开和内部消息多余配置，加入多语配置项的基础上加入isTranslating字段
      this.publicMultiLanguage = multiLanguageConfig.map(language => {
        return { ...language, isTranslating: false };
      });
      this.internalMultiLanguage = multiLanguageConfig.map(language => {
        return { ...language, isTranslating: false };
      });
    },
    // 查询chatGpt
    sendChatGpt(gptText) {
      if (this.isEmpty(gptText)) {
        return
      }
      this.isGptLoading = true
      openaiChat(gptText).then(response => {
        this.isGptLoading = false
        this.chatGptSearchList = []
        // console.log(response)
        if (response.code === 0) {
          this.gptContent = response.data
        }
      }).catch((error) => {
        this.isGptLoading = false
        // console.log(error)
      })
    },
    translateItem(item) {
      if (item.translateBtnType === 1) {
        // if (item.translateBtnText === '查看翻译') {
        if (this.isEmpty(item.contentTranslate)) {
          // console.log(item.id)
          this.$nextTick(() => {
            item.isPublicTranslateLoading = true
            this.$forceUpdate()
          })
          // console.log(item)
          translationComment(item.id, item.content).then(response => {
            // console.log(item, response)
            item.isPublicTranslateLoading = false
            if (response.code === 0) {
              item.contentTranslate = response.data
              item.contextType = 2
              item.translateBtnType = 2
              // item.translateBtnText = '查看原文'
            }
            // console.log(item, response)
          }).catch((error) => {
            item.isPublicTranslateLoading = false
            // console.log(error)
          })
        } else {
          item.contextType = 2
          // item.translateBtnText = '查看原文'
          item.translateBtnType = 2
        }
      } else {
        item.contextType = 1
        // item.translateBtnText = '查看翻译'
        item.translateBtnType = 1
      }
    },
    loadInter() {
      this.currentInterPage++
      this.chatType = 2
      this.getIssueCommentFromServer(2, this.currentInterPage)
    },
    loadpublic() {
      this.currentPublicPage++
      this.chatType = 1
      this.getIssueCommentFromServer(1, this.currentPublicPage)
      // }else{
      //   this.currentInterPage++
      //   this.chatType = 2
      //   this.getIssueCommentFromServer(1, this.currentInterPage)
      // }
    },
    // 评论输入框下面的翻译点击使用
    useTranslate(type) {
      if (type == 1) {
        this.chatInput = this.inputTranslate
        this.inputTranslate = ''
      } else {
        this.chatInterInput = this.inputInnerTranslate
        this.inputInnerTranslate = ''
      }
    },
    // 反馈详情公共消息输入翻译
    tanslateInputPublic(content, language, type) {
      language.isTranslating = true

      translation(Object.keys(language)[0], content).then(response => {

        if (type === 1) {
          this.publicMultiLanguage = multiLanguageConfig.map(language => {
            return { ...language, isTranslating: false };
          });
        } else {
          this.internalMultiLanguage = multiLanguageConfig.map(language => {
            return { ...language, isTranslating: false };
          });
        }
        // console.log(response)
        if (response.code === 0) {
          if (type == 1) {
            this.isPublicTranslate = true
            this.inputTranslate = response.data
          } else {
            this.isInnerTranslate = true
            this.inputInnerTranslate = response.data
          }
        }
      }).catch((error) => {
        if (type === 1) {
          this.isPulicLoading = false
        } else {
          this.isInnerLoading = false
        }
        // console.log(error)
      })
    },
    // 反馈内容中文翻译为英文
    translateZToE() {
      // '查看翻译'
      if (this.translateBtnType === 1) {
        if (this.isEmpty(this.detailData.contentTranslate)) {
          this.isContentTranslateLoading = true
          translationIssueContent(this.$route.query.issue_id, this.detailData.content).then(response => {
            this.isContentTranslateLoading = false
            // console.log(response)
            if (response.code === 0) {
              this.feedbackContent = response.data
              this.detailData.contentTranslate = response.data
              // this.tanslateBtnText = '查看原文'
              this.translateBtnType = 2
            }
          }).catch((error) => {
            this.isContentTranslateLoading = false
            // console.log(error)
          })
        } else {
          this.feedbackContent = this.detailData.contentTranslate
          // this.tanslateBtnText = '查看原文'
          this.translateBtnType = 2
        }
      } else {
        this.feedbackContent = this.detailData.content
        // this.tanslateBtnText = '查看翻译'
        this.translateBtnType = 1
      }
    },
    handleKeyCode(event) {
      if (event.keyCode == 13) {
        if (!event.ctrlKey) {
          const now = Date.now()
          if ((now - this.lastUndoTime > this.undoCooldown)) {
            this.lastUndoTime = now
            event.preventDefault()
            this.addPublicMessage()
          } else {
            event.preventDefault()
          }
        } else {
          if (this.chatType == 1) {
            const textarea = event.target
            const position = textarea.selectionStart
            const value = textarea.value
            textarea.value = value.substring(0, position) + '\n' + value.substring(position, value.length)
            this.chatInput = textarea.value
          } else {
            const textarea = event.target
            const position = textarea.selectionStart
            const value = textarea.value
            textarea.value = value.substring(0, position) + '\n' + value.substring(position, value.length)
            this.chatInterInput = textarea.value
          }
        }
      }
    },
    // 已经是协助人不可选为负责人
    visibleChargePerson() {

    },
    //  //已经是负责人不可选为协助人
    //  visibleAssistPerson(){
    //   for (const d of this.assistUsers) {
    //     d.disabled = false
    //   }
    //   for (const user of this.assistUsers) {
    //     if(this.chargePerson===user.value){
    //       user.disabled = true
    //     }
    //   }
    // },
    /**
     * 将富文本转换为纯文本内容
     * @function
     * @param {*} html  富文本内容
     * @returns {string} 返回纯文本内容、
     */

    getSimpleText(html) {
      const re1 = new RegExp('<.+?>', 'g') // 匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      const arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"',
        'ldquo': '“',
        'mdash': '—',
        'rdquo': '”'
      }
      return html.replace(re1, '').replace(/&(lt|gt|nbsp|amp|quot|ldquo|mdash|rdquo);/ig, function (all, t) {
        return arrEntities[t]
      })
    },

    sendFaqContent(content) {
      if (this.chatType == 1) {
        this.chatInput = this.getSimpleText(content).trim()
      } else {
        this.chatInterInput = this.getSimpleText(content).trim()
      }
    },
    closeDialog() {
      var params = {}
      // //当前进度
      params.status = this.detailData.status
      // //负责人
      if (this.isUpdateChargePerson) {
        for (let index = 0; index < this.assistUsers.length; index++) {
          if (this.chargePerson == this.assistUsers[index].value) {
            params.chargePerson = this.assistUsers[index].label
          }
        }
      }
      // //协助人
      if (this.updateAssist) {
        var temp = []
        for (let i = 0; i < this.assitSelect.length; i++) {
          for (let j = 0; j < this.assistUsers.length; j++) {
            if (this.assitSelect[i] == this.assistUsers[j].value) {
              temp.push(this.assistUsers[j].label)
            }
          }
        }
        params.assistSelect = temp
      }
      if (this.isUpdateService) {
        params.serviceTypeText = this.getPromTextById(this.issueCategories[0]),
          params.cargortyTypeText = this.getPromTextById(this.issueCategories[1]),
          params.subCargortyTypeText = this.getPromTextById(this.issueCategories[2])
      }
      // }
      // console.log(JSON.stringify(params))
      const href = window.location.origin
      window.opener.postMessage('trouble-update' + JSON.stringify(params), href)
    },
    // 处理反馈
    clickAcceptIssue(issueData) {
      // this.isDoIssueLoading = true
      startLoading()
      var data = {}
      data.id = issueData.id
      acceptIssue(data).then(response => {
        // this.isDoIssueLoading = false
        endLoading()
        // console.log(response)
        if (response.code === 0) {
          this.isUpdateChargePerson = true
          issueData.assignUserName = store.getters.name
          this.chargePerson = this.getIdByName(store.getters.name)
          issueData.assignUserId = this.getIdByName(store.getters.name)
          issueData.status = 1
          this.isStart = true
          this.isCloseClickEnble = false
          this.closeDialog()
          this.getIssueDetailFromServer(false)
        }
      }).catch((error) => {
        endLoading()
        // console.log(error)
      })
    },
    // 关闭反馈
    closeIssueDetail() {
      startLoading()
      closeIssue(this.$route.query.issue_id).then(response => {
        endLoading()
        // console.log(response)
        if (response.code === 0) {
          this.detailData.status = 4
          this.closeDialog()
          this.isCloseClickEnble = true
          this.getIssueDetailFromServer(false)
        }
      }).catch((error) => {
        endLoading()
        // console.log(error)
      })
    },
    preView(url) {
      this.srcList = []
      this.srcList.push(url)
    },
    // 获取问题类型
    getIssueCategoriesFromServer() {
      getIssueAllCategory().then(response => {
        // console.log(response)
        if (response.code === 0) {
          this.optionsCategories = []
          this.problemTabAllArr = []
          for (const d of response.data) {
            // console.log(d)
            for (const sub of d.sub) {
              var subOption1 = []
              for (const sub1 of sub.sub) {
                var subOption2 = []
                for (const sub2 of sub1.sub) {
                  subOption2.push({
                    value: sub2.id,
                    label: sub2.name
                  })
                  this.problemTabAllArr.push({
                    value: sub2.id,
                    label: sub2.name
                  })
                }
                if (subOption2.length > 0) {
                  subOption1.push({
                    value: sub1.id,
                    label: sub1.name,
                    children: subOption2
                  })
                  this.problemTabAllArr.push({
                    value: sub1.id,
                    label: sub1.name
                  })
                } else {
                  subOption1.push({
                    value: sub1.id,
                    label: sub1.name
                  })
                  this.problemTabAllArr.push({
                    value: sub1.id,
                    label: sub1.name
                  })
                }
              }
              this.optionsCategories.push({
                value: sub.id,
                label: sub.name,
                children: subOption1
              })
              this.problemTabAllArr.push({
                value: sub.id,
                label: sub.name
              })
            }
          }
        }
      })
    },
    addPublicMessage() {
      if ((this.chatType == 1 && this.isEmpty(this.chatInput)) || (this.chatType == 2 && this.isEmpty(this.chatInterInput))) {
        return
      }
      const messageData = {}
      messageData.type = this.chatType
      if (this.chatType == 1) {
        messageData.content = this.chatInput
      } else {
        messageData.content = this.chatInterInput
      }
      this.addIssueCommentFromServer(messageData)
    },

    getAllUserFromServer() {
      getAllUser().then(response => {
        // console.log(response)
        this.assistUsers = []
        this.chargePersonUser = []
        if (response.code == 0) {
          for (const d of response.data) {
            this.assistUsers.push({
              label: d.name,
              value: d.id
            })
            this.chargePersonUser.push({
              label: d.name,
              value: d.id
            })
          }
          // console.log(this.assistUsers)
        }
      })
    },
    // 更新问题标签
    selectPromblemTabChange(value) {
      this.isUpdateService = false
      console.log(value)
      const problemTabValue = {}
      problemTabValue.id = this.$route.query.issue_id
      problemTabValue.newServiceType = value[0]
      problemTabValue.newCategory = value[1]
      problemTabValue.newSubCategory = value[2]

      // console.log(value[0])
      // console.log(problemTabValue)
      this.updateIssueToService(problemTabValue, 5)
    },
    selectIssueTypeUpdate(value) {
      // console.log(value)
      const issueTypeValue = {}
      issueTypeValue.id = this.$route.query.issue_id
      issueTypeValue.issueType = value
      this.updateIssueToService(issueTypeValue, 4)
    },
    selectPriorityUpdate(value) {
      // console.log(value)
      const priorityValue = {}
      priorityValue.id = this.$route.query.issue_id
      if (value >= 0 && !this.isEmpty(value)) {
        priorityValue.priority = value
      } else {
        priorityValue.priority = 0
      }

      this.updateIssueToService(priorityValue, 3)
    },
    // 更新协作人
    selectAssistPersonUpdate(value) {
      // console.log(value)
      // console.log(this.assitSelect)
      this.updateAssist = false
      const assistArr = []
      const assistPersonValue = {}
      assistPersonValue.id = this.$route.query.issue_id
      for (const r of value) {
        if (!this.isEmpty(r) && r >= 0) {
          const temp = { userId: r }
          assistArr.push(temp)
        }
      }
      assistPersonValue.assistUserList = assistArr
      // console.log(assistPersonValue)
      this.updateIssueToService(assistPersonValue, 2)
    },

    getIdByName(r) {
      // console.log(r)
      for (let index = 0; index < this.assistUsers.length; index++) {
        if (r == this.assistUsers[index].label) {
          return this.assistUsers[index].value
        }
      }
    },
    isAssistID(r) {
      // console.log(r)
      for (let index = 0; index < this.assistUsers.length; index++) {
        if (r == this.assistUsers[index].value) {
          return true
        }
      }
      return false
    },
    // 更新负责人
    selectChargePersonUpdate(value) {
      // console.log(value)
      // console.log(this.chargePerson)
      this.isUpdateChargePerson = false
      const chargePersonValue = {}
      chargePersonValue.id = this.$route.query.issue_id
      chargePersonValue.assignUserId = value
      this.updateIssueToService(chargePersonValue, 1)
    },

    leave() {
      this.see = false
    },
    enter() {
      this.see = true
    },
    downloadfile(url) {
      const link = document.createElement('a')
      try {
        link.href = url
        // link.target = '_blank'
      } catch (error) {
        link.href = window.URL.createObjectURL(url)
      }
      link.click()
    },
    resendDeviceLog(id) {
      this.resendLogBtnLoading = true
      // this.showAnalysisResult = true
      // this.analysisResult = '{"ab":"222"}'
      console.log(id)
      resendDeviceLog(id).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.resendLogBtnLoading = false
      })
    },
    analysisDeviceLog(id) {
      this.analysisBtnLoading = true
      this.analysisBtnText = 'Decrypting'
      // this.showAnalysisResult = true
      // this.analysisResult = '{"ab":"222"}'
      console.log(id)
      analysisIssueLog(id).then(response => {
        if (response.code === 0) {
          // 获取 requestId
          const requestId = response.data
          const tKey = 'analysisBtnLoading'
          this.analysisBtnText = '等待获取结果。。。'
          if (requestId === 0) {
            this.analysisBtnLoading = false
            this.analysisBtnText = '生成分析请求失败'
          } else {
            this.timerCount[tKey] = 0
            this.timer[tKey] = setInterval(this.checkAndDownloadFile, 1000, id, false)
            this.timerFileIdList.push(tKey)
          }
        }
      }).catch(error => {
        console.log(error)
        this.analysisBtnText = 'Analysis Log'
      }).finally(() => {
        this.analysisBtnLoading = false
      })
    },

    checkAndDownloadFile: function(requestId, manual = true) {
      // 根据 requestId 获取结果
      // console.log('checkAndDownloadFile')
      const tKey = 'analysisBtnLoading'

      analysisIssueLogResult(requestId).then(response => {
        if (response.code !== 0) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          this.analysisBtnText = response.message + ' 点击再次生成'
        }
        const timerElement = this.timer[tKey]
        const data = response.data
        if (data.status !== 0) {
          if (timerElement) {
            clearInterval(timerElement)
          }
          if (data.status === 2) {
            this.analysisBtnText = '点击再次生成'
            this.showAnalysisResult = true
            this.chatInput = data.result.result.conclusion
            this.analysisResult = JSON.stringify(data.result)
            this.showJson(this.analysisResult ? JSON.parse(this.analysisResult) : '')
          } else {
            this.analysisBtnText = '生成失败，点击重新生成'
          }

          this.analysisBtnLoading = false
          // 请求成功
          // this.result = data
          // this.rawJson = data.result
          return
        }
        if (timerElement) {
          // console.log('当前fileId有定时器')
          this.timerCount[tKey] = ++this.timerCount[tKey]
          const timerCountElement = this.timerCount[tKey]
          // console.log(`取消 (已请求${timerCountElement}次)`)
          this.analysisBtnText = '等待获取结果。。。已等待约' + timerCountElement + 's'
          // row.analysisBtnText = `取消 (已请求${timerCountElement}次)`
          if (timerCountElement > 600) {
            // 最多60次
            clearInterval(timerElement)
            this.analysisBtnText = '已超过600s，点击重新生成'
            this.analysisBtnLoading = false
            // row.auto = !row.auto
          }
        }
      }).finally()
    },
    showJson(text) {
      this.jsonData = text
      this.dialogVisible = true
    },

    getLogName(name) {
      if (!this.isEmpty(name)) {
        return name
      }
      return 'Log日志'
    },

    getPromblemTab() {
      this.issueCategories = []
      if (!this.isEmpty(this.detailData.newServiceTypeText)) {
        this.issueCategories.push(this.detailData.newServiceType)
      }
      if (!this.isEmpty(this.detailData.newCategoryText)) {
        this.issueCategories.push(this.detailData.newCategory)
      }
      if (!this.isEmpty(this.detailData.newSubCategoryText)) {
        this.issueCategories.push(this.detailData.newSubCategory)
      }
      // console.log(this.issueCategories)
      // this.promblemTabStr = ''
      // var tabStr = ''
      // if (!this.isEmpty(this.detailData.serviceTypeText) && !this.isEmpty(this.detailData.categoryText)) {
      //   tabStr = this.detailData.serviceTypeText + '/' + '\n' + this.detailData.categoryText
      // } else {
      //   tabStr = this.detailData.serviceTypeText + this.detailData.categoryText
      // }
      // if (!this.isEmpty(tabStr) && !this.isEmpty(this.detailData.subCategoryText)) {
      //   this.promblemTabStr = tabStr + '/' + '\n' + this.detailData.subCategoryText
      // } else {
      //   this.promblemTabStr = tabStr + this.detailData.subCategoryText
      // }
    },

    getPromblemTitle(servicetext, categoryText, subCategoryText) {
      this.promblemTabTitle = ''
      var tabTitle = ''
      // console.log(servicetext)
      // console.log(categoryText)
      // console.log(subCategoryText)
      if (this.isEmpty(servicetext)) {
        servicetext = ''
      }
      if (this.isEmpty(categoryText)) {
        categoryText = ''
      }
      if (this.isEmpty(subCategoryText)) {
        subCategoryText = ''
      }
      if (!this.isEmpty(servicetext) && !this.isEmpty(categoryText)) {
        tabTitle = servicetext + '/' + categoryText
        this.promblemTabTitle = tabTitle
      } else {
        tabTitle = servicetext + categoryText
        this.promblemTabTitle = tabTitle
      }
      if (!this.isEmpty(tabTitle) && !this.isEmpty(subCategoryText)) {
        this.promblemTabTitle = tabTitle + '/' + subCategoryText
      } else {
        this.promblemTabTitle = tabTitle + subCategoryText
      }
      // console.log(this.promblemTabTitle)
    },
    isEmpty(str) {
      if (str === undefined || str === null) {
        return true
      }
      const removeStr = this.getRemoveSpaces(str)
      // console.log('11111' + removeStr)
      if (removeStr == undefined || removeStr == null || removeStr === '') {
        return true
      } else {
        return false
      }
    },
    // 去除空格和回车
    getRemoveSpaces(str) {
      const strTemp = String(str)
      return strTemp
        .replace(/\s*/g, '') // 将所有 空格 replace ''
    },
    fromatFeedbackTime(long_time) {
      const feedBackMin = parseInt(long_time / 1000 / 60)
      if (feedBackMin < 60) {
        if (feedBackMin === 0) {
          return '--'
        } else {
          return i18n.t('label104', [feedBackMin])
        }
      } else {
        return i18n.t('label101', [parseInt(feedBackMin / 60)])
      }
    },
    // 进度标签类型
    getStatusType(status) {
      switch (status) {
        case TroubleStatus.New:
          return 'danger'
        case TroubleStatus.Preliminary:
          return 'warning'
        case TroubleStatus.Collaborate:
          return 'success'
        case 3:
          return 'info'
        case TroubleStatus.Finish:
          return 'info'
        case TroubleStatus.Internal:
          return 'info'
        default:
          return 'info'
      }
    },
    getStatusContent(status) {
      switch (status) {
        case TroubleStatus.New:
          return i18n.t('label23')
        case TroubleStatus.Preliminary:
          return i18n.t('label24')
        case TroubleStatus.Collaborate:
          return i18n.t('label25')
        case 3:
          return '未知'
        case TroubleStatus.Finish:
          return i18n.t('label26')
        case TroubleStatus.Internal:
          return i18n.t('label27')
        default:
          return '未知'
      }
    },
    getIssueType(issueType) {
      switch (issueType) {
        case 0:
          return 'info'
        case 1:
          return 'danger'
        case 2:
          return 'danger'
        case 3:
          return ''
        default:
          return 'info'
      }
    },
    getIssueContent(issueType) {
      switch (issueType) {
        case 0:
          return '未知类型'
        case 1:
          return '需求'
        case 2:
          return '缺陷'
        default:
          return '未知类型'
      }
    },
    getPriorityType(status) {
      switch (status) {
        case 0:
          return 'info'
        case 1:
          return 'danger'
        case 2:
          return 'danger'
        case 3:
          return ''
        default:
          return 'info'
      }
    },
    getPriorityContent(status) {
      switch (status) {
        case 0:
          return '未设置'
        case 1:
          return '非常紧急'
        case 2:
          return '紧急'
        case 3:
          return '一般'
        default:
          return '未设置'
      }
    },
    BackGroundColor: function (userName) {
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
            return '#C5C5C5'
        }
      } else {
        return '#C5C5C5'
      }
    },
    getAssistUserName(data, aUserIndex) {
      if (data.assistUserList) {
        if (data.assistUserList.length > aUserIndex) {
          return data.assistUserList[aUserIndex].userName
        }
      }
      return ''
    },
    needShowDefaultUser(creatUserType) {
      if (creatUserType == 99) {
        return false
      }
      return true
    },
    getIssueDetailFromServer(isLoading) {
      if (this.$route.query.issue_id == undefined) {
        this.$router.replace({ path: '/trouble-look' })
        // console.log(this.$route.query.issue_id)
        return
      }
      if (isLoading) {
        startLoading()
        // console.log(this.$route.query.issue_id)
        this.assitSelect = []
        this.isStart = false
      }
      getIssueDetail(this.$route.query.issue_id).then(response => {
        // console.log(response)
        if (response.code === 0) {
          if (!isLoading) {
            this.detailData.csInterval = response.data.csInterval
            this.detailData.csDuration = response.data.csDuration
            this.detailData.rdDuration = response.data.rdDuration
          } else {
            if (response.data.status > 0) {
              this.isStart = true
              this.isCloseClickEnble = false
            }
            this.detailData = eval(response.data)
            if (response.data.assignUserId > 0) {
              this.chargePerson = response.data.assignUserId
            }
            if (response.data.priority == 1 || response.data.priority == 2 || response.data.priority == 3) {
              this.selectPriority = response.data.priority
            }
            if (response.data.issueType == 1 || response.data.issueType == 2) {
              this.selectIssueType = response.data.issueType
            }
            // 反馈内容
            this.feedbackContent = this.detailData.content
            if (response.data.status === TroubleStatus.Finish || response.data.status === TroubleStatus.Internal) {
              this.isCloseClickEnble = true
            }
            this.getPromblemTitle(this.detailData.newServiceTypeText, this.detailData.newCategoryText, this.detailData.newSubCategoryText)
            this.getPromblemTab()

            // 窗口标题
            const windowTitle = this.detailData.newSubCategoryText === '' ? this.detailData.newCategoryText : this.detailData.newSubCategoryText
            document.title = 'ID:' + this.$route.query.issue_id + '\xa0' + windowTitle

            // console.log(this.assitSelect)
            // console.log(this.isStart)
            // //console.log(this.promblemTabTitle)
            for (const d of response.data.assistUserList) {
              this.assitSelect.push(
                d.userId
              )
            }
            // console.log(this.assitSelect)
            // console.log(this.isStart)
            // responseData = response.data;
          }
        }
        if (isLoading) {
          endLoading()
        }
      }).catch((error) => {
        if (isLoading) {
          endLoading()
        }
        // console.log(error)
      })
    },
    // 更新数据
    updateIssueToService(data, type) {
      if (type === 1) {
        this.isChangeChargeLoading = true
      }
      if (type === 2) {
        this.isChangeAssistLoading = true
      }
      if (type === 3) {
        this.isChangePriorityLoading = true
      }
      if (type === 4) {
        this.isChangeIssueTypeLoading = true
      }
      if (type === 5) {
        this.isChangePbTabLoading = true
      }
      updateIssue(data).then(response => {
        if (type === 1) {
          this.isChangeChargeLoading = false
        }
        if (type === 2) {
          this.isChangeAssistLoading = false
        }
        if (type === 3) {
          this.isChangePriorityLoading = false
        }
        if (type === 4) {
          this.isChangeIssueTypeLoading = false
        }
        if (type === 5) {
          this.isChangePbTabLoading = false
        }
        // console.log(response)
        if (response.code == 0) {
          // 更新问题标签
          if (type == 1) {
            this.isUpdateChargePerson = true
            this.closeDialog()
          }
          if (type == 2) {
            this.updateAssist = true
            if (data.assistUserList.length > 0) {
              this.detailData.status = 2
            }
            this.getIssueDetailFromServer(false)
            this.closeDialog()
          }
          if (!this.isEmpty(data.newServiceType)) {
            this.isUpdateService = true
            var newServiceText = this.getPromTextById(data.newServiceType)
            var newCategoryText = this.getPromTextById(data.newCategory)
            var newSubCategoryText = this.getPromTextById(data.newSubCategory)
            // console.log(newServiceText)
            // console.log(newCategoryText)
            // console.log(newSubCategoryText)
            // this.promblemTabTitle = ''
            // this.promblemTabTitle = newServiceText + '/' +newCategoryText+"/"+newSubCategoryText
            this.getPromblemTitle(newServiceText, newCategoryText, newSubCategoryText)
            this.closeDialog()
          }
        }
      }).catch((error) => {
        if (type === 1) {
          this.isChangeChargeLoading = false
        }
        if (type === 2) {
          this.isChangeAssistLoading = false
        }
        if (type === 3) {
          this.isChangePriorityLoading = false
        }
        if (type === 4) {
          this.isChangeIssueTypeLoading = false
        }
        if (type === 5) {
          this.isChangePbTabLoading = false
        }
        // console.log(error)
      })
    },
    getPromTextById(id) {
      for (const a of this.problemTabAllArr) {
        if (id == a.value) {
          return a.label
        }
      }
      return ''
    },
    // 获取评论
    getIssueCommentFromServer(typenum, currentPage) {
      if (this.$route.query.issue_id == undefined) {
        // console.log(this.$route.query.issue_id)
        return
      }
      const param = { current: currentPage, size: 20, type: typenum }
      // console.log(param + 'issue_id=' + this.$route.query.issue_id)
      // if(typenum ===1 ){
      //   this.isPublicMessageLoading = true
      // }
      // if(typenum ===2){
      //   this.isInnerMessageLoading = true
      // }
      getIssueComment(this.$route.query.issue_id, param).then(response => {
        // console.log(response)
        //   if(typenum ===1 ){
        //   this.isPublicMessageLoading = false
        // }
        // if(typenum ===2){
        //   this.isInnerMessageLoading = false
        // }
        if (response.code === 0) {
          for (const r of response.data.records) {
            r.contextType = 1
            // r.translateBtnText = '查看翻译'
            r.translateBtnType = 1
            r.isPublicTranslateLoading = false
            this.chatStrArr.push(r)
          }
          // this.$router.go(0)
        }
      }).catch((error) => {
        //   if(typenum ===1 ){
        //   this.isPublicMessageLoading = false
        // }
        // if(typenum ===2){
        //   this.isInnerMessageLoading = false
        // }
        // console.log(error)
      })
    },
    // 知识库搜索
    queryFaq(queryString, callback) {
      if (this.isEmpty(queryString)) {
        return
      }
      this.konwList = []
      faqSearch(queryString).then(response => {
        var that = this
        this.konwList = []
        // console.log(response)
        if (response.code == 0) {
          for (const d of response.data) {
            this.konwList.push({
              value: d.title,
              content: d.content
            })
          }
          // console.log(this.konwList)
          //    if(call!=null){
          var showSuggestion = document.getElementsByClassName('search-autocpmplete')[0]
          callback(this.konwList)
          if (this.konwList.length) {
            showSuggestion.style.display = 'block'
          }
        }
      })
    },
    queryFaqContent(title) {
      if (this.isEmpty(title)) {
        return
      }
      this.isKnowlegeLoading = true
      faqSearch(title).then(response => {
        var that = this
        this.knowSearchList = []
        // console.log(response)
        this.isKnowlegeLoading = false
        if (response.code == 0) {
          for (const d of response.data) {
            this.knowSearchList.push({
              value: d.title,
              content: d.content
            })
          }
        }
        // console.log(this.knowSearchList)
      })
    },
    handleSelect(item) {
      // console.log(item.value)
      this.queryFaqContent(item.value)
      this.isSearch = true
    },
    // 提交评论
    addIssueCommentFromServer(data) {
      if (this.chatType === 1) {
        this.isPublicInputSending = true
        this.isPublicMessageLoading = true
      }
      if (this.chatType === 2) {
        this.isInterInputSending = true
        this.isInnerMessageLoading = true
      }
      addIssueComment(this.$route.query.issue_id, data).then(response => {
        if (this.chatType === 1) {
          this.isPublicInputSending = false
          this.isPublicMessageLoading = false
        }
        if (this.chatType === 2) {
          this.isInterInputSending = false
          this.isInnerMessageLoading = false
        }
        // console.log(response)
        if (response.code === 0) {
          const message = {}
          const chatPublickTemp = []
          message.createUserType = response.data.createUserType
          message.createUserName = response.data.createUserName
          message.createTime = dateTransToString(new Date())
          if (this.chatType == 1) {
            message.content = this.chatInput
            this.inputTranslate = ''
          } else {
            message.content = this.chatInterInput
            this.inputInnerTranslate = ''
          }
          message.id = response.data.id
          message.contentTranslate = ''
          message.contextType = 1
          // message.translateBtnText = '查看翻译'
          message.translateBtnType = 1
          chatPublickTemp.push(message)
          for (const f of this.chatStrArr) {
            chatPublickTemp.push(f)
          }
          this.chatStrArr = chatPublickTemp
          if (this.chatType == 1) {
            this.chatInput = ''
          } else {
            this.chatInterInput = ''
          }
        }
      }).catch((error) => {
        if (this.chatType === 1) {
          this.isPublicInputSending = false
          this.isPublicMessageLoading = false
        }
        if (this.chatType === 2) {
          this.isInterInputSending = false
          this.isInnerMessageLoading = false
        }
        // console.log(error)
      })
    },
    handleClick(tab, event) {
      if (tab.index == 0) {
        // 请求公开消息
        this.disabled = false
        this.chatType = 1
        this.currentPublicPage = 1
        this.chatStrArr = []
        this.getIssueCommentFromServer(1, this.currentPublicPage)
      } else {
        // 请求内部消息
        this.disabled = true
        this.chatType = 2
        this.currentInterPage = 1
        this.chatStrArr = []
        this.getIssueCommentFromServer(2, this.currentInterPage)
      }
    },
    userNameRule(name) {
      return userNameRule(name)
    },
    calHandleTime(status, remainingProcessingTime) {
      return status === TroubleStatus.Internal ? '——' : handleRemainTime(status, remainingProcessingTime)
    }
  }
}

</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.nav {
  position: fixed;
  width: 100%;
  height: 50px;
  left: 0;
  top: 0;
  z-index: 1000;
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.header {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 24px;
  font-size: 16px;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.decription {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
}

.el-descrip {
  ::v-deep.el-descriptions__body ::v-deep .el-descriptions__table {
    white-space: nowrap;
  }

  ::v-deep.el-descriptions-item__content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 8px;
  }

  ::v-deep.el-descriptions-item__label {
    white-space: nowrap;
  }
}

.list {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}

.talk-box {
  background: #F3F3F3;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 1px;
  padding-bottom: 1px;
  margin-left: 40px;

}

.author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  height: 40px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.4);
}

.author-name {
  font-size: 14px;
}

.author-time {
  font-size: 14px;
  margin-left: 10px;
}

.header-img {
  display: inline-block;
  vertical-align: top
}

.author-title {
  padding: 0px;
}

.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: left;
  margin-top: 2px;
  margin-right: 2px;
  margin-left: 2px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: left;
  height: 100%;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 2px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
}

.el-container {
  height: 100vh;
  background: #E7E7E7;
}

.aside_font {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}

.faqcontent {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
}

.faqcontent:hover {
  color: #4E8CEE;
}

.faqtitle {
  font-family: 'PingFang SC';
  font-style: bold;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 1);
}

.center_title_text {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  text-align: left;
  font-size: 20px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
}

.center_content_text {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  color: rgba(0, 0, 0, 0.85);
}

.el-autocomplete-suggestion {
  display: none;
}
</style>
