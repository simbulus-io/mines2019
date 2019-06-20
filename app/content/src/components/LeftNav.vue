<template>
  <div class="left-nav">
    <div class="link-container">
      <router-link to="/file_upload"><font-awesome-icon icon="home" />FILE UPLOAD</router-link>
      <router-link to="/other"><font-awesome-icon icon="home" />ADJUST CUTLINES</router-link>
      <router-link to="/edit_segments"><font-awesome-icon icon="home" />EDIT SEGMENTS</router-link>
    </div>
  </div>
</template>

<script lang="ts" src="./left_nav.ts"></script>

<style scoped lang="scss">
@import "../styles/common.scss";
.left-nav {
  position: absolute;
  top: $top_nav_height;
  height: 100vh; // 100% view height
  left: 0;
  bottom: 0;
  width: $left_nav_width;
  color: $white;
  background-color: $light_gray;
  // This stripe is fixed in the window - so it follows the scroll
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: $left_nav_width;
    background-color: $light_gray;
    z-index: -1;
  }
  router-link {
    color: $white;
  }
  .link-container {
    width: $left_nav_width;
    margin: 0 auto;
    margin-left: 43px;
    margin-top: 40px;
    svg {
      margin-right: 8px;
    }
    a {
      display: block;
      margin: 20px 0 20px 0;
      color: $lighter_gray;
      text-align: left;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
    }
    .router-link-active { color: $white; }
  }
}
</style>
