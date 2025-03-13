<template>
  <div class="fullscreen-mask">
    <div class="backIntelligent">
      <div class="title">华来简讯</div>
      <div class="date">{{ currentDate }}</div>
      <div class="contentTitle">{{ displayedTitle }}</div>
      <div class="contentSubTitle">{{ displayedSubTitle }}</div>
      <div class="newsContent">
        <div class="newsImage" :style="containerStyle1"></div>
        <div class="newsImage" :style="containerStyle2"></div>
        <div class="newContext">
          <div style="margin-top: 1.5%;">
            <div class="newsContextTitle">{{ displayedPaperTitle1 }}</div>
            <div class="newsContextDescription">{{ displayedPaperSubTitle1 }}</div>
            <div class="newsContextTitle">{{ displayedPaperTitle2 }}</div>
            <div class="newsContextDescription">{{ displayedPaperSubTitle2 }}</div>
            <div class="newsContextTitle">{{ displayedPaperTitle3 }}</div>
            <div class="newsContextDescription">{{ displayedPaperSubTitle3 }}</div>
            <div class="newsContextTitle">{{ displayedPaperTitle4 }}</div>
            <div class="newsContextDescription">{{ displayedPaperSubTitle4 }}</div>
            <div class="newsContextTitle">{{ displayedPaperTitle5 }}</div>
            <div class="newsContextDescription">{{ displayedPaperSubTitle5 }}</div>
            <div class="newsContextTitle">{{ displayedPaperTitle6 }}</div>
            <div class="newsContextDescription">{{ displayedPaperSubTitle6 }}</div>
          </div>
        </div>
      </div>
      <div class="newsAnnotation">{{ showModel }}</div>
    </div>
    <div class="gotoIntelligent-div" @click="backToIntelligent"/>
  </div>
</template>

<script>

let currentImageIndex = 0

//文字输出间隔时长
const typerInterval = 30

//段落输出间隔时长
const paragraphInterval = 10

