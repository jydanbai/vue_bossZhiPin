<template>
  <div class="loadWrap">
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  }
};
</script>

<style lang="less">
.loadWrap{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50% 0 0 -50%);
}
</style>