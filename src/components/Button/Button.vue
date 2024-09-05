<template>
	<button class="button" :class="!max || 'button__alternative'" :type="type">
		{{ text }}
		<div class="button__img" :class="!max || 'button__alternative_img'">
			<img src="@/assets/icons/ArrowRightDown.svg" alt="button" />
		</div>
	</button>
</template>

<script>
export default {
	props: {
		text: String,
		type: {
			type: String,
			default: 'button',
		},
		max: Boolean,
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped src="./button.scss" />
