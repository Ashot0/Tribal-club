<template>
	<form @submit.prevent="onSubmit">
		<div class="contact-us__form-group">
			<label for="name">Name</label>
			<input
				placeholder="Enter your name"
				type="text"
				id="name"
				v-model="form.name"
				required
			/>
		</div>
		<div class="contact-us__form-wrapper">
			<div class="contact-us__form-group contact-us__form-group_phone">
				<label for="phone">Phone</label>
				<input
					placeholder="(___)___-___-__"
					type="text"
					id="phone"
					v-model="form.phone"
					required
				/>
			</div>
			<div class="contact-us__form-group contact-us__form-group_email">
				<label for="email">Mail</label>
				<input
					placeholder="Your mail"
					type="email"
					id="email"
					v-model="form.email"
					required
				/>
			</div>
		</div>
		<div class="contact-us__form-group contact-us__form-group_message">
			<label for="errorMessage">Your Message</label>
			<textarea
				id="errorMessage"
				v-model="form.errorMessage"
				required
				placeholder="Type your message here"
			></textarea>
		</div>
		<Button class="contact-us__button" type="submit" :text="'SEND'" />
	</form>
</template>

<script>
import Button from '@/components/Button/Button.vue';
export default {
	components: {
		Button,
	},
	props: {
		form: {
			type: Object,
			required: true,
		},
		onSubmit: {
			type: Function,
			required: true,
		},
	},
};
</script>
