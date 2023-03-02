<template>
	<div>
		<IconCalendar
			@click="handleClick"
			class="text-gray-300 cursor-pointer transition-colors hover:text-gray-200"
		/>
		<input
			ref="datePicker"
			class="absolute opacity-0 pointer-events-none"
			type="date"
			:min="getDateYMD()"
			@change="handleChange"
		>
	</div>
</template>

<script setup lang="ts">
const datePicker = ref<HTMLInputElement>()

const emit = defineEmits<{
	(event: 'change', date: string): void
}>()

function handleClick() {
	if (datePicker.value)
		datePicker.value.showPicker()
}

function handleChange(event: Event) {
	const date = (event.target as HTMLInputElement).value
	const [y, m, d] = date.split('-')

	emit('change', `${d}.${m}.${y}`)
}

function getDateYMD() {
	const date = new Date().toLocaleDateString('ru-RU')
	const [d, m, y] = date.split('.')

	return `${y}-${m}-${d}`
}
</script>
