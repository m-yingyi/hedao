<template>
	<view class="container">
		<image class="app-logo-img" :src="`${Api.featureImg}/user/login-bg.jpg`" mode="widthFix"></image>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<button class="btn-login" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">登录</button>
		</view>
		<view class='get-pop'>
			<view class='pop-box'>
				<view style='margin-bottom:20px;line-height:1.8em;padding-left:26rpx'>
					<view>您的手机号尚未注册，</view>
					<view>请授权"获取手机号"，</view>
					<view>以完成快速注册。</view>
				</view>
				<button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >获取手机号</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Api from '@/common/api';
export default {
	components: {
		
	},
	data() {
		return {
			Api,
			loginInfo: {},
			phone: '13146587722',
			isWeiXin: 0,
			showGetPhone: false,
			info: '',
			userinfoIv: '',
			userinfoEncryptedData: ''
		};
	},
	onShareAppMessage: function(res) {},
	onLoad() {
		let that = this
		let isWeiXin = that.$common.isWeiXinBrowser(); //判断是否在微信浏览器 true是
		if (isWeiXin) {
			that.isWeiXin = 1;
		}
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	methods: {
		...mapMutations(['login', 'logout']),
		// 微信获取手机号
		getPhoneNumber(e) {
            console.log("🚀 ~ file: index.vue ~ line 55 ~ getPhoneNumber ~ e", e) 
			tt.login({
				success: ({code, anonymousCode}) => {
					console.log('获取code', code)
					if (code) {
						if (e.detail.iv) {
							let params = {
								anonymous_Code: anonymousCode,
								code,
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData
							}
							this.loginBy(params)
						}
					}
				}
			})
		},
		// 获取用户信息
		wxGetUserInfo: function(e) {
			this.$db.set('wxLoginInfo', e.detail.userInfo)
			uni.login({
				provider: 'weixin',
				success: ({code}) => {
					if (code) {
						wx.getUserInfo({
							success: res => {
								const { rawData, iv, signature, encryptedData } = res
								if (!rawData || !iv || !signature || !encryptedData) {
									return this.outError('获取登录信息错误[wx]')
								}
								let params = {
									code,
									userInfo: rawData,
									userinfoEncryptedData: encryptedData,
									userinfoIv: iv,
								}
								this.checkLogin(params)
							}
						})
					} else {
						wx.showToast({
							title: '用户登录凭证获取失败，请截图联系客服',
							icon: 'none'
						})
					}
				}, fail() {
					wx.showToast({
						title: '获取用户信息失败，请截图联系客服',
						icon: 'none'
					})
				}
			})
		},
		// 检查是否注册
		async checkLogin(params) {
			let res = await Api.apiSelfCall('post',Api.BASEURI + Api.index.checkLogin, params, true);
			params.canLogin = res.canLogin
			if (res.canLogin === 1) {
				uni.login({
					provider: 'weixin',
					success: ({code}) => {
						this.loginByWX({...params, code})
					}
				})
			} else {
				// 如果没有注册，需要先获取手机号，再走注册流程
				this.loginInfo = params
				this.showGetPhone = true
			}
		},
		// 登录
		loginBy(params) {
			console.log('111',params)
			// return
			let that = this;
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
			uni.request({
				url: Api.BASEURI + Api.auth.tikTokLogin,
				method: 'post',
				data: params,
				success: ({data}) => {
					uni.hideLoading();
					if (data.code == 500 && data.data == 'JSONObject["openid"] not found.') {
						this.showToastData('appid出错')
					} else if (data.code === 200) {
						this.showGetPhone = false
							that.login(data.data);
							that.$db.set('token', data.data.tokenHead + data.data.token);
							that.getuserinfo()
					} else {
						this.showToastData('获取unionId失败，请截图联系客服')
					}
				},
				fail: function(e) {
					console.log('获取unionId失败，请截图联系客服', e);
					uni.hideLoading();
					this.showToastData('获取unionId失败，请截图联系客服')
				}
			});
		},
		showToastData(msg, type = 'none') {
			uni.showToast({
				title: msg,
				icon: type
			});
		},
		outError(e) {
			if (typeof e === 'string') {
			wx.showModal({
				title: '请把此报错截图给客服',
				content: e,
				success(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
				}
			})
			} else {
			try {
				wx.showModal({
				title: '请把此报错截图给客服',
				content: JSON.stringify(e),
				success(res) {
					if (res.confirm) {
					console.log('用户点击确定')
					} else if (res.cancel) {
					console.log('用户点击取消')
					}
				}
				})
			} catch (error) {
				wx.showModal({
				title: '请把此报错截图给客服',
				content: '微信开发能力调用异常' + e,
				success(res) {
					if (res.confirm) {
					console.log('用户点击确定')
					} else if (res.cancel) {
					console.log('用户点击取消')
					}
				}
				})
			}
			}
		},
		// 获取用户信息
		async getuserinfo() {
			this.showToastData('登录成功')
			let data = await Api.apiCall('get', Api.index.userInfo, {}, true);
			if (data) {
				if (data.member) {
					uni.setStorageSync('userInfo', data.member);
					uni.navigateBack();
				} else {
					this.logout();
				}
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.container {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.app-logo-img {
		width: 750upx;
		height: 100%;
	}
}
.btn-login {
	background-color: #FE5556;
	width: 593upx;
	height: 88upx;
	border-radius: 36px;
	margin-top: 280upx;
	font-size: 32upx;
	color: white;
}
.wrapper {
	position: relative;
	z-index: 90;
	background: #fff;
	padding-bottom: 40upx;
}
.back-btn {
	position: absolute;
	left: 40upx;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	top: 40upx;
	font-size: 40upx;
	// color: $font-color-dark;
}
.left-top-sign {
	font-size: 120upx;
	// color: $page-color-base;
	position: relative;
	left: -16upx;
}
.right-top-sign {
	position: absolute;
	top: 80upx;
	right: -30upx;
	z-index: 95;
	&:before,
	&:after {
		display: block;
		content: '';
		width: 400upx;
		height: 80upx;
		background: #b4f3e2;
	}
	&:before {
		transform: rotate(50deg);
		border-radius: 0 50px 0 0;
	}
	&:after {
		position: absolute;
		right: -198upx;
		top: 0;
		transform: rotate(-50deg);
		border-radius: 50px 0 0 0;
		/* background: pink; */
	}
}
.left-bottom-sign {
	position: absolute;
	left: -270upx;
	bottom: -320upx;
	border: 100upx solid #d0d1fd;
	border-radius: 50%;
	padding: 180upx;
}
.welcome {
	position: relative;
	left: 50upx;
	top: -90upx;
	font-size: 46upx;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.input-content {
	padding: 0 60upx;
}
.input-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 30upx;
	// background: $page-color-light;
	height: 120upx;
	border-radius: 4px;
	margin-bottom: 50upx;
	&:last-child {
		margin-bottom: 0;
	}
	.tit {
		height: 50upx;
		line-height: 56upx;
		// font-size: $font-sm + 2upx;
		// color: $font-color-base;
	}
	input {
		height: 60upx;
		// font-size: $font-base + 2upx;
		// color: $font-color-dark;
		width: 100%;
	}
}

.confirm-btn {
	width: 630upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 70upx;
	// background: $uni-color-primary;
	color: #fff;
	// font-size: $font-lg;
	&:after {
		border-radius: 100px;
	}
}
.forget-section {
	// font-size: $font-sm + 2upx;
	// color: $font-color-spec;
	text-align: center;
	margin-top: 40upx;
}
.register-section {
	position: absolute;
	left: 0;
	bottom: 50upx;
	width: 100%;
	// font-size: $font-sm + 2upx;
	// color: $font-color-base;
	text-align: center;
	text {
		// color: $font-color-spec;
		margin-left: 10upx;
	}
}
.get-pop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4); }

.pop-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  padding: 30rpx;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: white;
  border-radius: 10rpx;
  overflow: hidden;
  padding-bottom: 40rpx; }
</style>
