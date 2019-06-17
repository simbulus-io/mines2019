
<template>
  <MainContent class= "graphbackground">
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="main-layout">
        <span class="banner"> Your Assignment: {{assignment_title}} </span>
      </div>
      <router-link v-bind:to="'/student/slug/'+student_idx">
        <button class="button" title="Return to All Assignments">Return to All Assignments</button>
      </router-link>
      <hr/>
      <div class="bgimg" v-bind:style="{'background-image': 'url(' + assignment_url +')'}">
        <DrawingBoard></DrawingBoard>
        <snote-student v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.note"/>
      </div>
      

    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./studentassignment.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.bgimg {
    background-position: center center;
    position:relative;
    display:inline-block;
    background-size:contain; // also cover is an option
    background-repeat:no-repeat;
    background-repeat: no-repeat;
    min-height: 500px;
    width: 1024px;
    height: 768px;
}
.graphbackground {
  background-position: center;
  background-image: url('../../public/graphpaper.png');
  z-index: 0;
  background-repeat: repeat;
}
</style>
