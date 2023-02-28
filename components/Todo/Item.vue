<template>
	<div class="p-4 pb-8 bg-gray-500 rounded">
		<div class="flex items-start space-x-4">
			<AppCheckbox @change="handleCheckboxClick"/>
			<div class="flex flex-col flex-1 space-y-4">
				<div class="flex justify-between items-center">
					<h2 class="text-xl font-bold" :class="classesText">Title</h2>
					<div class="flex items-center space-x-4">
						<div class="flex space-x-1 text-[10px]">
							<div class="text-gray-300">
								<div>Дата создания:</div>
								<div>Дата окончания:</div>
							</div>
							<div class="text-blue">
								<div>27.02.2023</div>
								<div>27.03.2023</div>
							</div>
						</div>
						<IconTrash @click="emit('remove', id)"/>
						<IconEdit v-show="!isCompleted" @click="emit('edit', id)"/>
					</div>
				</div>

				<p class="text-sm" :class="classesText">Lorem ipsum dolor sit amet</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from '#imports'

const { id } = defineProps<{
	id: number
}>()

const emit = defineEmits<{
	(event: 'edit', id: number): void
	(event: 'remove', id: number): void
}>()

const isCompleted = ref(false)

const classesText = computed(() => ({
	'todo--completed': isCompleted.value,
}))

function handleCheckboxClick(isChecked: boolean) {
	isCompleted.value = isChecked
}
</script>

<style scoped>
.todo--completed {
	@apply text-gray-300 line-through
}
</style>