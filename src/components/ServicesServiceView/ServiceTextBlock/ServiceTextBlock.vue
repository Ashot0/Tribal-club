<template>
	<div class="services-service__it-is-all it-is-all">
		<div class="it-is-all__title">{{ title }}</div>
		<div class="it-is-all__text">{{ text }}</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped src="./service-text-block.scss" />
