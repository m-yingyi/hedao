<template>
	<view class="content">
		<div class="input-box">
            <input class="uni-input" focus placeholder="你的名称" @input="nameInput"/>
        </div>
		<div @click="submit" class="flex theme-bg-color align-center justify-center button-box">
			<div >保存设置</div>
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
				nickName: '',
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
			nameInput(e) {
				this.nickName = e.detail.value;
			},
            // 保存
            submit() {
				Request.put(API.user.userInfo, {
					...this.userInfo,
					nickName: this.nickName,
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
