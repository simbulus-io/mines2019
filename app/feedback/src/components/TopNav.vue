<template>
  <div class="top-nav">
    <span>Woot Tang Clan</span><span style="font-size:19px;margin-left:1px"></span>
    <span><font-awesome-icon icon="bars" /></span>
    <span>{{display_name_teacher}}</span>
  </div>
</template>
<script lang="ts" src="./top_nav.ts"></script>
<style scoped lang="scss">
@import "../styles/common.scss";
.top-nav {
  position:absolute;
  left: 0px;
  top: 0px;
  height: $top_nav_height;
  width: 100%;
  padding: 0;
  background-color: $dark_gray;
  color: $white;
  text-align: left;
  line-height: $top_nav_height;
  span:nth-of-type(1) {
    margin-left: 15px;
    font-weight: 300;
    font-size:24px;
  }
  span:nth-of-type(2) {
    font-weight: 700;
  }
  span:nth-of-type(3) {
    line-height: $top_nav_height;
    position: absolute;
    right: 15px;
    font-size: 24px;
  }
  span:nth-of-type(4) {
    line-height: $top_nav_height;
    position: absolute;
    right: 60px;
    font-size: 20px;
  }
}
</style>
