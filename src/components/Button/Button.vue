<template>
	<button
		:class="!max ? 'button' : 'max'"
		:type="$props.type === null ? 'button' : $props.type"
	>
		{{ $props.text }}
		<div class="button__img">
			<img src="@/assets/icons/ArrowRightDown.svg" alt="" />
		</div>
	</button>
</template>

<script>
export default {
	props: {
		text: String,
		type: String,
		max: Boolean,
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped src="./button.scss" />
