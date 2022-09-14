<template>
	<view class="content">
		<BaseSpace left-txt="QQ客服" right-txt="827491999"/>
		<BaseSpace right-arrow left-txt="常见问题" @onClick="navigateTo"/>
	</view>
</template>

<script>
import BaseSpace from '@/components/BaseSpace.vue';
	export default {
		components: {
			BaseSpace,
		},
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
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
