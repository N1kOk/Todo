<template>
	<div class="space-y-12">
		<AppButton
			class="translate-y-[-50%]"
			@click="modal.isShowed = true"
		>
			<span>Создать</span>
			<IconPlus/>
		</AppButton>

		<div class="space-y-6">
			<div class="flex justify-between font-bold">
				<span class="space-x-2">
					<span class="text-blue text-sm">Всего задач</span>
					<span class="px-2 py-[2px] text-xs bg-gray-400 rounded-full">
						{{ store.todosCount }}
					</span>
				</span>
				<span class="space-x-2">
					<span class="text-purple text-sm">Выполнено</span>
					<span class="px-2 py-[2px] text-xs bg-gray-400 rounded-full">
						{{ store.completedTodosCount }} из {{ store.todosCount }}
					</span>
				</span>
			</div>

			<div class="space-y-3">
				<TodoItem
					v-for="todo in store.todos"
					v-bind="todo"
					@edit="handleEdit"
					@toggle="handleToggle"
					@remove="handleRemove"
				/>
			</div>
		</div>
	</div>

	<AppModal
		:is-showed="modal.isShowed"
		:is-processing="modal.isProcessing"
		@create="handleCreate"
		@close="modal.isShowed = false"
	/>
</template>

<script setup lang="ts">
import { useTodosStore } from '~/store'
import { Todo } from '~/shared/todo'

const store = useTodosStore()
await store.fetchTodos()

const modal = reactive({
	isShowed: false,
	isProcessing: false
})

function handleCreate(todo: Todo) {
	modal.isProcessing = true

	store.createTodo(todo).finally(() =>
		modal.isProcessing = modal.isShowed = false)
}

function handleEdit() {

}

function handleToggle(id: string, isCompleted: boolean) {
	const todo = store.todos.find(t => t.id === id)!
	store.updateTodo({ ...todo, isCompleted })
}

function handleRemove(id: string) {
	store.removeTodo(id)
}
</script>
