<template>
	<view class="content">
		<div class="flex align-center register-box">姓名
            <span class="register-box-txt">
			    你的昵称 >
            </span>
        </div>
		<div class="flex align-center register-box">邮箱
			<span class="register-box-txt">
			    你的收货邮箱 >
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
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
