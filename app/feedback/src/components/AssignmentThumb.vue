<template>

  <router-link :to="{ name: 'teacherassignment', params: { idx: assign_idx } }">
    <div class="assign-thumb" >
      <p><strong>Student:</strong> {{student_name}}</p>
      <img v-bind:src="assignment_url" :alt="`${student_name}'s worksheet. Can't find ${assignment_url}`" width="100%">
    </div>
  </router-link>

</template>

<script lang="ts" src="./assignmentthumb.ts"></script>

<style lang="scss">
@import "../styles/common.scss";
.assign-thumb {
  position: inline;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  max-width: 200px;
  height: auto;
  background-color: $wm_purple;
  text-align: left;
  color: $white;
}
</style>