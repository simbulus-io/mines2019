<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <leaf-view v-bind:lesson_idx="content_selection"/>
	    </div>
    </template>
  </MainContent>
</template>

<script lang="ts" src="./dashboard.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";

</style>