export default {
  computed: {
    containerStyle1() {
      const style = {
        backgroundImage: `url(${this.imageUrl1})`,
      };
      return style
    },
    containerStyle2() {
      const style = {
        backgroundImage: `url(${this.imageUrl2})`,
      };
      return style
    }
  },
  data() {
    return {
      currentDate: '',
      currentTime: '',

      newsData: {
        title: '',
        subTitle: '',
        newspaperList: [
          {
            title: '',
            description: '',
          }, {
            title: '',
            description: '',
          }, {
            title: '',
            description: '',
          }, {
            title: '',
            description: '',
          }, {
            title: '',
            description: '',
          }, {
            title: '',
            description: '',
          }
        ]
      },
      newsImageList: [],

      timer: null,
      imageUrl1: "",
      imageUrl2: "",

      displayedTitle: "",
      currentIndex: 0,
      intervalId: null,

      displayedSubTitle: "",
      subTitleCurrentIndex: 0,
      intervalSubTitleId: null,
      timerSubTitleId: null,

      displayedPaperTitle1: "",
      paperTitle1CurrentIndex: 0,
      intervalPaperTitle1: null,
      timerPaperTitle1Id: null,

      displayedPaperSubTitle1: "",
      paperSubTitle1CurrentIndex: 0,
      intervalPaperSubTitle1: null,
      timerPaperSubTitle1Id: null,

      displayedPaperTitle2: "",
      paperTitle2CurrentIndex: 0,
      intervalPaperTitle2: null,
      timerPaperTitle2Id: null,

      displayedPaperSubTitle2: "",
      paperSubTitle2CurrentIndex: 0,
      intervalPaperSubTitle2: null,
      timerPaperSubTitle2Id: null,

      displayedPaperTitle3: "",
      paperTitle3CurrentIndex: 0,
      intervalPaperTitle3: null,
      timerPaperTitle3Id: null,

      displayedPaperSubTitle3: "",
      paperSubTitle3CurrentIndex: 0,
      intervalPaperSubTitle3: null,
      timerPaperSubTitle3Id: null,

      displayedPaperTitle4: "",
      paperTitle4CurrentIndex: 0,
      intervalPaperTitle4: null,
      timerPaperTitle4Id: null,

      displayedPaperSubTitle4: "",
      paperSubTitle4CurrentIndex: 0,
      intervalPaperSubTitle4: null,
      timerPaperSubTitle4Id: null,

      displayedPaperTitle5: "",
      paperTitle5CurrentIndex: 0,
      intervalPaperTitle5: null,
      timerPaperTitle5Id: null,

      displayedPaperSubTitle5: "",
      paperSubTitle5CurrentIndex: 0,
      intervalPaperSubTitle5: null,
      timerPaperSubTitle5Id: null,

      displayedPaperTitle6: "",
      paperTitle6CurrentIndex: 0,
      intervalPaperTitle6: null,
      timerPaperTitle6Id: null,

      displayedPaperSubTitle6: "",
      paperSubTitle6CurrentIndex: 0,
      intervalPaperSubTitle6: null,
      timerPaperSubTitle6Id: null,

      showModel: "",
      timerShowModelId: null
    }
  },
  mounted() {
    this.updateDate()

    // 每日凌晨更新日期
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilNextMidnight = nextMidnight - now;
    setTimeout(() => {
      this.updateDate();
      setInterval(this.updateDate, 24 * 60 * 60 * 1000); // 之后每24小时更新一次
    }, timeUntilNextMidnight);

    let hours = now.getUTCHours();
    hours = (hours + 8) % 24;
    const minutes = now.getUTCMinutes();
    this.currentTime =  hours + "时" + minutes + "分"

  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearTimeout(this.timerShowModelId)
    this.timer = null
  },
  methods: {
    updateData(newsImageList, newsData) {

      this.newsData = newsData
      this.newsImageList = newsImageList

      this.changeImageList(newsImageList)
      this.changeNews(newsData)
    },
    changeImageList(newValue) {
      const imageList = newValue

      // 检查并清除现有的定时器
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }

      if (imageList.length > 2 && this.timer == null) {
        currentImageIndex = 0
        const currentValue = imageList[currentImageIndex];
        const nextValue = imageList[currentImageIndex + 1];
        this.imageUrl1 = currentValue
        this.imageUrl2 = nextValue
        currentImageIndex = 2

        this.timer = setInterval(() => {
          console.log('getNextPair')
          const result = this.getNextPair()
          this.imageUrl1 = result[0]
          this.imageUrl2 = result[1]
        }, 5000);

      } else {
        this.imageUrl1 = imageList[0] == undefined ? "" : imageList[0]
        this.imageUrl2 = imageList[1] == undefined ? "" : imageList[1]
        clearInterval(this.timer);
        this.timer = null
      }
    },
    changeNews(newValue) {
      console.log(newValue)
      this.displayTitle() 

      const paperList = newValue.newspaperList

      this.timerSubTitleId = setTimeout(this.displaySubTitle, typerInterval * newValue.title.length);

      const delayTitle1 = (paperList[0].title.length + paperList[0].description.length) * paragraphInterval
      this.timerPaperTitle1Id = setTimeout(this.displayPaperTitle1, typerInterval * (newValue.title.length + newValue.subTitle.length) + delayTitle1);
      this.timerPaperSubTitle1Id = setTimeout(this.displayPaperSubTitle1, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length) + delayTitle1);

      const delayTitle2 = (paperList[1].title.length + paperList[1].description.length) * paragraphInterval
      this.timerPaperTitle2Id = setTimeout(this.displayPaperTitle2, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length) + delayTitle1 + delayTitle2);
      this.timerPaperSubTitle2Id = setTimeout(this.displayPaperSubTitle2, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length) + delayTitle1 + delayTitle2);

      const delayTitle3 = (paperList[2].title.length + paperList[2].description.length) * paragraphInterval
      this.timerPaperTitle3Id = setTimeout(this.displayPaperTitle3, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length) + delayTitle1 + delayTitle2 + delayTitle3);
      this.timerPaperSubTitle3Id = setTimeout(this.displayPaperSubTitle3, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length) + delayTitle1 + delayTitle2 + delayTitle3);

      const delayTitle4 = (paperList[3].title.length + paperList[3].description.length) * paragraphInterval
      this.timerPaperTitle4Id = setTimeout(this.displayPaperTitle4, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length + paperList[2].description.length) + delayTitle1 + delayTitle2 + delayTitle3 + delayTitle4);
      this.timerPaperSubTitle4Id = setTimeout(this.displayPaperSubTitle4, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length + paperList[2].description.length + paperList[3].title.length) + delayTitle1 + delayTitle2 + delayTitle3 + delayTitle4);

      const delayTitle5 = (paperList[4].title.length + paperList[4].description.length) * paragraphInterval
      this.timerPaperTitle5Id = setTimeout(this.displayPaperTitle5, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length + paperList[2].description.length + paperList[3].title.length + paperList[3].description.length) + delayTitle1 + delayTitle2 + delayTitle3 + delayTitle4 + delayTitle5);
      this.timerPaperSubTitle5Id = setTimeout(this.displayPaperSubTitle5, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length + paperList[2].description.length + paperList[3].title.length + paperList[3].description.length + paperList[4].title.length) + delayTitle1 + delayTitle2 + delayTitle3 + delayTitle4 + delayTitle5);

      const delayTitle6 = (paperList[5].title.length + paperList[5].description.length) * paragraphInterval
      this.timerPaperTitle6Id = setTimeout(this.displayPaperTitle6, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length + paperList[2].description.length + paperList[3].title.length + paperList[3].description.length + paperList[4].title.length + paperList[4].description.length) + delayTitle1 + delayTitle2 + delayTitle3 + delayTitle4 + delayTitle5 + delayTitle6);
      this.timerPaperSubTitle6Id = setTimeout(this.displayPaperSubTitle6, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length + paperList[2].description.length + paperList[3].title.length + paperList[3].description.length + paperList[4].title.length + paperList[4].description.length + paperList[5].title.length) + delayTitle1 + delayTitle2 + delayTitle3 + delayTitle4 + delayTitle5 + delayTitle6);

      this.timerShowModelId = setTimeout(this.showModelText, typerInterval * (newValue.title.length + newValue.subTitle.length + paperList[0].title.length + paperList[0].description.length + paperList[1].title.length + paperList[1].description.length + paperList[2].title.length + paperList[2].description.length + paperList[3].title.length + paperList[3].description.length + paperList[4].title.length + paperList[4].description.length + paperList[5].title.length + paperList[5].description.length) + delayTitle1 + delayTitle2 + delayTitle3 + delayTitle4 + delayTitle5 + delayTitle6 + 3);

    },
    updateDate() {
      // 获取当前北京时间
      const now = new Date(new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // JavaScript 的月份从 0 开始计数，所以 +1
      const day = now.getDate();
      this.currentDate = `${year}年${month}月${day}日`;
    },
    getNextPair() {

      const a = this.newsImageList[currentImageIndex] == undefined ? this.newsImageList[0] : this.newsImageList[currentImageIndex]
      const b = this.newsImageList[currentImageIndex + 1] == undefined ? this.newsImageList[0] : this.newsImageList[currentImageIndex + 1]

      const pair = [a, b]

      currentImageIndex += 2;
      if (currentImageIndex >= this.newsImageList.length) {
        currentImageIndex = 0;
      }
      return pair;
    },
    displayTitle() {
      this.currentIndex = 0;
      this.displayedTitle = "";
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        if (this.currentIndex < this.newsData.title.length) {
          this.displayedTitle += this.newsData.title[this.currentIndex];
          this.currentIndex++;

        } else {
          clearInterval(this.intervalId);
        }
      }, typerInterval); // 每200毫秒显示一个字符
    },
    displaySubTitle() {
      this.subTitleCurrentIndex = 0;
      this.displayedSubTitle = "";
      if (this.intervalSubTitleId) {
        clearInterval(this.intervalSubTitleId);
      }
      this.intervalSubTitleId = setInterval(() => {
        if (this.subTitleCurrentIndex < this.newsData.subTitle.length) {
          this.displayedSubTitle += this.newsData.subTitle[this.subTitleCurrentIndex];
          this.subTitleCurrentIndex++;
        } else {
          clearInterval(this.intervalSubTitleId);
          clearTimeout(this.timerSubTitleId)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperTitle1() {
      this.paperTitle1CurrentIndex = 0;
      this.displayedPaperTitle1 = "";
      if (this.intervalPaperTitle1) {
        clearInterval(this.intervalPaperTitle1);
      }
      this.intervalPaperTitle1 = setInterval(() => {
        if (this.paperTitle1CurrentIndex < this.newsData.newspaperList[0].title.length) {
          this.displayedPaperTitle1 += this.newsData.newspaperList[0].title[this.paperTitle1CurrentIndex];
          this.paperTitle1CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperTitle1);
          clearTimeout(this.timerPaperTitle1Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperSubTitle1() {
      this.paperSubTitle1CurrentIndex = 0;
      this.displayedPaperSubTitle1 = "";
      if (this.intervalPaperSubTitle1) {
        clearInterval(this.intervalPaperSubTitle1);
      }
      this.intervalPaperSubTitle1 = setInterval(() => {
        if (this.paperSubTitle1CurrentIndex < this.newsData.newspaperList[0].description.length) {
          this.displayedPaperSubTitle1 += this.newsData.newspaperList[0].description[this.paperSubTitle1CurrentIndex];
          this.paperSubTitle1CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperSubTitle1);
          clearTimeout(this.timerPaperSubTitle1Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperTitle2() {
      this.paperTitle2CurrentIndex = 0;
      this.displayedPaperTitle2 = "";
      if (this.intervalPaperTitle2) {
        clearInterval(this.intervalPaperTitle2);
      }
      this.intervalPaperTitle2 = setInterval(() => {
        if (this.paperTitle2CurrentIndex < this.newsData.newspaperList[1].title.length) {
          this.displayedPaperTitle2 += this.newsData.newspaperList[1].title[this.paperTitle2CurrentIndex];
          this.paperTitle2CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperTitle2);
          clearTimeout(this.timerPaperTitle2Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperSubTitle2() {
      this.paperSubTitle2CurrentIndex = 0;
      this.displayedPaperSubTitle2 = "";
      if (this.intervalPaperSubTitle2) {
        clearInterval(this.intervalPaperSubTitle2);
      }
      this.intervalPaperSubTitle2 = setInterval(() => {
        if (this.paperSubTitle2CurrentIndex < this.newsData.newspaperList[1].description.length) {
          this.displayedPaperSubTitle2 += this.newsData.newspaperList[1].description[this.paperSubTitle2CurrentIndex];
          this.paperSubTitle2CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperSubTitle2);
          clearTimeout(this.timerPaperSubTitle2Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    },
    displayPaperTitle3() {
      this.paperTitle3CurrentIndex = 0;
      this.displayedPaperTitle3 = "";
      if (this.intervalPaperTitle3) {
        clearInterval(this.intervalPaperTitle3);
      }
      this.intervalPaperTitle3 = setInterval(() => {
        if (this.paperTitle3CurrentIndex < this.newsData.newspaperList[2].title.length) {
          this.displayedPaperTitle3 += this.newsData.newspaperList[2].title[this.paperTitle3CurrentIndex];
          this.paperTitle3CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperTitle3);
          clearTimeout(this.timerPaperTitle3Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperSubTitle3() {
      this.paperSubTitle3CurrentIndex = 0;
      this.displayedPaperSubTitle3 = "";
      if (this.intervalPaperSubTitle3) {
        clearInterval(this.intervalPaperSubTitle3);
      }
      this.intervalPaperSubTitle3 = setInterval(() => {
        if (this.paperSubTitle3CurrentIndex < this.newsData.newspaperList[2].description.length) {
          this.displayedPaperSubTitle3 += this.newsData.newspaperList[2].description[this.paperSubTitle3CurrentIndex];
          this.paperSubTitle3CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperSubTitle3);
          clearTimeout(this.timerPaperSubTitle3Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    },
    displayPaperTitle4() {
      this.paperTitle4CurrentIndex = 0;
      this.displayedPaperTitle4 = "";
      if (this.intervalPaperTitle4) {
        clearInterval(this.intervalPaperTitle4);
      }
      this.intervalPaperTitle4 = setInterval(() => {
        if (this.paperTitle4CurrentIndex < this.newsData.newspaperList[3].title.length) {
          this.displayedPaperTitle4 += this.newsData.newspaperList[3].title[this.paperTitle4CurrentIndex];
          this.paperTitle4CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperTitle4);
          clearTimeout(this.timerPaperTitle4Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperSubTitle4() {
      this.paperSubTitle4CurrentIndex = 0;
      this.displayedPaperSubTitle4 = "";
      if (this.intervalPaperSubTitle4) {
        clearInterval(this.intervalPaperSubTitle4);
      }
      this.intervalPaperSubTitle4 = setInterval(() => {
        if (this.paperSubTitle4CurrentIndex < this.newsData.newspaperList[3].description.length) {
          this.displayedPaperSubTitle4 += this.newsData.newspaperList[3].description[this.paperSubTitle4CurrentIndex];
          this.paperSubTitle4CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperSubTitle4);
          clearTimeout(this.timerPaperSubTitle4Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    },
    displayPaperTitle5() {
      this.paperTitle5CurrentIndex = 0;
      this.displayedPaperTitle5 = "";
      if (this.intervalPaperTitle5) {
        clearInterval(this.intervalPaperTitle5);
      }
      this.intervalPaperTitle5 = setInterval(() => {
        if (this.paperTitle5CurrentIndex < this.newsData.newspaperList[4].title.length) {
          this.displayedPaperTitle5 += this.newsData.newspaperList[4].title[this.paperTitle5CurrentIndex];
          this.paperTitle5CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperTitle5);
          clearTimeout(this.timerPaperTitle5Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperSubTitle5() {
      this.paperSubTitle5CurrentIndex = 0;
      this.displayedPaperSubTitle5 = "";
      if (this.intervalPaperSubTitle5) {
        clearInterval(this.intervalPaperSubTitle5);
      }
      this.intervalPaperSubTitle5 = setInterval(() => {
        if (this.paperSubTitle5CurrentIndex < this.newsData.newspaperList[4].description.length) {
          this.displayedPaperSubTitle5 += this.newsData.newspaperList[4].description[this.paperSubTitle5CurrentIndex];
          this.paperSubTitle5CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperSubTitle5);
          clearTimeout(this.timerPaperSubTitle5Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    },
    displayPaperTitle6() {
      this.paperTitle6CurrentIndex = 0;
      this.displayedPaperTitle6 = "";
      if (this.intervalPaperTitle6) {
        clearInterval(this.intervalPaperTitle6);
      }
      this.intervalPaperTitle6 = setInterval(() => {
        if (this.paperTitle6CurrentIndex < this.newsData.newspaperList[5].title.length) {
          this.displayedPaperTitle6 += this.newsData.newspaperList[5].title[this.paperTitle6CurrentIndex];
          this.paperTitle6CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperTitle6);
          clearTimeout(this.timerPaperTitle6Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    }, displayPaperSubTitle6() {
      this.paperSubTitle6CurrentIndex = 0;
      this.displayedPaperSubTitle6 = "";
      if (this.intervalPaperSubTitle6) {
        clearInterval(this.intervalPaperSubTitle6);
      }
      this.intervalPaperSubTitle6 = setInterval(() => {
        if (this.paperSubTitle6CurrentIndex < this.newsData.newspaperList[5].description.length) {
          this.displayedPaperSubTitle6 += this.newsData.newspaperList[5].description[this.paperSubTitle6CurrentIndex];
          this.paperSubTitle6CurrentIndex++;
        } else {
          clearInterval(this.intervalPaperSubTitle6);
          clearTimeout(this.timerPaperSubTitle6Id)
        }
      }, typerInterval); // 每200毫秒显示一个字符
    },backToIntelligent() {
      this.$emit('backToIntelligent');
    },showModelText() {
      this.showModel = "注: 本文由V15NX于" + this.currentTime + "生成"
    }
  }
};
</script>

<style scoped>
.fullscreen-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  justify-content: center;
  margin-top: 7%;
}

.backIntelligent {
  background-image: url('../agentDashboard/assets/pressReleaseBG.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 97%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: #fff;
  font-size: calc(40 * 1rem / 14);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  margin-top: 1%;
}

.date {
  color: #fff;
  font-size: calc(18 * 1rem / 14);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  margin-top: 0.7%;
}

.contentBack {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  margin-top: 1%;
  justify-content: space-around;
  padding-left: 5%;
  padding-right: 5%;
}


.contentTitle {
  font-size: calc(50 * 1rem / 14);
  font-weight: 600;
  text-align: left;
  color: #62FF97;
  /* 亮绿色，根据设计图调整 */
  font-family: 'PingFang SC', sans-serif;
  /* 确保使用正确的字体，加上备用字体 */
  width: 100%;
  margin-left: 3%;
  margin-top: 3%;
  height: 126px;
}

.contentSubTitle {
  font-size: calc(30 * 1rem / 14);
  font-weight: 600;
  text-align: left;
  color: #FFFFFF;
  /* 亮绿色，根据设计图调整 */
  font-family: 'PingFang SC', sans-serif;
  /* 确保使用正确的字体，加上备用字体 */
  width: 100%;
  margin-left: 3%;
}

.newsContent {
  display: flex;
  flex-direction: row;
  margin-left: 1%;
  margin-right: 2%;
  width: 96%;
  height: 62%;
}

.newsImage {
  width: 20%;
  height: 90%;
  margin-right: 1%;
  margin-top: 1%;
  background-size: cover;
  /* 拉伸填满整个容器 */
  background-position: center;
  /* 图片居中 */
  background-repeat: no-repeat;
  transition: background-image 0.5s ease, opacity 1s ease;
  opacity: 1;
}

.newContext {
  width: 60%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.newsAnnotation {
  color: #32F072;
  font-size: calc(16 * 1rem / 14);
  margin-top: 0.8%;
  margin-left: 80%;
}

.newsContextTitle {
  color: #fff;
  font-family: 'PingFang SC', sans-serif;
  font-size: calc(23 * 1rem / 14);
  margin-top: 1.5%;
}

.newsContextDescription {
  color: #fff;
  font-family: 'PingFang SC', sans-serif;
  font-size: calc(14 * 1rem / 14);
  margin-top: 0.5%;
  line-height: 1.4;
}

.gotoIntelligent-div {
  position: absolute;
  top: 27%;
  /* 绝对定位 */
  left: 96%;
  /* 纵向偏移屏幕高度的25% */
  width: 4%;
  /* 元素的宽度 */
  height: 30%;
  background-image: url('../agentDashboard/assets/gotoIntelligent.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>