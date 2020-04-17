<template>
  <div id="wrap" ref="wrapper">
    <div class="scrollWrap">
      <van-nav-bar title="老板信息完善" />
      <ChatHeads @selectHeader="selectImg($event)" />
      <van-field
        v-model="post"
        label="招聘职位："
        @blur="checkPost"
        required
        :placeholder="errMsg.postError"
      />
      <van-field
        v-model="company"
        label="公司名称："
        @blur="checkCompany"
        required
        :placeholder="errMsg.companyError"
      />
      <van-field
        v-model="salary"
        label="职位薪资："
        @blur="checkSalary"
        required
        :placeholder="errMsg.salaryError"
      />
      <van-field v-model="info" rows="2" autosize label="职位要求：" type="textarea" />
      <div style="margin: 16px;">
        <van-button round type="primary" size="large" color="#5dd5c8" @click="onSave">保存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Field, Form, Toast } from "vant";
import ChatHeads from "@/components/ChatHeads/ChatHeads";
import { getRedirectTo } from "@/utils/index";
export default {
  components: {
    [Field.name]: Field,
    [Form.name]: Form,
    ChatHeads
  },
  data() {
    return {
      header: "", //头像
      info: "", //职位简介
      post: "", //职位名称
      company: "", //公司名称
      salary: "", //工资
      errMsg: {
        postError: "",
        companyError: "",
        salaryError: ""
      }
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 支持点击
      scrollY: true, // 竖向滑动
      probeType: 2 // 实时，触摸
    });
    this.$bus.$on("itemImageLoad", () => {
      this.scroll.refresh();
    });
  },
  methods: {
    //必填项校验
    checkPost() {
      if (!this.post) {
        this.errMsg.postError = "请填写招聘职位";
        return false;
      }
    },
    checkCompany() {
      if (!this.company) {
        this.errMsg.companyError = "请填写公司名称";
        return false;
      }
    },
    checkSalary() {
      if (!this.salary) {
        this.errMsg.salaryError = "请填写职位信息";
        return false;
      }
    },
    //保存
    async onSave() {
      let { header, info, post, company, salary } = this;
      if (!this.post || !this.company || !this.salary || !this.header) {
        Toast("请填写完整信息!");
        return false;
      } else {
        let result;
        result = await this.$API.reqUpdateUser({
          header,
          info,
          post,
          company,
          salary
        });
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
  max-height: 100vh;
  overflow: hidden;
  .scrollWrap {
    .van-nav-bar {
      background-color: #5dd5c8;
      .van-nav-bar__title {
        color: #fff;
        font-size: 20px;
      }
    }
  }
}
</style>
