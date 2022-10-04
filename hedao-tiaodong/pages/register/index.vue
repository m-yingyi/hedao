<template>
  <view class="content">
    <div class="flex align-center register-box">
      账号<span class="register-box-txt">
        <input placeholder="输入账号" @input="accountInput" />
      </span>
    </div>
    <div class="flex align-center register-item code">
      <input type="number" placeholder="输入验证码" @input="codeInput" />
      <span :class="isClickCode ? 'get-code ' : 'time'" @click="sendCode()">{{
        isClickCode ? "获取验证码" : `重新获取(${seconds})`
      }}</span>
    </div>
    <div class="flex align-center register-item">
      <input placeholder="输入密码" @input="passWordInput" password />
    </div>
    <div class="flex align-center register-item">
      <input placeholder="确认密码" @input="commitPassWordInput" password />
    </div>
    <BaseButton text="注册" @onClick="goRegister()" />
  </view>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import Require from "@/common/require.js";
import API from "@/common/api.js";
export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      account: "",
      password: "",
      confirmPassword: "",
      vCode: "",
      isEmail: false,
      seconds: 60,
      isClickCode: true,
      timer: null,
    };
  },
  onLoad() {},
  methods: {
    navigateTo() {
      uni.navigateTo({
        url: "../../pages/question/index",
      });
    },
    accountInput(e) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      this.account = e.detail.value;
      this.isEmail = reg.test(this.account);
    },
    passWordInput(e) {
      this.password = e.detail.value;
    },
    codeInput(e) {
      this.vCode = e.detail.value;
    },
    commitPassWordInput(e) {
      this.confirmPassword = e.detail.value;
    },
    goRegister() {
      let title = null;
      if (
        !this.confirmPassword ||
        !this.password ||
        !this.account ||
        !this.vCode
      ) {
        title = "请输入信息";
      } else if (this.confirmPassword !== this.password) {
        title = "密码不一致";
      } else {
        Require.post(
          API.auth.register,
          {
            account: this.account,
            password: this.password,
            vCode: this.vCode,
          },
          (res) => {
            if (res.statusCode == 200) {
              uni.showToast({
                title: "注册成功",
                icon: "none",
              });
              setTimeout(() => {
                this.accountLogin();
              }, 1500);
            } else {
              uni.showToast({
                title: res.errors,
                icon: "none",
              });
            }
          }
        );
        return;
      }
      if (title) {
        uni.showToast({
          title,
          icon: "none",
        });
        return;
      }
    },
    sendCode() {
      if (!this.account) {
        uni.showToast({
          title: "请输入账号",
          icon: "none",
        });
        return;
      }
      if (!this.isClickCode) return;
      Require.get(API.auth.checkName + this.account, null, (res) => {
        if (res.statusCode == 200) {
          if (res.data) {
            setTimeout(() => {
              uni.showToast({
                title: "您已注册过了！",
                icon: "none",
              });
            });
          } else {
            this.isClickCode = false;
            this.timer = setInterval(() => {
              if (!this.seconds) {
                clearInterval(this.timer);
                this.isClickCode = true;
                this.seconds = 60;
              } else {
                this.seconds -= 1;
              }
            }, 1000);
            Require.post(
              API.auth.sendCode,
              {
                account: this.account,
                type: this.isEmail ? 1 : 0,
                businessType: 0,
              },
              (res) => {
                if (res.statusCode == 200) {
                  uni.showToast({
                    title: "已发送",
                  });
                }
              }
            );
          }
        }
      });
    },
    accountLogin() {
      Require.post(
        API.auth.login,
        {
          account: this.account,
          password: this.password,
        },
        (res) => {
          try {
            if (res.statusCode == 200) {
              const data = res.data;
              uni.setStorageSync("token", data.token);
              uni.setStorageSync("refreshToken", data.refreshToken);
              uni.setStorageSync("userInfo", data.userInfo);
              uni.switchTab({
                url: "../../pages/index/index",
              });
            } else {
              uni.showToast({
                title: res.errors,
                icon: "none",
              });
            }
          } catch (e) {
            console.log("e", e);
            // error
          }
          uni.hideLoading();
        }
      );
    },
  },
};
</script>

<style>
@import url("./index.css");
</style>
