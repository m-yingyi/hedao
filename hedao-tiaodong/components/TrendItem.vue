<template>
  <view class="content">
    <!-- <scroll-view :style="{height: '100vh'}" :scroll-y="true" @scrolltolower="scrollRefash">
    </scroll-view> -->
    <figure v-for="(item, index) in sourceData" v-key="item.id">
      <div class="user-name" @click="goCore(item.userId)">
        <UserItem :isBold="isBold" :name="item.nickName" :img="item.headImg"/>
        <img v-if="isNeedCore" class="go-core" src="/static/yun/imgs1.6/icon_xcx_16.png" />
      </div>
       <!-- :style="{'backgroundSize': 'cover', 'backgroundImage': `url(${item.imgList[0].originalImg})`}" -->
      <div v-if="item.isLock" class="mask">
        <image mode="top" class="mask-img" :src="item.maskImg" />
        <div class="mask-content" @click="goPlan(item.levelId)">
          <image class="filter-lock" src="/static/yun/idolIcon/png_suo_02.png" alt="锁" />
          <p class="filter-txt">{{item.levelTitle}}</p>
          <div class="filter-btn temp-link" data-href="/yun/confirmAssistance?apId=1054">开通</div>
        </div>
      </div>
      <template v-if="!item.isLock">
        <template v-if="item.videoUrl" >
          <video id="myVideo" :width="item.videoWidth" :height="item.videoHeight" :src="item.videoUrl" :poster="item.imgList[0].originalImg"></video>
        </template>
        <div class="contentPreViews" v-if="!item.videoUrl && item.imgList.length">
          <image @click="imgPreview(item.imgList, index, item.id)" :mode="!item.imgList[0].isLong && item.imgList.length <= 9? 'widthFix': 'top'" class="cont-pre-img"
            :src="item.imgList[0].originalImg"/>
          <div class="previewsNum" v-if="!item.imgList[0].isLong && item.imgList.length <= 9">1/{{item.imgList.length}}</div>
          <div class="previewsNum" v-else style="z-index: 19;"><image mode="widthFix" src="/static/yun/icons-video/icon_app_73.png" class="more-imgs-txt"/>{{item.imgList[0].isLong ? '长图' : '多图' }}</div>
        </div>
      </template>
      <div v-if="[0].includes(item.publishType)" class="photoBox contentUserWrap justify-between">
        <div class="contentFootImg">
          <template v-if="item.fansTeamHeadImgs && item.fansTeamHeadImgs.length">
              <img v-for="imgItem in reverseImgs(item.fansTeamHeadImgs)" :src="imgItem"/>
            </template>
          <!-- <img
            src="http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300">
          <img src="/static/yun/imgs1.5/icon_xiezhen_17.png">
          <img
            src="http://i.hedaoapp.com/image/jpg/2022/4/3/224525b5921b8371564b409814e046c0b6822a.jpg?x-oss-process=image/resize,l_300"> -->
          <span v-if="item.fansTeamCount">近期{{item.fansTeamCount}}人加入</span>
        </div>
        <div class="contentShareWrap" @click="handleHeart(item.isLike, item.id, item.createId)">
          <img class="btnHeart" :src="`/static/yun/idolIcon/png_app_0${item.isLike? '3' : '2'}.png`">
          <span class="btn-like">{{item.likeNum || '点赞'}}</span>
          <div class="copyAddr">http://www.hedaoapp.com/yun/core?wid=1</div>
        </div>
      </div>
      <div :class="item.publishType ? 'addItem ellipsis-2' : 'addItem'">
        <!-- {{item.nickName}} -->
        <span v-if="item.publishType > 0">{{item.nickName + item.publishContent}}</span>
        <span v-if="item.publishType == 0">
          <rich-text style="word-break: break-all;" :nodes="`${replaceBr(item.publishContent)}`"></rich-text>
        </span>
        <!-- 发布类型 0-随拍/1-画集/2-音频/3-盲盒/4-扭蛋/5-商品 -->
        <span class="works-name" v-if="item.publishType > 0" @click="goCore(item.userId, 2)">
          <img src="/static/yun/imgs1.6/icon_xcx_17.png"/>
          {{item.worksName}}
        </span>
      </div>
      <!-- <div v-if="isNeedCore" class="supportNum" @click="goCore(item.userId)">前往主页</div> -->
    </figure>
		<div v-if="isBottom" class="no-data">没有更多了</div>
	</view>
</template>

