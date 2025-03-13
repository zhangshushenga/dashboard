<template>
  <div>
    <div style="line-height: 28px; margin-top: 24px;">
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <div style="margin-left: 20px; font-size: 20px;">
          <span>{{ name }}</span>
        </div>
      </div>
    </div>

    <el-form ref="form" :model="form" label-width="300px" style="margin-top: 20px">
      <el-form-item label="展厅4台设备生成描述">
        <el-switch v-model="generateDesc" />
        <el-radio-group v-if="generateDesc" v-model="generateDescTime" style="margin-left: 20px">
          <el-radio :label="1800">30分钟</el-radio>
          <el-radio :label="3600">60分钟</el-radio>
        </el-radio-group>
        <Countdown
          v-if="showCountdown1 && generateDesc && generateDescTtl"
          ref="generateDescCountdown"
          :time="generateDescTtl"
          :switch="true"
          format="hh:mm:ss"
          @on-end="generateDesc=false"
        >
          <template slot-scope="{ time }">{{ time }}</template>
        </Countdown>
      </el-form-item>
      <el-form-item
        label="摄像机1上传图片间隔 单位秒"
      >
        <el-input-number v-model="position1Interval" :max="30" />
      </el-form-item>
      <el-form-item label="摄像机2上传图片间隔 单位秒">
        <el-input-number v-model="position2Interval" :max="30" />
      </el-form-item>
      <el-form-item label="摄像机3上传图片间隔 单位秒">
        <el-input-number v-model="position3Interval" :max="30" />
      </el-form-item>
      <el-form-item label="摄像机4上传图片间隔 单位秒">
        <el-input-number v-model="position4Interval" :max="30" />
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
      <el-form-item label="是否启用发言人">
        <el-switch v-model="enableAudio" />
      </el-form-item>
      <!--      <el-form-item label="新闻稿/摘要结束时间">-->
      <!--        <el-date-picker-->
      <!--          v-model="value4"-->
      <!--          type="datetime"-->
      <!--          format="yyyy-MM-dd HH:mm:ss"-->
      <!--          value-format="yyyy-MM-dd HH:mm:ss"-->
      <!--          placeholder="选择日期时间"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="直播弹幕">
        <el-switch v-model="enableLive" />

        <el-radio-group v-if="enableLive" v-model="enableLiveTime" style="margin-left: 20px">
          <el-radio :label="1800">30分钟</el-radio>
          <el-radio :label="3600">60分钟</el-radio>
        </el-radio-group>
        <Countdown
          v-if="showCountdown2 && enableLive && enableLiveTtl"
          ref="enableLiveCountdown"
          :time="enableLiveTtl"
          :switch="true"
          format="hh:mm:ss"
          @on-end="enableLive=false"
        >
          <template slot-scope="{ time }">{{ time }}</template>
        </Countdown>
      </el-form-item>
      <!--      <el-form-item label="直播人形检测">-->
      <!--        <el-switch v-model="detectPerson" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="直播人形检测阈值">-->
      <!--        <el-input v-model="detectPersonThreshold" />-->
      <!--      </el-form-item>-->
      <el-form-item label="直播上图间隔 单位毫秒">
        <el-input-number v-model="indexFrame" :min="500" />
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
import { saveDate, getTime, saveDemoConfig, getDemoConfig } from '@/api/summary-config'
import Countdown from '@choujiaojiao/vue2-countdown'

export default {
  components: { Countdown },
  props: ['corporateId'],
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
      name: '',
      showCountdown1: true,
      showCountdown2: true,
      generateDesc: false,
      generateDescTtl: 0,
      generateDescTime: 1800,
      detectPerson: false,
      enableLive: false,
      enableAudio: false,
      enableLiveTtl: 0,
      enableLiveTime: 1800,
      detectPersonThreshold: '',
      position1Interval: 4,
      position2Interval: 4,
      position3Interval: 4,
      position4Interval: 4,
      appConfig: {},
      indexFrame: '',
      id: 0,
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
      value3: '',
      value4: ''
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
        'endTime': this.value4,
        'detectPersonThreshold': this.detectPersonThreshold,
        'indexFrame': this.indexFrame,
        'enableLiveTime': this.enableLiveTime,
        'generateDescTime': this.generateDescTime,
        'enableLive': this.enableLive,
        'enableAudio': this.enableAudio,
        'position1Interval': this.position1Interval,
        'position2Interval': this.position2Interval,
        'position3Interval': this.position3Interval,
        'position4Interval': this.position4Interval,
        'appConfig': this.appConfig
      }

      if (this.generateDesc) {
        this.showCountdown1 = false
      }
      if (this.enableLive) {
        this.showCountdown2 = false
      }

      this.generateDescTtl = this.generateDescTime
      this.enableLiveTtl = this.enableLiveTime
      this.$nextTick(() => {
        if (this.generateDesc) {
          this.showCountdown1 = true
        }
        if (this.enableLive) {
          this.showCountdown2 = true
        }
      })

      const summaryConfig = {
        id: this.id,
        corporateId: this.corporateId,
        configParam: param
      }
      console.info(summaryConfig)
      saveDemoConfig(summaryConfig).then(
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
      getDemoConfig(this.corporateId).then(
        (response) => {
          console.info(response)
          if (response.code !== 1) {
            console.info(response.message)
          }
          if (response.data === undefined) {
            return
          }
          this.id = response.data.id
          this.name = response.data.name
          const config = response.data.configParam
          this.value1 = config.startTime
          this.value4 = config.endTime
          this.enableAudio = config.enableAudio
          this.enableLive = config.enableLive
          this.enableLiveTtl = config.enableLiveTtl
          this.detectPerson = config.detectPerson
          this.generateDesc = config.generateDesc
          this.generateDescTtl = config.generateDescTtl
          this.enableLiveTime = config.enableLiveTime
          this.generateDescTime = config.generateDescTime
          this.detectPersonThreshold = config.detectPersonThreshold
          this.indexFrame = config.indexFrame
          this.position1Interval = config.position1Interval
          this.position2Interval = config.position2Interval
          this.position3Interval = config.position3Interval
          this.position4Interval = config.position4Interval
          this.appConfig = config.appConfig || { '1': '1' }
        }
      )
    }
  }
}
</script>

