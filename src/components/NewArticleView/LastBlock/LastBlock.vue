<template>
	<div class="last-block">
		<div class="last-block__item">
			<h2 class="last-block__header">next news</h2>
			<div @click="goNextArticle" class="last-block__image-wrapper">
				<img
					:src="require('@/assets/NewsItems/' + lastBlock.image)"
					alt="last image"
					class="last-block__image"
				/>
				<h3 class="last-block__title">
					<p class="last-block__date">{{ lastBlock.date }}</p>
					{{ lastBlock.title }}
				</h3>
			</div>
			<p class="last-block__description">
				{{ truncatedDescription }}
				<span @click="goNextArticle">READ MORE</span>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LastBlock',
	props: {
		lastBlock: {
			type: Object,
			required: true,
		},
	},
	computed: {
		truncatedDescription() {
			return this.lastBlock.description.length > 140
				? this.lastBlock.description.substring(0, 140) + '...'
				: this.lastBlock.description;
		},
	},
	methods: {
		goNextArticle() {
			this.$emit('next-article');
		},
	},
};
</script>

<style lang="scss" scoped src="./last-block.scss"></style>
