<template>
	<AppCard
		class="relative pb-8 transition-[filter]"
		:class="{'todo--processing': isProcessing}"
	>
		<div
			class="absolute left-0 top-0 w-full h-full cursor-pointer"
			@click="router.push(`/todos/${id}`)"
		/>

		<div class="flex items-start space-x-4">
			<AppCheckbox
				class="relative z-[10]"
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
						<AppDate
							class="relative z-[10]"
							:start="startDate"
							:end="endDate"
						/>
						<IconTrash
							class="relative z-[10]"
							@click="emit('remove', id)"
						/>
						<IconEdit
							class="relative z-[10]"
							v-show="!isCompleted"
							@click="emit('edit', id)"
						/>
					</div>
				</div>

				<p class="text-sm" :class="{'todo--completed': isCompleted}">
					{{ text }}
				</p>
			</div>
		</div>
	</AppCard>
</template>

<script setup lang="ts">
import type { Todo } from '~/types'
import { useRouter } from '#imports'

const router = useRouter()

const {
	id,
	title,
	text,
	startDate,
	endDate,
	isCompleted,
	isProcessing,
} = defineProps<Todo>()

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
