<template>
	<div class="services">
		<ToTopBtn />
		<Header class="services__header" />
		<div class="services__scroll-container" ref="container">
			<ServicesBlock
				class="services-block"
				:key="index"
				v-for="(block, index) in blocks"
				:block="block"
				:index="index"
			/>
		</div>
		<Footer class="services__footer" />
	</div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from 'vuex';
import {
	useRoute,
	useRouter,
	onBeforeRouteUpdate,
	onBeforeRouteLeave,
} from 'vue-router';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ServicesBlock from '@/components/ServicesView/ServicesBlock/ServicesBlock.vue';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ToTopBtn from '../../components/ToTopBtn/ToTopBtn.vue';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const container = ref(null);
const store = useStore();
const blocks = computed(() => store.getters['Services/ServicesBlocks']);
let lenisGlobal = null;
let gsapTickerCallback = null;
const isWideScreen = ref(window.innerWidth < 1072);

const initializeScroll = () => {
	if (!isWideScreen.value) {
		if (lenisGlobal) {
			lenisGlobal.destroy();
		}
		lenisGlobal = new Lenis({
			smoothWheel: true,
			duration: 0.7,
			wheelMultiplier: 1.2,
			animatedScroll: 0,
			easing: (x) => Math.sin((x * Math.PI) / 2),
		});
		lenisGlobal.on('scroll', ScrollTrigger.update);

		gsapTickerCallback = (time) => {
			if (lenisGlobal) {
				lenisGlobal.raf(time * 1000);
			}
		};

		gsap.ticker.add(gsapTickerCallback);
		gsap.ticker.lagSmoothing(0);
	}
};

const cleanUp = () => {
	if (lenisGlobal) {
		lenisGlobal.destroy();
		lenisGlobal = null;
	}
	if (gsapTickerCallback) {
		gsap.ticker.remove(gsapTickerCallback);
		gsapTickerCallback = null;
	}
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

const setupScrollAnimations = (enable) => {
	if (enable) {
		initializeScroll();
		const tlsv = gsap.timeline({
			scrollTrigger: {
				trigger: '.services',
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				snap: {
					snapTo: [0, 0.1421, 0.2857, 0.428, 0.5714, 0.714, 0.857, 0.99999],
					duration: 0.5,
					ease: 'power1.inOut',
				},
			},
			ease: 'power2.inOut',
		});

		blocks.value.forEach((_, i) => {
			const blockIndex = i + 1;
			const commonSettings = { duration: 2 };

			const bgSelector = `.services .services-block__bg${blockIndex}`;
			const titleSelector = `.services .services-block__title${blockIndex}`;
			const textSelector = `.services .services-block__text${blockIndex}`;
			const numSelector = `.services .services-block__num${blockIndex}`;
			const imageSelector = `.services .services-block__image${blockIndex}`;

			if (document.querySelector(bgSelector) && i !== 0) {
				tlsv.fromTo(
					bgSelector,
					{ height: '0vh', top: '100vh' },
					{ height: '100vh', top: '0vh', ...commonSettings },
					'<'
				);
			}
			if (document.querySelector(titleSelector) && i !== 0) {
				tlsv.fromTo(
					titleSelector,
					{ top: '-100vh' },
					{ top: '0vh', ...commonSettings },
					'<'
				);
			}
			if (document.querySelector(textSelector) && i !== 0) {
				tlsv.fromTo(
					textSelector,
					{ bottom: '-100vh' },
					{ bottom: '0vh', ...commonSettings },
					'<'
				);
			}
			if (document.querySelector(numSelector) && i !== 0) {
				tlsv.fromTo(
					numSelector,
					{ opacity: '0' },
					{ opacity: '1', ...commonSettings },
					'<'
				);
			}
			if (i !== 0 && i !== 7) {
				gsap.set(imageSelector, { rotate: 0 });
				tlsv
					.fromTo(
						bgSelector,
						{ rotateZ: 2 },
						{ rotateZ: 0, duration: 1 },
						'-=1'
					)
					.fromTo(
						imageSelector,
						{ rotateZ: 2 },
						{ rotateZ: 0, duration: 1 },
						'-=1'
					);
			}
			if (document.querySelector(imageSelector)) {
				tlsv
					.fromTo(
						imageSelector,
						{ height: '0%' },
						{ height: i === 7 ? 'auto' : '100%', ...commonSettings }
					)
					.to(
						titleSelector,
						{ top: i === 7 ? '0vh' : '-100vh', ...commonSettings },
						'<'
					)
					.to(
						textSelector,
						{ bottom: i === 7 ? '0vh' : '-100vh', ...commonSettings },
						'<'
					)
					.to(
						numSelector,
						{ opacity: i === 7 ? '1' : '0', ...commonSettings },
						'<'
					)
					.fromTo(
						bgSelector,
						{ height: '100vh' },
						{
							height: i === 7 ? '100vh' : '0vh',
							...commonSettings,
						},
						'<'
					)
					.fromTo(
						`.services .services-block__image${i}`,
						{ opacity: 1 },
						{ opacity: 0, ease: 'power4.in', ...commonSettings },
						'<'
					);
			}
		});
	} else {
		cleanUp();
	}
};

onMounted(() => {
	ScrollTrigger.refresh();
	setupScrollAnimations(true);
	gsap.to(window, { scrollTo: 0, duration: 1 });
});

onBeforeUnmount(() => {
	setupScrollAnimations(false);
});

onUnmounted(() => {
	cleanUp();
});

onBeforeRouteUpdate((to, from, next) => {
	if (to.params.id !== from.params.id) {
		setupScrollAnimations(false);
		gsap.to(window, { scrollTo: 0, duration: 1 });
		setupScrollAnimations(true);
	}
	next();
});

onBeforeRouteLeave((to, from, next) => {
	setupScrollAnimations(false);
	next();
});
</script>

<style lang="scss" src="./services-view.scss" />
