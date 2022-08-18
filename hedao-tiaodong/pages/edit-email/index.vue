<template>
	<view class="content">
		<div class="input-box">
            <input class="uni-input" focus placeholder="你的收货邮箱" />
        </div>
		<div class="flex theme-bg-color align-center justify-center button-box">
			<div type="default" @click="submit">保存设置</div>
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
