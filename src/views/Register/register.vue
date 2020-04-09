<template>
  <div id="wrap">
    <div class="register-form">
      <div class="title">注册BOSS直聘</div>
      <van-form @submit="onSubmit" colon ref="Form">
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
        <van-field
          v-model="confirmPwd"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请再次填写密码' },{ validator:isConfirmPwd, message: '请输入相同的密码!' }]"
        />
        <van-field name="type" label="用户类型">
          <template #input>
            <van-radio-group v-model="type" direction="horizontal">
              <van-radio name="laoban" checked-color="#5dd5c8">boss</van-radio>
              <van-radio name="dashen" checked-color="#5dd5c8">牛人</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="sub-btn">
          <van-button round block type="info" native-type="submit">注册</van-button>
        </div>
        <div class="text-tip">
          <van-checkbox v-model="agreement" shape="square" checked-color="#5dd5c8">
            我已同意
            <a href="javascript:;" class="link-signup">用户协议及隐私政策</a>
          </van-checkbox>
          <a href="javascript:;" class="signLogin" @click="toLogin">直接登录</a>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form, Field, RadioGroup, Radio, Checkbox, CheckboxGroup } from "vant";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPwd: "",
      userType: "",
      type: "dashen",
      agreement: false
    };
  },
  methods: {
    //注册
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    toLogin() {
      this.$router.replace("/login");
    },
    isConfirmPwd() {
      return this.password === this.confirmPwd ? true : false;
    },
    async onSubmit() {
      let { username, password, type } = this;
      if (!this.agreement) {
        this.$toast("请阅读并同意BOSS直聘用户协议，方可注册");
        return false;
      } else {
        let result;
        result = await this.$API.registerWithPassword(username, password, type);
        if (result.code === 1) {
          this.$store.dispatch('saveErrorMsg',{errMsg:result.msg})
          this.$toast(result.msg);
        }else if(result.code === 0){
          this.$store.dispatch('saveUser',{userInfo:result.data,$router:this.$router})
        }
      }
    }
  }
};
</script>

<style lang="less">
#wrap {
  min-height: 100%;
  overflow: visible;
  .register-form {
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
    .van-form {
      .van-cell {
        margin: 20px 0;
      }
      .sub-btn {
        margin-bottom: 16px;
        .van-button {
          background-color: #5dd5c8;
          border: none;
          border-radius: 0;
        }
      }
      .text-tip {
        overflow: hidden;
        font-size: 14px;
        color: #9fa3b0;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-checkbox {
          .link-signup {
            color: #9fa3b0;
          }
        }
        .signLogin {
          color: #5dd5c8;
          display: inline-block;
          padding: 1px 0 0 4px;
        }
      }
    }
  }
}
</style>