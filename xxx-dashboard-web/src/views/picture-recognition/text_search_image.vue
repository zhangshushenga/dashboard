<template>
  <div style="width: 100%; min-height: 100dvh;">
    <div style="font-size: 26px; font-weight: 600; margin: 20px">{{ this.searchContent }}</div>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
      <div v-for="(data, index) in textSearchImages[currentPage - 1]" :key="data.imageId" class="imageCard">
        <img v-if="data.imageS3Url" :src="data.imageS3Url" style="max-width: 100%; max-height: 100%;">
        <div
          v-else
          style="background-color: antiquewhite; width: 400px; height: 560px; display: flex; justify-content: center; align-items: center;"
        >
          <el-button type="text" @click="getURL(data, index)">点击查看</el-button>
        </div>
        <div class="content">{{ 'imageId: ' + data.imageId }}</div>
        <div class="content">{{ '评分: ' + data.score }}</div>
      </div>
    </div>
    <el-pagination
      v-show="textSearchImages.length != 0"
      :current-page.sync="currentPage"
      :page-size="20"
      :total="(textSearchImages.length - 1) * 20 + textSearchImages[textSearchImages.length - 1].length"
      background
      layout="total,prev,pager,next"
      style="margin: 20px"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

import { endLoading, startLoading } from '@/utils/loading'
import { getS3URL } from '../../api/event-image'
import { mapState } from 'vuex'

export default {
  components: {},
  props: ['searchContent'],
  data() {
    return {
      currentPage: 1

    }
  },
  created() {
  },
  mounted() {
    console.log(this.textSearchImages)
  },
  computed: {
    ...mapState({
      textSearchImages: state => state.pictureRecognition.textSearchImages
    })
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    getURL(data, index) {
      startLoading()
      console.log(data.imageS3Key)
      const param = {
        s3Key: data.imageS3Key
      }
      getS3URL(param).then(response => {
        endLoading()
        console.log(response)
        if (response.code === 0) {
          this.$set(this.textSearchImages[this.currentPage - 1][index], 'imageS3Url', response.data)
          this.$store.dispatch('pictureRecognition/setTextSearchImages', this.textSearchImages)
        }
      }).catch(error => {
        endLoading()
        console.log(error)
      })
    }

  }
}
</script>

<style scoped>
.queryItem {
  margin-left: 1%;
  width: 22%
}

.imageCard {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 15%;
}

.content {
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}

.label-box {
  background-color: white;
  color: black;
  font-size: 14px;
  padding: 3px;
  margin: 5px
}
</style>
