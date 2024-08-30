<template>
	<div
		ref="box"
		:class="'services-block services-block' + block.num"
		@click="moveToCenter"
	>
		<div
			ref="boxBg"
			:class="'services-block__bg services-block__bg' + (index + 1)"
		>
			<img
				ref="boxBg"
				class="services-block__bg-img"
				:src="require('@/assets/services-bg/' + block.picture)"
				alt="background"
			/>
		</div>
		<div class="services-block__wrapper">
			<div class="services-block__left-text">
				<p
					:class="'services-block__title services-block__title' + (index + 1)"
					v-html="block.title"
				></p>
				<p :class="'services-block__text services-block__text' + (index + 1)">
					{{ block.text }}
				</p>
			</div>
			<div class="services-block__image-box">
				<img
					ref="image"
					:src="require('@/assets/services-bg/' + block.picture)"
					alt="image"
					:class="'services-block__image services-block__image' + index"
				/>
			</div>
			<p :class="'services-block__num services-block__num' + (index + 1)">
				{{ block.num }}/08
			</p>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { useRouter } from 'vue-router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
	name: 'ServicesBlock',
	props: {
		block: {
			type: Object,
			required: true,
			default: () => ({
				picture: '',
				title: '',
				text: '',
				num: '',
				id: 0,
			}),
		},
		index: Number,
	},
	setup(props) {
		gsap.registerPlugin(ScrollTrigger);
		const box = ref(null);
		const boxBg = ref(null);
		const router = useRouter();

		const moveToCenter = () => {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			const boxRect = box.value.getBoundingClientRect();
			const boxWidth = boxRect.width;
			const boxHeight = boxRect.height;
			const xOffset = (windowWidth - boxWidth) / 2 - boxRect.left;
			const yOffset = (windowHeight - boxHeight) / 2 - boxRect.top;

			gsap.timeline().to(boxBg.value, {
				duration: 0.5,
				top: '0vh',
				zIndex: 50,
				bottom: yOffset,
				height: '100vh',
				ease: 'power2.inOut',
				onComplete: () => {
					router.push(`/services/${props.block.id}`);
				},
			});
		};
		onUnmounted(() => {
			let Alltrigger = ScrollTrigger.getAll();
			for (let a = 0; a < Alltrigger.length; a++) {
				Alltrigger[a].kill();
			}
		});
		return {
			box,
			moveToCenter,
			boxBg,
		};
	},
};
</script>
<style lang="scss" scoped src="./services-block.scss" />
