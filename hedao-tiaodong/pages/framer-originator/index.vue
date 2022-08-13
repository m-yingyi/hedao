<template>
	<view class="content">
		<div class="head-tab">
			<div v-for="(item, index) in headTab" @click="handleCheck(index)" :class="item.check ? 'theme-bg-color head-tab-item' : 'head-tab-item'">{{item.title}}</div>
		</div>
		<image class="tab-img" mode="widthFix" src="http://i.hedaoapp.com/image/jpg/2021/9/13/021757f47c8b7ae7d842d2ab802b70d50a1e54.jpg"/>
		<image class="tab-img" mode="widthFix" src="http://i.hedaoapp.com/image/jpg/2021/10/10/1223042f395907742a42ee8d4a6c1d5d6a67c0.jpg"/>
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
				headTab: [{label:'抖音创作者使用指南？',check: true},{label:'如何认证创作者',check: false},{label:'知识付费博主如果使用',check: false}]
			}
		},
		onLoad() {
			this.getInformationList()
		},
		methods: {
			handleCheck(index) {
				this.headTab.map((item) => item.check = false)
				this.headTab[index].check = true
			},

			getInformationList() {
				const params = {
					InformationType: 1,
				}
				Request.get(API.information.list, params, ({data}) => {
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
