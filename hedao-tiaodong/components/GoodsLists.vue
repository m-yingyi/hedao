<template>
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
</template>

<script>
export default {
  props: {
    lists: {
      type: Object,
      default: () => {},
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
    height: 508upx;
    overflow: hidden;
}
.list ul li>a>img {
    width: 100%;
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
</style>