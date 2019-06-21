<template>
  <div class="segment-ui">
    Hello segment UI
    <div class="ui-cont"
         @mousedown="handle_down"
         @mouseup="handle_up"
         @contextmenu="disable_context">
      <div v-for="item in get_segments()" class="segment" :style="get_segment_style(item)"></div>
      <img :src="prop_server + prop_job.summary.image" />
    </div>
    <br><button>Upload (coming soon!)</button>
  </div>
</template>

<script lang="ts" src="./segment_ui.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../styles/common.scss";
  .segment-ui {
    position: relative;
    border: 2px solid #80808a;
    height: 90vh;
    width: 900px;
    overflow-y: scroll;
    margin-left: 30px;
    margin-top: 10px;
    .ui-cont {
      position:relative;
      width:100%;
      height:100%;
      .segment {
        width:100%;
        height:1px;
        background-color:#111;
        border-top:1px solid #f00;
        opacity:0.2;
        position: absolute;
        &.hit { background-color: rgba(0,0,255,0.25) }
      }
      img {
        display: block;
        margin: 10px;
        border: 2px solid #ccc;
        pointer-events:none;
      }
    }
  }

</style>

