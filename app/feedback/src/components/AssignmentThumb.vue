<template>

  <router-link :to="{ name: 'teacherassignment', params: { idx: assign_idx } }">
    <div class="assign-thumb" > <!-- v-on:click="go_to_assignment" -->
        <p><strong>Assignment:</strong> {{get_assignment.title}}</p>
        <img v-bind:src="get_assignment.url" alt="Kitti" width="100%">
        <!-- TODO: fix images only being able to be in component folder-->
        <p><strong>Student:</strong> {{get_assignment.student}}</p>
    </div>
  </router-link>

</template>

<script lang="ts" src="./assignmentthumb.ts"></script>

<style lang="scss">

.assign-thumb {
  position: inline;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  max-width: 300px;
  height: auto;
  background-color: rgba(199, 236, 238,1.0); // last value controls transparency
  text-align: left;
}
.bgimg {
    background-position: center center;
    position:relative;
    display:inline-block;
    background-size:contain; // also cover is an option
    background-repeat:no-repeat;
    // background-image: url("../../public/sample_wkst.jpg");
    // //background-image: url("../../public/kitten.jpg");
    background-repeat: no-repeat;
    height: 200px;
    width: auto;
    max-width: 100%;
}
</style>