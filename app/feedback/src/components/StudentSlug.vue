
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="name">
        <span class="banner"> Student: {{student}} </span>
      </div>
      <div class="other">
        <span class="banner"> Your Completed Assignments </span>
      </div>
      <StudentAccordion v-for="assign in assignments" :key="assign.idx" :assign_idx="assign.idx"></StudentAccordion>
      <!-- <div class="bgimg" v-bind:style="{'background-image': 'url(' + get_image_path +')'}">
        <student-snote v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.get_note"/>
      </div> -->

    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./studentslug.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.name {
  float: right;
  text-align: right;
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
