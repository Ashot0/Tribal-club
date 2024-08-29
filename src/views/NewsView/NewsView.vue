<template>
	<div class="news">
		<ToTopBtn />
		<Header />
		<h1 class="news__title">Stay updated</h1>
		<NewsBlock :items="newsItems" />
		<Footer />
	</div>
</template>

<script>
import { onUnmounted, computed, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from 'vuex';
import NewsBlock from '@/components/NewsView/NewsBlock/NewsBlock';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ToTopBtn from '../../components/ToTopBtn/ToTopBtn.vue';

gsap.registerPlugin(ScrollTrigger);

export default {
	name: 'NewsView',
	components: {
		NewsBlock,
		Header,
		Footer,
		ToTopBtn,
	},

	setup() {
		const store = useStore();
		const newsItems = computed(() => store.getters['News/newsItems']);
		const isWideScreen = ref(window.innerWidth > 1072);

		let lenisGlobal;

		onMounted(() => {
			if (isWideScreen.value) {
				lenisGlobal = new Lenis({
					smoothWheel: true,
					duration: 0.7,
					wheelMultiplier: 1.2,
					animatedScroll: 0,
					easing: (x) => Math.sin((x * Math.PI) / 2),
				});
				lenisGlobal.on('scroll', ScrollTrigger.update);

				gsap.ticker.add((time) => {
					lenisGlobal.raf(time * 1000);
				});
				gsap.ticker.lagSmoothing(0);
			}
		});

		onUnmounted(() => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			if (lenisGlobal) {
				lenisGlobal.destroy();
			}
		});

		return {
			newsItems,
		};
	},
};
</script>

<style lang="scss" scoped src="./news-view.scss" />
