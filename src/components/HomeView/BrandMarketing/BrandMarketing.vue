<template>
	<div class="brand-marketing">
		<div class="brand-marketing__wrapper">
			<video
				class="brand-marketing__video"
				no-controls
				autoplay
				loop
				playsinline
				muted
				src="@/assets/Hero/-098a-4dcc-943b-82921390a39a.mp4"
				alt=""
			/>
			<div class="brand-marketing__text brand-marketing__text_left">
				<p
					v-for="(text, index) in textArr"
					:class="[
						'brand-marketing__left',
						'blue-text_invert',
						`brand-marketing__left${index + 1}`,
					]"
				>
					{{ text }}
				</p>
			</div>

			<div class="brand-marketing__text brand-marketing__text_right">
				<p
					v-for="(text, index) in textArr"
					:class="[
						'brand-marketing__right',
						`brand-marketing__right${index + 1}`,
					]"
				>
					{{ text }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { onUnmounted, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default {
	setup() {
		const textArr = [
			'BRAND MARKETING',
			'CAREER MANAGEMENT',
			'LEGAL  & CONTRACT',
			// 'CONTENT  & SOCIAL MEDIA ',
			'wellbering & nuTRION',
			'PR & MEDIA',
			'DATA  & VIDEO ANALISIS',
			// 'CONCIERGE',
		];

		const createAnimation = (timeline, leftClass, rightClass) => {
			timeline
				.fromTo(
					rightClass,
					{ fontSize: '0.5em', height: '1em' },
					{ fontSize: '0em', height: '0em', duration: 10 }
				)
				.fromTo(
					leftClass,
					{ fontSize: '0em', height: '0em' },
					{ fontSize: '0.5em', height: '1em', duration: 10 },
					'<'
				);
		};

		onMounted(() => {
			const tlbm = gsap.timeline({
				scrollTrigger: {
					trigger: '.brand-marketing',
					start: 'top top',
					end: 'bottom bottom',
					scrub: 0.5,
					duration: 10,
				},
				ease: 'linear',
				delay: 0,
			});
			for (let i = 1; i <= 6; i++) {
				createAnimation(
					tlbm,
					`.brand-marketing .brand-marketing__left${i}`,
					`.brand-marketing .brand-marketing__right${i}`
				);
			}
		});
		onUnmounted(() => {
			let Alltrigger = ScrollTrigger.getAll();
			for (let a = 0; a < Alltrigger.length; a++) {
				Alltrigger[a].kill();
			}
		});
		return { textArr };
	},
};
</script>

<style lang="scss" scoped src="./brand-marketing.scss" />
