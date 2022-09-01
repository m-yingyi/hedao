<template>
	<view class="content">
		<image v-for="(item, index) in imgsList" v-key="index" :src="item.originalImg"/>
	</view>
</template>

<script>
import BaseSpace from '@/components/BaseSpace.vue';
import Request from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		components: {
			BaseSpace,
		},
		props: {
			id: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				imgsList: []
			}
		},
		onLoad() {
			this.getCoreTrendsList()
		},
		methods: {
			getCoreTrendsList() {
				Request.get(API.works.coreTrends, {
					createId: this.id,// 作品发布id
				}, (res) => {
					this.imgsList = res.data.items
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
