<template>
	<view class="content">
		<rich-text style="word-break: break-all;" :nodes="`<pre style='white-space: pre-wrap;'>${replaceBr(description)}</pre>`"></rich-text>
	</view>
</template>

<script>
import Request from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		data() {
			return {
				description: '',
			}
		},
		onLoad() {
			this.getInformationList()
		},
		methods: {
			getInformationList() {
				const params = {
					InformationType: 2,
				}
				Request.get(API.information.list, params, ({data}) => {
					this.description = data[0].description;
				}, {noLogin: true})
			},
			replaceBr(str) {
				if(!str) return '';
				return str.replace(/<\/br>/g, '<br>')
			},
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
