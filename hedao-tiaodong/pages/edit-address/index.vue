<template>
	<view class="content">
		<view class="address-box">
			<view class="box-title">
				<!-- 图片 -->
				设为默认地址
			</view>
			<view class="box-content">
				<view class="content-item item-name">
					<text>收货姓名</text>
					<input type="text" placeholder="你的收货姓名" @input="nameInput" />
				</view>
				<view class="content-item item-phone">
					<text>联系方式</text>
					<input type="number" placeholder="你的联系方式" @input="phoneInput" />
				</view>
				<view class="content-item item-address">
					<text>详细地址</text>
					<input type="text" placeholder="你的详细地址" @input="addressInput" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				userInfo: {},
				addressInfo: {
					name: '',
					phone: '',
					address: '',
				}
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
				this.addressInfo.name= e.detail.value;
			},
			phoneInput(e) {
				this.addressInfo.phone = e.detail.value;
			},
			addressInput(e) {
				this.addressInfo.address = e.detail.value;
			},
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
