<template>
  <div>
    <el-form ref="form" :model="form" label-width="200px" style="margin-top: 20px">
      <el-form-item label="展厅4台设备生成描述">
        <el-switch v-model="generateDesc" />
        <el-radio-group v-if="generateDesc" v-model="generateDescTime" style="margin-left: 20px">
          <el-radio :label="1800">30分钟</el-radio>
          <el-radio :label="3600">60分钟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="新闻稿/摘要开始时间">
        <el-date-picker
          v-model="value1"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="直播弹幕">
        <el-switch v-model="enableLive" />

        <el-radio-group v-if="enableLive" v-model="enableLiveTime" style="margin-left: 20px">
          <el-radio :label="1800">30分钟</el-radio>
          <el-radio :label="3600">60分钟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="直播人形检测">
        <el-switch v-model="detectPerson" />
      </el-form-item>
      <el-form-item label="直播人形检测阈值">
        <el-input v-model="detectPersonThreshold" />
      </el-form-item>
      <el-form-item label="直播每多少帧上图">
        <el-input v-model="indexFrame" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
<!--  <div class="container">-->
<!--    <el-main>-->
<!--      <div style="display: flex; flex-direction: row;">-->
<!--        <div style="margin-top: 5px; margin-right: 10px;">-->
<!--          <el-container style=" background-color: #ffffff; border-radius:6px ;">-->
<!--            <el-date-picker-->
<!--              v-model="value1"-->
<!--              type="datetime"-->
<!--              format="yyyy-MM-dd HH:mm:ss"-->
<!--              value-format="yyyy-MM-dd HH:mm:ss"-->
<!--              placeholder="选择日期时间"-->
<!--            />-->
<!--          </el-container>-->
<!--        </div>-->
<!--        <el-button size="small" style="float: right;" type="primary" @click="save">save</el-button>-->
<!--      </div>-->
<!--      <div style="display: flex; flex-direction: row;">-->
<!--        <div style="margin-top: 5px; margin-right: 10px;">-->
<!--          检测人形-->
<!--          <el-switch v-model="detectPerson" />-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-main>-->

<!--  </div>-->
</template>

<script>
import { saveDate, getTime, saveDemoConfig, getDemoConfig } from '@/api/screen-api'

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      generateDesc: false,
      generateDescTime: 1800,
      detectPerson: false,
      enableLive: false,
      enableLiveTime: 1800,
      detectPersonThreshold: '',
      indexFrame: '',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: '',
      value3: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
    })
  },
  methods: {
    save() {
      const param = {
        'dateTime': this.value1
      }
      console.info(param)
      saveDate(param).then(
        (response) => {
          if (response.code !== 1) {
            alert(response.message)
          }
          console.log(response)
          if (response.data === undefined) {
            return
          }
        }
      )
    },
    search() {
      getTime().then(
        (response) => {
          if (response.code !== 1) {
            console.info(response.message)
          }
          if (response.data === undefined) {
            return
          }
          this.value1 = response.data
        }
      )
    },
    onSubmit() {
      const param = {
        'generateDesc': this.generateDesc,
        'detectPerson': this.detectPerson,
        'startTime': this.value1,
        'detectPersonThreshold': this.detectPersonThreshold,
        'indexFrame': this.indexFrame,
        'enableLiveTime': this.enableLiveTime,
        'generateDescTime': this.generateDescTime,
        'enableLive': this.enableLive
      }
      saveDemoConfig(param).then(
        (response) => {
          if (response.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          } else {
            this.$message.error(response.message)
          }
        }
      )
    },
    initData() {
      getDemoConfig().then(
        (response) => {
          if (response.code !== 1) {
            console.info(response.message)
          }
          if (response.data === undefined) {
            return
          }
          this.value1 = response.data.startTime
          this.enableLive = response.data.enableLive
          this.detectPerson = response.data.detectPerson
          this.generateDesc = response.data.generateDesc
          this.detectPersonThreshold = response.data.detectPersonThreshold
          this.indexFrame = response.data.indexFrame
        }
      )
    }
  }
}
</script>
