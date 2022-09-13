<template>
	<view class="contain">
		<image v-for="(item, index) in imgsList" mode="widthFix" v-key="index" :src="item.url"/>
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
				detail: {},
				imgsList: [],
			}
		},
		onLoad(option) {
			this.getCoreTrendsList(option.id)
		},
		methods: {
			getCoreTrendsList(id) {
				Request.get(API.works.trendsEdit+id, null, ({data, statusCode}) => {
					if(statusCode != 200) return;
					this.detail = data;
					this.imgsList = data.imgList || [];
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
