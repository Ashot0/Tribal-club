<template>
	<div class="footer">
		<router-link to="/">
			<img class="footer__logo" src="@/assets/icons/logo.png" alt="" />
			<img
				class="footer__logo-mobile"
				src="@/assets/Hero/logoMobile.png"
				alt=""
			/>
		</router-link>
		<div class="footer__links">
			<router-link class="footer__link" to="/">About Us </router-link>
			<router-link class="footer__link" to="/services">Services </router-link>
			<router-link class="footer__link" to="/contact">Contact </router-link>
			<router-link class="footer__link" to="/news">News </router-link>
		</div>
		<p class="footer__address">
			<img
				class="footer__address-img"
				src="../../assets/icons/map.png"
				alt=""
			/>232 E 47th St, NY 10017, USA
		</p>
	</div>
</template>

<script>
export default {
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped src="./footer.scss" />
