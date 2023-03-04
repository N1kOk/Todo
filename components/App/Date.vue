<template>
	<div class="flex space-x-1 text-[10px]">
		<div class="text-gray-300 max-lg:hidden">
			<div>Дата создания:</div>
			<div>Дата окончания:</div>
		</div>
		<div class="text-blue">
			<div>{{ formatDate(start) }}</div>
			<div>{{ formatDate(end) }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Todo } from '~/shared/todo'
import { formatDate } from '~/shared/date'

interface AppDateProps {
	start?: Todo['startDate']
	end?: Todo['endDate']
}

const props = withDefaults(defineProps<AppDateProps>(), {
	start: 0,
	end: 0,
})

const { start, end } = toRefs(props)
</script>
