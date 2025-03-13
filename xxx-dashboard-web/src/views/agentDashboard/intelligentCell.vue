<template>
    <div class="backIntelligentCell">
        <div class="cellTitle">{{ intelligentData.title }}</div>
        <div class="cellDate">{{ intelligentData.time }}</div>
        <div class="cellContext">{{ intelligentData.description }}</div>
        <div class="cellImageContent">
            <div class="cellImage" :style="containerStyle1" v-show="!!imageUrl1"></div>
            <div class="cellImage" :style="containerStyle2" v-show="!!imageUrl2"></div>
        </div>
    </div>
</template>

<script>

let currentImageIndex = 0

export default {
    props: {
        intelligentData: {
            type: Object,
            default: {
                title: '',
                time: '',
                description: '',
                imageList: []
            }
        }
    },
    components: {

    },
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
    watch: {
        intelligentData(newValue) {
            console.log(newValue)
            const intelligentData = newValue

            // 检查并清除现有的定时器
            if (this.timer !== null) {
                clearInterval(this.timer);
                this.timer = null;
            }

            if (intelligentData.imageList.length > 2 && this.timer == null) {
                currentImageIndex = 0
                const currentValue = intelligentData.imageList[currentImageIndex];
                const nextValue = intelligentData.imageList[currentImageIndex + 1];
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
                this.imageUrl1 = intelligentData.imageList[0] == undefined ? "" : intelligentData.imageList[0]
                this.imageUrl2 = intelligentData.imageList[1] == undefined ? "" : intelligentData.imageList[1]
                clearInterval(this.timer);
                this.timer = null
            }

        }
    },
    data() {
        return {
            timer: null,
            imageUrl1: "",
            imageUrl2: ""
        }
    },
    mounted() {

    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null
    },
    methods: {
        getStyle(url) {
            return {
                backgroundImage: `url(${url})`
            };
        },
        getNextPair() {

            const a = this.intelligentData.imageList[currentImageIndex] == undefined ? this.intelligentData.imageList[0] : this.intelligentData.imageList[currentImageIndex]
            const b = this.intelligentData.imageList[currentImageIndex + 1] == undefined ? this.intelligentData.imageList[0] : this.intelligentData.imageList[currentImageIndex + 1]

            const pair = [a, b]

            currentImageIndex += 2;
            if (currentImageIndex >= this.intelligentData.imageList.length) {
                currentImageIndex = 0;
            }
            return pair;
        }
    }
};
</script>

<style scoped>
.backIntelligentCell {
    background-image: url('../agentDashboard/assets/intelligentCell.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 24%;
    height: 75%;
    display: flex;
    flex-direction: column;
}

.cellTitle {
    color: #62FF97;
    font-size: calc(27 * 1rem / 14);
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    margin-top: 4%;
    margin-left: 7%;
}

.cellDate {
    color: #FFF;
    font-size: calc(16 * 1rem / 14);
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    margin-top: 10%;
    margin-left: 7%;
}

.cellContext {
    color: #FFF;
    font-size: calc(16 * 1rem / 14);
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    margin-top: 3%;
    margin-left: 7%;
    margin-right: 4%;
    line-height: 1.4;
    height: 42%;
}

.cellImageContent {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    justify-content: space-around;
    margin-left: 1%;
    margin-right: 1%;
}

.cellImage {
    width: 9.5vw;
    height: 11.8vw;
    background-size: contain;
    /* 拉伸填满整个容器 */
    background-position: center;
    /* 图片居中 */
    background-repeat: no-repeat;
  
    transition: background-image 0.5s ease, opacity 1s ease;
    opacity: 1;
}
</style>