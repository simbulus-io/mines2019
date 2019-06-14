
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <p class="name"> Student: {{student.name}} </p> <!-- TODO: repeat why must be here (repeat of similar issue; not solved with JSON.parse)-->
        <span class="banner"> Your Completed Assignments </span>
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
    color: $wm_gray;
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name {
    padding: 0px 25px 0px 0px;
    float: right;
    text-align: right;
    display: block;
  }
}

</style>
