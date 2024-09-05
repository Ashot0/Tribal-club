<template>
	<div ref="menu" class="burger-menu">
		<div class="burger-menu__header">
			<div style="width: 64px; height: 64px"></div>
			<router-link class="burger-menu__logo" to="/" @click.native="closeMenu">
				<img
					class="burger-menu__logo-img"
					src="@/assets/icons/logo.png"
					alt="logo"
				/>
			</router-link>
			<button class="burger-menu__close-btn" @click="closeMenu">
				<img
					class="burger-menu__close-btn-img"
					src="@/assets/icons/CloseBtn.png"
					alt="close"
				/>
			</button>
		</div>
		<div class="burger-menu__body">
			<router-link class="burger-menu__link" to="/" @click.native="closeMenu"
				>About Us
			</router-link>
			<router-link
				class="burger-menu__link"
				to="/services"
				@click.native="closeMenu"
				>Services
			</router-link>
			<router-link
				class="burger-menu__link"
				to="/contact"
				@click.native="closeMenu"
				>Contact
			</router-link>
			<router-link
				class="burger-menu__link"
				to="/news"
				@click.native="closeMenu"
				>News
			</router-link>
		</div>
		<div class="burger-menu__footer">
			<a href="mailto:Hello@tribalclub.com" class="burger-menu__email">
				<img src="@/assets/icons/mail2.png" alt="mail" />Hello@tribalclub.com</a
			>
			<a
				href="https://maps.app.goo.gl/Bm92mcg2dnSpy24x8"
				class="burger-menu__address"
			>
				<img src="@/assets/icons/map.png" alt="map" />232 E 47th St, NY 10017,
				USA
			</a>
			<Button
				class="burger-menu__button"
				:max="isMax"
				:text="'Contact us'"
				@click="goToContact"
			/>
		</div>
	</div>
</template>

<script>
import Button from '../Button/Button';
import {
	ref,
	watch,
	defineComponent,
	onBeforeUnmount,
	onMounted,
	computed,
	onUnmounted,
} from 'vue';
import { gsap } from 'gsap';
import { useRouter } from 'vue-router';

export default defineComponent({
	components: {
		Button,
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		onClose: {
			type: Function,
			required: true,
		},
	},
	setup(props) {
		const router = useRouter();

		const goToContact = () => {
			router.push('/contact');
			closeMenu();
		};

		const menu = ref(null);
		const closeMenu = () => {
			props.onClose();
			document.body.classList.remove('no-scroll');
		};

		watch(
			() => props.isOpen,
			(newVal) => {
				if (!newVal) {
					gsap.to(menu.value, { duration: 0.5, right: '100vw' });
					document.body.classList.remove('no-scroll');
				} else {
					gsap.to(menu.value, { duration: 0.5, right: '0vw' });
					document.body.classList.add('no-scroll');
				}
			}
		);
		const windowWidth = ref(window.innerWidth);

		const updateWindowWidth = () => {
			windowWidth.value = window.innerWidth;
		};

		onMounted(() => {
			window.addEventListener('resize', updateWindowWidth);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('resize', updateWindowWidth);
		});
		onUnmounted(() => {
			document.body.classList.remove('no-scroll');
		});

		const isMax = computed(() => {
			return windowWidth.value > 768;
		});

		return { menu, closeMenu, isMax, goToContact };
	},
});
</script>

<style lang="scss" scoped src="./burger-menu.scss" />
