<template>
  <div>
    main
    <van-button>main</van-button>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '../../components/FooterGuide/FooterGuide';
export default {
  components:{
    FooterGuide
  }
};
</script>

<style lang="less">
</style>