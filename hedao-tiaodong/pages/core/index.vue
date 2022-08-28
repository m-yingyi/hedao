<template>
	<view hover-stop-propagation class="contain">
		<view hover-stop-propagation :class="isOpenShare ? 'content-hide' : 'content'">
			<div class="flex align-center justify-between share-wrap">
				<div class="goBack-btn" @click="goIndex"><img src="/static/yun/imgs/icon_yun_20.png" /></div>
				<div class="share-btn" @click="openShare"><img src="/static/yun/idolIcon/png_app_01.png" /></div>
			</div>
			<figure style="margin-top: auto;padding: 0 88upx;margin-bottom: 0;">
				<div class="photoBox" style="flex-direction: column;justify-content: center;margin-right: auto;">
					<div class="img-box-border">
						<img id="IdolHeadImg" data-href="/yun/myHead?wid=1" style="cursor:pointer;"
							:src="coreInfo.headImg">
					</div>
				</div>
				<div class="flex align-center justify-between top-icon-btn"><image src="/static/yun/idolIcon/icon_age.png"/>
					<!-- <image src="/static/yun/idolIcon/png_rz.png"/> -->
				</div>
				<div class="user-age-box">
					<div class="user" style="margin-top: 0;">{{coreInfo.nickName || 'xxx'}}</div>
					<div class="userFlag"><img src="/static/yun/idolIcon/png_rz.png"><span>{{coreInfo.recomIntor}}</span></div>
				</div>
				<div class="user-info">
					<div class="us-txt" id="us-remark" style="color: #333333"><span>{{coreInfo.introduction || ''}}</span><span></span></div>
				</div>
			</figure>
			<div class="member-link">
				<div style="flex: 1;" class="FollowIdol" data-isfollow="0" data-href="/yun/openmember?wid=1" @click="focusHandle(coreInfo.creatorId)">
					<span v-if="!coreInfo.isFocus">关注</span>
					<span v-else>已关注</span>
				</div>
			</div>
			<div class="photoBox contentUserWrap"
				style="border-top: 0;border-bottom: 1upx solid #f0f0f0;margin-top: 10upx;margin-bottom:0;">
				<div class="leftImg">
					<img
						src="http://i.hedaoapp.com/image/jpg/2022/4/3/224525b5921b8371564b409814e046c0b6822a.jpg?x-oss-process=image/resize,l_300">
					<img
						src="http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300">
					<img
						src="http://i.hedaoapp.com/image/jpg/2022/3/24/1805235360aa12a52849fe9d72bde4bd0d8108.jpg?x-oss-process=image/resize,l_300">
					<span>{{coreInfo.fans}}人加入粉丝团</span>
				</div>
				<a class="contentShareWrap" href="/yun/fansTeam?wid=1" style="color: #999">
					<span style="margin-left: 26upx;">查看排名</span>
					<img src="/static/yun/imgs1.5/png_1.5_34.png">
				</a>
			</div>
			<div class="menu" style="padding-top: 20upx;">
				<div @click="changeTab(index)" v-for="(item, index) in tabList">
					<div class="menu-li blackTxt">
						{{item.label}}<p :class="item.check ? 'redLine':''"></p>
					</div>
				</div>
			</div>
			<div class="core-index-container" v-if="currentItem === 0">
				<div class="core-index-box" v-if="aboutTip">
					<div class="core-index-title">关于</div>
					<p id="core-index-desc"><pre>{{aboutTip}}</pre></p>
				</div>
				<div class="core-index-box" v-if="memberList.length" style="padding-bottom: 12upx;">
					<div class="core-index-title">会员</div>
	
					<div class="member-card">
						<div class="member-card-new"
							style="background: url(http://i.hedaoapp.com/image/jpg/2022/6/14/232002e714c16f5af84e9f86a245c3de02902e.jpg) no-repeat center;background-size: 100% 100%;">
							<div class="opacity"></div>
							<div class="box">
								<img class="member-user-img"
									src="http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300">
								<div class="size-wrap">
									<span class="size-title">{{coreInfo.nickName}}的会员</span>
									<span class="size-txt">创作者ID：{{coreInfo.showId}}</span>
								</div>
								<img class="member-vip-img" src="/Content/yun/idolMember/png_app1.4_02.png">
							</div>
							<div class="flex-betweem">
								<div class="member-line"></div>
								<span>会员可解锁</span>
								<div class="white-num">动态<span>{{coreInfo.trends}}</span>作品<span>{{coreInfo.myBought}}</span></div>
							</div>
							<div class="btn-white">蓝钻会员</div>
						</div>
					</div>
					<div class="support-wrap" v-for="item in memberList" v-key="item.id">
						<h3>
							{{item.tilte}}
						</h3>
						<div>
							<span style="font-size: 28upx;float: left;padding-top: 6upx">￥</span><span
								style="font-size: 56upx;padding-right:28upx;">{{item.price/100}}</span>元/月<span
								style="font-size: 24upx; color: #999999;padding-left: 20upx;display:none;">3次购买</span>
						</div>
						<p style="font-size: 30upx;padding-top: 18upx;">{{item.introduction}}</p>
						<a href="/yun/confirmAssistance?apId=6" @click="navigateTo(`../../pages/member-payment/index?id=${item.id}`)">
							<div class="btn-redlong core-index-txtBlue-btn" style="margin: 36upx auto; width: 100%;">
								开通
							</div>
						</a>
					</div>
					<div v-if="memberHideNumber" class="core-index-gray-btn" id="AllMember" @click="showHideMemberLists">{{isHidemember ? `查看全部${memberHideNumber}个会员` :'隐藏'}}</div>
				</div>
				<div class="core-index-box">
					<div class="core-index-title">支持</div>
					<p>自选金额支持</p>
					<a class="core-index-blue-btn" href="/yun/openmember?wid=1">支持</a>
				</div>
				<div class="core-index-box">
					<div class="core-index-title">目标</div>
					<div class="core-index-target" v-for="item in targetDatas">
						<div class="core-index-txt-block">
							<span><span class="txt-block-blue">{{item.part}}</span>/{{item.complete}}{{item.amount?'元':'人'}}</span>
							<div class="core-index-right-absolute txt-block-blue font-bold">{{item.completeTarget ? '已达成' : ''}}</div>
						</div>
						<div class="core-index-line10">
							<div class="line10-blue" :style="'width:' + item.part/item.complete + '%'"></div>
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
				<div class="core-index-box" id="CoreGoods"
					style="padding: 48upx 0px; background-color: rgb(240, 240, 240);">
					<div class="core-index-title" style="padding-left: 36upx;">商店</div>
					<GoodsLists :lists="worksLists" />
					<div class="left-right-padding36">
						<a class="core-index-gray-btn" id="coreMoreGoods" @click="goStoreTab()">查看全部</a>
					</div>
				</div>
				<div class="core-index-box" id="CoreTrends" style="padding: 48upx 0; margin-bottom: 0;">
					<div class="core-index-title" style="padding-left: 36upx;">动态</div>
					<TrendItem :source-data="trendLists" :isNeedCore="true" :isBottom="isNoMoreTrend" @onRefash="getTrendLists(true)"/>
				</div>
				<div class="core-index-box" id="CoreGoods"
					style="padding: 48upx 0px; background-color: rgb(240, 240, 240);">
					<div class="core-index-title" style="padding-left: 36upx;">商店</div>
					<GoodsLists :lists="worksLists" />
					<div class="left-right-padding36">
						<a class="core-index-gray-btn" id="coreMoreGoods" @click="goStoreTab()">查看全部</a>
					</div>
				</div>
				<div class="core-index-box" id="CoreTrends" style="padding: 48upx 0; margin-bottom: 0;">
					<div class="core-index-title" style="padding-left: 36upx;">动态</div>
					<TrendItem :source-data="trendLists" :isNeedCore="true" :isBottom="isNoMoreTrend" @onRefash="getTrendLists(true)"/>
				</div>
			</div>
			<div class="core-index-container bg-white" v-if="currentItem === 1">
				<TrendItem :source-data="trendLists" :isNeedCore="true" :isBottom="isNoMoreTrend" @onRefash="getTrendLists(true)"/>
			</div>
			<div class="core-index-container bg-white" v-if="currentItem === 2">
				<GoodsLists :lists="worksLists" />
			</div>
		</view>
		<view hover-stop-propagation class="cover-view" v-if="isOpenShare">
			<div class="cover-view-content">
				<scroll-view :class="isShareTiktok ? 'tiktok model-wrap' : 'show-share model-wrap'">
					<div class="model-title">
						<span>分享至</span>
						<img class="model-close-btn" src="/static/yun/imgs1/png_yun_602.png" @click="closeShare"/>
					</div>
					<div class="model-content">
						<div class="content-item" @click="shareTiktok">
							<img class="model-douyin-btn" src="/static/yun/icons/icon_xcx_06.png"/>
							<span>抖音粉丝</span>
						</div>
						<div class="content-item">
							<img class="model-link-btn" src="/static/yun/icons/icon_xcx_07.png"/>
							<span>复制链接</span>
						</div>
						<div class="content-item">
							<img class="model-code-btn" src="/static/yun/icons/icon_xcx_08.png"/>
							<span>二维码</span>
						</div>
					</div>
					<div class="share-tiktok" v-if="isShareTiktok">
						<div class="share-way-one">
							<p>【方法一】</p>
							<p>1.截屏并保存你的主页二维码，抖音扫一扫二维码发布短视频即可</p>
							<span><img class="way-one-img1" :src="coreInfo.qCodeUrl"/></span>
						</div>
						<div class="share-way-two">
							<p>【方法二】</p>
							<p>1.打开你的小程序主页，点击右上角此处</p>
							<img class="way-two-img1" src="/static/yun/images/icon_xcx_09.jpg"/>
							<p>2.选择拍抖音</p>
							<img class="way-two-img2" src="/static/yun/images/icon_xcx_10.jpg"/>
							<p>3.此时发布视频时就有了小程序的选项</p>
							<img class="way-two-img3" src="/static/yun/images/icon_xcx_11.jpg"/>
							<p>4.发布成功后，小程序将成功挂载在你的短视频上，粉丝可直接点击进入你的小程序主页</p>
							<img class="way-two-img4" src="/static/yun/images/icon_xcx_12.jpg"/>
						</div>
					</div>
				</scroll-view>
			</div>
		</view>
	</view>
