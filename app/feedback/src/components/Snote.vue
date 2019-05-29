<template>
	<div class="snote">
		<h2>{{ note.content }}</h2>
		<p>{{ note.timestamp }}</p>
		<p class="meta">Written by {{ note.author }}</p>
	</div>
</template>

<script lang="ts" src="./snote.ts"></script>

<style lang="scss">
div.blogpost {
	h2 {
		text-decoration: underline;
	}
	p.meta {
		font-style: italic;
	}
}
</style>