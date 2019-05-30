<template>
	<div class="snote-inactive" v-if="!note.deleted && !note.selected" v-on:click="note.selected=true">
		<p>{{ note.content }}</p>
		<h5 class="meta" style="font-style: italic;">Written by {{ note.author }}</h5>
		<h6>{{ get_date }}</h6>
	</div>
	<div class="snote-active" v-else-if="!note.deleted && note.selected">
		<button class="delete" v-on:click="delete_snote"><font-awesome-icon icon="trash" color="rgba(235, 77, 75,1.0)"/></button>
		<p>{{ note.content }}</p>
		<h5 class="meta" style="font-style: italic;">Written by {{ note.author }}</h5>
		<h6>{{ get_date }}</h6>
	</div>
</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
.delete {
	float: right;
}
[class*="snote-"] {
	display: inline-block;
	margin: 10px;
	padding: 10px;
	max-width: 300px;
	//opacity: 0.2;
}
.snote-inactive {
	background-color: rgba(246, 229, 141,1.0); // last value controls transparency
}
.snote-active {
	background-color: rgba(249, 202, 36,1.0); // last value controls transparency
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