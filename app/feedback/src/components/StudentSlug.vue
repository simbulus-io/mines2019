
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="main-layout">
        <p class="name">Student: {{student.name}}</p> <!-- TODO: repeat why must be here (repeat of similar issue; not solved with JSON.parse)-->
        <span class="banner">Your Completed Assignments</span>
      </div>
      <StudentAccordion v-for="assign in assignments" :key="assign.idx" :assign_idx="assign.idx"></StudentAccordion>
    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./studentslug.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
</style>
