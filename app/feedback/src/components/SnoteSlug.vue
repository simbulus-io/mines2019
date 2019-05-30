<template>
	<div class="slug" v-if="!note.deleted">
		<p>{{ note.content }}</p>
		<h5 class="meta" style="font-style: italic;">Written by {{ note.author }} | </h5><h6>{{ get_date }}</h6>
	</div>
</template>

<script lang="ts" src="./snoteslug.ts"></script>

<style lang="scss">
.slug {
	margin: 10px;
	padding: 10px;
	border: 2px solid black;
	background-color: rgba(223, 249, 251,1.0);
}
div.snote {
	
	h2 {
		text-decoration: underline;
	}
	h5, h6 {
		display: inline;
	}
	p.meta {
		font-style: italic;
	}
}
</style>