<template>
	<div class="crafting-careers">
		<div class="crafting-careers__wrapper">
			<div class="crafting-careers__title">
				Crafting Careers
				<p class="blue-text">Together</p>
			</div>
			<div class="crafting-careers__text">
				We're a dynamic sports agency dedicated to transforming local talent
				into global icons, providing comprehensive support to both athletes and
				clubs to achieve their highest potential.
			</div>
			<Button class="crafting-careers__button" :text="'About us'" />
		</div>
	</div>
</template>

<script>
import Button from '../../Button/Button.vue';
export default {
	components: {
		Button,
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped src="./crafting-careers-block.scss" />
