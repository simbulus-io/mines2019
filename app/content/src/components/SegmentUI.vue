<template>
  <div class="segment-ui" :style="get_outer_style()">

    <!-- stage 1 -->
    <div class="ui-cont"
         @mousedown="handle_paint_down"
         @contextmenu="disable_context"
         v-if="ui_stage==1">
      <div v-for="(item,index) in get_segments()"
           class="segment"
           :style="get_segment_style(item)"
           :key="index"></div>
      <img :src="prop_content_image" />
      <button class="stage-btn" @click="handle_stage2">Continue to Stage 2</button>
    </div>

    <!-- stage 2 -->
    <div class="ui-cont"
         v-if="ui_stage==2"
         @contextmenu="disable_context">
      <div v-for="(group,index) in get_groups()"
           class="group-segment-cont"
           :key="index">
           <div v-for="(seg,index) in group.segments" class="sub-segment-cont" :style="get_group_segment_style(seg)" :key="index">
             <div class="sub-segment-img-cont" :style="get_group_segment_img_cont_style(seg)">
               <img :src="prop_content_image" :style="get_group_segment_img_style(seg)"/>
             </div>
             <div class="bottom-edge" @mousedown="handle_edge_down($event, group, seg)"></div>
           </div>
      </div>
      <button class="stage-btn" @click="handle_stage1">Back to Stage 1</button>
      <button class="stage-btn" @click="handle_upload">Upload (TBD)</button>
    </div>

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
    padding:10px;

    * { user-select: none }

    .ui-cont {
      position:relative;
      display:inline-block;
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
        pointer-events:none;
      }
    }
    .group-segment-cont {
      position: relative;
      border: 2px solid #000;
      margin: 10px;
      margin-bottom:30px;
      padding-top:15px;
      background-color:#fff;
      &:hover {
        .sub-segment-cont .bottom-edge {
          opacity:0.25;
          &:hover {
            border-bottom-width:2px;
            opacity:1.0;
          }
        }
      }
    }
    .sub-segment-cont {
      position:relative;
      overflow:hidden;
      .sub-segment-img-cont {
        position:relative;
        overflow:hidden;
      }
      .bottom-edge {
        position:absolute;
        bottom:0;
        height:15px;
        width:100%;
        border-bottom:1px solid #3b74df;
        opacity:0;
        transition:opacity 0.2s linear;
        cursor:grab;
      }
    }
    .stage-btn {
      font-size:20px;
      padding:10px;
      margin:20px;
    }
  }

</style>

