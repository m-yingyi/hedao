<template>
    <div class="list">
        <ul id="CoreGoodsContent">
            <template v-for="(item, index) in lists">
                <li v-if="index%2" v-key="item.id"> 
                    <a v-if="item.isLock" style="" href="/yun/photolist?pid=3101" data-isopen="1"> <image
                        mode="widthFix"
                            :src="item.thumbnail"
                            alt="作品封面" /> </a>
                        <a v-else>
                            <image
                            mode="widthFix"
                                :src="item.imgVague"
                                alt="作品封面" />
                        </a>
                    <div>
                        <div class="l-txt" style="height: 120upx; width: 100%">
                            <div class="line-two-title">{{item.title}}</div>
                            <div class="orange-txt">
                                <template v-if="item.photoPrice">
                                    <span style="font-size: 24upx;">
                                        ￥</span>{{(item.photoPrice/100)}}
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
                    <a style="height: 360upx;" v-if="!item.isLock" href="/goods/goodsDetails?pid=2882">
                        <!-- <div
                            style="background: url(item.thumbnail) center no-repeat;display:block;width:100%;height:100%;background-size: cover;">
                        </div> -->
                    <image
                            mode="widthFix"
                            :src="item.thumbnail"
                            alt="作品封面" /> 
                    </a>
                    <a v-else>
                            <image
                            mode="widthFix"
                                :src="item.imgVague"
                                alt="作品封面" />
                        </a>
                    <div>
                        <div class="l-txt" style="height: 120upx; width: 100%">
                            <div class="line-two-title">{{item.title}}</div>
                            <div class="orange-txt"><template v-if="item.photoPrice">
                                    <span style="font-size: 24upx;">
                                ￥</span>{{(item.photoPrice/100)}}
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
</style>