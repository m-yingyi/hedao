<template>
	<view class="content">
		<div class="head-tab">
			<div v-for="(item, index) in headTab" @click="handleCheck(index)" :class="item.check ? 'theme-bg-color head-tab-item' : 'head-tab-item'">{{item.title}}</div>
		</div>
		<image v-if="item.imgList.length" v-for="item in headTab[currentIndex].imgList" class="tab-img" mode="widthFix" :src="item"/>
		<FixedFoot :text="text"/>
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
				text: '前往盒岛官网认证',
				headTab: [],
				currentIndex: 0
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
			},

			getInformationList() {
				const params = {
					InformationType: 1,
				}
				Request.get(API.information.list, params, ({data}) => {
					data.forEach((item) => item.check = false)
					data[0].check = true
					this.headTab = data
					console.log(data)
				})
			},

			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
