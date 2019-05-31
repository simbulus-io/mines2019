<template>
<<<<<<< HEAD
	<div class="snote">
		<h2>{{ note.content }}</h2>
		<p>{{ get_date }}</p>
		<p class="meta" style="font-style: italic;">Written by {{ note.author }}</p>
	</div>
=======

  <!-- TODO: have selected turn to false when click off 
    maybe:
      https://github.com/ndelvalle/v-click-outside
      https://github.com/simplesmiler/vue-clickaway
  -->
  <div class="snote-inactive" v-bind:class="{ 'snote-active': selected }" v-show="!get_note.deleted" v-on:click="selected=true"> <!-- always has class snote-inactive, snote-active is also applied when selected is true -->
    <div class="delete-wrapper" v-show="selected">
      <!-- TODO: have immediately delete note once clicked, also add confirmation -->
      <button class="delete" v-on:click="delete_snote"><font-awesome-icon icon="trash" color="rgba(235, 77, 75,1.0)"/></button>
	  </div>
    <!-- TODO: have content update when exit out of note. -->
    <textarea class="snote-input" v-model="get_note.content" max-rows="5" v-bind:readonly="!selected"></textarea>
    <p class="snote-text attr">Written by {{ get_note.author }}</p>
    <p class="snote-text">{{ get_date }}</p>
  </div>
  

>>>>>>> feedback
</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
<<<<<<< HEAD
.snote {
	background-color: rgba(246, 229, 141,1.0); // last value controls transparency
	display: inline-block;
	margin: 10px;
	padding: 10px;
	max-width: 300px;
	//opacity: 0.2;
}
div.blogpost {
	h2 {
		text-decoration: underline;
	}
	p.meta {
		font-style: italic;
	}
=======
.snote-input {
  resize: none;
  background-color: inherit;
  border: none;
}
.delete {
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
>>>>>>> feedback
}
</style>