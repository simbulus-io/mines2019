
<template>
    <MainContent>
        <template v-slot:main-content>
            <div class="other">
                <span class="banner"> Student Assignments: Feedback </span>
                <span class="banner"> {{assignment_titles}} </span>
            </div>
            <div id="app">
                <TeacherAccordion v-for="assign in assignment_titles" :key="assignment_idx(assign)" :assign_idx="assignment_idx(assign)" :assign_title="assign"></TeacherAccordion>
                <!-- <assignment-thumb v-for="assign in assignments" :assign_idx="assign.idx" :key="assign.idx"/>  :assign_img_url="require(assign.url)" -->
            </div>
        </template>
    </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./teacherslug.ts"></script>

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
    color: #555;
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
