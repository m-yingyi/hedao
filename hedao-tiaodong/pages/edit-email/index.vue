<template>
	<view class="content">
		<div class="flex align-center register-box">姓名
            <span class="register-box-txt">
			    {{userInfo.nickName || '你的昵称'}} >
            </span>
        </div>
		<div class="flex align-center register-box">邮箱
			<span class="register-box-txt">
			    {{userInfo.userEmail ||'你的收货邮箱'}} >
            </span>
		</div>
		<div class="flex align-center register-box">地址
			<span class="register-box-txt">
			    实物收货地址 >
            </span>
		</div>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				nikename: '',
				email: '',
				address: '',
				userInfo: {},
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
				})
			},
			getUserInfo() {
				// TODO
				this.userInfo = uni.getStorageSync('userInfo');
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
