<template>
  <div class="errors">
    <h2 v-if="reported_errors.length>0">Errors:</h2>
    <ol v-for="(msg,index) in reported_errors" :key="index">
    <li> {{msg.trim()}}</li>
    </ol>
  </div>
</template>

<script lang="ts" src="./error_reporter.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.error_reporter {
  .errors {
    color: red;
    text-align:left;
    h2 {margin-bottom: 2px;}
    ol {margin-top: 0px; margin-left:20px;font-size: 20px;}
  }
}
</style>




