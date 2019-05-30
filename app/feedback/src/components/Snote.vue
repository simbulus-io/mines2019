<template>

  <!-- TODO: have selected turn to false when click off 
    maybe:
      https://github.com/ndelvalle/v-click-outside
      https://github.com/simplesmiler/vue-clickaway
  -->
  <div class="snote-inactive" v-bind:class="{ 'snote-active': selected }" v-show="!get_note.deleted" v-on:click="selected=true"> <!-- always has class snote-inactive, snote-active is also applied when selected is true -->
    <div class="delete-wrapper" v-show="selected">
      <button class="delete" v-on:click="delete_snote"><font-awesome-icon icon="trash" color="rgba(235, 77, 75,1.0)"/></button>
	  </div>
    <textarea class="sn-input" v-model="get_note.content" rows="2" max-rows="5" v-bind:readonly="!selected"></textarea>
    <!-- <p>{{ note.content }}</p> -->
    <h5 class="meta" style="font-style: italic;">Written by {{ get_note.author }}</h5>
    <h6>{{ get_date }}</h6>
  </div>
  

</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
.sn-input {
  resize: none;
  background-color: inherit;
  border: none;
}
.delete {
	float: right;
  margin-bottom: 10px;
}
// [class*="snote-"] {
// 	display: inline-block;
// 	margin: 10px;
// 	padding: 10px;
// 	max-width: 300px;
// 	//opacity: 0.2;
// }
.snote-inactive {
  display: inline-block;
	margin: 10px;
	padding: 10px;
	max-width: 300px;
	background-color: rgba(246, 229, 141,1.0); // last value controls transparency
  text-align: right;
}
.snote-active {
	background-color: rgba(249, 202, 36,1.0); // last value controls transparency
  .sn-input {
    background-color: rgba(255, 255, 255,1.0);
    border: 1px solid grey;
  }
}
div.snote {
	h2 {
		text-decoration: underline;
	}
	p.meta {
		font-style: italic;
	}
}
</style>