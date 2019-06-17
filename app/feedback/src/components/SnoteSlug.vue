<template>
	<div class="slug-snote" v-if="!note_deleted">
		<p>{{ note.content }}</p>
		<h6 class="meta" style="font-style: italic;">Written by {{ note_author }}; {{ date }}</h6>
		<hr width="95%"/>
	</div>
</template>

<script lang="ts" src="./snoteslug.ts"></script>

<style lang="scss">
.slug-snote {
	text-align: left;
	display:block;
	width:100%;
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