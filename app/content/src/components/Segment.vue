<template v-slot:main-content>
  <div class="segment m-content">
    <line-separator></line-separator>
  </div>
</template>


<script lang="ts" src="./segment.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.segment {
  position: relative;
  text-align: left;
  min-width: 900px;
}
</style>




