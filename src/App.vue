<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterGuide from "./components/FooterGuide/FooterGuide";
import Loading from "./components/Loading/Loading";
export default {
  computed: {
    ...mapState(["loading"])
  },
  components: {
    FooterGuide,
    Loading
  },
  mounted() {
    window.onload = function() {
      // 阻止双击放大
      var lastTouchEnd = 0;
      document.addEventListener("touchstart", function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener(
        "touchend",
        function(event) {
          var now = new Date().getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );

      // 阻止双指放大
      document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
      });
    };
  }
};
</script>

<style lang="less">
</style>