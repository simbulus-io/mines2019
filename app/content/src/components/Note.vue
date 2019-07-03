<template>
  <div>
    <textarea
      class="lesson-input"
      v-model="note.text"
      rows="5">
    </textarea>
  </div>
</template>

<script lang="ts" src="./note.ts"></script>

<style scoped lang="scss">
@import "../styles/common.scss";
.lesson-input {
    width: 100%;
}
</style>