<template>
  <div @mousemove="handleMouseMove">
    <el-select
      ref="mySelect"
      v-model="childFirmwareVersionList"
      :placeholder="$t('label42')"
      allow-create
      class="tag-select"
      clearable
      default-first-option
      filterable
      multiple
      style="width: 100%"
      @change="childValueChange"
    >
      <!-- <el-option
      v-for="item in fwList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    /> -->
    </el-select>
  </div>
</template>

<script>

export default {
  name: 'FirmwareVersionSelect',
  model: {
    prop: 'fatherFirmwareVersionList', // 父组件v-model绑定的值传递给props中的fatherValue
    event: 'childValueChange'
  },
  props: {
    fatherFirmwareVersionList: Array
  },
  data() {
    return {
      fwList: [],
      childFirmwareVersionList: this.fatherFirmwareVersionList,
      preX: 0
    }
  },
  watch: {
    fatherFirmwareVersionList(newVal, oldVal) {
      this.childFirmwareVersionList = newVal
      console.log(newVal, oldVal)
    }
  },
  mounted() {
    this.setFw()
    const select = this.$refs.mySelect
    this.preX = select.$el.clientWidth / 2
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    childValueChange() {
      this.$emit('childValueChange', this.childFirmwareVersionList)
    },
    setFw() {
      // this.fwList.push(
      //     {
      //   label: '1.0.0',
      //   value: '1.0.0'
      // }
      // )
    },
    handleMouseMove(event) {
      const select = this.$refs.mySelect
      const elSelect = select.$el
      const tagsContainer = select.$el.querySelector('.el-select__tags')
      const rect = elSelect.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const diffX = offsetX - this.preX
      const scrollIncrement = 2 // 设置一个增量
      if (diffX > 0) {
        // 向右拖动，增加scrollLeft的值
        tagsContainer.scrollLeft += scrollIncrement
      } else {
        // 向左拖动，减少scrollLeft的值
        tagsContainer.scrollLeft -= scrollIncrement
      }
    },
    handleWindowResize() {
      const select = this.$refs.mySelect
      this.preX = select.$el.clientWidth / 2
      console.log('this.preX')
      console.log(this.preX)
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-select {
  ::v-deep .el-select__tags {
    flex-wrap: nowrap;
    overflow: hidden;
    margin-left: 5px;
  }

  ::v-deep .el-select__tags-text {
    display: inline-block;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::v-deep .el-select__tags .el-tag {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 60%;
    margin: 2px 0 2px 6px;
    text-overflow: ellipsis;
    background: #f0f2f5;
  }

  ::v-deep .el-input__suffix {
    display: none;
  }

  .el-select-dropdown {
    position: absolute;
    z-index: 1001;
    border: solid 1px #dfe4ed;
    border-radius: 4px;
    background-color: #FFFFFF;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 5px 0;
    display: none;
  }
}
</style>
