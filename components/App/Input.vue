<template>
	<div class="space-y-1">
		<div class="relative">
			<input
				class="input"
				:class="{
					'!border-danger': error.isShowed
				}"
				:value="modelValue"
				@input="emit('update:modelValue', ($event.target as HTMLInputElement).value.trim())"
				@blur="validateValue"
				:placeholder="placeholder"
				type="text"
			/>
			<slot class="absolute right-3 top-1/2 -translate-y-1/2" name="icon"/>
		</div>

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

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void
}>()

const error = reactive({
	isShowed: false,
	message: '',
})

watch(modelValue, () => {
	error.isShowed = false
})

function validateValue() {
	const res = validate.value(modelValue.value)

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