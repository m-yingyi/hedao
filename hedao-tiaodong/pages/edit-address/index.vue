<template>
	<view class="content">
		<view class="address-box" v-for="(item, index) in addAddressLists" :key="index">
			<view class="box-title">
				<!-- 图片 -->
				<image @click="clickDefault(index)" :src="item.isDefault ? '/static/yun/imgs/icon_yun_938.png' : '/static/yun/imgs/icon_yun_938_2.png'"/>
				<span class="decs">设为默认地址</span>
				<span v-if="index" @click="delAddress(index)" class="del-btn">删除</span>
			</view>
			<view class="box-content">
				<view class="content-item item-name">
					<text>收货姓名</text>
					<input type="text" placeholder="你的收货姓名" :value="item.linkName" @input="(e) => {nameInput(e, index)}" />
				</view>
				<view class="content-item item-phone">
					<text>联系方式</text>
					<input type="number" placeholder="你的联系方式" :value="item.linkPhone" @input="(e) => {phoneInput(e, index)}" />
				</view>
				<view class="content-item item-address">
					<text>地址</text>
					<input type="text" placeholder="你的详细地址" :value="item.linkAddress" @input="(e) => {addressInput(e, index)}" />
				</view>
			</view>
		</view>
		<div class="address-gray-btn" @click="add">添加新地址</div>
		<div class="footer-btn" @click="addAddress">保存设置</div>
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
				addressCreateInfo: {
					linkName: '',
					linkPhone: '',
					linkAddress: '',
					isDefault: 0,
					id: 0,
				},
				addAddressLists: [],
				isCheck: false,
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
			add() {
				// this.$set(this.addAddressLists, this.addAddressLists.length, {
				// 	...this.addressCreateInfo,
				// 	userId: this.userInfo.userId,
				// });
				const addInfo = {
					...this.addressCreateInfo,
					userId: this.userInfo.userId,
				}
				this.addAddressLists = [addInfo, ...this.addAddressLists];
			},
			getUserInfo() {
				// TODO
				this.userInfo = uni.getStorageSync('userInfo');
			},
			getAddressLists() {
				this.addAddressLists.length = 0;
				this.add();
				Require.get(API.user.addressList, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.addAddressLists = [...this.addAddressLists, ...data];
				});
			},
			addAddress() {
				console.log(this.addAddressLists)
				this.editAddress();
			},
			editAddress() {
				// 过滤都为空的数据
				const addressList = this.addAddressLists.filter(v => v.linkName || v.linkAddress || v.linkPhone);
				Require.put(API.user.addressEdit, addressList, ({statusCode, data}) => {
					if(statusCode!=200) return;
						uni.showToast({
							title: '保存成功',
							duration: 1500,
						});
					setTimeout(() => {
						data && this.getAddressLists();
					}, 1500);
				})
			},
			delAddress(index) {
				this.addAddressLists.splice(index, 1);
			},
			clickDefault(index) {
				this.addAddressLists.map((item) => item.isDefault = 0);
				this.addAddressLists[index].isDefault = 1
			},
			nameInput(e, index){
				this.addAddressLists[index].linkName = e.detail.value;
			},
			phoneInput(e, index){
				this.addAddressLists[index].linkPhone = e.detail.value;
			},
			addressInput(e, index){
				this.addAddressLists[index].linkAddress = e.detail.value;
			},
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
