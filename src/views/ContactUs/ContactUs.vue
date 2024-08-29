<template>
	<div class="contact-us">
		<ToTopBtn />
		<Header />
		<div class="contact-us__form-container">
			<h1 class="contact-us__title">
				We’re here <br />
				for you
			</h1>
			<ContactForm :form="form" :onSubmit="handleSubmit" />
			<ResponseMessage :message="responseMessage" />
		</div>
		<Footer />
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import Button from '@/components/Button/Button.vue';
import ContactForm from '@/components/ContactUs/ContactForm/ContactForm';
import ResponseMessage from '@/components/ContactUs/ResponseMessage/ResponseMessage.vue';
import ToTopBtn from '../../components/ToTopBtn/ToTopBtn.vue';

gsap.registerPlugin(ScrollTrigger);

export default {
	components: {
		Header,
		Footer,
		Button,
		ContactForm,
		ResponseMessage,
		ToTopBtn,
	},
	setup() {
		const form = ref({
			name: '',
			phone: '',
			email: '',
			errorMessage: '',
		});
		const responseMessage = ref('');
		const isWideScreen = ref(window.innerWidth < 1072);

		const handleSubmit = async () => {
			try {
				const response = await axios.post('#', form.value);
				responseMessage.value = 'Successful';
			} catch (error) {
				responseMessage.value = `Error : ${error}`;
			}
		};

		let lenisGlobal;

		onMounted(() => {
			window.scrollTo(0, 0);
			if (!isWideScreen.value) {
				lenisGlobal = new Lenis({
					smoothWheel: true,
					duration: 0.7,
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
			form,
			responseMessage,
			handleSubmit,
		};
	},
};
</script>

<style lang="scss" src="./contact-us.scss" />
