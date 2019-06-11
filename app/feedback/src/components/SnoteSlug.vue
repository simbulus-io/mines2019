<template>
	<div class="slug" v-if="!get_note.deleted">
		<p>{{ get_note.content }}</p>
		<h6 class="meta" style="font-style: italic;">Written by {{ get_note.author }}</h6>
		<h7>{{ get_date }}</h7>
		<hr width="95%"/>
	</div>
</template>

<script lang="ts" src="./snoteslug.ts"></script>

<style lang="scss">
.slug {
	margin: 5px;
	padding: 5px;
	font-family: sans-serif;
	text-align: left;
	display:block;
	width:100%;
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