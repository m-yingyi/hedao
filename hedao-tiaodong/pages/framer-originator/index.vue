<template>
	<view class="content">
		<div class="head-tab">
			<div v-for="(item, index) in headTab" @click="handleCheck(index)" :class="item.check ? 'theme-bg-color head-tab-item' : 'head-tab-item'">{{item.title}}</div>
		</div>
		<template v-if="imgList.length">
			<image v-for="item in imgList" class="tab-img" mode="widthFix" :src="item"/>
		</template>
		<FixedFoot v-if="isAppletJumpWeb" @onClick="navigateTo"/>
	</view>
</template>

<script>
import FixedFoot from '@/components/FixedFoot.vue';
import Request from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		components: {
			FixedFoot,
		},
		data() {
			return {
				headTab: [],
				currentIndex: 0,
				imgList: [],
				isAppletJumpWeb: uni.getStorageSync('isAppletJumpWeb') || false
			}
		},
		onLoad() {
			this.getInformationList()
		},
		methods: {
			handleCheck(index) {
				this.headTab.map((item) => item.check = false)
				this.headTab[index].check = true
				this.currentIndex = index
				this.imgList = this.headTab[index].imgList || [];
			},

			getInformationList() {
				const params = {
					InformationType: 1,
				}
				Request.get(API.information.list, params, ({data}) => {
					data.forEach((item) => item.check = false)
					data[0].check = true
					this.imgList = data[0].imgList || [];
					this.headTab = data
				}, {noLogin: true})
			},

			navigateTo() {
				uni.navigateTo({
					url: '../../pages/web-view/index?href=http://hedaoapp.com/yun'
				})
			},
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
