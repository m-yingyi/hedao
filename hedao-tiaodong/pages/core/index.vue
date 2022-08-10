<template>
	<view class="content">
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
				<div class="user" style="margin-top: 0;">{{coreInfo.nickName}}</div>
				<div class="userFlag"><img src="/static/yun/idolIcon/png_rz.png"><span>{{coreInfo.recomIntor}}</span></div>
				<div class="new-user">
					<div class="user-age">
						<img :src="`/static/yun/imgs/icon_age${coreInfo.gender}.png`"
							style="width:16upx;height: 16upx;margin-right: 6upx">{{coreInfo.age}}岁
					</div>
					<a id="btn_wb">
						<img src="/static/yun/imgs/png_weibo.png"
							style="width:23upx;height: 18upx;margin-right: 6upx">微博
					</a>
				</div>
			</div>
			<div class="user-info">
				<div class="us-txt" id="us-remark" style="color: #333333"><span>{{coreInfo.introduction}}</span><span></span></div>
			</div>
		</figure>
		<div class="member-link">
			<div v-if="!coreInfo.isFocus" style="flex: 1;" class="FollowIdol" data-isfollow="0" data-href="/yun/openmember?wid=1">
				关注
			</div>
			<template v-else>
				<div style="flex: 1;" class="FollowIdol" data-isfollow="0" data-href="/yun/openmember?wid=1">
					会员
				</div>
				<div style="width: 78upx;margin-left: 20upx;" class="btn-pop-bottom">
					<img src="/static/yun/imgs1.5/png_1.5_33.png" style="width: 16upx;height: 11upx;">
				</div>
			</template>
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
			<div class="core-index-box">
				<div class="core-index-title">关于</div>
				<p id="core-index-desc"><span>这是关于盒岛的说明<br><br>客服QQ827491999,有事欢迎咨询！</span><span></span></p>
			</div>
			<div class="core-index-box" style="padding-bottom: 12upx;">
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
					<a href="/yun/confirmAssistance?apId=6">
						<div class="btn-redlong core-index-txtBlue-btn" style="margin: 36upx auto; width: 100%;">
							开通
						</div>
					</a>
				</div>
				<div v-if="memberHideNumber" class="core-index-gray-btn" id="AllMember" @click="this.showHideMemberLists">{{isHidemember ? `查看全部${memberHideNumber}个会员` :'隐藏'}}</div>
			</div>
			<div class="core-index-box">
				<div class="core-index-title">支持</div>
				<p>自选金额支持</p>
				<a class="core-index-blue-btn" href="/yun/openmember?wid=1">支持</a>
			</div>
			<div class="core-index-box">
				<div class="core-index-title">目标</div>
				<div class="core-index-target">
					<div class="core-index-txt-block">
						<span><span class="txt-block-blue">8</span>/5人</span>
						<div class="core-index-right-absolute txt-block-blue font-bold">已达成</div>
					</div>
					<div class="core-index-line10">
						<div class="line10-blue" style="width: 100%;"></div>
					</div>
					<div class="core-index-txt-font24">5个人购买</div>
				</div>
				<div class="core-index-target">
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
				</div>
			</div>
			<div class="core-index-box" id="CoreGoods"
				style="padding: 48upx 0px; background-color: rgb(240, 240, 240);">
				<div class="core-index-title" style="padding-left: 36upx;">商店</div>
				<div class="list">
					<ul id="CoreGoodsContent">
						<li> <a style="" href="/yun/photolist?pid=3101" data-isopen="1"> <img
									src="http://i.hedaoapp.com/image/jpg/2022/6/1/143634b34fbe426123404c971a309b6781091f.jpg?x-oss-process=image/resize,l_540"
									alt="作品封面"> </a>
							<div>
								<div class="l-txt">
									<h1>1</h1><span>1</span>
								</div>
							</div>
						</li>
						<li> <a style="height: 360upx;" href="/goods/goodsDetails?pid=2878">
								<div
									style="background: url(http://i.hedaoapp.com/image/jpg/2022/5/7/100528f3516e228c694eefaaa33304c93f67a7.jpg) center no-repeat;display:block;width:100%;height:100%;background-size: cover;">
								</div>
							</a>
							<div>
								<div class="l-txt" style="height: 120upx; width: 100%">
									<div class="line-two-title">你们的</div>
									<div class="orange-txt"><span style="font-size: 24upx">￥</span>1<span
											class="grag-txt-sale"></span></div>
								</div>
							</div>
						</li>
					</ul>
					<ul id="CoreGoodsContent2">
						<li> <a style="height: 360upx;" href="/goods/goodsDetails?pid=2882">
								<div
									style="background: url(http://i.hedaoapp.com/image/jpg/2022/5/7/1730461a11c985b6034a80bd400a7b22c7272e.jpg) center no-repeat;display:block;width:100%;height:100%;background-size: cover;">
								</div>
							</a>
							<div>
								<div class="l-txt" style="height: 120upx; width: 100%">
									<div class="line-two-title">测试发货</div>
									<div class="orange-txt"><span style="font-size: 24upx">￥</span>1<span
											class="grag-txt-sale"></span></div>
								</div>
							</div>
						</li>
						<li> <a style="height: 360upx;" href="/mysteryBox/mysteryBox?pid=2630">
								<div
									style="background-image: url(http://i.hedaoapp.com/image/jpg/2022/3/24/180038e37e48f8253547519885b264b5eff269.jpg);display:block;width:100%;height:508upx;background-size: 100%;">
								</div>
							</a>
							<div>
								<div class="l-txt" style="height: 120upx">
									<h1>测试2</h1><span>3款扭蛋&nbsp;&nbsp;</span>
									<div class="orange-txt orange-icon">10</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="left-right-padding36">
					<a class="core-index-gray-btn" id="coreMoreGoods" @click="goStoreTab()">查看全部</a>
				</div>
			</div>
			<div class="core-index-box" id="CoreTrends" style="padding: 48upx 0; margin-bottom: 0;">
				<div class="core-index-title" style="padding-left: 36upx;">动态</div>
				<TrendItem :source-data="list" :heart-count="heartCount" :heart-icon="heartIcon" />
			</div>
		</div>
		<div class="core-index-container bg-white" v-if="currentItem === 1">
			<template v-for="item in trendInfo">
				<TrendItem :trend="item" />
			</template>
		</div>
		<div class="core-index-container bg-white" v-if="currentItem === 2">
			<GoodsLists />
		</div>
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
				createId: null, // 创造者ID
			}
		},
		onLoad(option) {
            console.log("🚀 ~ file: index.vue ~ line 269 ~ onLoad ~ option", option)
			if(option.createId) {
				this.createId = option.createId;
			} else {
				// 用户自己的主页
				this.createId = uni.getStorageSync('userInfo')?.userId;
			}
			this.getCreateInfo();
			this.getMemberLists();
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
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
			},
			// 获取创作者主页信息
			getCreateInfo() {
				if(!this.createId) {
					uni.showToast({
						title: '未获取createId',
						icon: 'none'
					})
					return;
				}
				// 接口请求
				Request.get(API.user.creatorInfo, null, ({data}) => {
					this.coreInfo = data;
				})
			},
			// 获取会员列表
			getMemberLists () {
				Request.get(API.member.memberList, null, ({data}) => {
					this.memberAllList = data;
					this.handleMemberLists()
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
