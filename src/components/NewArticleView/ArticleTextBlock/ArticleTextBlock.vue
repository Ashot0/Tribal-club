<template>
	<div class="article__text-block">
		<div class="article__date">{{ item.date }}</div>
		<div class="article__text">
			<p>{{ firstPart }}</p>
			<img
				class="article__text-img"
				v-if="item.textImage"
				:src="require('@/assets/NewsItems/' + item.textImage)"
				alt="image"
			/>
			<p>{{ secondPart }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ArticleTextBlock',
	props: {
		item: {
			type: Object,
			required: true,
		},
		firstPart: {
			type: String,
			required: true,
		},
		secondPart: {
			type: String,
			required: true,
		},
	},
};
</script>
