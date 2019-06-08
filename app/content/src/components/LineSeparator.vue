
<template>
  <div class="line_separator"  style="position: relative;">
    <!--Displays vertical offset of first horizontal segmentation line-->
  
    <drag-it-dude@activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped"></drag-it-dude>
    <!--Adds Image to page-->
    <img src='./EngageNY/Algebra1-m03-b-l08.png'>
    <drag-it-dude@activated="handleActivated" @dragging="handleDragging" @dropped="text_in_div()">
    <div class="vl"></div>
    </drag-it-dude>

  <drag-it-dude@activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped">
    <div class="vr"></div>
    
    </drag-it-dude>

    <!--Makes line(HR tag) draggable-->
      <drag-it-dude@activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped">
      <div class="line" id="line1" align="center" onmouseup="text_in_div()" onmousedown="text_in_div()">
        <hr size="5px" width="99%" color="red">
        {{text_in_div}}
      </div>
      
      </drag-it-dude>


      <drag-it-dude@activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped">
      <div class="line" align="center">
        <hr size="5px" width="99%" color="red">
      </div>
      </drag-it-dude>

      <drag-it-dude@activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped">
      <div class="line" align="center">
        <hr size="5px" width="99%" color="red">
      </div>
      </drag-it-dude>
      {{text_in_div}}
  </div>
</template>

<script lang="ts" src="./line_separator.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.line_separator {
  position: absolute;
  width: 825px;
  height: 5250px;
} 
.line {
  top: 20px;
  padding-top: 25px;
  position: relative;
  width: 825px;
  height: 50px;
  bottom: 50px;
  color:blue;
}
.vl {
  position: relative;
  border-left: 6px solid red;
  height: 5250px;
  width: 50px;
  top: 65px;
}
.vr {
  position: relative;
  border-right: 6px solid red;
  height: 5250px;
  width: 50px;
  top: 65px;
  left: 0px;
}
.picture{
  position: fixed;
  bottom:1000px;
  left: 0px;
  width: 10px;
  height: 10px;
}
</style>