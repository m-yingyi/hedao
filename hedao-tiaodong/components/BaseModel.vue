<template>
  <div class="base-model" v-if="visible">
    <div class="base-model-box">
        <div class="base-model-title">{{title}}</div>
        <p class="base-model-desc">{{text}}</p>
        <div class="base-model-line"></div>
        <div class="base-model-footer">
            <div class="base-model-footer_submit" @click="handleOk">{{okText}}</div>
            <div class="base-model-footer_cancle" @click="handleCancel">取消</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    okText: {
      type: String,
      default: "确认",
    },
  },
  methods: {
    handleOk() {
      this.$emit('onOk')
    },
    handleCancel() {
      this.$emit('onCancel')
    },
  },
};
</script>
<style scoped>
/* 基础弹窗 */
.base-model {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    z-index: 99;
}

.base-model .base-model-box {
    position: absolute;
    width: 480upx;
    background-color: white;
    text-align: center;
    border-radius: 20upx;
    left: 50%;
    top: 480upx;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    min-height: 217upx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #333;
    padding-top: 50upx;
}

.base-model-title {
    font-size: 32upx;
    font-weight: bold;
}

.base-model-desc {
    font-size: 24upx;
    color: #999;
    padding: 9upx 0 52upx 0;
}

.base-model-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90upx;
    font-size: 32upx;
}

.base-model-line {
    height: 1upx;
    width: 100%;
    background: #f0f0f0;
}

.base-model-footer_submit,
.base-model-footer_cancle {
    color: #ff4343;
    text-align: center;
    cursor: pointer;
    line-height: 90upx;
    width: 50%;
}

.base-model-footer_cancle {
    color: #999;
    border-left: 1upx solid #f0f0f0;
}
</style>