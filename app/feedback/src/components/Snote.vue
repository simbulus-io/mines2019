<template>
  <drag-it-dude
    class="snote-wrapper"
    @activated="handle_activate"
    @dragging="handle_dragging"
    @dropped="handle_dropped"
    :x="note_x"
    :y="note_y"
    :selected="selected">

    <div class="close-wrapper" v-show="show">
      <button class="snote-close-button" v-on:click="save_exit_snote">
        <font-awesome-icon icon="times" color="#bdbdbd"/>
      </button>
    </div>

    <div
      class="snote-inactive"
      v-bind:class="{ 'snote-active': selected }"
      v-show="!note_deleted"
      v-click-outside="onClickOutside"
      >
      <!-- v-on:click="selected=true" ^always has class snote-inactive, snote-active is also applied when selected is true -->
      <div class="button-wrapper" v-show="selected">
        <button class="snote-button" v-on:click="delete_snote"><font-awesome-icon icon="trash" color="#e84118"/></button>
      </div>
      <div class="button-wrapper" v-show="!selected">
        <button class="snote-button" v-on:click="selected=true"><font-awesome-icon icon="edit" color="#444444"/></button>
      </div>
      <!-- TODO: have textarea be size of content (currently set at 5) -->
      <textarea class="snote-input" v-model="note.content" rows="5" v-bind:readonly="!selected"></textarea>
      <p class="snote-text attr">Written by {{ note_author }}</p>
      <p class="snote-text">{{ date }}</p>
    </div>
    
  </drag-it-dude>

</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
@import "../styles/common.scss";

.close-wrapper {
  display: block;
  float: right;
  margin-bottom: 2px;
}
.snote-input {
  resize: none;
  background-color: inherit;
  border: none;
  outline: none;
}
.snote-button {
	float: right;
  margin-bottom: 10px;
  border-radius: 20%;
  border: none;
}
.snote-close-button {
	border-radius: 50%;
  border-color: $lighter_gray;
  background-color: $white;
}

.snote-active {
	background-color: rgba(249, 202, 36,1.0);
  .snote-input {
    background-color: $white;
    border: 1px solid $lightest_gray;
  }
}
</style>