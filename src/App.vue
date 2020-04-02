<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide'
import Loading from './components/Loading/Loading'
export default {
  computed:{
    ...mapState([
      'loading'
    ])
  },
  components:{
    FooterGuide,Loading 
  }
}
</script>

<style lang="less">


</style>