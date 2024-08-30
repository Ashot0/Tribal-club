<template>
	<div class="home">
		<ToTopBtn />
		<Hero />
		<CraftingCareersBlock />
		<BrandMarketing />
		<WorkWithUs />
		<Footer class="home__footer" />
	</div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/HomeView/Hero/Hero.vue';
import CraftingCareersBlock from '@/components/HomeView/CraftingCareersBlock/CraftingCareersBlock.vue';
import BrandMarketing from '@/components/HomeView/BrandMarketing/BrandMarketing.vue';
import WorkWithUs from '@/components/HomeView/WorkWithUs/WorkWithUs.vue';
import Footer from '@/components/Footer/Footer.vue';
import ToTopBtn from '@/components/ToTopBtn/ToTopBtn.vue';

gsap.registerPlugin(ScrollTrigger);

let lenisGlobal = null;

const isWideScreen = ref(window.innerWidth < 1072);

export default {
	name: 'HomeView',
	components: {
		Hero,
		CraftingCareersBlock,
		BrandMarketing,
		WorkWithUs,
		Footer,
		ToTopBtn,
	},
	setup() {
		onMounted(() => {
			if (!isWideScreen.value) {
				lenisGlobal = new Lenis({
					smoothWheel: true,
					duration: 0.7,
					wheelMultiplier: 1.2,
					animatedScroll: 0,
					easing: (x) => Math.sin((x * Math.PI) / 2),
				});
				lenisGlobal.on('scroll', ScrollTrigger.update);

				gsap.ticker.add((time) => {
					if (lenisGlobal) {
						lenisGlobal.raf(time * 1000);
					}
				});
				gsap.ticker.lagSmoothing(0);
			}
		});

		onUnmounted(() => {
			if (lenisGlobal) {
				lenisGlobal.destroy();
				lenisGlobal = null;
			}
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		});
	},
	beforeRouteLeave(to, from, next) {
		if (lenisGlobal) {
			lenisGlobal.destroy();
			lenisGlobal = null;
		}
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		next();
	},
};
</script>

<style lang="scss" src="./home-view.scss" />
