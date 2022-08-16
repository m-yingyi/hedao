<template>
	<view class="content">
		<div class="support-wrap">
            <h3 style="font-size: 26upx;color: #999999;padding: 28upx 0 20upx 0;">{{planInfo.title}}</h3>
            
            <div style="font-size: 26upx;"><span style="font-size: 28upx;float: left;padding-top: 6upx">￥</span><span style="font-size: 60upx;padding-right:22upx;">{{planInfo.price/100}}</span>元/月</div>
            <p style="font-size: 30upx;padding: 18upx 0 32upx 0;">解锁新动态+作品集</p>
            <!-- <img style="max-width: 550upx;max-height: 550upx;margin-bottom: 20upx;border-radius: 3px;" src="http://i.hedaoapp.com/image/jpg/2022/6/14/232027416716a841c0445e938eb75d153ad4d7.jpg"> -->
            <img style="max-width: 550upx;max-height: 550upx;margin-bottom: 20upx;border-radius: 3px;" :src="planInfo.imgUrl">
        </div>
		<div class="member-card" style="padding: 36upx;border-top: 1px solid #f0f0f0;">
            <div style="padding: 0 0 36upx 0;color:black;font-weight: bold;font-size: 32upx;line-height: 32upx;">获得会员卡和特权</div>
            <div class="member-card-new" style="background: url(http://i.hedaoapp.com/image/jpg/2022/6/14/232002e714c16f5af84e9f86a245c3de02902e.jpg) no-repeat center;background-size: 100% 100%;">
                <div class="opacity"></div>
                <div class="box">
                    <img class="member-user-img" src="http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300">
                    <div class="size-wrap">
                        <span class="size-title">{{planInfo.userName}}的会员</span>
                        <span class="size-txt">创作者ID：1001O</span>
                    </div>
                    <img class="member-vip-img" src="/Content/yun/idolMember/png_app1.4_02.png">
                </div>
                <div class="flex-betweem">
                    <div class="member-line"></div>
                    <span>会员可解锁</span>
                    <div class="white-num">动态<span>{{planInfo.trends}}</span>作品<span>{{planInfo.works}}</span></div>
                </div>
                <div class="btn-white">蓝钻会员</div>
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
		<div style="height: 88upx;width: 100%;"></div>
		<div class="support-footer-wrap">
			<div class="support-price">
				<span>共计</span>
				<span style="line-height: 72upx; padding: 0 6upx 0 28upx;font-weight: bold;">￥</span>
				<span id="PricePay" style="font-size: 48upx;font-weight: bold;">{{planPrice / 100}}</span>
				<span id="PriceOriginal" style="color: #cccccc; padding-left: 40upx;line-height: 106upx;display:none;text-decoration: line-through;">¥1500.00</span>
			</div>
			<div class="support-btn">开通</div>
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
				memberTimeList: [
					{label: '一个月', check: true, times: 1, rate: 1},
					{label: '三个月', check: false, times: 3, rate: 1},
					{label: '半年', check: false, times: 6, rate: 1},
					{label: '一年', check: false, times: 12, rate: 0.95, discount:'95%折扣'},
					{label: '二年', check: false, times: 24, rate: 0.9, discount:'90%折扣'},
					{label: '三年', check: false, times: 36, rate: 0.85, discount:'85%折扣'}],
				planId: null,
				planInfo: {},
				planPrice: 0, // 以分为单位
			}
		},
		onLoad(option) {
			this.planId = option.id;
			if(this.planId) {
				this.getMemberPlan()
			}
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../../pages/question/index'
				})
			},
			handleCheckTime(index) {
				this.memberTimeList.map((item) => item.check = false)
				this.memberTimeList[index].check = true
				this.calculatePrice(this.memberTimeList[index]);
			},
			getMemberPlan() {
				Require.get(API.member.memberPlan + this.planId, null , ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.planInfo = data;
					this.planPrice = this.planInfo.price;
				})
			},
			// 计算金额
			calculatePrice (data) {
				this.planPrice = this.planInfo.price * data.times * data.rate;
			} 
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
