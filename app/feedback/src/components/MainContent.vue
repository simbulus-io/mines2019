<template>
  <div class="main-content">
    <slot name="main-content"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
  export default class MainContent extends Vue {
}
</script>

<style scoped lang="scss">
@import "../styles/common.scss";
.main-content {
  position: absolute;
  top: $top_nav_height;
  left: $left_nav_width;
  bottom: 0;
  right: 0;
  background-color: $white;
}
</style>
