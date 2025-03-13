<template>
    <div class="image-container">
        <img ref="image" class="img" :src="imageUrl" @load="onImageLoad" alt="Your Image">
        <div class="bounding-box" v-for="(box, index) in boundingBoxList" :key="index" :style="box.style">
            <!-- <el-popover placement="top-start" title="属性" width="200" trigger="hover"
                :content="box.attribute.map(item => `${item.name}/${parseFloat(item.conf).toFixed(2)}`).join('\n')">
                <el-button class="label-box" v-if="box.labelElement" slot="reference"
                    @click="handleLabelClick(box.labelElement.textContent)">
                    {{ box.labelElement.textContent }}
                </el-button>
            </el-popover> -->
            <div class="label-box" v-if="box.labelElement">
                {{ box.labelElement.textContent }}
            </div>

        </div>
    </div>
</template>
  
<script>

import { concatenateArrayElements } from '../../utils/util-array'

export default {
    props: {
        id: {
            type: Number,
            default: 0
        },
        clickLabel: {
            type: Function
        },
        imageUrl: {
            type: String,
            default: '',
            required: true
        },
        imageLabelInfoList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            cursorStyle: 'default', // 初始状态为默认指针样式
            boundingBoxList: []
        };
    },
    watch: {
        imageLabelInfoList(newVal, oldVal) {
            // 当父组件传入的属性 parentData 发生变化时，会触发这个函数
            if (newVal === null) {
                this.boundingBoxList = []
            } else {
                const imageList = newVal
                imageList.forEach((imageLabelInfo) => {
                    const box = imageLabelInfo.bbox
                    if (!this.isZeroBox(box)) {
                        this.drawBoundingBox(imageLabelInfo); // 画剩余的非重复的roiList框
                    }
                });
            }
        }
    },
    computed: {

    },
    methods: {
        onImageLoad() {

        },
        drawBoundingBox(imageLabelInfo) {
            /**
             * 画框
             */
            const box = imageLabelInfo.bbox

            if (box === undefined) {
                return
            }

            const label = concatenateArrayElements(imageLabelInfo.label) + '/' + concatenateArrayElements(imageLabelInfo.conf)

            const x1 = box[0]
            const y1 = box[1]
            const x2 = box[2]
            const y2 = box[3]
            const image = this.$refs.image;
            const imageWidth = image.naturalWidth;
            const imageHeight = image.naturalHeight;
            const boundingBoxStyle = {
                top: (y1 * 100) / imageHeight + "%",
                left: (x1 * 100) / imageWidth + "%",
                width: ((x2 - x1) * 100) / imageWidth + "%",
                height: ((y2 - y1) * 100) / imageHeight + "%",
                border: `2px solid blue`
            };

            /**
             * 画标签
             */
            // 创建文本框元素
            const labelElement = document.createElement("div");
            labelElement.textContent = label || ""; // 如果label为null或undefined，则显示空字符串
            labelElement.className = "label-box";
            this.boundingBoxList.push({ style: boundingBoxStyle, labelElement, attribute: imageLabelInfo.attribute });
        },
        isZeroBox(box) {

            if (box === undefined) {
                return
            }

            const x1 = box[0]
            const y1 = box[1]
            const x2 = box[2]
            const y2 = box[3]
            return x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0;
        },
        handleLabelClick(attribute) {
            const parts = attribute.split('/');
            const label = parts[0];
            if (this.clickLabel != null) {
                this.clickLabel(this.id, label)
            }
        },
        handleMouseOver(attribute) {
            this.cursorStyle = 'pointer'; // 鼠标悬停时设置为箭头指针样式
        },
        handleMouseLeave(attribute) {
            this.cursorStyle = 'default'; // 鼠标离开时恢复默认指针样式
        },
    }
};
</script>
  
<style scoped>
.image-container {
    position: relative;
}

.bounding-box {
    position: absolute;
}

/* 确保图片不超过原始尺寸 */
.img {
    max-width: 100%;
    max-height: 100%;
}

.label-box {
    position: absolute;
    top: -21px;
    left: -2px;
    background-color: blue;
    color: white;
    font-size: 10px;
    padding: 2px;
    z-index: 10;
    white-space: nowrap;
    /* 确保文本框位于边界框上层 */
}
</style>
  