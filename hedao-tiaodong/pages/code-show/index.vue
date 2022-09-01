<template>
  <div class="code-wrap">
    <div class="code-content flex-column">
      <img class="user-img" :src="coreInfo.headImg || `'/static/yun/imgs1.5/icon_xiezhen_17.png'`"/>
      <p class="user-name">{{coreInfo.nickName || 'xxx'}}</p>
      <p class="user-id">
        创作者ID {{coreInfo.showId || 'xxx'}}
      </p>
      <div class="user-code">
        <img :src="coreInfo.qCodeUrl" />
      </div>
      <p>扫一扫二维码关注创作者</p>
      <p>抖音扫此码可发布短视频</p>
    </div>
  </div>
</template>
<script>
import Request from '@/common/require.js';
import API from '@/common/api.js';
  export default {
    data() {
      return {
        coreInfo: {}
      }
    },
    onLoad(option) {
			if(option.id) {
				this.getCoreInfo(option.id);
			}
		},
    methods: {
      getCoreInfo (id) {
        Request.get(API.user.creatorInfo + id, null, ({statusCode, data}) => {
					if(statusCode!=200) return;
					this.coreInfo = data;
				})
      }
    }
  }
</script>
<style>
  @import url("./index.css");
</style>