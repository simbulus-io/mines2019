
<template>
  <div class="line_separator" id="line_separator" style="position: relative;">
    <button class="button" type="button" v-on:click="get_location();submit_locations(line_data);">Submit</button>

    <!--Adds Image to page-->
    <img src="./EngageNY/Algebra1-m03-b-l08.png">

    

    <!--Makes lines draggable-->
    <div class="line-container" v-for="line in line_data" :key="line">
      <drag-it-dude class="line" :y="`${line.y}`">
        <div style="background:red; width:100%; height:5px; margin:25px"></div>
      </drag-it-dude>
    </div>

  </div>
</template>

<script lang="ts" src="./line_separator.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";

.line_separator {
  position: absolute;
  width: 825px;
  height: 5550px;
}

.line-container {
  width: 100%;
  height: 100%;
}

.line {
  width:100%;
}
.picture {
  position: fixed;
  bottom: 1000px;
  left: 0px;
  width: 10px;
  height: 10px;
}
.button {
  position: fixed;
  bottom: 0px;
  right: 0px;

  height: 50px;
  width: 200px;
}
</style>