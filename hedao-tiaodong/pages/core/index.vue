<template>
	<view hover-stop-propagation :class="coreInfo.creatorState != -2? 'contain':'close-core'">
		<template v-if="coreInfo.creatorState != -2">
			<template v-if="!isIdolIdVisit">
				<scroll-view scroll-y="true" class="cover-view-scroll" @scrolltolower="scrollBottom">
					<view hover-stop-propagation :class="isOpenShare ? 'content-hide' : 'content'">
						<div class="flex align-center justify-between share-wrap">
							<div class="goBack-btn" @click="goIndex"><img src="/static/yun/imgs/icon_yun_20.png" />
							</div>
							<div class="share-btn" @click="openShare"><img src="/static/yun/idolIcon/png_app_011.png" />
							</div>
						</div>
						<figure style="margin-top: auto;padding: 0 88upx;margin-bottom: 0;">
							<div class="photoBox"
								style="flex-direction: column;justify-content: center;margin-right: auto;">
								<div class="img-box-border">
									<img id="IdolHeadImg" data-href="/yun/myHead?wid=1" style="cursor:pointer;"
										:src="coreInfo.headImg">
								</div>
							</div>
							<!-- <div class="flex align-center justify-between top-icon-btn"><image src="/static/yun/idolIcon/icon_age.png"/>
								<image src="/static/yun/idolIcon/png_rz.png"/>
							</div> -->
							<div class="user-age-box">
								<div class="user" style="margin-top: 0;">{{coreInfo.nickName || 'xxx'}}</div>
								<div class="userFlag" v-if="coreInfo.recomIntor"><img
										src="/static/yun/idolIcon/png_rz.png"><span>{{coreInfo.recomIntor}}</span></div>
							</div>
							<div class="user-info">
								<div class="us-txt" style="color: #333333">
									<div id="us-remark" :class="isIntroductionHide?'us-remark-hide':''">
										<p id="us-introduction" ref="introduction">{{coreInfo.introduction || ''}}</p>
									</div>
									<span @click="introductionShow" v-if="isIntroductionHide">...<span
											style="color: #fff">两</span><span style="color: #ccc;">展开</span></span>
								</div>
							</div>
						</figure>
						<div class="member-link">
							<div style="flex: 1;" class="FollowIdol" data-isfollow="0" data-href="/yun/openmember?wid=1"
								@click="focusHandle(coreInfo.creatorId)">
								<span v-if="!coreInfo.isFocus">关注</span>
								<span v-else>已关注</span>
							</div>
						</div>
						<div class="photoBox contentUserWrap" v-if="coreInfo.fansTeamCount"
							style="border-top: 0;border-bottom: 1upx solid #f0f0f0;margin-top: 10upx;margin-bottom:0;">
							<div class="leftImg">
								<template v-if="fansTeamHeadImgs && fansTeamHeadImgs.length">
									<img v-for="(imgItem, imgIdx) in fansTeamHeadImgs" :src="imgItem" :key="imgIdx" />
								</template>
								<template v-else>
									<img
										src="http://i.hedaoapp.com/image/jpg/2022/4/3/224525b5921b8371564b409814e046c0b6822a.jpg?x-oss-process=image/resize,l_300">
									<img
										src="http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300">
									<img
										src="http://i.hedaoapp.com/image/jpg/2022/3/24/1805235360aa12a52849fe9d72bde4bd0d8108.jpg?x-oss-process=image/resize,l_300">
								</template>
								<span>{{coreInfo.fansTeamCount}}人加入粉丝团</span>
							</div>
							<a class="contentShareWrap" href="/yun/fansTeam?wid=1" style="color: #999">
								<span style="margin-left: 26upx;" @click="showRank">查看成员</span>
								<img src="/static/yun/imgs1.5/png_1.5_34.png">
							</a>
						</div>
						<div class="menu" style="padding-top: 20upx;" v-if="tabLists.length > 1">
							<div @click="changeTab(index)" v-for="(item, index) in tabLists">
								<div class="menu-li blackTxt">
									{{item.label}}<p :class="item.check ? 'redLine':''"></p>
								</div>
							</div>
						</div>
						<div class="core-index-container" v-if="currentItem === 0">
							<div class="core-index-box" v-if="aboutTip">
								<div class="core-index-title">关于</div>
								<p id="core-index-desc">
								<pre>{{aboutTip}}</pre>
								</p>
							</div>
							<div class="core-index-box" v-if="memberList.length && coreInfo.isAssistancePlan == 1"
								style="padding-bottom: 72upx;">
								<div class="core-index-title">会员</div>
								<template>
									<div class="support-wrap" v-for="item in memberList" v-key="item.id">
										<div class="member-card" v-if="item.isBasics">
											<div class="member-card-new"
												:style="{'background': `url(${item.imgUrl || 'http://i.hedaoapp.com/image/jpg/2022/6/14/232002e714c16f5af84e9f86a245c3de02902e.jpg'}) no-repeat center`, 'background-size': '100% 100%',}">
												<div class="opacity"></div>
												<div class="box">
													<img class="member-user-img"
														:src="coreInfo.headImg||'http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300'">
													<div class="size-wrap">
														<span class="size-title">{{coreInfo.nickName}}的会员</span>
														<span class="size-txt">创作者ID：{{coreInfo.showId}}</span>
													</div>
													<img class="member-vip-img"
														src="/static/yun/imgs1.6/icon_xcx_21.png">
												</div>
												<div class="flex-betweem">
													<div class="member-line"></div>
													<span>订阅后可获得会员卡</span>
													<!-- <div class="white-num">动态<span>{{coreInfo.trends}}</span>作品<span>{{coreInfo.myBought}}</span></div> -->
												</div>
												<div class="btn-white">会员卡</div>
											</div>
										</div>
										<h3>
											{{item.tilte}}
										</h3>
										<div>
											<div class="flex-center">
												<span
													style="font-size: 28upx;float: left;padding-top: 6upx">￥</span><span
													style="font-size: 56upx;padding-right:28upx;">{{item.price/100}}</span>元/月
												<!-- <span
												style="font-size: 24upx; color: #999999;padding-left: 20upx;display:none;">3次购买</span> -->
											</div>
											<span v-if="item.buys && idolConfig.isShowAssistanceNum"
												style="font-size: 24upx;color: #999999;margin-left: 36upx">{{item.buys
												|| 0}}次购买</span>
										</div>
										<p style="font-size: 30upx;padding-top: 18upx;">
											<rich-text style="word-break: break-all;"
												:nodes="`${replaceBr(item.introduction)}`"></rich-text>
											<!-- {{item.introduction}} -->
										</p>
										<image v-if="item.imgUrl && !item.isBasics" mode="widthFix"
											style="width: 100%;margin-top: 36upx;margin-bottom: 20upx;border-radius: 3px;"
											:src="item.imgUrl" />
										<a href="/yun/confirmAssistance?apId=6" @click="goMemberPay(item)">
											<div class="btn-redlong core-index-txtBlue-btn"
												style="margin: 36upx auto; width: 100%;">
												订阅
											</div>
										</a>
									</div>
									<div v-if="memberHideNumber" class="core-index-gray-btn" id="AllMember"
										@click="showHideMemberLists">{{isHidemember ? `查看全部${memberHideNumber}个会员`
										:'收起'}}</div>
								</template>
							</div>
							<!-- <div class="core-index-box">
								<div class="core-index-title">支持</div>
								<p>自选金额支持</p>
								<a class="core-index-blue-btn" href="/yun/openmember?wid=1">支持</a>
							</div> -->
							<div class="core-index-box" v-if="targetDatas.length">
								<div class="core-index-title">目标</div>
								<div class="core-index-target" v-for="item in targetDatas">
									<div class="core-index-txt-block">
										<span><span
												class="txt-block-blue">{{item.part}}</span>/{{item.complete}}{{item.amount?'元':'人'}}</span>
										<div class="core-index-right-absolute txt-block-blue font-bold">
											<span>{{ item.isExpire ? '已过期' : '' }}</span>
											{{ item.completeTarget ? '已达成' : ''}}
										</div>
									</div>
									<div class="core-index-line10">
										<div class="line10-blue" :style="'width:' + item.part/item.complete + '%'">
										</div>
									</div>
									<div class="core-index-txt-font24">{{item.introduce}}</div>
								</div>
								<!-- <div class="core-index-target">
									<div class="core-index-txt-block">
										<span><span class="txt-block-blue">288.2</span>/500元</span>
										<div class="core-index-right-absolute txt-block-blue font-bold">57.64%</div>
									</div>
									<div class="core-index-line10">
										<div class="line10-blue" style="width: 57.64%;"></div>
									</div>
									<div class="core-index-txt-font24">达成500元，更新新动态</div>
								</div>
								<div class="core-index-target">
									<div class="core-index-txt-block">
										<span><span class="txt-block-blue">288.2</span>/2000元</span>
										<span class="txt-block-gray">
			
											<span>已到期</span>
										</span>
										<div class="core-index-right-absolute txt-block-blue font-bold">14.41%</div>
									</div>
									<div class="core-index-line10">
										<div class="line10-blue" style="width: 14.41%;"></div>
									</div>
									<div class="core-index-txt-font24">达成2000元，，每月加更一个动态</div>
								</div> -->
							</div>
							<div class="core-index-box" id="CoreGoods" v-if="worksLists.length"
								style="padding: 48upx 0px; background-color: rgb(240, 240, 240);">
								<div class="core-index-title" style="padding-left: 36upx;">作品</div>
								<GoodsLists :lists="worksLists" />
								<div class="left-right-padding36">
									<a class="core-index-gray-btn" id="coreMoreGoods" @click="goStoreTab()">查看全部</a>
								</div>
							</div>
							<div class="core-index-box" id="CoreTrends" style="padding: 48upx 0; margin-bottom: 0;"
								v-if="trendLists.length">
								<div class="core-index-title" style="padding-left: 36upx;">动态</div>
								<TrendItem :source-data="trendLists" :isBottom="isNoMoreTrend"
									@onRefash="getTrendLists(true)" />
							</div>
						</div>
						<div class="core-index-container bg-white" v-if="currentItem === 1">
							<TrendItem :source-data="trendLists" :isBottom="isNoMoreTrend"
								@onRefash="getTrendLists(true)" />
						</div>
						<div class="core-index-container" v-if="currentItem === 2">
							<GoodsLists :lists="worksLists" />
						</div>
					</view>
				</scroll-view>
				<view hover-stop-propagation class="cover-view" v-if="isOpenShare">
					<div class="cover-view-content">
						<scroll-view :class="isShareTiktok ? 'tiktok model-wrap' : 'show-share model-wrap'">
							<div class="model-title">
								<span>分享至</span>
								<div @click="closeShare">
									<img class="model-close-btn" src="/static/yun/imgs1.6/icon_xcx_18.png" />
								</div>
							</div>
							<div class="model-content">
								<div class="content-item" @click="shareTiktok">
									<img class="model-douyin-btn" src="/static/yun/icons/icon_xcx_06.png" />
									<span>抖音粉丝</span>
								</div>
								<div class="content-item" @click="copy()">
									<img class="model-link-btn" src="/static/yun/icons/icon_xcx_07.png" />
									<span>复制链接</span>
								</div>
								<div class="content-item" @click="goCode">
									<img class="model-code-btn" src="/static/yun/icons/icon_xcx_08.png" />
									<span>二维码</span>
								</div>
							</div>
							<div class="share-tiktok" v-if="isShareTiktok">
								<div class="share-way-one">
									<p>【方法一】</p>
									<p>1.截屏并保存你的主页二维码，抖音扫一扫二维码发布短视频即可</p>
									<span><img class="way-one-img1" :src="coreInfo.qCodeUrl" /></span>
								</div>
								<div class="share-way-two">
									<p>【方法二】</p>
									<p>1.打开你的小程序主页，点击右上角此处</p>
									<img class="way-two-img1" src="/static/yun/images/icon_xcx_09.jpg" />
									<p>2.选择拍抖音</p>
									<img class="way-two-img2" src="/static/yun/images/icon_xcx_10.jpg" />
									<p>3.此时发布视频时就有了小程序的选项</p>
									<img class="way-two-img3" src="/static/yun/images/icon_xcx_11.jpg" />
									<p>4.发布成功后，小程序将成功挂载在你的短视频上，粉丝可直接点击进入你的小程序主页</p>
									<img class="way-two-img4" src="/static/yun/images/icon_xcx_12.jpg" />
								</div>
							</div>
						</scroll-view>
					</div>
				</view>
			</template>
			<CoreMask :coreInfo="coreInfo" @onConfirm="handleConfirmCreateId()" v-else />
		</template>
		<view v-else>
			创作者主页已关闭
		</view>
	</view>
