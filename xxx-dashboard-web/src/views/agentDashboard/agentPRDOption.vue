<template>
    <div class="container">
        <transition name="fade" mode="out-in">
            <!-- <TVHomePage v-if="showHomeMask" @gotoIntelligent="gotoIntelligent" /> -->
            <PRDHome v-if="showHomeMask" @gotoIntelligent="gotoIntelligent" key="home" />
        </transition>
        <transition name="fade" mode="out-in">
            <intelligentView ref="intelligentViewRef" v-if="showIntelligentMask" @goNews="goNews"
                @backToHome="backToHome" key="intelligent" />
        </transition>
        <transition name="fade" mode="out-in">
            <pressRelease ref="pressReleaseRef" v-if="showNewsMask" @backToIntelligent="backToIntelligent"
                key="press" />
        </transition>
    </div>
</template>

<script>
import {
    agentDashboardEventSumaryGenerate,
    agentDashboardEventSumaryResult,
    agentDashboardPressReleaseImageList,
    agentDashboardPressReleaseGenerate,
    agentDashboardPressReleaseResult
} from '../../api/agent-dashBoard'

import TVHomePage from './TVHomePage.vue'
import PRDHome from './PRDHome.vue'
import intelligentView from './intelligentView.vue';
import pressRelease from './PressRelease.vue';

let currentRequestNum = 0
let newsCurrentRequestNum = 0

const ackTime = 120
const ackInterval = 2
const ackMaxNum = ackTime / ackInterval

const newsAckTime = 180
const newsAckInterval = 2
const newsAckMaxNum = newsAckTime / newsAckInterval

