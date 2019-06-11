<template>

  <router-link :to="{ name: 'teacherassignment', params: { idx: assign_idx } }">
    <div class="assign-thumb" > <!-- v-on:click="go_to_assignment" -->
        <!-- <p><strong>Assignment:</strong> {{get_assignment.title}}</p> -->
        <p><strong>Student:</strong> {{get_student.name}}</p>
        <img v-bind:src="get_img_path" :alt="get_student.name+'\'s worksheet. Can\'t find '+get_assignment.url" width="100%">
        <!-- TODO: fix images only being able to be in component folder-->
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
  max-width: 200px;
  height: auto;
  background-color: rgba(48, 51, 107,1.0); // last value controls transparency
  text-align: left;
  font-family: sans-serif;
  color: white;
}
.bgimg {
    background-position: center center;
    position:relative;
    display:inline-block;
    background-size:contain; // also cover is an option
    background-repeat:no-repeat;
    // background-image: url("../../public/wkst.jpg");
    // //background-image: url("../../public/kitten.jpg");
    background-repeat: no-repeat;
    height: 200px;
    width: auto;
    max-width: 100%;
}
</style>