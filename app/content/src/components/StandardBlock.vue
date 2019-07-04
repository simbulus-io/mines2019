<template>
  <div class="s-block">
    <span>{{text}}</span>
    <!-- TODO: possibly link to the commmon core webpage for this -->
  </div>
</template>

<script lang="ts" src="./standard_block.ts"></script>
<style scoped lang="scss">
@import "../styles/common.scss";
.s-block {
  background-color: $wm_purple;
  display: inline-block;
  margin: 3px;
  color: $white;
  padding: 3px 5px;
  font-size: 14pt;
}
</style>
