<template>
  <!-- TODO: have dropping the note set the selected to false (can't get without delay even with Vue.set -->
  <drag-it-dude
    class="snote-wrapper"
    @activated="handle_activate"
    @dragging="handle_dragging"
    @dropped="handle_dropped"
    :x="note_x"
    :y="note_y"
    :selected="selected">

    <!-- @dragging="selected=false"
    @dropped="move_snote($event)"
    v-bind:style="{top:get_note.y+'px', left:get_note.x+'px'}" -->
    <!-- v-bind:style="{top:note_y+'px', left:note_x+'px'}" -->
    <div class="close-wrapper" v-show="selected">
      <button class="snote-close-button" v-on:click="save_exit_snote" @click.stop>
        <font-awesome-icon icon="times" color="rgba(189, 195, 199,1.0)"/>
      </button>
      <!-- @click.stop needed to keep Snote click listener from changing selected right back to true -->
    </div>
    <div
      class="snote-inactive"
      v-bind:class="{ 'snote-active': selected }"
      v-show="!note_deleted"
      v-click-outside="onClickOutside"
      >
      <!-- v-on:click="selected=true" ^always has class snote-inactive, snote-active is also applied when selected is true -->
      <div class="button-wrapper" v-show="selected">
        <button class="snote-button" v-on:click="delete_snote"><font-awesome-icon icon="trash" color="rgba(235, 77, 75,1.0)"/></button>
      </div>
      <div class="button-wrapper" v-show="!selected">
        <button class="snote-button" v-on:click="selected=true"><font-awesome-icon icon="edit" color="rgba(105, 105, 105,1.0)"/></button>
      </div>
      <!-- TODO: fix so does not drag when editing. Causing not to be able to highlight -->
      <!-- TODO: have textarea be size of content (currently set at 5) -->
      <textarea class="snote-input" v-model="note.content" rows="5" v-bind:readonly="!selected"></textarea>
      <p class="snote-text attr">Written by {{ note_author }}</p>
      <p class="snote-text">{{ date }}</p>
      <!-- <div class="button-wrapper" v-show="selected">
        <button class="snote-button" v-on:click="move_snote_prompt" @click.stop>Move Note</button>
      </div> -->
    </div>
  </drag-it-dude>

</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
.snote-wrapper {
  position: absolute;
}
.close-wrapper {
  display: block;
  float: right;
  margin-bottom: 2px;
}
.snote-input {
  resize: none;
  background-color: inherit;
  border: none;
}
.snote-button {
	float: right;
  margin-bottom: 10px;
  border-radius: 20%;
  border: none;
}
.snote-close-button {
	border-radius: 50%;
  border-color: rgba(189, 195, 199,1.0);
  background-color: rgba(245, 246, 250,1.0);
}
.snote-text {
  font-size: 8pt;
  font-family: sans-serif;
}
.attr {
  font-style: italic;
}
.snote-inactive {
  clear: both;
  display: block;
  float: left;
	padding: 10px;
	max-width: 300px;
	background-color: rgba(246, 229, 141,1.0); // last value controls transparency
  text-align: right;
}
.snote-active {
	background-color: rgba(249, 202, 36,1.0);
  .snote-input {
    background-color: rgba(255, 255, 255,1.0);
    border: 1px solid grey;
  }
}
</style>