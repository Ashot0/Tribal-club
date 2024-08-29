<template>
	<div class="services-service">
		<ToTopBtn />
		<Header />
		<div class="services-service__first">
			<div class="services-service__bg" ref="serviceImg">
				<img :src="getImageUrl(block.picture)" alt="" />
			</div>
			<div class="services-service__right-text">
				<p class="services-service__title" v-html="block.title"></p>
				<p class="services-service__text">{{ block.text }}</p>
				<p class="services-service__text_small">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut
				</p>
			</div>
		</div>
		<ServiceTextBlock
			title="It is all about you"
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"
		/>
		<ScrollGallery :galleryItems="galleryItems" />
		<ServiceTextBlock
			title="It is all about you"
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"
		/>
		<SocialMedia />
		<div class="services-service__scroll-text-container">
			<ScrollText class="services-service__scroll-text" />
			<ScrollTextMobile class="services-service__scroll-text_mobile" />
		</div>
		<ServiceTextBlock
			title="It is all about you"
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"
		/>
		<div v-if="block.id < 7" class="services-service__last last">
			<div class="last__left-text">
				<p class="last__title" v-html="lastBlock.title"></p>
				<p class="last__text">{{ lastBlock.text }}</p>
			</div>
			<img class="last__img" :src="getImageUrl(lastBlock.picture)" alt="" />
			<div @click="goNext" class="last__bg">
				<img
					class="last__bg-img"
					:src="getImageUrl(lastBlock.picture)"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ServiceTextBlock from '@/components/ServicesServiceView/ServiceTextBlock/ServiceTextBlock.vue';
import ScrollGallery from '@/components/ServicesServiceView/ScrollGallery/ScrollGallery.vue';
import ScrollText from '@/components/ServicesServiceView/ScrollText/ScrollText.vue';
import ScrollTextMobile from '@/components/ServicesServiceView/ScrollTextMobile/ScrollTextMobile.vue';
import SocialMedia from '@/components/ServicesServiceView/SocialMedia/SocialMedia.vue';
import ToTopBtn from '../../components/ToTopBtn/ToTopBtn.vue';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default {
	components: {
		Header,
		Footer,
		ServiceTextBlock,
		ScrollGallery,
		ScrollText,
		SocialMedia,
		ScrollTextMobile,
		ToTopBtn,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const data = computed(() => store.getters['Services/ServicesBlocks']);
		const block = computed(() => data.value[route.params.id]);
		const lastBlock = computed(
			() => data.value[parseInt(route.params.id) + 1] || null
		);
		const serviceImg = ref(null);

		const getGalleryItems = () => [
			{ type: 'image', src: '1.jpg' },
			{ type: 'image', src: '2.jpg' },
			{ type: 'image', src: '3.jpg' },
			{ type: 'image', src: '4.jpg' },
			{ type: 'image', src: '5.jpg' },
			{ type: 'image', src: '6.jpg' },
			{ type: 'video', src: '7.mp4' },
		];
		const galleryItems = getGalleryItems();

		const getImageUrl = (picture) => require(`@/assets/services-bg/${picture}`);
		const goNext = () => {
			initAnimations();
			router.push(`/services/${lastBlock.value.id}`);
		};

		onMounted(() => {
			window.scrollTo(0, 0);
			initAnimations();
			window.addEventListener('resize', updateScreenWidth);
			initLenis();
		});

		onUnmounted(() => {
			if (lenis) {
				lenis.destroy();
			}
			window.removeEventListener('resize', updateScreenWidth);
		});

		onBeforeRouteLeave((to, from, next) => {
			if (lenis) {
				lenis.destroy();
			}
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			next();
		});

		const isWideScreen = ref(window.innerWidth > 1072);
		const updateScreenWidth = () => {
			isWideScreen.value = window.innerWidth > 1072;
		};

		let lenis;

		const initLenis = () => {
			if (isWideScreen.value) {
				lenis = new Lenis({
					duration: 0.7,
					easing: (x) => Math.sin((x * Math.PI) / 2),
				});

				gsap.ticker.add((time) => {
					lenis.raf(time * 1000);
				});

				gsap.ticker.lagSmoothing(0);
			}
		};

		const initAnimations = () => {
			const tlss = gsap.timeline({
				delay: 0,
				duration: 1,
			});
			tlss.clear();

			if (isWideScreen.value) {
				tlss.fromTo(
					serviceImg.value,
					{
						width: '110vw',
						height: '110vh',
						maxHeight: '110vh',
						maxWidth: '110vw',
						left: '0vw',
						top: '0vh',
					},
					{
						height: '60vh',
						width: '27vw',
						left: '15vw',
						top: '20vh',
						onComplete: function () {
							serviceImg.value.style = null;
						},
					}
				);
			} else {
				tlss.fromTo(
					serviceImg.value,
					{
						height: '50vh',
						width: '80vw',
						left: '50%',
						top: '30%',
					},
					{
						height: '50vh',
						width: '80vw',
						left: '50%',
						top: '37.5%',
						onComplete: function () {
							serviceImg.value.style = null;
						},
					}
				);
			}

			tlss
				.fromTo(
					'.services-service .services-service__title',
					{ top: '-100vh', opacity: 0 },
					{ top: '0vh', opacity: 1 }
				)
				.fromTo(
					'.services-service .services-service__text',
					{ bottom: '-100vh', opacity: 0 },
					{ bottom: '0vh', opacity: 1 },
					'<'
				)
				.fromTo(
					'.services-service .services-service__text_small',
					{ opacity: 0 },
					{
						opacity: 1,
					}
				);

			const tlGallery = gsap.timeline({
				scrollTrigger: {
					trigger: '.scroll-gallery',
					start: 'top top',
					end: 'bottom bottom',
					scrub: true,
				},
			});
			tlGallery
				.to('.services-service .scroll-gallery__wrapper', {
					ease: 'power2.inOut',
				})
				.to(
					'.services-service .scroll-gallery__skroll-img',
					{
						margin: '8em',
						ease: 'power2.inOut',
					},
					'<'
				)
				.fromTo(
					'.services-service .scroll-gallery__skroll-video',
					{
						width: '40vw',
						margin: '0em',
						top: '60vh',
						height: '50vh',
					},
					{
						width: '100vw',
						margin: '0em',
						top: '50vh',
						height: '100vh',
						ease: 'power2.inOut',
					},
					'<'
				);
		};

		return {
			block,
			lastBlock,
			serviceImg,
			galleryItems,
			goNext,
			getImageUrl,
		};
	},
	beforeRouteUpdate(to, from, next) {
		if (to.params.id !== from.params.id) {
			gsap.to(window, { scrollTo: 0, duration: 1 });
			ScrollTrigger.refresh();
		}
		next();
	},
};
</script>

<style lang="scss" scoped src="./services-service-view.scss" />
