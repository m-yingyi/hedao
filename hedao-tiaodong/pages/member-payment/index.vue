<template>
	<view class="content">
		<div class="support-wrap">
            <h3 style="font-size: 26upx;color: #999999;padding: 28upx 0 20upx 0;">{{planInfo.tilte}}</h3>
            
            <div style="font-size: 26upx;"><span style="font-size: 28upx;float: left;padding-top: 6upx">￥</span><span style="font-size: 60upx;padding-right:22upx;">{{(planInfo.price/100).toFixed(2)}}</span>元/月
				<span v-if="planInfo.buys && idolConfig.isShowAssistanceNum" style="font-size: 24upx;color: #999999;margin-left: 36upx">{{planInfo.buys || 0}}次购买</span>
			</div>
            <p style="font-size: 30upx;padding: 18upx 0 32upx 0;">
				<!-- {{planInfo.introduction}} -->
				<rich-text :nodes="`<div>${replaceBr(planInfo.introduction)}</div>`"></rich-text>
			</p>
            <!-- <img style="max-width: 550upx;max-height: 550upx;margin-bottom: 20upx;border-radius: 3px;" src="http://i.hedaoapp.com/image/jpg/2022/6/14/232027416716a841c0445e938eb75d153ad4d7.jpg"> -->
            <image v-if="planInfo.imgUrl && !planInfo.isBasics" mode="widthFix" style="width: 100%;margin-bottom: 20upx;border-radius: 3px;" :src="planInfo.imgUrl"/>
        </div>
		<div class="member-card" style="padding: 36upx;border-top: 1px solid #f0f0f0;">
            <div style="padding: 0 0 36upx 0;color:black;font-weight: bold;font-size: 32upx;line-height: 32upx;">获得会员卡和特权</div>
            <div class="member-card-new" :style="{'background': `url(${option.memberImg}) no-repeat center`, 'background-size': '100% 100%',}">
                <div class="opacity"></div>
                <div class="box">
					<img class="member-user-img" :src="option.headImg">
                    <div class="size-wrap">
						<span class="size-title">{{option.nickName || planInfo.userName}}的会员</span>
                        <span class="size-txt">创作者ID：{{planInfo.createdId}}</span>
                    </div>
                    <img class="member-vip-img" src="/static/yun/imgs1.6/icon_xcx_21.png">
					<!-- <image class="member-vip-img" v-if="planInfo.imgUrl" mode="widthFix" :src="planInfo.imgUrl"/> -->
                </div>
                <div class="flex-betweem">
                    <div class="member-line"></div>
                    <span>订阅后可获得会员卡</span>
                    <!-- <div class="white-num">动态<span>{{planInfo.trends}}</span>作品<span>{{planInfo.works}}</span></div> -->
                </div>
                <div class="btn-white">会员卡</div>
            </div>
        </div>
		<div class="spend-content" style="margin-top: 10upx;"
		 v-if="planInfo.trendsCount || planInfo.photoCount || planInfo.audioCount || planInfo.drawCount">
			<h2 style="font-size: 32upx; line-height: 32upx;font-weight:bold;padding-bottom: 20upx;">此会员包含付费内容</h2>
			<div class="spend-items">
				<span v-if="planInfo.trendsCount">动态 {{planInfo.trendsCount}}</span>
				<span v-if="planInfo.photoCount">写真 {{planInfo.photoCount}}</span>
				<!-- <span v-if="creatorHome.goodsCount">商品 {{creatorHome.goodsCount}}</span> -->
				<span v-if="planInfo.audioCount">音频 {{planInfo.audioCount}}</span>
				<span v-if="planInfo.drawCount">画集 {{planInfo.drawCount}}</span>
			</div>
		</div>
		<div class="support-way" style="margin-top: 20upx;">
			<h2 style="font-size: 32upx; line-height: 32upx;font-weight:bold;padding-bottom: 20upx;">选择会员期限</h2>
			<ul class="way-box longTime">
				<li v-for="(item, index) in memberTimeList" @click="handleCheckTime(index)" :key="index">
						<p><image src="/static/yun/imgs/png_201_2.png" mode="widthFix"/>{{item.label}}<span v-if="item.discount">{{item.discount}}</span></p>
						<image :src="item.check ? '/static/yun/imgs/icon_yun_938.png' : '/static/yun/imgs/icon_yun_938_2.png'"/>
				</li>
			</ul>
		</div>
		<div class="support-tip">
			<img class="support-img" src="/static/yun/imgs1.6/icon_xcx_23.png" />
			订阅内容为购买性质，非网络打赏，订阅后无法进行退款
		</div>
		<div style="height: 88upx;width: 100%;">
		</div>
		<div class="support-footer-wrap">
			<div class="support-price">
				<span>共计</span>
				<span style="line-height: 72upx; padding: 0 6upx 0 28upx;font-weight: bold;">￥</span>
				<span id="PricePay" style="font-size: 48upx;font-weight: bold;">{{planPrice / 100}}</span>
				<span v-if="planPriceOriginal !== planPrice" id="PriceOriginal" style="color: #cccccc; padding-left: 40upx;line-height: 106upx; text-decoration: line-through;">¥{{(planPriceOriginal / 100).toFixed(2)}}</span>
			</div>
			<div class="support-btn" @click="createOrder">订阅</div>
		</div>
	</view>
</template>

