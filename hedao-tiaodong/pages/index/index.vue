<template>
	<view class="content">
		<TrendItem v-if="isLogin" :source-data="list" :heart-count="heartCount" :heart-icon="heartIcon"/>
		<view class="noLogin" v-if="!isLogin">
			<view>
				未关注创作者<text @click="this.goFind()">去发现</text>
			</view>
		</view>
	</view>
</template>

<script>
import TrendItem from '../../components/TrendItem.vue';
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
			}
		},
		onLoad() {

		},
		methods: {
			// 跳转发现页
			goFind() {
				uni.switchTab({
					url: '/pages/find/index'
				});
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
