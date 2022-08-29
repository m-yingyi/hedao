<template>
  <div id="addr_add_wrap">
    <div class="project-wrap" v-for="(item, index) in addrList">
      <div class="addr-wrap" id="spec_div_1">
        <span :class="item.check?'iconbox iconred' : 'iconbox icongray'" id="spec_state_1"></span
        ><span>设为默认地址</span>
        <div class="delete-item" @click="deleteAddr(index)" v-if="addrList.length > 1">删除</div>
      </div>
      <div class="inputBox wd-box">
        <span>收货姓名</span
        ><input
          class="i-text"
          id="spec_name_1"
          type="text"
          placeholder="你的收货姓名"
          maxlength="45"
		  v-model="item.nameVal"
        />
      </div>
      <div class="inputBox wd-box">
        <span>联系方式</span
        ><input
          class="i-text"
          id="spec_phone_1"
          type="text"
          placeholder="你的联系电话"
          maxlength="45"
		  v-model="item.phoneVal"
        />
      </div>
      <div class="_addr_box">
        <span>地址</span
        ><textarea
          class="text-content"
          id="spec_address_1"
          placeholder="你的收货地址"
		  v-model="item.addresVal"
        ></textarea>
      </div>
    </div>
	<div class="add-addr" @click="createAddr">添加新地址</div>
	<div class="btnSave">保存资料</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      nikename: "",
      email: "",
      address: "",
      userInfo: {},
	  addrList: [{check: true, nameVal: '', phoneVal: '', addresVal: ''}]
    };
  },
  onShow() {
    this.getUserInfo();
  },
  methods: {
	createAddr() {
      this.addrList.push({check: false, nameVal: '', phoneVal: '', addresVal: ''})
    },
	deleteAddr(index) {
		this.addrList.splice(index, 1)
    },
    navigateTo() {
      uni.navigateTo({
        url: "../../pages/question/index",
      });
    },
    getUserInfo() {
      // TODO
      this.userInfo = uni.getStorageSync("userInfo");
    },
    goName() {
      uni.navigateTo({
        url: "../../pages/edit-name/index",
      });
    },
    goAddress() {
      uni.navigateTo({
        url: "../../pages/edit-address/index",
      });
    },
    goEmail() {
      uni.navigateTo({
        url: "../../pages/edit-email/index",
      });
    },
  },
};
</script>

<style>
@import url("./index.css");
</style>
