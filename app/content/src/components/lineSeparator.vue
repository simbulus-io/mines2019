
<template>
  <div class="line_separator"  style="position: relative;">
    <img src='./hardMath.jpeg'>
       <drag-it-dude :width="100" @activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped">
      <div class="line" align="center">
        <hr width="100%" color="red" >
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
  width: 800px;
  height: 1150px;
} 
.line {
  position: relative;
  width: 800px;
  height: 50px;
  background: $electric-blue

}
</style>