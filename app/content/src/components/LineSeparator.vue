
<template>
<!-- attributes are class and id.  vue has special syntax for computed attributes -->

  <div class='line-separator'>
    <!--double mustache denotes vue data inside inner html-->
      {{text_in_div}}   
  </div>
</template>

<script lang="ts" src="./line_separator.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.line_separator {
  width: 100px;
  height: 100px;
  background: $dark_gray;
}
</style>
