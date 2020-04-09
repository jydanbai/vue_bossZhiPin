<template>
  <div id="wrap">
    <div class="login-form">
      <div class="title">登录BOSS直聘</div>
      <van-tabs
        v-model="active"
        color="#53cac3"
        title-active-color="#414a60"
        title-inactive-color="#9fa3b0"
        line-width="50%"
      >
        <van-tab title="密码登录" title-style="font-size:16px">
          <van-form @submit="onSubmit" colon>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class="sub-btn" style="margin: 16px 0;">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
            <div class="text-tip">
              没有账号？
              <a href="javascript:;" class="link-signup" @click="toRegister">立即注册</a>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="短信登录" title-style="font-size:16px"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Form, Field } from "vant";
export default {
  data() {
    return {
      active: 0,
      username: "",
      password: ""
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Form.name]: Form,
    [Field.name]: Field
  },
  methods: {
    async onSubmit(values) {
      let { username, password } = this;
      let result;
      result = await this.$API.loginWithPassword(username, password);
      if (result.code === 1) {
        this.$store.dispatch("saveErrorMsg", { errMsg: result.msg });
        this.$toast(result.msg);
      } else if (result.code === 0) {
        this.$store.dispatch("saveUser", { userInfo: result.data,$router:this.$router});
      }
    },
    toRegister() {
      this.$router.replace("/register");
    }
  }
};
</script>

<style lang="less">
#wrap {
  min-height: 100%;
  overflow: visible;
  .login-form {
    padding: 0 15px 0;
    .title {
      font-weight: 400;
      font-size: 26px;
      line-height: 32px;
      color: #5dd5c8;
      position: relative;
      text-align: center;
      padding: 30px 0 20px 0;
    }
    .van-tabs {
      .van-tabs__wrap {
        margin-bottom: 44px;
        .van-tab {
          border-bottom: 2px solid #f2f5f9;
          font-size: 14px;
        }
      }
      .van-tabs__content {
        .van-tab__pane {
          .van-form {
            .van-cell {
              margin: 20px 0;
            }
            .sub-btn {
              .van-button {
                background-color: #5dd5c8;
                border: none;
                border-radius: 0;
              }
            }
            .text-tip {
              padding-top: 24px;
              color: #9fa3b0;
              text-align: center;
              overflow: hidden;
              font-size: 14px;
              .link-signup {
                color: #18c3b1;
              }
            }
          }
        }
      }
    }
  }
}
</style>