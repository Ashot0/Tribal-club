<template>
	<div class="work-with-us">
		<img class="work-with-us__img" src="@/assets/Hero/work.jpg" alt="work" />
		<div class="work-with-us__wrapper">
			<div class="work-with-us__first-text">Start your journey</div>
			<div class="work-with-us__second-text blue-text">with us today</div>
			<Button
				class="work-with-us__button"
				:text="'Contact Us'"
				@click="goToContact"
			/>
		</div>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';
import Button from '../../Button/Button.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
	components: {
		Button,
		Footer,
	},
	setup() {
		const router = useRouter();

		const goToContact = () => {
			router.push('/contact');
		};

		return {
			goToContact,
		};
	},
};
</script>

<style lang="scss" scoped src="./work-with-us.scss" />
