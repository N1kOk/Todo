<template>
	<div
		class="p-4 pb-8 bg-gray-500 rounded transition-[filter]"
		:class="{'todo--processing': isProcessing}"
	>
		<div class="flex items-start space-x-4">
			<AppCheckbox
				:is-checked="isCompleted"
				@click="emit('toggle', id, !isCompleted)"
			/>
			<div class="flex flex-col flex-1 space-y-4">
				<div class="flex justify-between items-center">
					<h2
						class="text-xl font-bold"
						:class="{'todo--completed': isCompleted}"
					>
						{{ title }}
					</h2>
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

				<p class="text-sm" :class="{'todo--completed': isCompleted}">
					{{ text }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Todo } from '~/types'

const { id, title, text, isCompleted, isProcessing } = defineProps<Todo>()

const emit = defineEmits<{
	(event: 'edit', id: string): void
	(event: 'remove', id: string): void
	(event: 'toggle', id: string, value: boolean): void
}>()
</script>

<style scoped>
.todo--completed {
	@apply text-gray-300 line-through
}

.todo--processing {
	filter: contrast(0.5);
	@apply pointer-events-none;
}
</style>
