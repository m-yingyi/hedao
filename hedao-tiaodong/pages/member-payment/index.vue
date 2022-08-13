<template>
	<view class="content">
		<div class="support-wrap">
            <h3 style="font-size: 26upx;color: #999999;padding: 28upx 0 20upx 0;">会员等级三码是多少的时间和你，是</h3>
            
            <div style="font-size: 26upx;"><span style="font-size: 28upx;float: left;padding-top: 6upx">￥</span><span style="font-size: 60upx;padding-right:22upx;">3</span>元/月</div>
            <p style="font-size: 30upx;padding: 18upx 0 32upx 0;">解锁新动态+作品集</p>
            <img style="max-width: 550upx;max-height: 550upx;margin-bottom: 20upx;border-radius: 3px;" src="http://i.hedaoapp.com/image/jpg/2022/6/14/232027416716a841c0445e938eb75d153ad4d7.jpg">
        </div>
		<div class="member-card" style="padding: 36upx;border-top: 1px solid #f0f0f0;">
            <div style="padding: 0 0 36upx 0;color:black;font-weight: bold;font-size: 32upx;line-height: 32upx;">获得会员卡和特权</div>
            <div class="member-card-new" style="background: url(http://i.hedaoapp.com/image/jpg/2022/6/14/232002e714c16f5af84e9f86a245c3de02902e.jpg) no-repeat center;background-size: 100% 100%;">
                <div class="opacity"></div>
                <div class="box">
                    <img class="member-user-img" src="http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300">
                    <div class="size-wrap">
                        <span class="size-title">客服小盒的会员</span>
                        <span class="size-txt">创作者ID：1001O</span>
                    </div>
                    <img class="member-vip-img" src="/Content/yun/idolMember/png_app1.4_02.png">
                </div>
                <div class="flex-betweem">
                    <div class="member-line"></div>
                    <span>会员可解锁</span>
                    <div class="white-num">动态<span>108</span>作品<span>7</span></div>
                </div>
                <div class="btn-white">蓝钻会员</div>
            </div>
        </div>
		<div class="support-way" style="margin-top: 20upx;">
			<h2 style="font-size: 32upx; line-height: 32upx;font-weight:bold;padding-bottom: 20upx;">选择会员期限</h2>
			<ul class="way-box longTime">
				<li data-price="300" data-timetype="1" @click="clickPlan($event)" ><p><image src="/static/yun/imgs/png_201_2.png" mode="widthFix"/>一个月</p><image :src="`/static/yun/imgs/icon_yun_938${selectedPlan == 1 ? '' : '_2'}.png`"/></li>
				<li data-price="900" data-timetype="2" @click="clickPlan($event)"><p><image src="/static/yun/imgs/png_201_2.png" mode="widthFix"/>三个月</p><image :src="`/static/yun/imgs/icon_yun_938${selectedPlan == 2 ? '' : '_2'}.png`"/></li>
				<li data-price="1800" data-timetype="3" @click="clickPlan($event)"><p><image src="/static/yun/imgs/png_201_2.png" mode="widthFix"/>半年</p><image :src="`/static/yun/imgs/icon_yun_938${selectedPlan == 3 ? '' : '_2'}.png`"/></li>
				<li data-price="3420" data-original="3600" data-timetype="4" @click="clickPlan($event)"><p><image src="/static/yun/imgs/png_201_2.png" mode="widthFix" />一年<span>95%折扣</span></p><image :src="`/static/yun/imgs/icon_yun_938${selectedPlan == 4 ? '' : '_2'}.png`"/></li>
				<li data-price="6480" data-original="7200" data-timetype="5" @click="clickPlan($event)"><p><image src="/static/yun/imgs/png_201_2.png" mode="widthFix" />二年<span>90%折扣</span></p><image :src="`/static/yun/imgs/icon_yun_938${selectedPlan == 5 ? '' : '_2'}.png`"/></li>
				<li data-price="9180" data-original="10800" data-timetype="6" @click="clickPlan($event)"><p><image src="/static/yun/imgs/png_201_2.png" mode="widthFix" />三年<span>85%折扣</span></p><image :src="`/static/yun/imgs/icon_yun_938${selectedPlan == 6 ? '' : '_2'}.png`"/></li>
			</ul>
		</div>
		<div style="height: 88upx;width: 100%;"></div>
		<div class="support-footer-wrap">
			<div class="support-price">
				<span>共计</span>
				<span style="line-height: 72upx; padding: 0 6upx 0 28upx;font-weight: bold;">￥</span>
				<span id="PricePay" style="font-size: 48upx;font-weight: bold;">3</span>
				<span id="PriceOriginal" style="color: #cccccc; padding-left: 40upx;line-height: 106upx;display:none;text-decoration: line-through;">¥1500.00</span>
			</div>
			<div class="support-btn">开通</div>
		</div>
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
		data() {
			return {
				id: null,
				selectedPlan: 1
			}
		},
		onLoad(option) {
            console.log("🚀 ~ file: index.vue ~ line 66 ~ onLoad ~ option", option)
			this.id = option.id
			this.getPlan()
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
				})
			},
			clickPlan(e) {
                console.log("🚀 ~ file: index.vue ~ line 77 ~ clickPlan ~ e", e)
				this.selectedPlan = e.target.dataset.timetype;
			},
			getPlan() {
				if(!this.id) {
					uni.showToast({
							title: '没有获取到ID',
							icon: 'none',
							duration: 3000,
						})
				} else {
					// 接口请求
				Request.get(API.member.memberPlan + this.id, null, ({statusCode, data}) => {
                    console.log("🚀 ~ file: index.vue ~ line 92 ~ Request.get ~ data", data)
					if(statusCode!=200) return;
					
				})
				}
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
