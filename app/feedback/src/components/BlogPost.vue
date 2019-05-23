<template>
	<div class="blogpost">
		<h2>{{ post.title }}</h2>
		<p>{{ post.body }}</p>
		<p class="meta">Written by {{ post.author }} on {{ date }}</p>
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