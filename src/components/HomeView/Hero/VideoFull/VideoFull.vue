<template>
	<div class="video-full">
		<video
			no-controls
			autoplay
			loop
			playsinline
			muted
			class="video-full__pic"
			:src="require('@/assets/Hero/' + video)"
			alt=""
		/>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
export default {
	name: 'VideoFull',
	props: {
		video: String,
	},
	setup() {
		onMounted(() => {});

		return {};
	},
};
</script>

<style lang="scss" scoped src="./video-full.scss" />
