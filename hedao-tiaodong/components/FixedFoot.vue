<template>
  <div class="flex theme-bg-color align-center justify-center fixed-foot" @click="handleClick">
    {{text}}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "前往盒岛官网认证",
    },
  },
  methods: {
    handleClick() {
      this.$emit('onClick')
    },
  },
};
</script>
<style scoped>
.fixed-foot {
  width: 100%;
  height: 98upx;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 32upx;
  z-index: 999;
}
</style>