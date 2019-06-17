
<template>
    <div>
        <canvas id="canvas"
         v-on:mousedown="handleMouseDown"
         v-on:mouseup="handleMouseUp" 
         v-on:mousemove="handleMouseMove" 
         width="800px" height="768px">
        </canvas>
    </div>
</template>

<script lang="ts" src="./drawingboard.ts">

</script>

<style>




canvas {
    z-index: 10;
    /* opacity: 0.5; */
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}
</style>