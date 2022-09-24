<template>
	<view :class="isLogin ? 'content': 'content-noLogin'">
		<div class="menu" v-if="tabLists.length > 1">
			<div @click="changeTab(index)" v-for="(item, index) in tabLists">
				<div :class="item.check ? 'menu-li blackTxt':'menu-li'">
					{{item.label}}<p :class="item.check ? 'redLine':''"></p>
				</div>
			</div>
		</div>
		<view v-if="isLogin || !currentItem">
			<scroll-view class="cover-view-scroll" :scroll-y="true" @scrolltolower="scrollPage">
				<TrendItem :isLogin="isLogin" :isNeedCore="true" :isBold="true" :source-data="trendLists" :isBottom="isBottom" @onRefash="() => {getTrendInfo(true)}"/>
			</scroll-view>
		</view>
		<view class="noLogin" v-if="!isLogin && currentItem">
			<view>
				未关注创作者<text @click="this.goFind()">去发现</text>
			</view>
		</view>
	</view>
</template>

<script>
import TrendItem from '../../components/TrendItem.vue';
import Request from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		components: {
			TrendItem
		},
		data() {
			return {
				list: [
					'http://i.hedaoapp.com/Trends/2022/6/16/221430e6b528d508ed41859ba34ed066b8a16b.jpg',
					'http://i.hedaoapp.com/image/jpg/2021/9/13/021757f47c8b7ae7d842d2ab802b70d50a1e54.jpg',
					'http://i.hedaoapp.com/image/jpg/2021/9/15/18134249e71095f0fd447e9e11fe1230910036.jpg',
				],
				heartCount: '点赞',
				heartIcon: 2,
				isLogin: false,
				trendLists: [],
				pageProps: {
					pageIndex: 1,
					pageSize: 20,
				},
				isBottom: false,
				tabLists: [{label: '推荐', check: true},{label: '关注', check: false }],
				currentItem: 0,
			}
		},
		onShow() {
			this.getTrendInfo(true);
			this.isLogin = uni.getStorageSync('token');
		},
		// onPullDownRefresh() {
		// 	this.scrollPage()
		// },
		methods: {
			// 跳转发现页
			goFind() {
				uni.switchTab({
					url: '/pages/find/index'
				});
			},
			changeTab(index) {
				this.tabLists.map((item) => item.check = false);
				this.tabLists[index].check = true;
				this.currentItem = index;
				this.getTrendInfo(true);
			},
			// 获取首页关注
			getTrendInfo(isRefash) {
				if (isRefash) {
					this.trendLists.length = 0;
					this.pageProps.pageIndex = 1;
				}
				let params = {
					type: this.currentItem +1, //首页关注
					...this.pageProps,
				}
				Request.get(API.works.trendsPage, params, ({data}) => {
					if(data?.items?.length) {
						this.trendLists = [...this.trendLists, ...data.items];
						this.isBottom = false
					} else {
						this.isBottom = true
					}
					console.log(this.trendLists)
				}, {noLogin: true})
			},
			// 下拉分页 TODO: 暂未实现
			scrollPage() {
				console.log('111')
				if (this.isBottom) return;
				this.pageProps.pageIndex += 1;
				this.getTrendInfo()
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
