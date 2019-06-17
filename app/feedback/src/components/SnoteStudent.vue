<template>
  <div class="snote-inactive snote-wrapper" v-show="!note_deleted" v-bind:style="{top:note_y+'px', left:note_x+'px'}">
    <textarea class="snote-input" v-model="note_content" rows="5" readonly></textarea>
    <p class="snote-text attr">Written by {{ note_author }}</p>
    <p class="snote-text">{{ date }}</p>
  </div>

</template>

<script lang="ts" src="./snotestudent.ts"></script>

<style lang="scss">
@import "../styles/common.scss";
</style>