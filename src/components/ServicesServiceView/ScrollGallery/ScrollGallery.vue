<template>
	<div class="scroll-gallery">
		<div class="scroll-gallery__wrapper">
			<div
				v-for="(item, index) in galleryItems"
				:key="index"
				:class="
					item.type === 'image'
						? 'scroll-gallery__skroll-img scroll-gallery__skroll-img_' +
						  (index + 1)
						: 'scroll-gallery__skroll-video scroll-gallery__skroll-img_' +
						  (index + 1)
				"
			>
				<img
					v-if="item.type === 'image'"
					:src="require('@/assets/services-service/anim-gallery/' + item.src)"
					alt=""
				/>
				<video
					v-else
					:src="require('@/assets/services-service/anim-gallery/' + item.src)"
					no-controls
					autoplay
					loop
					playsinline
					muted
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		galleryItems: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped src="./scroll-gallery.scss" />
