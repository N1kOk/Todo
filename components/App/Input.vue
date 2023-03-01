<template>
	<div class="space-y-1">
		<input
			class="input"
			:class="{
				'!border-danger': error.isShowed
			}"
			:value="modelValue"
			@input="(error.isShowed = false) || emit('update:modelValue', $event.target.value.trim())"
			@blur="validateValue($event.target.value.trim())"
			:placeholder="placeholder"
		/>
		<div v-if="error.isShowed" class="text-danger text-xs">
			{{ error.message }}
		</div>
	</div>
</template>

<script setup lang="ts">
interface AppInputProps {
	modelValue: string
	placeholder: string
	validate: (text: string) => true | string
}

const props = defineProps<AppInputProps>()
const { modelValue, validate, placeholder } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const error = reactive({
	isShowed: false,
	message: '',
})

function validateValue(value: string) {
	const res = validate.value(value)

	if (res === true) return

	error.message = res
	error.isShowed = true
}
</script>

<style scoped>
.input {
	@apply
	w-full px-4 py-2 text-sm text-gray-100
	bg-gray-500 border-2 border-gray-700 rounded outline-none transition-colors
	focus:border-purple-dark
	placeholder:text-gray-300;
}
</style>