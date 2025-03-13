<template>
    <div v-if="showMask" class="fullscreen-mask">
        <div class="mask-grid">
            <div v-for="(url, index) in visibleImages" :key="index" class="mask-item" :style="getStyle(index, url)">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageUrls: {
            type: Array,
            required: true
        },
        showMask: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        /**
         * 计算将展示的图片集合，将超出部分循环展示
         */
        visibleImages() {
            const gridCells = 18; // 3行6列布局的最大单元格数
            let limitedImageUrls;
            if (this.imageUrls.length > 18) {
                limitedImageUrls = this.imageUrls.slice(0, gridCells);
            } else {
                limitedImageUrls = this.imageUrls
            }
            return limitedImageUrls
        }
    },
    methods: {
        getStyle(index, url) {
            console.log(url)
            const delay = index * 0.2; // 每个元素延迟0.2秒
            return {
                transitionDelay: `${delay}s`,
                backgroundImage: `url(${url})`,
            };
        }
    },
    mounted() {
        // 延时激活动画
        setTimeout(() => {
            const items = document.querySelectorAll('.mask-item');
            items.forEach((item) => item.classList.add('show'));
        }, 500);
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
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mask-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* 6 列，每列均分 */
    grid-template-rows: repeat(3, 1fr);
    /* 3 行，每行均分 */
    width: 80%;
    /* 100% 视口宽度 */
    height: 80%;
    /* 100% 视口高度 */
    gap: 10px;
    /* 如果你希望没有间隙，则设置为0，或者根据需求调整 */
}

.mask-item {
    border: 1px solid #fff;
    opacity: 0;
    transform: translateY(-100%);
    transition: all 1s ease;
    background-size: 100% 100%;
    /* 拉伸填满整个容器 */
    background-position: center;
    /* 图片居中 */
    background-repeat: no-repeat;
    /* 防止平铺 */
}

.mask-item.show {
    opacity: 1;
    transform: translateY(0);
}

.mask-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>