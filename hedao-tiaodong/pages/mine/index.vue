<template>
	<view class="content">
		<div :class="isLogin? 'auth userFeed' : 'auth userFeed no-login'">
			<div class="userAuth">
				<div class="head-photo"></div>
				<!-- <img src="/static/yun/imgs1.5/icon_xiezhen_17.png"> -->
					<img :src="userInfo.headImg || '/static/yun/imgs1.5/icon_xiezhen_17.png'">
			</div>
			<template v-if="isLogin">
				<div class="msgAuth">
					<a href="/yun/modifySettings?wid=1" class="user-name">{{userInfo.nickName || userInfo.userName}}</a>
					<a href="/yun/modifySettings?wid=1" class="auth-msg" @click="navigateTo('../../pages/edit-informa/index')">编辑资料</a>
				</div>
				<div class="setAuth" @click="navigateTo('../../pages/system-setting/index')">
					<img src="/static/yun/imgs1.3/icon_yun_910.png"/>
				</div>
			</template>
			<template v-else>
				<div class="click-login" @click="navigateTo('../../pages/login-acount/index')">点击登陆</div>
			</template>
		</div>
		<BaseSpace v-if="isLogin&&userInfo.creatorId" right-arrow left-txt="我的主页" left-url="/static/yun/icons/icon_xcx_01.png" @onClick="navigateTo('../../pages/core/index')"/>
		<BaseSpace right-arrow left-txt="认证创作者" @onClick="navigateTo('../../pages/framer-originator/index')"/>
		<div class="goMyBought" v-if="isLogin&&isAppletJumpWeb">
			<div class="mybought-box"><a @click="navigateTo('../../pages/web-view/index?href=https://www.hedaoapp.com/yun/mycollection')"><span>{{userInfo.focus || 0}}</span><span class="sect-txt">我的收藏</span></a></div>
			<div class="mybought-box"><a @click="navigateTo('../../pages/web-view/index?href=https://www.hedaoapp.com/yun/mybought')"><span>{{userInfo.trends || 0}}</span><span class="sect-txt">在线作品</span></a></div>
			<div class="mybought-box"><a @click="navigateTo(`../../pages/web-view/index?href=https://www.hedaoapp.com/yun/assistanceVoucherList?wid=${userInfo.id}`)"><span>{{userInfo.myBought || 0}}</span><span class="sect-txt">电子凭证</span></a></div>
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
				isLogin: false,
				isAppletJumpWeb: uni.getStorageSync('isAppletJumpWeb') || false,
				userInfo: {},
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		onShow() {
			this.getUserInfo()
		},
		onShareAppMessage(res) {
        	console.log("🚀 ~ file: index.vue ~ line 44 ~ onShareAppMessage ~ res", res)
			  return {
				title: '自定义分享标题',
				path: '/pages/mine/index'
				}

		},
		methods: {
			navigateTo(url) {
				// Require.post(
				// 	API.auth.login,
				// 	{
				// 		account: this.account,
				// 		password: this.password,
				// 		platform: 4
				// 	},
				// 	(res) => {

				// 	})
				uni.navigateTo({
					url
				})
			},
			getUserInfo() {
				// TODO
				this.userInfo = uni.getStorageSync('userInfo');
				this.isLogin = uni.getStorageSync('token');
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
