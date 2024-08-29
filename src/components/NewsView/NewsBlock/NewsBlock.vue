<template>
	<div class="news-block">
		<div
			v-for="(item, index) in items"
			:key="index"
			:class="`news-block__item news-block__item_${getNumberClass(index)}`"
		>
			<div @click="goPage(item)" class="news-block__image-wrapper">
				<img
					:src="require('@/assets/NewsItems/' + item.image)"
					alt="news image"
					class="news-block__image"
				/>
				<h3 class="news-block__title">
					<p class="news-block__date">{{ item.date }}</p>
					{{ item.title }}
				</h3>
			</div>
			<p class="news-block__description">
				{{ getTruncatedText(item.description) }}
				<span @click="goPage(item)">READ MORE</span>
			</p>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
export default {
	name: 'NewsBlock',
	props: {
		items: {
			type: Array,
			required: true,
			validator: (array) => {
				return array.every(
					(item) =>
						'image' in item &&
						'title' in item &&
						'description' in item &&
						'date' in item &&
						'id' in item
				);
			},
		},
	},
	setup(props) {
		const route = useRoute();
		const router = useRouter();
		const goPage = (item) => {
			router.push(`/news/${item.id}`);
		};
		const getNumberClass = (index) => {
			return (index % 12) + 1;
		};
		const getTruncatedText = (description) => {
			return description.length > 140
				? description.substring(0, 140) + '...'
				: description;
		};

		return {
			items: props.items,
			getNumberClass,
			goPage,
			getTruncatedText,
		};
	},
};
</script>

<style lang="scss" scoped src="./news-block.scss" />
