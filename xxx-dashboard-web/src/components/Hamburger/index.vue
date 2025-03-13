<template>
  <div style="display: flex; flex-direction: row; padding: 0 15px;" @click="toggleClick">
    <img style="width: 15px; height: 15px; align-self: center;" src="../../assets/nav_menu.png"/>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
