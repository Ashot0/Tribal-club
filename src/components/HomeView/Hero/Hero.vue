<template>
	<div class="hero">
		<Header class="hero__header" />
		<div class="hero__text hero__text_left">
			<p
				v-for="(text, index) in textArrLeft"
				:key="'left-' + index"
				:class="'hero__left hero__left_' + index"
				v-html="text"
			></p>
		</div>
		<div class="hero__text hero__text_right">
			<p
				v-for="(text, index) in textArrRight"
				:key="'right-' + index"
				:class="'hero__right hero__right_' + index"
				v-html="text"
			></p>
		</div>
		<div class="hero__blocks blocks" ref="blocks">
			<ImageFull
				class="hero__block hero__block_1"
				ref="block1"
				:picture="'1.jpg'"
			/>
			<ImageFull
				class="hero__block hero__block_2"
				ref="block2"
				:picture="'2.jpg'"
			/>
			<ImageFull
				class="hero__block hero__block_3"
				ref="block3"
				:picture="'3.jpg'"
			/>
			<ImageFull
				class="hero__block hero__block_4"
				ref="block4"
				:picture="'4.jpg'"
			/>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageFull from '@/components/HomeView/Hero/ImageFull/ImageFull';
import VideoFull from '@/components/HomeView/Hero/VideoFull/VideoFull';
import Header from '@/components/Header/Header';

gsap.registerPlugin(ScrollTrigger);

export default {
	name: 'Hero',
	components: {
		ImageFull,
		VideoFull,
		Header,
	},
	setup() {
		const textArrLeft = [
			'From Local<br> Talent',
			'to <span class="blue-text">Global</span><br> Icons',
			'to <span class="blue-text">International</span><br> Arenas',
			'to <span class="blue-text">Perennial</span><br> Victories',
		];
		const textArrRight = [
			'to <span class="blue-text">Global</span><br> Icons',
			'to <span class="blue-text">International</span><br> Arenas',
			'to <span class="blue-text">Perennial</span><br> Victories',
		];

		const blocksArr = ['block1', 'block2', 'block3', 'block4'];
		const blocks = ref(null);
		const isWideScreen = ref(window.innerWidth < 768);
		const vhScreen = ref(window.innerHeight * 0.013);
		const blockRefs = blocksArr.map(() => ref(null));
		onMounted(() => {
			const tlh = gsap.timeline({
				scrollTrigger: {
					trigger: '.hero',
					start: 'top top',
					end: 'bottom 25%',
					scrub: true,
				},
				delay: 0,
				ease: 'back.inOut',
			});
			blocksArr.forEach((_, i) => {
				const blockIndex = i + 1;
				const topIndex = 1.6 * blockIndex;
				if (blockIndex !== 4) {
					tlh.fromTo(
						`.hero .hero__right_${i}`,
						{
							fontSize: '1em',
						},
						{ fontSize: '0em', duration: 11 },
						'<'
					);

					tlh
						.fromTo(
							`.hero .hero__left_${i}`,
							{ top: '0em' },
							{ height: '1.7em', duration: 12 },
							'<'
						)
						.fromTo(
							`.hero .hero__left_${blockIndex}`,
							{ height: '0em' },
							{ height: '1.7em', duration: 12 },
							'<'
						)
						.to(
							'.hero .hero__text_left',
							{
								top: `-${topIndex}em`,
								duration: 12,
							},
							'<'
						)
						.fromTo(
							`.hero .hero__left_${blockIndex}`,
							{ fontSize: '0em' },
							{ fontSize: '1em', duration: 12 },
							'<'
						);

					tlh.fromTo(
						`.hero .hero__right_${i}`,
						{ height: '1.6em' },
						{ height: '0em', duration: 10 },
						'-=0%'
					);
				}
			});

			tlh
				.to(
					'.hero .hero__text_left',
					{
						top: '-200vh',
						duration: 10,
						ease: 'linear',
					},
					'<'
				)
				.fromTo(
					'.hero .hero__text_right',
					{
						bottom: '0vh',
						marginTop: '0vh',
						ease: 'linear',
					},
					{
						duration: 20,
						bottom: '100vh',
						marginTop: '-30vh',
						ease: 'linear',
					},
					'<'
				);
		});
		onUnmounted(() => {
			let Alltrigger = ScrollTrigger.getAll();
			for (let a = 0; a < Alltrigger.length; a++) {
				Alltrigger[a].kill();
			}
		});

		return { blocks, blockRefs, textArrRight, textArrLeft };
	},
};
</script>

<style lang="scss" scoped src="./hero.scss" />
