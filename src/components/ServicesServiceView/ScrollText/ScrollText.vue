<template>
	<div class="scroll-text-block">
		<div class="scroll-text-block__wrapper">
			<h1 class="scroll-text-block__transparent-text" ref="textBlock">
				what happens in Vegas<br />
				does not stay in vegas
			</h1>
			<img
				class="scroll-text-block__bg"
				src="@/assets/services-service/scroll-text/1.png"
				alt="vegas"
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
		const textBlock = ref(null);

		onMounted(() => {
			const tlst = gsap.timeline({
				scrollTrigger: {
					trigger: '.scroll-text-block',
					start: 'top top',
					end: 'bottom bottom',
					scrub: true,
				},
				ease: 'linear',
			});
			tlst

				.fromTo(
					'.scroll-text-block .scroll-text-block__transparent-text',
					{
						fontSize: '1em',
						height: '100vh',
					},
					{
						fontSize: '3em',
						height: '100vh',
						duration: 10,
						delay: 1,
					}
				)
				.to('.scroll-text-block .scroll-text-block__transparent-text', {
					opacity: 0,
					duration: 10,
				})
				.fromTo(
					'.scroll-text-block .scroll-text-block__bg',
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 10,
					},
					'<'
				);
		});
		onUnmounted(() => {});
		return {
			textBlock,
		};
	},
};
</script>

<style lang="scss" scoped src="./scroll-text.scss" />
