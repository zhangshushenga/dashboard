<template>
  <el-select
    v-model="childDeviceModelList"
    clearable
    multiple
    filterable
    placeholder="固件型号"
    style="width: 100%"
    @change="childValueChange"
  >
    <el-option
      v-for="item in fwList"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
</template>

<script>

export default {
  name: 'UserSelect',
  model: {
    prop: 'fatherDeviceModelList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherDeviceModelList: Array
  },
  data() {
    return {
      fwList: ['JA_RO2',
        'JA_EC1',
        'JA_HV',
        'CHIME',
        'DWS2U',
        'DWS3U',
        'GW3U',
        'HL_A19C2',
        'HL_BR30C',
        'HL_CAM3P',
        'HL_CAM3SS',
        'HL_CAMTC',
        'HL_CFL',
        'HL_CGDC',
        'HL_CHIME2',
        'HL_CLK',
        'HL_DB2',
        'HL_HCSB',
        'HL_HUM',
        'HL_HWB2',
        'HL_LSL',
        'HL_LSLP',
        'HL_PAN2',
        'HL_PAN3',
        'HL_PANP',
        'HL_SSL',
        'HL_WCO2',
        'HL_WV1',
        'HR3U',
        'KP3U',
        'PIR2U',
        'PIR3U',
        'QF3',
        'QF3S',
        'ST3U',
        'TH3U',
        'UD3U',
        'WLPA19',
        'WLPA19C',
        'WLPP1',
        'WLPP1CFH',
        'WLPPO',
        'WLPPO-SUB',
        'WS3U',
        'WVOD1',
        'WVODB1',
        'WYZEC1',
        'WYZEC1-JZ',
        'WYZEC3L',
        'WYZECP1_JEF',
        'WYZEDB3',
        'WYZESD1',
        'WYZE_CAKP2JFUS',
        'RY.HP1',
        'RY.WA1',
        'RY.WA2',
        'RY.WP1',
        'JA_SL10',
        'JA_SL20',
        'JA_SL30',
        'JA_SLA0',
        'JA_SLB0'
      ],
      childDeviceModelList: this.fatherDeviceModelList
    }
  },
  mounted() {
    this.setFw()
  }, methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childDeviceModelList)
    },
    setFw() {
      // getFWVersion().then((repsonse) => {
      //   const fwList = repsonse.data
      //   this.fwList = []
      //   fwList.forEach((fw) => {
      //     this.fwList.push({
      //       label: fw.key,
      //       value: fw.key
      //     })
      //   })
      // }).catch(() => {
      // })
    }
  }

}
</script>

<style scoped>

</style>