</template>

<script>
import BaseSpace from '@/components/BaseSpace.vue';
import TrendItem from '@/components/TrendItem.vue';
import GoodsLists from '@/components/GoodsLists.vue';
import CoreMask from '@/components/CoreMask.vue';
// TODO: 会员列表
import MemberList from './memberListCode.js'
// TODO: 用户主页信息
import CoreInfoMock from './coreMock.js'
// TODO: 动态页信息
import TrendMock from './trendMock.js'
import Request from '@/common/require.js';
import API from '@/common/api.js';
export default {
	components: {
		TrendItem,
		BaseSpace,
		GoodsLists,
		CoreMask,
	},
	data() {
		return {
			// tabList: [{label: '主页', check: true},{label: '动态', check: false },{label: '商店', check: false }],
			tabLists: [],
			list: [
				'http://i.hedaoapp.com/Trends/2022/6/16/221430e6b528d508ed41859ba34ed066b8a16b.jpg',
				'http://i.hedaoapp.com/image/jpg/2021/9/13/021757f47c8b7ae7d842d2ab802b70d50a1e54.jpg',
				'http://i.hedaoapp.com/image/jpg/2021/9/15/18134249e71095f0fd447e9e11fe1230910036.jpg',
			],
			heartCount: '点赞',
			heartIcon: 2,
			currentItem: 0,
			memberAllList: [],
			memberList: [], // 显示
			memberHideList: [], //隐藏
			memberHideNumber: 0,
			isHidemember: true,
			coreInfo: {}, // 用户主页信息
			trendInfo: TrendMock.data.items, // 动态页信息
			trendLists: [],
			creatorId: null, // 创造者ID
			userId: null, // 用户ID
			pageProps: {
				pageIndex: 1,
				pageSize: 6,
			},
			isNoMoreTrend: false, // 动态列表是否到底了
			isNoMoreGoods: false, // 商品列表是否到底了
			worksLists: [],
			isOpenShare: false,
			isShareTiktok: false,
			targetDatas: [], // 目标
			aboutTip: '', // 关于
			isIdolIdVisit: false, //是否偶像ID访问
			idolConfig: {}, // 创作者配置
			isIntroductionHide: false,
			memberBasics: '', // 会员封面
			fansTeamHeadImgs: [], // 粉丝团头像
			isLogin: false,
		}
	},
	onLoad(option) {
		if (option.tabNum) {
			this.changeTab(+option.tabNum || 0)
		}
		if (option.userId) {
			this.userId = option.userId;
		} else {
			// 用户自己的主页
			this.userId = uni.getStorageSync('userInfo')?.userId;
		}
		this.getCreateInfo();
		this.isLogin = uni.getStorageSync('token');
		// this.getMemberLists();
	},
	mounted() {
		// setTimeout(() =>{
		// 	const query = uni.createSelectorQuery().in(this);
		// 		query.select('#us-remask').boundingClientRect(data => {
		// 		console.log("得到布局位置信息" + JSON.stringify(data));
		// 		console.log("节点离页面顶部的距离为" + data.height);
		// 		}).exec();
		// }, 3000)

	},
	methods: {
		navigateTo(url) {
			uni.navigateTo({
				url
			})
		},
		changeTab(index) {
			if (!this.tabLists.length) return;
			this.tabLists.map((item) => item.check = false);
			this.tabLists[index].check = true;
			this.currentItem = this.tabLists[index].index;
			this.pageProps.pageIndex = 1;
		},
		handleMemberLists() {
			// 显示3个
			if (this.memberAllList.length > 3) {
				this.memberList = this.memberAllList.slice(0, 3);
				this.memberHideList = this.memberAllList.slice(3);
				this.memberHideNumber = this.memberHideList.length;
			} else {
				this.memberList = [...this.memberAllList];
			}
			this.memberBasics = (this.memberAllList.find(v => v.isBasics) || {}).imgUrl;

		},
		showHideMemberLists() {
			this.isHidemember = !this.isHidemember;
			if (this.isHidemember) {
				this.memberList = this.memberAllList.slice(0, 3);
			} else {
				this.memberList = [...this.memberList, ...this.memberHideList];
			}
		},
		// 跳转商品tab
		goStoreTab() {
			this.changeTab(2);
			this.pageProps = this.$options.data().pageProps;
			console.log(this.$options.data().pageProps)
			this.getCoreWorksLists();
		},
		// 获取商品信息
		getCoreWorksLists() {
			let params = {
				creatorId: this.creatorId,
				...this.pageProps,
			}
			Request.get(API.works.coreWorksPage, params, ({ statusCode, errors, data }) => {
				if (statusCode != 200) {
					uni.showToast({
						title: errors,
						icon: 'none',
						duration: 3000,
					})
					return;
				}
				if (data?.items) {
					if (data.items.length === 0) {
						this.isNoMoreGoods = true;
						return;
					}
					this.worksLists = [...this.worksLists, ...data.items];
					this.getTabList({ label: '作品', check: false, index: 2 });
				}
				console.log('worksLists', this.worksLists)
			})
		},
		// 获取创作者主页信息
		getCreateInfo() {
			if (!this.userId) {
				uni.showToast({
					title: '未获取用户id',
					icon: 'none'
				})
				return;
			}

			// 接口请求
			Request.get(API.user.creatorHome + this.userId, null, ({ statusCode, data }) => {
				if (statusCode != 200) return;
				this.targetHandle(data.creatorTargetDatas);
				this.aboutTip = data.toppingAbout;
				this.memberAllList = data.memberPlanDatas;
				this.handleMemberLists()
				if (this.aboutTip || this.memberAllList.length || this.targetDatas.length) {
					this.getTabList({ label: '主页', check: true, index: 0 })
				}
			})
			Request.get(API.user.creatorInfo + this.userId, null, ({ statusCode, data }) => {
				if (statusCode != 200) return;
				this.coreInfo = data;
				this.fansTeamHeadImgs = (data.fansTeamHeadImgs || []).reverse();
				this.creatorId = data.creatorId;
				this.getIdolConfig();
				this.pageProps = this.$options.data().pageProps;
				uni.setStorageSync('isAppletJumpWeb', data.isAppletJumpWeb);
				new Promise((resolve, reject) => {
					this.getTrendLists(false, resolve);
				}).then(() => {
					this.getCoreWorksLists();
				})
				this.getIntroductionHeight();
			})
		},
		getIntroductionHeight() {
			if (this.coreInfo.creatorState == -2) return;
			setTimeout(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('#us-introduction').boundingClientRect(data => {
					console.log("节点高度" + data.height);
					this.isIntroductionHide = data.height > 22;
				}).exec();
			})
		},
		// 处理目标数据
		targetHandle(data) {
			this.targetDatas = data.filter(v => v.isShow).map(v => {
				return {
					...v,
					// 完成部分
					part: (v.amount / 100) || v.num,
					complete: (v.completeAmount / 100) || v.completeNum,
				}
			})
		},
		// 获取创作者配置
		getIdolConfig() {
			Request.get(API.user.idolConfig + this.creatorId, null, ({ statusCode, data }) => {
				if (statusCode != 200) return;
				this.idolConfig = data;
				this.isIdolIdVisit = data.isIdolIdVisit;
			})
		},
		// 获取会员列表
		// getMemberLists () {
		// 	Request.get(API.member.memberList, null, ({data}) => {
		// 		this.memberAllList = data;
		// 		this.handleMemberLists()
		// 	})
		// },
		// 获取动态信息
		getTrendLists(isRefash, fn) {
			isRefash && (this.trendLists.length = 0);
			let params = {
				type: 0, // 动态页
				createId: this.creatorId,
				...this.pageProps,
			}
			Request.get(API.works.trendsPage, params, ({ statusCode, errors, data }) => {
				if (fn) {
					fn();
				}
				if (statusCode != 200) {
					uni.showToast({
						title: errors,
						icon: 'none',
						duration: 3000,
					})
					return;
				}
				if (data?.items) {
					if (data.items.length === 0) {
						this.isNoMoreTrend = true;
						return;
					}
					this.trendLists = [...this.trendLists, ...data.items];
					this.getTabList({ label: '动态', check: false, index: 1 });
				}
				console.log(this.trendLists)
			})
		},
		goMemberPay(item) {
			console.log(item, 'item')
			uni.navigateTo({
				url: `../../pages/member-payment/index?id=${item.id}&userId=${this.userId}`
			})
		},
		goIndex() {
			uni.switchTab({
				url: `../../pages/index/index`
			})
		},
		goCode() {
			uni.navigateTo({
				url: `../../pages/code-show/index?id=${this.userId}`
			})
		},
		/**
		 * 关注创作者
		 */
		focusHandle(createId) {
			if (!this.isLogin) {
				uni.showToast({
					title: '请先登录账号',
					icon: 'none',
					duration: 3000,
				});
				return;
			}
			Request.post(API.user.focus, { createId }, ({ data, statusCode, errors }) => {
				if (statusCode == 200) {
					uni.showToast({
						title: data.state ? '取消关注' : '关注成功',
						duration: 3000,
					});
					setTimeout(() => {
						this.getCreateInfo();
					}, 2000);
				} else {
					uni.showToast({
						title: errors,
						icon: 'none',
						duration: 3000,
					})
				}
			})
		},
		/** 分享 */
		openShare() {
			this.isOpenShare = true;
		},
		shareTiktok() {
			this.isShareTiktok = !this.isShareTiktok;
		},
		closeShare() {
			this.isOpenShare = false;
		},
		copy() {
			uni.setClipboardData({
				data: this.coreInfo.creatorCoreLink,
				showToast: false,
				success: function () {
					uni.showToast({
						title: '已复制主页链接',
						duration: 3000,
					})
					console.log('success');
				}
			});
		},
		handleConfirmCreateId(bool) {
			console.log("🚀 ~ file: index.vue ~ line 468 ~ handleConfirmCreateId ~ bool", bool)
			if (!bool) {
				uni.showToast({
					title: 'id错误，请重新输入',
					icon: 'none',
					duration: 3000,
				})
				return
			}
			this.isIdolIdVisit = !bool;
			console.log("🚀 ~ file: index.vue ~ line 566 ~ handleConfirmCreateId ~ his.isIdolIdVisit", this.isIdolIdVisit)
		},
		showRank() {
			uni.showToast({
				title: '粉丝团成员暂不展示',
				icon: 'none',
				duration: 3000,
			})
		},
		scrollBottom() {
			this.pageProps.pageIndex += 1
			console.log(this.currentItem);
			if (this.currentItem == 2) {
				if (this.isNoMoreGoods) return;
				this.getCoreWorksLists();
			} else {
				this.getTrendLists();
			}
		},
		introductionShow() {
			this.isIntroductionHide = false;
		},
		replaceBr(str) {
			return str.replace(/<\/br>/g, '<br>')
		},
		getTabList(data) {
			if (this.tabLists.find(v => data.label === v.label)) return;
			this.tabLists.push(data);
			this.changeTab(0);
		}
	}
}
</script>

<style>
@import url("./index.css");
</style>
