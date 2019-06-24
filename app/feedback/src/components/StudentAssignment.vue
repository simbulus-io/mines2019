
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="main-layout">
        <span class="banner">Your Assignment: {{assignment_title}}</span>
      </div>

      <router-link v-bind:to="'/student/slug/'+student_idx">
        <button class="assigns-button" title="Return to All Assignments">Return to All Assignments</button>
      </router-link>

      <div class="graphbackground">
        <div class="bgimg" v-bind:style="{'background-image': 'url(' + assignment_url +')'}">
          <DrawingBoard></DrawingBoard>
          <snote-student v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.note"/>
        </div>
      </div>
      
    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./studentassignment.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
</style>
