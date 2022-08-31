<template>
  <div class="mask-wrap flex-column">
    <div class="mask-content flex-column">
      <div class="content-header flex-column">
        <div class="user-bg flex-column">
          <img class="user-img" src="/static/yun/imgs1.5/icon_xiezhen_17.png" />
        </div>
        <p>你正在访问xx的主页</p>
        <p class="tip">正确输入xx的创作者ID后可访问</p>
      </div>
      <div class="content-handle">
        <input
          class="mask-input"
          type="number"
          placeholder="输入创作者ID"
          @input="idInput"
        />
        <div class="btn">
          确认
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      coreInfo: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        inputId: 0,
      }
    },
    methods: {
      handleConfirm() {
        console.log(this.coreInfo)
        this.$emit('onConfirm', this.inputId === this.coreInfo.showId);
      },
      idInput(e) {
        this.inputId = e.detail.value;
      }
    }
  };
</script>
<style scoped>
.mask-wrap {
  background: #333;
  height: 100vh;
  width: 100vw;
}

.flex-column {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.mask-content {
  width: 352upx;
  font-size: 32upx;
  color: #fefefe;
}

.content-header,
.content-handle {
  text-align: center;
}

.tip {
  font-size: 24upx;
  margin-top: 23upx;
}

.user-img {
  width: 130upx;
  height: 130upx;
  border-radius: 50%;
}

.mask-input {
  width: 100%;
  height: 80upx;
  border-radius: 8upx;
  background: #fff;
  margin-bottom: 36upx;
}

.btn {
  background: #37a2f2;
  height: 81upx;
  line-height: 81upx;
  border-radius: 8upx;
}
.content-handle {
  margin-top: 88upx;
}

.user-bg {
  padding: 5upx;
  border-radius: 50%;
  width: 140upx;
  height: 140upx;
  box-shadow: 0 0 5upx 5upx #37a2f2;
  margin-bottom: 46upx;
}

</style>