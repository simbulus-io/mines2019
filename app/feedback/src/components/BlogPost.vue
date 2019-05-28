<template>
	<div class="blogpost">
		<h2>{{ post.last_name }}</h2>
		<p>{{ post.last_name }}</p>
		<p class="meta">Written by {{ post.first_name }}</p>
	</div>
</template>

<script lang="ts" src="./blog_post.ts"></script>

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