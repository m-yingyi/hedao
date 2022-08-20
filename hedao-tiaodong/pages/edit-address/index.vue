<template>
	<view class="content">
		<view class="address-box">
			<view class="box-title">
				<!-- 图片 -->
				<image :src="isCheck ? '/static/yun/imgs/icon_yun_938.png' : '/static/yun/imgs/icon_yun_938_2.png'"/>
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
					<text>地址</text>
					<input type="text" placeholder="你的详细地址" @input="addressInput" />
				</view>
			</view>
		</view>
		<div class="address-gray-btn">添加新地址</div>
		<div class="footer-btn">保存设置</div>
	</view>
</template>

<script>
import Require from '@/common/require.js';
import API from '@/common/api.js';
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
				},
				isCheck: false,
				addressList: [],
			}
		},
		onShow() {
			this.getUserInfo();
			this.getAddressLists();
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
			getAddressLists() {
				Require.get(API.user.addressList, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.addressList = data;
				});
			},
			addAddress() {

			},
			editAddress() {
				Require.put(API.user.addressEdit, {

				}, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.addressList = data;
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
