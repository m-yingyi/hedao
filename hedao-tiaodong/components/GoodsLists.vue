<template>
    <div class="list">
        <ul id="CoreGoodsContent">
            <template v-for="(item, index) in lists">
                <li v-if="index%2" v-key="item.id"> 
                    <a v-if="item.isLock" style="" href="/yun/photolist?pid=3101" data-isopen="1" class="mask"> 
                        <image
                        mode="widthFix"
                            :src="item.imgVague"
                            class="mask-img"
                            alt="作品封面" /> 
                            <div class="mask-content" >
                                <image class="filter-lock" src="/static/yun/idolIcon/png_suo_02.png" alt="锁" />
                                <p class="filter-txt">粉丝团可预览</p>
                                <div class="filter-btn temp-link" data-href="/yun/confirmAssistance?apId=1054" @click="check">查看</div>
                            </div>
                        </a>
                        <a v-else @click="clickGoods">
                            <template v-if="item.templateCover">
                                <image
                                    mode="widthFix"
                                :src="item.templateCover"
                                class="cover-img"/> 
                            </template>
                            <image
                            mode="widthFix"
                                :src="item.imgUrl"
                                alt="作品封面" />
                        </a>
                    <div>
                        <div class="l-txt" style="height: 120upx; width: 100%">
                            <div class="line-two-title">{{item.title}}</div>
                            <div class="orange-txt">
                                <template v-if="item.photoPrice || item.downloadPrice">
                                    <span style="font-size: 24upx;">
                                        ￥</span>{{((item.photoPrice || item.downloadPrice)/100)}}
                                </template>
                            
                            <span class="grag-txt-sale">{{item.introduction}}</span></div>
                        </div>
                    </div>
                </li>

            </template>
        </ul>
        <ul id="CoreGoodsContent2">
            <template v-for="(item, index) in lists">
                <li v-if="!(index%2)" v-key="item.id"> 
                    <a v-if="item.isLock" style="" href="/yun/photolist?pid=3101" data-isopen="1" class="mask"> <image
                        mode="widthFix"
                            :src="item.imgVague"
                            class="mask-img"
                            alt="作品封面" /> 
                            <div class="mask-content" >
                                <image class="filter-lock" src="/static/yun/idolIcon/png_suo_02.png" alt="锁" />
                                <p class="filter-txt">粉丝团可预览</p>
                                <div class="filter-btn temp-link" data-href="/yun/confirmAssistance?apId=1054" @click="check">查看</div>
                            </div>
                        </a>
                    <a v-else @click="clickGoods">
                        <template v-if="item.templateCover">
                                <image
                                    mode="widthFix"
                                :src="item.templateCover"
                                class="cover-img"/> 
                            </template>
                            <image
                            mode="widthFix"
                                :src="item.imgUrl"
                                alt="作品封面" />
                        </a>
                    <div>
                        <div class="l-txt" style="height: 120upx; width: 100%">
                            <div class="line-two-title">{{item.title}}</div>
                            <div class="orange-txt"><template v-if="item.photoPrice || item.downloadPrice">
                                    <span style="font-size: 24upx;">
                                ￥</span>{{((item.photoPrice || item.downloadPrice)/100)}}
                                </template><span class="grag-txt-sale">{{item.introduction}}</span></div>
                        </div>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // handleClick() {
    //   this.$emit('onClick')
    // },
    check() {
        uni.showToast({
            title: '该商品需要在APP内查看',
            icon: 'none'
        })
    },
    clickGoods() {
        uni.showToast({
            title: '作品详情请在APP内查看',
            icon: 'none'
        }) 
    }
  },
};
</script>
<style scoped>
.list {
    display: flex;
    background-color: #f0f0f0;
}
.list ul {
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10upx;
    padding-bottom: 0;
    padding-top: 0;
    box-sizing: border-box;
}
.list ul li:nth-child(odd) {
    margin-right: 1.5%;
}
.list ul li {
    width: 100%;
    margin-bottom: 10upx;
    background-color: white;
}
.list ul li>a {
    position: relative;
    display: block;
    cursor: pointer;
    height: auto;
    overflow: hidden;
}
.list ul li>a>image {
    width: 360upx;
    vertical-align: top;
}
.list ul li >div {
    position: relative;
    width: 100%;
    height: auto;
    font-size: 24upx;
    line-height: 24upx;
    color: #333;
    display: flex;
    justify-content: space-between;
    padding: 14upx;
    box-sizing: border-box;
}
.list ul li .l-txt {
    position: relative;
    height: 60upx;
    width: 240upx;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
}
.list ul li .l-txt h1 {
    margin: 2upx 0 10upx 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.list ul li .l-txt>span {
    display: block;
    font-size: 24upx;
    line-height: 24upx;
    color: #999;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.orange-txt {
    color: #f56735;
    font-size: 36upx;
    font-weight: 600;
}
.line-two-title {
    color: #333;
    font-size: 24upx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 60upx;
    line-height: 31upx;
}
.grag-txt-sale {
    font-size: 24upx;
    color: #999;
    margin-left: 23upx;
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
   /* width: 100%; */
}

.cover-img {
    position: absolute;
    z-index: 10;
    top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}


.mask-img {
  position: relative;
  width: 100%;
  /* margin-left: 36upx; */
}

.mask-content {
  display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
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
  margin: 36upx 0;
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

#CoreGoodsContent2{
    padding-left: 0;
}
</style>