const intelligentIntervalMin = 1
export default {
    components: { TVHomePage, PRDHome, intelligentView, pressRelease },
    data() {
        return {
            showHomeMask: true,
            showIntelligentMask: false,
            showNewsMask: false,

            requestId: 0,
            isHandle: false,
            timer: null,
            intelligentDataList: [],
            intelligentInterval: null,

            newsImageList: [],

            newsRequestId: 0,
            newsIsHandle: false,
            newsTimer: null,
            newsData: null,

            readyToGoIntelligent: false,

            goIntelligentTimer: null
        };
    },
    mounted() {
        this.createInaval()
        this.intelligentRequest()

        this.getNewsImages()

        this.newsRequest()
        this.newsCreateInaval()

        this.intelligentInterval = setInterval(() => {
            this.intelligentRequest()

            this.getNewsImages()
            this.newsRequest()
        }, intelligentIntervalMin * 60 * 1000);
    },
    beforeDestroy() {
        clearTimeout(this.timer);
        clearInterval(this.intelligentInterval)
        clearTimeout(this.newsTimer);
        clearTimeout(this.goIntelligentTimer)
    },
    watch: {
        showIntelligentMask(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    if (this.intelligentDataList.length != 0) {
                        this.$refs.intelligentViewRef.updateIntelligentData(this.intelligentDataList)
                    }
                    this.$refs.intelligentViewRef.updateNewsData(this.newsImageList, this.newsData)
                });
            }
        },
        showNewsMask(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.$refs.pressReleaseRef.updateData(this.newsImageList, this.newsData)
                });
            }
        },
        intelligentDataList: {
            handler(newVal, oldVal) {
                console.log(this.readyToGoIntelligent)
                console.log(newVal)
                if (this.readyToGoIntelligent === true && newVal.length != 0) {
                    this.showHomeMask = false
                    this.showIntelligentMask = true
                    this.showNewsMask = false
                    this.readyToGoIntelligent = false
                }
            }
        }
    },
    methods: {
        /******* ******************路由*******************************/
        gotoIntelligent() {
            if (this.intelligentDataList.length === 0) {
                this.readyToGoIntelligent = true
            } else {
                this.goIntelligentTimer = setTimeout(() => {
                    this.showHomeMask = false
                    this.showIntelligentMask = true
                    this.showNewsMask = false
                }, 5 * 1000);
            }
        },
        goNews(data, imageList) {
            this.showIntelligentMask = false
            this.showNewsMask = true
            if (data != null) {
                this.newsData = data
            }

            if (imageList != null && imageList != undefined && imageList.length != 0)
                this.newsImageList = imageList
        },
        backToIntelligent() {
            this.showHomeMask = false
            this.showIntelligentMask = true
            this.showNewsMask = false
        },
        backToHome() {
            this.showHomeMask = true
            this.showIntelligentMask = false
            this.showNewsMask = false
        },
        /******* ******************摘要数据*******************************/
        async intelligentRequest() {
            const generateResponse = await this.generateRequest()

            console.log("generateResponse", generateResponse)
            if (generateResponse != undefined && generateResponse.code === 0 && generateResponse.data != 0) {

                this.requestId = generateResponse.data
                this.isHandle = true

            }
        },
        async generateRequest() {
            return agentDashboardEventSumaryGenerate().then((response) => {
                return response
            }).catch((error) => {
            })
        },
        async createInaval() {
            if (this.isHandle) {
                if (currentRequestNum === ackMaxNum) {
                    this.isHandle = false
                } else {
                    currentRequestNum++

                    const resultResponse = await this.resultRequest({}, this.requestId)
                    console.log("resultResponse")
                    console.log(resultResponse)
                    if (resultResponse != undefined && resultResponse.code === 0) {
                        if (resultResponse.data.status === 0) {

                        } else if (resultResponse.data.status === 2) {
                            //成功
                            if (resultResponse.data.eventSummaryList != undefined) {

                                const eventList = resultResponse.data.eventSummaryList

                                this.preloadAllImagesForEvents(eventList).then(() => {
                                    this.intelligentDataList = eventList

                                    // if (this.showIntelligentMask) {
                                    //     this.$refs.intelligentViewRef.updateIntelligentData(this.intelligentDataList)
                                    // }
                                    // console.log(eventList)
                                }).catch((error) => {

                                })
                            }
                            this.isHandle = false
                        } else {
                            this.isHandle = false
                        }
                    } else {
                        this.isHandle = false
                    }
                }
            } else {
            }

            this.timer = setTimeout(this.createInaval, ackInterval * 1000);
        },

        async resultRequest(data, requestId) {
            return agentDashboardEventSumaryResult(data, requestId).then((response) => {
                return response
            }).catch((error) => {
                this.isHandle = false
            })
        },

        /******* ******************新闻稿数据*******************************/
        async getNewsImages() {
            agentDashboardPressReleaseImageList().then((response) => {
                if (response.code == 0) {
                    console.log("imageList")
                    console.log(response)

                    this.preloadAllNewsImages(response.data)
                }
            }).catch((error) => {

            })
        },
        async preloadAllNewsImages(imageList) {
            try {
                // 等待所有图片加载完成
                this.newsImageList = await Promise.all(imageList.map(this.preloadImage));
            } catch (error) {
                console.error('加载图片时出错:', error);
            }
        },
        async newsRequest() {
            const newsGenerateResponse = await this.newsGenerateRequest()

            console.log("newsGenerateResponse", newsGenerateResponse)
            if (newsGenerateResponse != undefined && newsGenerateResponse.code === 0 && newsGenerateResponse.data != 0) {

                this.newsRequestId = newsGenerateResponse.data
                this.newsIsHandle = true

            }
        },
        async newsGenerateRequest() {
            return agentDashboardPressReleaseGenerate().then((response) => {
                return response
            }).catch((error) => {
            })
        },
        async newsCreateInaval() {
            if (this.newsIsHandle) {
                this.loading = true
                if (newsCurrentRequestNum === newsAckMaxNum) {
                    this.newsIsHandle = false
                } else {
                    newsCurrentRequestNum++

                    const newsResultResponse = await this.newsResultRequest({}, this.newsRequestId)
                    // console.log("newsResultResponse")
                    // console.log(newsResultResponse)
                    if (newsResultResponse != undefined && newsResultResponse.code === 0) {
                        if (newsResultResponse.data.status === 0) {

                        } else if (newsResultResponse.data.status === 2) {
                            //成功
                            if (newsResultResponse.data.newspaperList != undefined) {

                                this.newsData = this.validateData(newsResultResponse.data)

                                if (this.showIntelligentMask) {
                                    this.$refs.intelligentViewRef.updateNewsData(this.newsImageList, this.newsData)
                                }
                            }
                            this.newsIsHandle = false
                        } else {
                            this.newsIsHandle = false
                        }
                    } else {
                        this.newsIsHandle = false
                    }
                }
            } else {
                this.loading = false
            }

            this.newsTimer = setTimeout(this.newsCreateInaval, newsAckInterval * 1000);
        },
        async newsResultRequest(data, requestId) {
            return agentDashboardPressReleaseResult(data, requestId).then((response) => {
                return response
            }).catch((error) => {
                this.newsIsHandle = false
            })
        },
        validateData(data) {
            // 确保 title 和 subTitle 不为 undefined
            if (data.title === undefined || data.title === null) {
                data.title = '';  // 可以设置为默认值或抛出错误
            }
            if (data.subTitle === undefined || data.subTitle === null) {
                data.subTitle = '';  // 可以设置为默认值或抛出错误
            }

            // 处理 newspaperList 确保长度为6
            while (data.newspaperList.length < 6) {
                data.newspaperList.push({
                    title: '',  // 默认的标题，或根据需要调整
                    description: ''  // 默认的描述，或根据需要调整
                });
            }

            // 确保 newspaperList 中的每个对象的 title 和 description 不为 undefined
            data.newspaperList = data.newspaperList.map(item => ({
                title: item.title !== undefined && item.title !== null ? item.title : '',  // 若为 undefined 则设置默认值
                description: item.description !== undefined && item.description !== null ? item.description : ''  // 若为 undefined 则设置默认值
            }));

            console.log(data)
            return data;
        },
        /******* ******************图片预处理*******************************/
        async preloadAllImagesForEvents(eventList) {
            try {
                // 预加载每个事件对象中的图片
                await Promise.all(eventList.map(this.preloadImagesForEvent));
                // 所有事件的图片均已预加载完成
                this.allImagesLoaded = true;
            } catch (error) {
                console.error('事件图片预加载失败:', error);
            }
        },
        async preloadImagesForEvent(event) {
            try {
                // 使用 Promise.all 预加载当前事件的所有图片
                event.imageList = await Promise.all(event.imageList.map(this.preloadImage));
            } catch (error) {
                console.error('图片预加载失败:', error);
            }
        },
        preloadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = reject;
                img.src = url;
            });
        },
    }
};
</script>
<style scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url('../agentDashboard/assets/eventsBack.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>