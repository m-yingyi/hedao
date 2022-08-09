<template>
	<view class="content">
		<div class="flex align-center register-box">账号<span class="register-box-txt">
			 <input
				type="number"
				placeholder="输入账号"
				@blur="accountInput"
				maxlength="11"
				/>
		</span></div>
		<div class="flex align-center register-item">
			<input
				type="number"
				placeholder="输入密码"
				@blur="passWordInput"
				password
				/>
		</div>
		<div class="flex align-center register-item">
			<input
				type="number"
				placeholder="确认密码"
				@blur="comfirmPassWordInput"
				password
				/>
		</div>
		<BaseButton text="登录" @onClick="accountLogin()"/>
	</view>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
	export default {
		components: {
			BaseButton,
		},
		data() {
			return {
				account: '',
				password: '',
				confirmPassword: '',
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
			comfirmPassWordInput(e) {
				this.confirmPassword = e.detail.value;
			},
			accountLogin() {
				let title = null;
				if (!this.confirmPassword || !this.password || !this.account) {
					title = '请输入信息';
				} else if (this.account.length< 11) {
					title = '手机号小于11位'
				} else if ( this.confirmPassword !== this.password ) {
					title = '密码不一致';
				} else {
					title = '登录成功';
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
