<template>
	<view class="content">
		<image class="find-balance" src="/static/yun/images/icon_xcx_05.jpg" mode="widthFix" />
		<div class="find-tab">
			<div class="find-tab-check">全部</div>
			<div>推荐</div>
		</div>
		<div v-for="item in mockData.items" v-key="item.id">
			<div class="find-user">
				<UserItem @click="this.navigateTo()" name="Steam游戏盲盒" fansCount="9460" :img="item.headImg" />
			</div>
			<div class="list">
				<ul>
					<li  v-for="cItem in item.findBindList" v-key="cItem.id" @click="this.navigateTo()"> 
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
	export default {
		components: {
			BaseSpace,
			UserItem,
		},
		data() {
			return {
				mockData: mockData.data,
			}
		},
		onLoad() {
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/core/index'
				})
			},
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
