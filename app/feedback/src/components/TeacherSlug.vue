
<template>
    <MainContent>
        <template v-slot:main-content>
            <div class="main-layout">
                <p class="name">Logged In As: Mr. RZA</p>
                <span class="banner">Completed Student Assignments: Give Feedback</span>
            </div>
            <div id="app">
                <TeacherAccordion v-for="assign in assignment_titles" :key="assignment_idx(assign)" :assign_idx="assignment_idx(assign)" :assign_title="assign"></TeacherAccordion>
            </div>
        </template>
    </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./teacherslug.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
</style>
