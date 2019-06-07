<template>
  <div class="snote-inactive" v-show="!get_note.deleted" v-bind:style="{top:get_note.y+'px', left:get_note.x+'px'}"> <!-- always has class snote-inactive, snote-active is also applied when selected is true -->
    <textarea class="snote-input" v-model="get_note.content" rows="5" readonly></textarea>
    <p class="snote-text attr">Written by {{ get_note.author }}</p>
    <p class="snote-text">{{ get_date }}</p>
  </div>

</template>

<script lang="ts" src="./studentsnote.ts"></script>

<style lang="scss">
</style>