
<template>
  <div class="line_separator"  style="position: relative;">
    <!--Adds Image to page-->
    <img src='./hardMath.jpeg'>
    <!--Makes line(HR tag) draggable-->
       <drag-it-dude@activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped">
      <div class="line" align="center">
        <hr size="5px" width="99%" color="red">
      </div>
      </drag-it-dude>
  </div>
</template>

<script lang="ts" src="./line_separator.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.line_separator {
  position: relative;
  width: 450px;
  height: 1150px;
} 
.line {
  padding-top: 25px;
  position: relative;
  width: 450px;
  height: 50px;

}
</style>