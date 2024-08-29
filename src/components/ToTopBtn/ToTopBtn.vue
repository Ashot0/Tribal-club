<template>
	<button v-if="showButton" @click="scrollToTop" class="to-top-btn">
		<img class="to-top-btn__img" src="@/assets/icons/Arrow.svg" alt="" />
	</button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);
const showButton = ref(false);

const checkScroll = () => {
	const scrollPosition = window.scrollY;
	const windowHeight = window.innerHeight;
	if (scrollPosition > windowHeight) {
		showButton.value = true;
	} else {
		showButton.value = false;
	}
};

const scrollToTop = () => {
	gsap.to(window, { scrollTo: 0, duration: 1 });
};

onMounted(() => {
	window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', checkScroll);
});
</script>

<style lang="scss" scoped src="./to-top-btn.scss" />
