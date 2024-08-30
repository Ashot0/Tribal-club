<template>
	<div class="header">
		<router-link class="header__logo" to="/">
			<img class="header__logo-img" src="@/assets/icons/logo.png" alt="logo" />
		</router-link>
		<button class="header__burger-button" type="button" @click="toggleMenu">
			<img
				class="header__burger-img"
				src="@/assets/icons/burger.svg"
				alt="burger"
			/>
		</button>
		<div class="header__menu">
			<router-link to="/">About Us </router-link>
			<router-link to="/services">Services </router-link>
			<router-link to="/contact">Contact </router-link>
			<router-link to="/news">News </router-link>
		</div>
		<BurgerMenu :isOpen="isOpen" :onClose="closeMenu" />
		<div class="header__right-block">
			<select class="header__lang">
				<option class="header__lang-option" value="EN">EN</option>
				<option class="header__lang-option" value="EN">EN</option>
				<option class="header__lang-option" value="EN">EN</option>
			</select>
			<router-link to="/contact">
				<Button class="header__button" :text="'Contact us'" />
			</router-link>
		</div>
	</div>
</template>
<script>
import { ref, defineComponent } from 'vue';
import Button from '../Button/Button';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu.vue';
export default {
	components: {
		Button,
		BurgerMenu,
	},
	setup() {
		const isOpen = ref(false);

		const toggleMenu = () => {
			isOpen.value = !isOpen.value;
		};
		const closeMenu = () => {
			isOpen.value = false;
		};

		return { isOpen, toggleMenu, closeMenu };
	},
};
</script>

<style lang="scss" scoped src="./header.scss" />
