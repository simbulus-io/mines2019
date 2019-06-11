
<template>
    <div>
        <canvas id="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="800px" height="800px">

        </canvas>
    </div>
</template>

<script lang="ts" src="./drawingboard.ts">

</script>

<style>
body {
  margin: 2rem;
  /* opacity: 0.7; */
}


canvas {
    
    /* opacity: 0.5; */
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}
</style>