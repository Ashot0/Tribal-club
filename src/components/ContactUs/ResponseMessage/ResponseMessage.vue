<template>
	<div v-if="message" class="contact-us__response-message">
		{{ message }}
	</div>
</template>

<script>
export default {
	props: {
		message: {
			type: String,
			required: true,
		},
	},
};
</script>
