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
      default: "",
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
  border-radius: 44upx;
  font-size: 32upx;
  margin-top: 88upx;
}
</style>