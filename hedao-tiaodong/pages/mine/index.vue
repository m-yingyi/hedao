<template>
	<view class="content">
		<div :class="isLogin? 'auth userFeed' : 'auth userFeed no-login'">
			<div class="userAuth">
				<div class="head-photo"></div>
				<img src="/static/yun/imgs1.5/icon_xiezhen_17.png">
			</div>
			<template v-if="isLogin">
				<div class="msgAuth">
					<a href="/yun/modifySettings?wid=1" class="user-name">13660720164</a>
					<a href="/yun/modifySettings?wid=1" class="auth-msg">编辑资料</a>
				</div>
				<div class="setAuth" @click="navigateTo('../../pages/system-setting/index')">
					<img src="/static/yun/imgs1.3/icon_yun_910.png">
				</div>
			</template>
			<template v-else>
				<div class="click-login">点击登陆</div>
			</template>
		</div>
		<BaseSpace right-arrow left-txt="我的主页" left-url="/static/yun/icons/icon_xcx_01.png" @onClick="navigateTo('../../pages/core/index')"/>
		<BaseSpace right-arrow left-txt="认证创作者" @onClick="navigateTo('../../pages/framer-originator/index')"/>
		<div class="goMyBought" v-if="!isHide">
			<div class="mybought-box"><a href="/yun/mycollection"><span>5</span><span class="sect-txt">我的收藏</span></a></div>
			<div class="mybought-box"><a href="/yun/mybought"><span>2</span><span class="sect-txt">在线作品</span></a></div>
			<div class="mybought-box"><a href="/yun/assistanceVoucherList?wid=1"><span>65</span><span class="sect-txt">电子凭证</span></a></div>
		</div>
		<BaseSpace class="link" right-arrow left-txt="联系客服" @onClick="navigateTo('../../pages/call/index')"/>
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
				isLogin: true, // 未登录
				isHide: true, // 我的：隐藏
			}
		},
		onLoad() {

		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
