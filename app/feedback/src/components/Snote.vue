<template>

  <!-- TODO: have selected turn to false when click off 6/4 - this might not be needed bc of save and close button (now stretch goal)
    maybe:
      https://github.com/ndelvalle/v-click-outside
      https://github.com/simplesmiler/vue-clickaway // trying this one 5/31
  -->
  
  <div class="snote-inactive" v-bind:class="{ 'snote-active': selected }" v-show="!get_note.deleted" v-on:click="selected=true" v-bind:style="{top:get_note.y+'px', left:get_note.x+'px'}"> <!-- always has class snote-inactive, snote-active is also applied when selected is true -->
    <div class="button-wrapper" v-show="selected">
      <button class="snote-button" v-on:click="delete_snote"><font-awesome-icon icon="trash" color="rgba(235, 77, 75,1.0)"/></button>
    </div>
    <!-- TODO: have content update when exit out of note. -->
    <!-- TODO: have textarea be size of content (currently set at 5) -->
    <textarea class="snote-input" v-model="get_note.content" rows="5" v-bind:readonly="!selected"></textarea>
    <p class="snote-text attr">Written by {{ get_note.author }}</p>
    <p class="snote-text">{{ get_date }}</p>
    <div class="button-wrapper" v-show="selected">
      <button class="snote-button" v-on:click="save_exit_snote" @click.stop>Save &amp; Close Note</button>
      <!-- @click.stop needed to keep Snote click listener from changing selected right back to true -->
    </div>
    <div class="button-wrapper" v-show="selected">
      <button class="snote-button" v-on:click="move_snote" @click.stop>Move Note</button>
      <!-- @click.stop needed to keep Snote click listener from changing selected right back to true -->
    </div>
  </div>

</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
.snote-input {
  resize: none;
  background-color: inherit;
  border: none;
}
.snote-button {
	float: right;
  margin-bottom: 10px;
}
.snote-text {
  font-size: 8pt;
  font-family: sans-serif;
}
.attr {
  font-style: italic;
}
.snote-inactive {
  position: absolute;
  display: inline-block;
	margin: 10px;
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