</template>

<script>
import BaseSpace from '@/components/BaseSpace.vue';
import TrendItem from '@/components/TrendItem.vue';
import GoodsLists from '@/components/GoodsLists.vue';
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
		},
		data() {
			return {
				tabList: [{label: '主页', check: true},{label: '动态', check: false },{label: '商店', check: false }],
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
				coreInfo: [], // 用户主页信息
				trendInfo: TrendMock.data.items, // 动态页信息
				trendLists: [],
				creatorId: null, // 创造者ID
				userId: null, // 用户ID
				pageProps: {
					pageIndex: 1,
					pageSize: 6,
				},
				isNoMoreTrend: false, // 动态列表是否到底了
				worksLists: [],
				isOpenShare: false,
				isShareTiktok: false,
				targetDatas: [], // 目标
				aboutTip: '', // 关于
			}
		},
		onLoad(option) {
            console.log("🚀 ~ file: index.vue ~ line 269 ~ onLoad ~ option", option)
			if(option.userId) {
				this.userId = option.userId;
			} else {
				// 用户自己的主页
				this.userId = uni.getStorageSync('userInfo')?.userId;
			}
			this.getCreateInfo();
			// this.getMemberLists();
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			changeTab(index) {
				this.tabList.map((item) => item.check = false)
				this.tabList[index].check = true
				this.currentItem = index
			},
			handleMemberLists () {
				// 显示3个
				if (this.memberAllList.length > 3) {
					this.memberList = this.memberAllList.slice(0,3);
					this.memberHideList = this.memberAllList.slice(3);
					this.memberHideNumber = this.memberHideList.length;
				}
			},
			showHideMemberLists () {
				this.isHidemember =!this.isHidemember;
				if (this.isHidemember) {
					this.memberList = this.memberAllList.slice(0,3);
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
			getCoreWorksLists () {
				let params = {
					creatorId: this.creatorId,
					...this.pageProps,
				}
				Request.get(API.works.coreWorksPage, params, ({statusCode, errors, data}) => {
					if(statusCode != 200) {
						uni.showToast({
							title: errors,
							icon: 'none',
							duration: 3000,
						})
						return;
					}
					if(data?.items) {
						if(data.items.length === 0) {
							// this.isNoMoreTrend = true;
							return;
						}
						this.worksLists = [...this.worksLists, ...data.items];
					}
					console.log('worksLists',this.worksLists)
				})
			},
			// 获取创作者主页信息
			getCreateInfo() {
				if(!this.userId) {
					uni.showToast({
						title: '未获取用户id',
						icon: 'none'
					})
					return;
				}
				// 接口请求
				Request.get(API.user.creatorHome + this.userId, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.targetHandle(data.creatorTargetDatas);
					this.aboutTip = data.toppingAbout;
					this.memberAllList = data.memberPlanDatas;
					this.handleMemberLists()
				})
				Request.get(API.user.creatorInfo + this.userId, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.coreInfo = data;
					this.creatorId = data.creatorId;
					this.getIdolConfig();
					this.pageProps = this.$options.data().pageProps;
					this.getTrendLists();
					this.getCoreWorksLists();
				})
			},
			// 处理目标数据
			targetHandle(data) {
				this.targetDatas = data.filter(v => v.isShow).map(v => {
					return {
						...v,
						// 完成部分
						part: v.amount || v.num,
						complete: v.completeAmount || v.completeNum,
					}
				})
			},
			// 获取创作者配置
			getIdolConfig() {
				Request.get(API.user.idolconfig + this.creatorId, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
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
			getTrendLists(isRefash) {
				isRefash && (this.trendLists.length = 0);
				let params = {
					type: 0, // 动态页
					createId: this.creatorId,
					...this.pageProps,
				}
				Request.get(API.works.trendsPage, params, ({statusCode, errors, data}) => {
					if(statusCode != 200) {
						uni.showToast({
							title: errors,
							icon: 'none',
							duration: 3000,
						})
						return;
					}
					if(data?.items) {
						if(data.items.length === 0) {
							this.isNoMoreTrend = true;
							return;
						}
						this.trendLists = [...this.trendLists, ...data.items];
					}
					console.log(this.trendLists)
				})
			},
			goMemberPay(id) {
				uni.navigateTo({
					url: `../../pages/member-payment/index?id=${id}`
				})
			},
			goIndex() {
				uni.switchTab({
					url: `../../pages/index/index`
				})
			},
			/**
			 * 关注创作者
			 */
			focusHandle(createId) {
				Request.post(API.user.focus, {createId}, ({data, statusCode, errors}) => {
					if (statusCode == 200) {
						uni.showToast({
							title: data.state ? '取消关注' :'关注成功',
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
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
