<template>
	  <div id="addr_add_wrap">
    <div class="project-wrap" v-for="(item, index) in addAddressLists" :key="index">
      <div class="addr-wrap" id="spec_div_1">
        <span :class="item.check?'iconbox iconred' : 'iconbox icongray'" id="spec_state_1"></span
        ><span>设为默认地址</span>
        <div class="delete-item" @click="delAddress(index)" v-if="addrList.length > 1">删除</div>
      </div>
      <div class="inputBox wd-box">
        <span>收货姓名</span
        ><input
          class="i-text"
          id="spec_name_1"
          type="text"
          placeholder="你的收货姓名"
          maxlength="45"
					:value="item.linkName"
					@input="(e) => {nameInput(e, index)}"
        />
      </div>
      <div class="inputBox wd-box">
        <span>联系方式</span
        ><input
          class="i-text"
          id="spec_phone_1"
          type="text"
          placeholder="你的联系电话"
          maxlength="45"
					:value="item.linkPhone" @input="(e) => {phoneInput(e, index)}"
        />
      </div>
      <div class="_addr_box">
        <span>地址</span
        ><textarea
          class="text-content"
          id="spec_address_1"
          placeholder="你的收货地址"
		 			:value="item.linkAddress" @input="(e) => {addressInput(e, index)}"
        ></textarea>
      </div>
    </div>
	<div class="add-addr" @click="add">添加新地址</div>
	<div class="btnSave" @click="addAddress">保存资料</div>
  </div>
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
