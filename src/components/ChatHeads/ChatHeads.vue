<template>
  <div class="headsWrap">
    <div class="tip">
      <span class="tipText">{{this.headTip}}</span>
      <img class="selectImg" :src="this.selectImage" alt="图裂了" v-show="this.selectImage">
    </div>
    
    <van-grid :column-num="5" square>
      <van-grid-item
        v-for="(item,index) in headerList"
        :key="index"
        text="item.text"
        @click="selectHead(item)"
      >
        <img class="headIcon" :src="item.icon" alt="图裂了" @load="imageLoad" />
        <span class="headText">{{item.text}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem } from "vant";
export default {
  data() {
    return {
      header:'',
      headerList: [],
      headTip: "请选择头像",
      selectImage:"",
    };
  },
  mounted: function() {
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: "头像" + (i + 1),
        icon: require(`@/assets/images/头像${i + 1}.png`)
      });
    }
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    selectHead(item) {
      this.headTip = '已选择头像：'
      this.selectImage = item.icon
      this.header = item.text
      this.$emit('selectHeader', this.header)
    }
  }
};
</script>

<style lang="less">
.headsWrap {
  .tip {
    padding-left: 10px;
    height: 40px;
    width: 100%;
    font-size: 14px;
    background-color: #f5f8f9;
    color: #7e8793;
    display: flex;
    justify-content: left;
    align-items: center;
    .selectImg{
      width: 32px;
      height: 32px;
    }
  }
  .van-grid {
    .van-grid-item {
      height: 75px;
      .headIcon {
        width: 32px;
        height: 32px;
      }
      .headText {
        font-size: 10px;
        display: block;
        box-sizing: border-box;
        padding-top: 2px;
      }
    }
  }
}
</style>