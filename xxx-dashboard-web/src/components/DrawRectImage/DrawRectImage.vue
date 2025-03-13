<template>
    <div class="image-container">
        <el-image ref="image" :preview-src-list="[imageUrl]" :src="imageUrl" alt="Your Image" class="img"
            @load="onImageLoad" />
        <div v-if="!isZeroBox(this.parsedRoi)" :style="eventBoundBox.style" class="bounding-box">
            <div v-if="eventBoundBox.type != null" :style="getLabelStyle('red')">{{ eventBoundBox.type }}</div>
        </div>
        <div v-for="(box, index) in boundingBoxList" :key="index" :style="box.style" class="bounding-box" />
        <div v-for="(box, index) in biggerBoundBoxList" :key="index" :style="box.style" class="bounding-box" />
        <div v-for="(box, index) in boundingDynamicRoiList" :key="index" :style="box.style" class="bounding-box">
            <div v-if="box.conf != '0'" :style="getLabelStyle('#FFA500')">{{ box.conf }}</div>
        </div>
    </div>
</template>

<script>
import { off } from 'codemirror'
import { arraysAreEqual } from '../../utils/util-array'

export default {
    props: {
        // 0:百分比 1:像素
        boxUnitType: {
            type: Number,
            default: () => 0
        },
        imageUrl: {
            type: String,
            required: true
        },
        /**
         * 报警框
         */
        roi: {
            type: String,
            default: () => '[0, 0, 0, 0]'
        },
        /**
         * 触发报警类别
         */
        roiTypeList: {
            type: String,
            default: () => null
        },
        /**
         * 识别框
         */
        roiList: {
            type: String,
            default: () => '[[0, 0, 0, 0]]'
        },
        biggerRoi: {
            type: String,
            default: () => '[0, 0, 0, 0]'
        },
        /**
         * 动态框（短描述，已识别任务等用户动态选中的数据在图中的表现）
         */
        dynamicRoiList: {
            type: Object,
            default: () => ([
                {
                    roi: [0, 0, 0, 0],
                    conf: '0'
                }
            ])
        },
    },
    watch: {
        dynamicRoiList(newVal, oldVal) {
            // 当父组件传入的属性 parentData 发生变化时，会触发这个函数
            if (newVal === null) {
                this.boundingDynamicRoiList = []
            } else {
                const parsedDynamicRoiList = newVal
                parsedDynamicRoiList.forEach((box) => {
                    if (!this.isZeroBox(box.roi)) {
                        this.boundingDynamicRoiList.push({ style: this.drawBoundingBox(box.roi, '#FFA500'), conf: box.conf }) // 画剩余的非重复的roiList框，使用
                    }
                })
            }
        }
    },
    data() {
        return {
            eventBoundBox: { style: {}, type: '' },
            boundingBoxList: [],
            biggerBoundBoxList: [],
            boundingDynamicRoiList: []
        }
    },
    computed: {
        parsedRoi() {
            return JSON.parse(this.roi) === null ? [0, 0, 0, 0] : JSON.parse(this.roi)
        },
        parsedRoiType() {
            let roiTypeText
            if (this.roiTypeList != null && this.roiTypeList != undefined) {
                let parseList = JSON.parse(this.roiTypeList)
                if (parseList.length === 0) {
                    roiTypeText = '移动'
                } else {
                    let textList = parseList.map((item) => {
                        return this.getRoiTypeText(item)
                    })

                    roiTypeText = textList.join(', ')
                }
            }
            return roiTypeText
        },
        parsedRoiList() {
            return JSON.parse(this.roiList) === null ? [[0, 0, 0, 0]] : JSON.parse(this.roiList)
        },
        parseBiggerRio() {
            return JSON.parse(this.biggerRoi) === null ? [0, 0, 0, 0] : JSON.parse(this.biggerRoi)
        }
    },
    methods: {
        onImageLoad() {
            // console.log('parsedRoi')
            // console.log(this.parsedRoi)
            // console.log('parsedRoiList')
            // console.log(this.parsedRoiList)
            //   console.log(this.dynamicRoiList)
            this.parsedRoiList.forEach((box) => {
                if (!this.isZeroBox(box) && !this.isDuplicateEventBox(box)) {
                    this.boundingBoxList.push({ style: this.drawBoundingBox(box, 'blue') }) // 画剩余的非重复的roiList框，使用蓝色边框
                }
            })
            if (!this.isZeroBox(this.parsedRoi)) {
                this.eventBoundBox.style = this.drawBoundingBox(this.parsedRoi, 'red')  // 画优先级高的roi框，使用红色边框
                this.eventBoundBox.type = this.parsedRoiType
            }
            if (!this.isZeroBox(this.parseBiggerRio)) {
                this.biggerBoundBoxList.push({ style: this.drawBoundingBox(this.parseBiggerRio, '#00FA9A', 1) })   // 画优先级高的bigger框，使用绿色边框
            }
        },
        drawBoundingBox(box, color, borderWidth = 2) {
            const x1 = box[0]
            const y1 = box[1]
            const x2 = box[2]
            const y2 = box[3]
            let boundingBoxStyle
            if (this.boxUnitType === 0) {
                boundingBoxStyle = {
                    top: y1 + '%',
                    left: x1 + '%',
                    width: x2 - x1 + '%',
                    height: y2 - y1 + '%',
                    border: `${borderWidth}px solid ${color}`
                }
            } else {
                const image = this.$refs.image
                const imageWidth = image.imageWidth
                const imageHeight = image.imageHeight
                boundingBoxStyle = {
                    top: (y1 * 100) / imageHeight + '%',
                    left: (x1 * 100) / imageWidth + '%',
                    width: ((x2 - x1) * 100) / imageWidth + '%',
                    height: ((y2 - y1) * 100) / imageHeight + '%',
                    border: `${borderWidth}px solid ${color}`
                }
            }
            return boundingBoxStyle

        },
        isZeroBox(box) {
            const isZero = box[0] === 0 && box[1] === 0 && box[2] === 0 && box[3] === 0
            return isZero
        },
        isDuplicateEventBox(box) {
            return arraysAreEqual(this.parsedRoi, box)
        },
        isDuplicateBiggerBox(box) {
            return arraysAreEqual(this.parseBiggerRio, box)
        },
        getLabelStyle(backgroundColor) {
            return {
                position: 'absolute',
                top: '-20px',
                left: '-2px',
                backgroundColor: backgroundColor,
                color: 'white',
                fontSize: '10px',
                padding: '2px',
                zIndex: 10,
                borderRadius: '2px',
                whiteSpace: 'nowrap'
            }
        },
        getRoiTypeText(roiType) {
            let roiTypeText = ''
            switch (roiType) {
                case 0: {
                    roiTypeText = '移动'
                }
                    break
                case 101: {
                    roiTypeText = '人'
                }
                    break
                case 102: {
                    roiTypeText = '车'
                }
                    break
                case 103: {
                    roiTypeText = '宠物'
                }
                    break
            }
            return roiTypeText
        }
    }
}
</script>

<style scoped>
.image-container {
    position: relative;
}

.bounding-box {
    position: absolute;
    pointer-events: none;
}

/* 确保图片不超过原始尺寸 */
.img {
    max-width: 100%;
    max-height: 100%;
}
</style>
