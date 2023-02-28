<template>
	<div class="flex space-x-1 text-[10px]">
		<div class="text-gray-300">
			<div>Дата создания:</div>
			<div>Дата окончания:</div>
		</div>
		<div class="text-blue">
			<div>{{ start }}</div>
			<div>{{ end }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Todo } from '~/types'

interface AppDateProps {
	start: Todo['startDate']
	end: Todo['endDate']
}

const { start, end } = defineProps<AppDateProps>()
</script>
