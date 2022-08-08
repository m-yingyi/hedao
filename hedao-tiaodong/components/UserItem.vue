<template>
  <div class="user-item">
    <div class="flex align-center">
      <img class="user-item-img" :src="img">
      <span class="user-item-name">{{name}}</span>
    </div>
    <!-- <div class="user-item-right">{{fansCount}}粉丝团<span class="user-item-dot">·</span><span class="theme-color user-item-right-txt">主页</span></div> -->
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    fansCount: {
      type: Number,
      default: 0
    },
    img: {
      type: String,
      default: 'http://i.hedaoapp.com/image/jpg/2021/9/13/021757f47c8b7ae7d842d2ab802b70d50a1e54.jpg',
    }
  },
  methods: {
    handleClick() {
      this.$emit('onClick')
    },
  },
};
</script>
<style scoped>
.user-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-right: 20upx;
  border: none;
  padding: 0;
  margin-bottom: 0;
  font-size: 28upx;
  height: 100upx;
}
.user-item-img {
  border-radius: 50%;
  height: 64upx;
  width: 64upx;
  margin-right: 16upx;
}
.user-item-name {
  font-size: 24upx;
}
.user-item-right {
    display: block;
    text-align: right;
    color: #b5b5b5;
}
.user-item-right-txt {
  font-weight: bold;
}
.user-item-dot {
  margin: 0 16upx;
}
</style>