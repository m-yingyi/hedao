<template>
	<view class="content">
		<BaseSpace left-txt="版本更新" right-txt="盒岛V1.0"/>
		<BaseSpace right-arrow left-txt="退出登录" @onClick="openOutLineModel"/>
		<BaseModel :title="title" :text="text" :okText="okText" :visible="visible" @onOk="onOk" @onCancel="onCancel"/>
	</view>
</template>

<script>
import BaseModel from '@/components/BaseModel.vue';
import BaseSpace from '@/components/BaseSpace.vue';
	export default {
		components: {
			BaseModel,
			BaseSpace,
		},
		data() {
			return {
				title: '确认退出登录',
				text: '确认退出当前账号',
				okText: '退出',
				visible: false,
			}
		},
		onLoad() {

		},
		methods: {
			openOutLineModel() {
				this.visible = true
			},
			onOk() {
				uni.clearStorage();
				this.visible = false
				uni.showToast({
					title: '退出成功',
					duration: 2000,
					complete() {
						uni.switchTab({
							url: '../../pages/index/index'
						})
					}
				});
			},
			onCancel() {
				this.visible = false
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
