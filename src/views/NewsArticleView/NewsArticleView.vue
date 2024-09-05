<template>
	<div class="article">
		<ToTopBtn />
		<Header />
		<ArticleHero :item="item" />
		<ArticleTextBlock
			:item="item"
			:firstPart="firstPart"
			:secondPart="secondPart"
		/>
		<ArticleShare />
		<LastBlock
			v-if="lastBlock"
			:lastBlock="lastBlock"
			@next-article="goNextArticle"
		/>
		<Footer class="article__footer" />
	</div>
</template>

<script>
import { ref, onUnmounted, onMounted, computed } from 'vue';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ArticleHero from '@/components/NewArticleView/ArticleHero/ArticleHero.vue';
import ArticleTextBlock from '@/components/NewArticleView/ArticleTextBlock/ArticleTextBlock.vue';
import ArticleShare from '@/components/NewArticleView/ArticleShare/ArticleShare.vue';
import LastBlock from '@/components/NewArticleView/LastBlock/LastBlock.vue';
import ToTopBtn from '../../components/ToTopBtn/ToTopBtn.vue';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

let lenisGlobal = null;
let gsapTickerCallback = null;

export default {
	name: 'NewsArticleView',
	components: {
		Footer,
		Header,
		ArticleHero,
		ArticleTextBlock,
		ArticleShare,
		LastBlock,
		ToTopBtn,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();

		const newsItems = computed(() => store.getters['News/newsItems']);
		const item = computed(() => newsItems.value[route.params.id]);
		const lastBlock = computed(
			() => newsItems.value[parseInt(route.params.id) + 1] || null
		);

		const firstPart = computed(() => getFirstPart(item));
		const secondPart = computed(() => getSecondPart(item));

		const goNextArticle = () => {
			router.push(`/news/${lastBlock.value.id}`);
		};

		const isWideScreen = ref(window.innerWidth > 1072);
		const updateScreenWidth = () => {
			isWideScreen.value = window.innerWidth > 1072;
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
			window.removeEventListener('resize', updateScreenWidth);
		};

		const initializeScroll = () => {
			if (isWideScreen.value) {
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

		onMounted(() => {
			gsap.to(window, { scrollTo: 0, duration: isWideScreen.value ? 1 : 0.2 });
			window.addEventListener('resize', updateScreenWidth);
			initializeScroll();
		});

		onUnmounted(() => {
			cleanUp();
		});

		return {
			newsItems,
			item,
			lastBlock,
			goNextArticle,
			firstPart,
			secondPart,
			cleanUp,
			initializeScroll,
		};
	},
	beforeRouteUpdate(to, from, next) {
		if (to.params.id !== from.params.id) {
			this.cleanUp();
			gsap.to(window, { scrollTo: 0, duration: 1 });
			this.initializeScroll();
		}
		next();
	},
	beforeRouteLeave(to, from, next) {
		this.cleanUp();
		next();
	},
};

function getFirstPart(item) {
	if (!item.value.textImage) {
		return item.value.description;
	}
	return item.value.description.slice(
		0,
		Math.floor(item.value.description.length / 2)
	);
}

function getSecondPart(item) {
	if (!item.value.textImage) {
		return '';
	}
	return item.value.description.slice(
		Math.floor(item.value.description.length / 2)
	);
}
</script>

<style lang="scss" src="./news-article-view.scss" />
