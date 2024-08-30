<template>
	<div class="article__hero">
		<img
			class="article__image"
			:src="require('@/assets/NewsItems/' + item.image)"
			alt="article"
		/>
		<h1 class="article__title">
			{{ item.title }}
		</h1>
	</div>
</template>

<script>
export default {
	name: 'ArticleHero',
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
};
</script>
