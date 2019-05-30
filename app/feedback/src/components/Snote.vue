<template>
	<div class="snote">
		<h2>{{ note.content }}</h2>
		<p>{{ get_date }}</p>
		<p class="meta" style="font-style: italic;">Written by {{ note.author }}</p>
	</div>
</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
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
}
</style>