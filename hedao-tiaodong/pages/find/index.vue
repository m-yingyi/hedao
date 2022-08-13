<template>
	<view class="content">
		<image class="find-balance" src="/static/yun/images/icon_xcx_05.jpg" mode="widthFix" />
		<div class="find-tab">
			<!-- <div class="find-tab-check">全部</div>
			<div>推荐</div> -->
			<div v-for="(item, index) in findType" v-key="item.id" :class="currentTab === index? 'find-tab-check':''" @click="this.findTypeClick(index, item)">
				{{item.title}}
			</div>
		</div>
		<div v-for="item in findList" v-key="item.id">
			<div class="find-user">
				<UserItem @click="this.navigateTo()" :name="item.nickName" fansCount="9460" :img="item.headImg" />
			</div>
			<div class="list">
				<ul>
					<li  v-for="cItem in item.findBindList" v-key="cItem.id" @click="this.navigateTo(item.userId)"> 
					<a class="temp-link"> 
						<image mode="widthFix" 
								:src="cItem.imgUrl"
								alt="作品封面"/> </a>
						<div>
							<div class="l-txt">
								<h1>{{cItem.title}} <span>{{cItem.description}}</span></h1><span>{{cItem.introduction}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</view>
</template>

<script>
import BaseSpace from '@/components/BaseSpace.vue';
import UserItem from '@/components/UserItem.vue';
import mockData from './mock.js';
import Request from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		components: {
			BaseSpace,
			UserItem,
		},
		data() {
			return {
				mockData: mockData.data,
				findType: [],
				currentTab: 0,
				findList: [],
				pageProps: {
					pageIndex: 1,
					pageSize: 6,
				},
			}
		},
		onShow() {
			console.log(uni.getStorageSync('token'))
			this.getFindType();
		},
		methods: {
			navigateTo(userId) {
                console.log("🚀 ~ file: index.vue ~ line 63 ~ navigateTo ~ userId", userId)
				uni.navigateTo({
					url: `../../pages/core/index?userId=${userId}`
				})
			},
			getFindPage(findTypeId) {
				Request.get(API.find.findPage, {
					findTypeId,
					...this.pageProps,
				}, ({data, statusCode, errors}) => {
					if (statusCode == 200) {
						this.findList = data.items;
					} else {
						uni.showToast({
							title: errors,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			getFindType() {
				Request.get(API.find.findTypeList, null, ({data, statusCode, errors}) => {
					if (statusCode == 200) {
						this.findType = data;
						this.findTypeClick(this.currentTab, this.findType[this.currentTab])
					} else {
						uni.showToast({
							title: errors,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			findTypeClick(index, item) {
				this.currentTab= index
				this.getFindPage(item.id);
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
