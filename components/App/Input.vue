<template>
	<div class="space-y-1">
		<div class="relative">
			<input
				class="input"
				v-bind="$attrs"
				:class="classes"
				:value="modelValue"
				@input="emit('update:modelValue', ($event.target as HTMLInputElement).value.trim())"
				type="text"
			/>
			<slot class="absolute right-3 top-1/2 -translate-y-1/2" name="icon"/>
		</div>

		<div v-if="errorMessage" class="text-danger text-xs">
			{{ errorMessage }}
		</div>
	</div>
</template>

<script lang="ts">
export default {
	inheritAttrs: false
}
</script>

<script setup lang="ts">
interface AppInputProps {
	modelValue: string
	errorMessage?: string | Ref<string>
}

const props = withDefaults(defineProps<AppInputProps>(), { errorMessage: '' })
const { modelValue, errorMessage } = toRefs(props)

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void
}>()

const classes = computed(() => ({
	'!border-danger': errorMessage.value
}))
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