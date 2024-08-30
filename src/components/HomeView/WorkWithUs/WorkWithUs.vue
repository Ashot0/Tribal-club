<template>
	<div class="work-with-us">
		<img class="work-with-us__img" src="@/assets/Hero/work.jpg" alt="work" />
		<div class="work-with-us__wrapper">
			<div class="work-with-us__first-text">Start your journey</div>
			<div class="work-with-us__second-text blue-text">with us today</div>
			<router-link to="/contact">
				<Button class="work-with-us__button" :text="'Contact  Us'" />
			</router-link>
		</div>
	</div>
</template>

<script>
import Button from '../../Button/Button.vue';
import Footer from '@/components/Footer/Footer.vue';
export default {
	components: {
		Button,
		Footer,
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped src="./work-with-us.scss" />
