<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="job" icon="idcard">职位</van-tabbar-item>
      <van-tabbar-item name="message" info="5" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item name="person" icon="user-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less">
</style>