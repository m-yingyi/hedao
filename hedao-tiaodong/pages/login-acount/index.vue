<template>
	<view class="content">
		<div class="flex align-center register-box">账号<div class="register-box-txt">
			 <input
			 	type="text"
				placeholder="输入账号"
				@input="accountInput"
				/>
		</div></div>
		<div class="flex align-center register-item">
			<input
				type="number"
				placeholder="输入密码"
				@input="passWordInput"
				password
				/>
		</div>
		<BaseButton text="登录" @onClick="accountLogin()"/>
	</view>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import Require from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		components: {
			BaseButton,
		},
		data() {
			return {
				account: '',
				password: '',
			}
		},
		onLoad() {

		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
				})
			},
			accountInput(e) {
				this.account = e.detail.value;
			},
			passWordInput(e) {
				this.password = e.detail.value;
			},
			accountLogin() {
				let title = null;
				if (!this.password || !this.account) {
					title = '请输入信息';
				} else {
					uni.showLoading({
						title: '加载中，请稍后',
					});
					Require.post(API.auth.login, {
						account: this.account,
						password: this.password,
					}, (res) => {
						try {
							console.log('res',res)
                            if(res.statusCode == 200) {
                                const data = res.data;
                                uni.setStorageSync('token', data.token);
                                uni.setStorageSync('refreshToken', data.refreshToken);
                                uni.setStorageSync('userInfo', data.userInfo);
                                title = '登录成功';
                                uni.switchTab({
                                    url: '../../pages/find/index'
                                })
                            } else {
                                uni.showToast({
                                    title: res.errors,
                                    icon: 'none'
                                })
                            }
						} catch (e) {
							console.log('e',e)
							// error
						}
						uni.hideLoading();
					})
				}
				if (title) {
					uni.showToast({
						title,
						icon: 'none'
					})
					return
				}
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
