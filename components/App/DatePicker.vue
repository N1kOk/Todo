<template>
	<div>
		<IconCalendar
			@click="datePicker.showPicker()"
			class="text-gray-300 cursor-pointer transition-colors hover:text-gray-200"
		/>
		<input
			ref="datePicker"
			class="absolute opacity-0 pointer-events-none"
			type="date"
			:min="getDateYMD()"
			@change="handleChange($event.target.value)"
		>
	</div>
</template>

<script setup lang="ts">

const datePicker = ref(null)

const emit = defineEmits<{
	(event: 'change', date: string): void
}>()

function handleChange(date: string) {
	const [y, m, d] = date.split('-')

	emit('change', `${d}.${m}.${y}`)
}

function getDateYMD() {
	const date = new Date().toLocaleDateString('ru-RU')
	const [d, m, y] = date.split('.')

	return `${y}-${m}-${d}`
}
</script>
