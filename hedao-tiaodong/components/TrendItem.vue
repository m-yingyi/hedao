<template>
  <view class="content">
		<figure>
			<UserItem :name="trend.nickName" :img="trend.headImg"/>
			<div class="contentPreViews">
				<image @click="imgPreview(imgLists, 0)" mode="widthFix" class="cont-pre-img"
					src="http://i.hedaoapp.com/Trends/2022/6/16/221430e6b528d508ed41859ba34ed066b8a16b.jpg"/>
				<div class="previewsNum">1/{{imgLists.length}}</div>
			</div>
			<div class="photoBox contentUserWrap justify-between">
				<div class="contentFootImg">
					<img
						src="http://i.hedaoapp.com/image/jpg/2022/5/6/2241404c2bd01a6e36416995b85453f7fafd04.jpg?x-oss-process=image/resize,l_300">
					<img src="/static/yun/imgs1.5/icon_xiezhen_17.png">
					<img
						src="http://i.hedaoapp.com/image/jpg/2022/4/3/224525b5921b8371564b409814e046c0b6822a.jpg?x-oss-process=image/resize,l_300">
					<span>近期{{trend.likeNum}}人加入</span>
				</div>
				<div class="contentShareWrap">
					<img class="btnHeart" :src="`/static/yun/idolIcon/png_app_0${trend.isLike? '3' : '2'}.png`" @click="handleHeart(trend.isLike, trend.id, trend.createId)">
					<span v-if="trend.isLike" class="btn-like">{{trend.likeNum}}</span>
					<div class="copyAddr">http://www.hedaoapp.com/yun/core?wid=1</div>
				</div>
			</div>
			<div class="addItem">新的绘画素材已发布了</div>
			<div class="supportNum" @click="goCore(trend.createId)">前往主页</div>
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
    }
  },
  data() {
    return {
      imgLists: [],
    }
  },
  onload() {
    this.handleImgLists();
  },
  methods: {
    handleClick() {
      this.$emit('onClick')
    },
    // 图片预览
    imgPreview(list, idx) {
      if (list && list.length > 0) {
        uni.previewImage({
          current: list[idx],
          urls: list,
          indicator: "number",
        });
      }
    },
    handleHeart(isLike, id, createId) {
      // TODO: 请求接口 /api/collection/model
      const useInfo = uni.getStorageSync('useInfo');
      const titles = ['取消点赞', '点赞成功'];
      Request.post(API.collection.collectionModel, {
        itemId: id,// 作品发布id
        itemType: 2, // 点赞
        producerUserId: useInfo.useId,// 用户ID
        createId, // 非评论点赞需提供创作者ID
      }, (res) => {
        uni.showToast({
          title: titles[res.data.state+1],
          icon: 'none'
        })
      })
      // this.heartCount = 1
      // this.heartIcon = 3
    },
    handleImgLists() {
      console.group('111')
      this.imgLists = trend.imgLists.map(item => item.thumbnail);
      console.log(this.imgLists)
    },
    goCore(createId) {
      uni.navigateTo({
					url: `../../pages/core/index?createId=${createId}`
				})
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
.contentPreViews .previewsNum {
    position: absolute;
    right: 36upx;
    top: 36upx;
    border-radius: 30upx;
    background: rgba(0,0,0,0.5);
    width: 70upx;
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
    width: 100%;
}
</style>