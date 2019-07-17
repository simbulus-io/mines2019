<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <h2>Processing Status: {{status}}</h2>
        <hr/>
        <h2>Completed Processing Jobs:</h2>
        <p v-for="lesson in completed" :key="lesson">{{lesson}}</p>
      </div>
    </template>
  </MainContent>
</template>

<script lang="ts" src="./batch_process.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";

</style>