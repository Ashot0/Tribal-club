<template>
	<div class="scroll-text-mobile-block">
		<div class="scroll-text-mobile-block__wrapper">
			<h1 class="transparent-text-mobile">
				what happens in Vegas<br />
				does not stay in vegas
			</h1>
			<img
				class="scroll-text-mobile-block__bg"
				src="@/assets/services-service/scroll-text/1.png"
				alt="vwgas mobile"
			/>
		</div>
	</div>
</template>

<script>
import { onMounted, ref, onUnmounted } from 'vue';
import { gsap } from 'gsap';
export default {
	name: 'TransparentTextBlock',
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped src="./scroll-text-mobile.scss" />
