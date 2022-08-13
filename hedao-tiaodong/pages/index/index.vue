<template>
	<view :class="isLogin ? 'content': 'content-noLogin'">
		<template v-if="isLogin">
			<TrendItem :source-data="trendLists" @onRefash="() => {getTrendInfo(true)}"/>
		</template>
		<view class="noLogin" v-if="!isLogin">
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
					pageSize: 6,
				}
			}
		},
		onShow() {
			this.getTrendInfo();
			this.isLogin = uni.getStorageSync('token');
		},
		onPullDownRefresh() {
			this.scrollPage()
		},
		methods: {
			// 跳转发现页
			goFind() {
				uni.switchTab({
					url: '/pages/find/index'
				});
			},
			// 获取首页关注
			getTrendInfo(isRefash) {
				isRefash && (this.trendLists.length = 0);
				let params = {
					type: 2, //首页关注
					...this.pageProps,
				}
				Request.get(API.works.trendsPage, params, ({data}) => {
					if(data?.items) {
						this.trendLists = [...this.trendLists, ...data.items];
					}
					console.log(this.trendLists)
				})
			},
			// 下拉分页 TODO: 暂未实现
			scrollPage() {
				this.pageProps.pageIndex += 1;
				this.getTrendInfo()
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
