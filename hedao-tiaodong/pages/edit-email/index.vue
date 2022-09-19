<template>
	<view class="content">
		<div class="input-box">
            <input class="uni-input" :value="userInfo.userEmail" focus placeholder="你的收货邮箱" @input="userEmailInput" />
        </div>
		<div class="flex theme-bg-color align-center justify-center button-box">
			<div type="default" @click="submit">保存设置</div>
		</div>
	</view>
</template>

<script>
import Request from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		components: {
		},
		data() {
			return {
				userEmail: '',
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
			userEmailInput(e) {
				this.userEmail = e.detail.value;
			},
            // 保存
            submit() {
				if(!this.userEmail) {
					uni.navigateBack({
						delta: 1
					});
					return;
				}
				Request.put(API.user.userInfo, {
					...this.userInfo,
					userEmail: this.userEmail,
				}, ({statusCode, data}) => {
					if(statusCode!=200) return;
					data && uni.setStorageSync('userInfo', data);
					uni.navigateBack({
						delta: 1
					});
				})
            }
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
