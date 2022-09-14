<template>
	<view class="content">
		<div class="flex align-center register-box" @click="goName">姓名
            <span :class="coreInfo.nickName ? 'register-box-txt': 'register-box-txt gray'">
			    {{coreInfo.nickName || '你的昵称'}}
				<img src="/static/yun/imgs1.5/png_1.5_34.png"/>
            </span>
        </div>
		<div class="flex align-center register-box" @click="goEmail">邮箱
			<span :class="coreInfo.userEmail ? 'register-box-txt': 'register-box-txt gray'">
			    {{coreInfo.userEmail ||'你的收货邮箱'}} 
				<img src="/static/yun/imgs1.5/png_1.5_34.png"/>
            </span>
		</div>
		<div class="flex align-center register-box" @click="goAddress">地址
			<span :class="coreInfo.address ? 'register-box-txt': 'register-box-txt gray'">
			    {{coreInfo.address || "实物收货地址"}}
				<img src="/static/yun/imgs1.5/png_1.5_34.png"/>
            </span>
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
				nikename: '',
				email: '',
				address: '',
				userInfo: {},
				coreInfo: {},
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
				this.getcreatorInfo();
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
			getcreatorInfo() {
				Request.get(API.user.creatorInfo + this.userInfo.userId, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.coreInfo = data;
				})
			},
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
