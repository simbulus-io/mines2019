
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <span class="banner"> An Assignment </span>
      </div>
      <!-- <Snote v-for="curr_note in snotes" :note="curr_note" :key="curr_note.idx" /> -->
      <!-- img v-bind:src=image_path width="200"/> -->
      <div class="bgimg" v-bind:style="{'background-image': 'url(' + get_image_path +')'}">
        <snote v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.get_note"/>
      </div>

    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./assignment.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.bgimg {
    background-position: center center;
    position:relative;
    display:inline-block;
    background-size:contain; // also cover is an option
    background-repeat:no-repeat;
    // background-image: url("../../public/sample_wkst.jpg");
    // //background-image: url("../../public/kitten.jpg");
    background-repeat: no-repeat;
    min-height: 500px;
    width: 100%;
}
.other {
  position: relative;
  $left_margin: 60px;
  margin: 0 auto;
  text-align: left;
  min-width: 900px;
  .banner {
    display: inline-block;
    margin: 50px 0 0 $left_margin;
    font-size: 30px;
    font-weight: 300;
    line-height: 36px;
    text-align: left;
    user-select: none;
    color: #555;
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

</style>
