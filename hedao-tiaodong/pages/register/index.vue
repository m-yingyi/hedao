<template>
	<view class="content">
		<div class="flex align-center register-box">账号<span class="register-box-txt">13660720100</span></div>
		<div class="flex align-center register-item">输入密码</div>
		<div class="flex align-center register-item">确认密码</div>
		<BaseButton text="登录"/>
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
			}
		},
		onLoad() {

		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
