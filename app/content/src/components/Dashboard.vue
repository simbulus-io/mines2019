<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <h1 v-show="content_selection===''"> No Lesson Selected </h1>
        <div v-show="content_selection!==''">
          <h1>{{lesson_name}} from {{lesson_path}}</h1>
          <hr class="main-hr"/>
          <leaf-view v-bind:lesson_idx="content_selection"/>
          <hr class="main-hr"/>
          <ingest/>
          <hr class="main-hr"/>
          <segment/>
        </div>
      </div>
    </template>
  </MainContent>
</template>

<script lang="ts" src="./dashboard.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.main-hr {
  border-top: 10px double $wm_gray;
  background-color: transparent;
}
</style>
