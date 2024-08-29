<template>
	<div class="image-full">
		<img
			class="image-full__pic"
			:src="require('@/assets/Hero/' + picture)"
			alt=""
		/>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
export default {
	name: 'ImageFull',
	props: {
		picture: String,
	},
	setup() {
		onMounted(() => {});

		return {};
	},
};
</script>

<style lang="scss" scoped src="./image-full.scss" />
