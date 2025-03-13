<template>
    <div :style="{ width: videoWidth + 'px', height: videoHeight + 'px' }" class="video-preview-download" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div :style="{ width: videoWidth + 'px', height: videoHeight + 'px' }" class="video-preview-download__thumbnail">
            <img :src="thumbnailUrl" :style="{ width: videoWidth + 'px', height: videoHeight + 'px' }">
            <div :style="{ width: videoWidth + 'px', height: videoHeight + 'px' }" class="video-preview-download__overlay" v-show="isHover">
                <div class="video-preview-download__buttons">
                    <div class="video-preview-download__button">
                        <i class="el-icon-view" @click="preview()"></i>
                    </div>
                    <div class="video-preview-download__button">
                        <i class="el-icon-download" @click="download()"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'VideoPlayDownload',
    props: {
        videoWidth: {
            type: Number,
            required: true
        },
        videoHeight: {
            type: Number,
            required: true
        },
        videoUrl: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        downloadUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        preview() {
            window.open(this.videoUrl, '_blank')
        },
        download() {
            const link = document.createElement('a')
            link.href = this.downloadUrl
            console.log('link.href=' + link.href)
            link.download = 'video.mp4'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
}
</script>
  
<style scoped>
.video-preview-download {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 150px;
    height: 150px
}

.video-preview-download__thumbnail {
    position: relative;
    display: inline-block;
    width: 150px;
    height: 150px
}

.video-preview-download__thumbnail img {
    width: 150px;
    height: 150px
}

.video-preview-download__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.video-preview-download__buttons {
    display: flex;
    justify-content: center;
}

.video-preview-download__button {
    padding: 10px 10px;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
}

/* .video-preview-download__button--preview {
  border-right: 1px solid #fff;
  text-align: right;
  transform: translateX(-25%);
} */
/* .video-preview-download__button--download {
  border-left: 1px solid #fff;
  text-align: left;
  transform: translateX(25%);
} */
/* .video-preview-download__button:hover {
    background-color: rgba(255, 255, 255, 0.2);
} */

/* .video-preview-download__button:active {
    background-color: rgba(255, 255, 255, 0.4);
} */

.video-preview-download:hover .video-preview-download__overlay {
    opacity: 1;
}</style>