<script>
import UserItem from '@/components/UserItem.vue';
import Request from '@/common/require.js';
import API from '@/common/api.js';
export default {
  components: {
    UserItem,
  },
  props: {
    sourceData: {
      type: Array,
      default: () => [],
    },
    heartCount: {
      type: Number,
      default: 0
    },
    heartIcon: { // 是否点赞 2 否 3 是
      type: Number,
      default: 2
    },
    // TODO: 
    trend: {
      type: Object,
      default: () => {}
    },
    isBottom: {
      type: Boolean,
      default: false,
    },
    /** 是否为需要跳转主页 */
    isNeedCore: {
      type: Boolean,
      default: false,
    },
    isBold: {
      type: Boolean,
      default: true,
    },
    isLogin: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      imgLists: [],
    }
  },
  onload() {
    this.handleImgLists();
    console.log(this.isBold)
  },
  onReady: function (res) {
		this.videoContext = uni.createVideoContext('myVideo')
	},
  methods: {
    handleClick() {
      this.$emit('onClick')
    },
    // 图片预览
    imgPreview(data, idx, id) {
      if (data.length > 9 || data[0].isLong) {
        return uni.navigateTo({
					url: `../../pages/long-img/index?id=${id}`
				})
      } else {
        const list = data.map(item => item.originalImg)
        uni.previewImage({
          current: list[idx],
          urls: list,
          indicator: "number",
        });
      }     
    },
    handleHeart(isLike, id, createId) {
      // TODO: 请求接口 /api/collection/model
      if (!this.isLogin) {
					uni.showToast({
						title: '请先登录账号',
            icon: 'none',
						duration: 3000,
					});
					return;
				}
      if(isLike) {
        uni.showToast({
          title: '你已经点过赞了',
          icon: 'none'
        })
        return;
      }
      const userInfo = uni.getStorageSync('userInfo');
      const titles = ['取消点赞', '点赞成功'];
      Request.post(API.collection.collectionModel, {
        itemId: id,// 作品发布id
        itemType: 2, // 点赞
        businessType: 2, // 动态
        producerUserId: userInfo.userId,// 用户ID
        createId, // 非评论点赞需提供创作者ID
      }, (res) => {
        const isSuccess = res.statusCode == 200
        uni.showToast({
          title: isSuccess ? titles[res.data.state+1] : res.errors,
          icon: 'none'
        })
        setTimeout(() => {
          isSuccess && this.$emit('onRefash')
        }, 0)
      })
      // this.heartCount = 1
      // this.heartIcon = 3
    },
    handleImgLists() {
      this.imgLists = trend.imgLists.map(item => item.thumbnail);
      console.log(this.imgLists)
    },
    goCore(userId, tabNum) {
      uni.navigateTo({
					url: `../../pages/core/index?userId=${userId}&tabNum=${tabNum}`
				})
    },
    scrollRefash() {
      this.$emit('onscrollRefash')
    },
    goPlan(id) {
      uni.navigateTo({
					url: `../../pages/member-payment/index?id=${id}`
				})
    },
    goLongImg(id) {
      uni.navigateTo({
					url: `../../pages/member-payment/index?id=${id}`
				})
    },
    replaceBr(str) {
      if(!str) return '';
				return str.replace(/<\/br>/g, '<br>')
			},
      reverseImgs(data) {
        return data.reverse();
      }
  },
};
</script>
<style scoped>
figure {
    position: relative;
    margin: 0 0 32upx 0;
    width: 100%;
    height: auto;
    padding: 0 20upx;
    box-sizing: border-box;
    z-index: 2;
}
figure .photoBox {
    display: flex;
    position: relative;
    align-items: center;
    margin-right: 20upx;
    border: none;
    padding: 0;
    margin-bottom: 0;
	font-size: 28upx;
}
.contentWrap {
    justify-content: space-between;
    font-size: 28upx;
    display: flex;
    position: relative;
    align-items: center;
    margin-right: 20upx;
    height: 100upx;
}
.contentHeadImg, .contentFootImg, .contentShareWrap{
    display: flex;
    align-items: center;
    font-size: 24upx;
}
.contentHeadImg img, .contentFootImg img {
    border-radius: 50%;
    height: 65upx;
    width: 65upx;
    margin-right: 16upx;
}
.contentFootImg img{
    width: 40upx;
    height: 40upx;
    margin-right: -6upx;
    border: 1upx solid white;
}
.contentFootImg span {
    margin-left: 24upx;
}
.contentPreViews img {
    width: 100%;
}
.contentUserWrap {
    height: 82upx;
}
.contentShareWrap img {
    width: 42upx;
    height: 42upx;
    margin-left: 52upx;
}
.contentShareWrap .btnHeart {
	width: 48upx;
    height: 42upx;
}
.btn-like {
    font-size: 28upx;
    margin-left: 12upx;
}
.copyAddr {
    position: fixed;
    top: -1100upx;
}
.supportNum {
    display: block;
    color: #999999;
    font-size: 24upx;
    padding-top: 12upx;
    padding-left: 2upx;
}
.addItem {
    color: #333333;
    font-size: 28upx;
    padding-left: 2upx;
    padding-top: 4upx;
    font-weight: bold;
    word-break: break-all;
}
.ellipsis-2 {
  width: 95%;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.contentPreViews .previewsNum {
    position: absolute;
    right: 36upx;
    top: 36upx;
    border-radius: 30upx;
    background: rgba(0,0,0,0.5);
    width: 100upx;
    height: 50upx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24upx;
}
.contentPreViews {
    position: relative;
    width: calc(100% + 54upx);
    margin-left: -36upx;
    height: auto;
}
.cont-pre-img {
    width: 101%;
    height: 600upx;
}
.more-imgs-txt{
  margin-right: 2upx;
  width: 16upx;
  height:20upx;
}

.mask {
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  position: relative;
  color: rgba(255, 255, 255, .7);
  font-size: 28upx;
  z-index: 3;
   width: calc(100% + 54upx);
  margin-left: -36upx;
}



.mask-img {
  position: relative;
  width: 101%;
  height: 600upx;
}

.mask-content {
  display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 position: relative;
  position: absolute;
   top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.filter-lock {
  width: 36upx;
  height: 47upx;
}

.filter-txt {
  margin: 40upx 0;
}

.filter-btn {
  width: 190upx;
  height: 66upx;
  border: 1upx solid rgba(255, 255, 255, .2);
  border-radius: 36upx;
  text-align: center;
  line-height: 66upx;
  cursor: pointer;
}
.works-name {
  color: #296ead;
}
.works-name img {
  width: 28upx;
  height: 28upx;
  margin: 0 11upx;
}
.user-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.go-core {
  width: 38upx;
  height: 8upx;
}

#myVideo {
  width: 106%;
  margin-left: -20upx;
  height: 900upx;
}
</style>