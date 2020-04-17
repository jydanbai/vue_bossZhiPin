<template>
  <div id="wrap">
    <van-nav-bar title="大神信息完善" />
    <ChatHeads @selectHeader="selectImg($event)" />
    <van-field
      v-model="post"
      label="求职岗位："
      @blur="checkPost"
      required
      :placeholder="errMsg.postError"
    />
    <van-field v-model="info" rows="2" type="textarea" autosize label="个人介绍：" />
    <div style="margin: 16px;">
      <van-button round type="primary" size="large" color="#5dd5c8" @click="onSave">保存</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Toast } from "vant";
import ChatHeads from "@/components/ChatHeads/ChatHeads";
import { getRedirectTo } from "@/utils/index";
export default {
  components: {
    [Field.name]: Field,
    ChatHeads
  },
  data() {
    return {
      post: "",
      info: "",
      header: "",
      errMsg: {
        postError: ""
      }
    };
  },
  methods: {
    //必填校验
    checkPost() {
      if (!this.post) {
        this.errMsg.postError = "请填写求职岗位";
        return false;
      }
    },
    //保存
    async onSave() {
      let { header, info, post } = this;
      if (!this.post || !this.header) {
        Toast("请填写完整信息!");
        return false;
      } else {
        let result;
        result = await this.$API.reqUpdateUser({ header, info, post });
        console.log(result);
        if (result.code === 1) {
          this.$store.dispatch("saveResetMsg", { resetMsg: result.msg });
          this.$toast(result.msg);
        } else if (result.code === 0) {
          this.$store.dispatch("updateUserInfo", {
            user: result.data,
          });
          const { type, header } = this.$store.state.userInfo;
          this.$router.replace(getRedirectTo(type, header));
        }
      }
    },
    //头像选择
    selectImg(img) {
      this.header = img;
    }
  }
};
</script>

<style lang="less">
#wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .van-nav-bar {
    background-color: #5dd5c8;
    .van-nav-bar__title {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
