<template>
	<view class="content">
		<div class="flex align-center register-box" @click="goName">姓名
            <span class="register-box-txt">
			    {{userInfo.nickName || '你的昵称'}} >
            </span>
        </div>
		<div class="flex align-center register-box" @click="goEmail">邮箱
			<span class="register-box-txt">
			    {{userInfo.userEmail ||'你的收货邮箱'}} >
            </span>
		</div>
		<div class="flex align-center register-box" @click="goAddress">地址
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
			},
			goName() {
                uni.navigateTo({
					url: '../../pages/edit-name/index'
				})
            },
            goAddress() {
                uni.navigateTo({
					url: '../../pages/edit-address/index'
				})
            },
            goEmail() {
                uni.navigateTo({
					url: '../../pages/edit-email/index'
				})
            },
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
