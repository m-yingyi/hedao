<template>
  <div class="base-space" @click="handleClick">
    <div class="flex base-space-left">
      <img v-if="leftUrl" :src="leftUrl"/>
      <span>{{leftTxt}}</span>
    </div>
    <img v-if="rightArrow" class="base-space-right" src="/static/yun/icon2.1_3/png_2.1_3_05.png"/>
    <span v-if="rightTxt">{{rightTxt}}</span>
  </div>
</template>

<script>
export default {
  props: {
    leftUrl: {
      type: String,
      default: "",
    },
    leftTxt: {
      type: String,
      default: "",
    },
    rightArrow: {
      type: Boolean,
      default: false,
    },
    rightTxt: {
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
.base-space {
  background: white;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36upx;
  box-sizing: border-box;
  font-size: 32upx;
  height: 100upx;
  border-top: 1upx solid #f0f0f0;
}
.base-space-left > img {
  width: 46upx;
    height: 46upx;
  margin-right: 22upx;
}
.base-space-right {
  width: 20upx;
    height: 36upx;
}
</style>