<script>
import BaseSpace from '@/components/BaseSpace.vue';
import Require from '@/common/require.js';
import API from '@/common/api.js';
	export default {
		components: {
			BaseSpace,
		},
		data() {
			return {
				option: {
					id: '',
					userId: '',
					memberImg: 'http://hedaoapp.com/Content/yun/idolMember/png_app1.4_01.jpg',
					headImg: 'http//i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300',
					nickName: '',
					IdLetter: 0,
					showId: 0,
				}, // 存储外部传进来的数据
				memberTimeList: [
					{label: '一个月', check: true, times: 1, rate: 1},
					{label: '三个月', check: false, times: 3, rate: 1},
					{label: '半年', check: false, times: 6, rate: 1},
					{label: '一年', check: false, times: 12, rate: 0.95, discount:'95%折扣'},
					{label: '二年', check: false, times: 24, rate: 0.9, discount:'90%折扣'},
					{label: '三年', check: false, times: 36, rate: 0.85, discount:'85%折扣'}],
				planInfo: {},
				planPrice: 0, // 以分为单位
				planPriceOriginal: 0, // 以分为单位
				planTimes: 1,
				orderDatas: {}, // 订单数据
				creatorHome: {},
				coreInfo: {},
				idolConfig: {},
			}
		},
		onLoad(option) {
			this.option = { ...this.option, ...option}
			if (option.img) {
				this.option.memberImg = option.img;
			}
			if (this.option.id) {
				this.getMemberPlan()
			}
			if (this.option.userId) {
				this.getCreatorHome();
				this.getCreatorInfo();
			}
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
				})
			},
			getCreatorHome() {
				// 接口请求
				Require.get(API.user.creatorHome + this.option.userId, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.creatorHome = data;
					console.log("🚀 ~ file: index.vue ~ line 103 ~ Request.get ~ this.creatorHome", this.creatorHome)
				})
			},
			getCreatorInfo() {
				Require.get(API.user.creatorInfo + this.option.userId, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.coreInfo = data;
					this.creatorId = data.creatorId;
					this.getIdolConfig();
				})
			},
			// 获取创作者配置
			getIdolConfig() {
				Require.get(API.user.idolConfig + this.creatorId, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.idolConfig = data;
				})
			},
			handleCheckTime(index) {
				this.memberTimeList.map((item) => item.check = false)
				this.memberTimeList[index].check = true
				this.planTimes = this.memberTimeList[index].times;
				this.calculatePrice(this.memberTimeList[index]);
			},
			getMemberPlan() {
				Require.get(API.member.memberPlan + this.option.id, null , ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.planInfo = data;
					this.option.memberImg = data.imgUrl || this.option.memberImg
					this.planInfo.createdId = this.option.showId || Number(data.womanId) + 1000 + Number(this.option.IdLetter || 0)
					this.planPrice = this.planInfo.price;
					this.planPriceOriginal = this.planInfo.price;
				})
			},
			// 计算金额
			calculatePrice (data) {
				this.planPriceOriginal = this.planInfo.price * data.times;
				this.planPrice = this.planPriceOriginal * data.rate;
			},
			// 创建订单
			createOrder() {
				uni.showLoading({
					title: '正在创建订单',
				});
				Require.post(API.member.memberPlanVoucher, {
					apId: this.option.id, // 会员方案id
					dayNum: this.planTimes * 30, // 购买天数
				}, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.orderDatas = data;
					this.payOrder(data.id);
				})
				uni.hideLoading();
			},
			// 获取支付信息并调起支付
			payOrder(orderId) {
					uni.showLoading({
						title: '加载中，请稍后',
					});
					Require.post(API.pay.payPrepaId, {
						orderId, // 会员方案id
						payAmount: this.planPrice,
						dayNum: this.planTimes * 30,
					}, ({statusCode, data}) => {
						if(statusCode!=200) return;
						tt.pay({
							orderInfo: data,
							service: 5,
							 success(res) {
								 console.log('%c [ res ]-140', 'font-size:13px; background:pink; color:#bf2c9f;', res)
								/**
								 * 0：支付成功 1：支付超时 2：支付失败 3：支付关闭 4：支付取消 9：订单状态开发者自行获取。
								 * 只要调起收银台成功，支付都会回调成功，开发者依据返回的 code 值，进行后续业务逻辑处理
								 */
								if (res.code == 0) {
									// 支付成功处理逻辑，只有res.code=0时，才表示支付成功
									// 但是最终状态要以商户后端结果为准
								}
								// let title = '';
								// switch(res.code) {
								// 	case 0:
								// 		title = '支付成功～';
								// 		break;
								// 	case 1:
								// 		title = '支付超时～';
								// 		break;
								// 	case 2:
								// 		title = '支付失败～';
								// 		break;
								// 	case 3:
								// 		title = '支付关闭～';
								// 		break;
								// 	case 4:
								// 		title = '支付取消～';
								// 		break;
								// }
								// uni.showToast({
								// 	title,
								// 	icon: 'none',
								// 	duration: 2000
								// });
							},
							fail(res) {
								console.log('%c [ res ]-147', 'font-size:13px; background:pink; color:#bf2c9f;', res)
								// 调起收银台失败处理逻辑
								uni.showToast({
									title: '支付失败～',
									duration: 2000
								});
							},
						});
					})
					uni.hideLoading();
			},
			// 支付结果查询
			payResult(orderId) {
				if (!orderId) return;
				Require.post(API.pay.payResult, {orderId}, ({statusCode, data}) => {
					if(statusCode!=200) return;
					// state 0未支付、1已支付
					if(data.state == 1) {
						uni.showToast({
							title: '已支付',
							duration: 2000
						});
					} else {
							uni.showToast({
								title: '未支付',
								icon: 'none',
								duration: 2000
						});
					}
				});
			},
			replaceBr(str) {
				if(!str) return '';
				return str.replace(/<\/br>/g, '<br>')
			}
			
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
