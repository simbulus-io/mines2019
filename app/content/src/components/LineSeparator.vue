
<template>
  <div class="line_separator" id="line_separator" style="position: relative;">
    <button class="button" type="button" v-on:click="get_location()">Submit</button>
    <button class="button" type="button" v-on:click="position_lines()">Add line</button>

    <img src="./EngageNY/Algebra1-m03-b-l08.png">
    <!--Displays vertical offset of first horizontal segmentation line-->

    <!--Adds Image to page-->

    <!--Makes line(HR tag) draggable-->

    <drag-it-dude>
      <div class="line" id="line1" align="center">
        <hr size="5px" width="99%" color="red">
      </div>
    </drag-it-dude>

    
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
  height: 5550px;
}

.line {
  top: 42px;
  position: relative;
  width: 825px;
  height: 10px;
}
.picture {
  position: fixed;
  bottom: 1000px;
  left: 0px;
  width: 10px;
  height: 10px;
}
.button {
  height: 50px;
  width: 200px;
}
</style>