<template>
	<div class="space-y-12">
		<AppButton
			class="translate-y-[-50%]"
			:class="{'pointer-events-none': button.isLoading}"
			@click="handleCreate"
		>
			<span v-show="!button.isLoading">Создать</span>
			<IconPlus v-show="!button.isLoading"/>

			<span v-show="button.isLoading">Создание...</span>
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
</template>

<script setup lang="ts">
import { useTodosStore } from '~/store'

const store = useTodosStore()
await store.fetchTodos()

const button = reactive({
	isLoading: false,
})

function handleCreate() {
	button.isLoading = true

	store.createTodo({
		title: 'Test',
		text: 'Test text',
		isCompleted: false,
	}).finally(() => button.isLoading = false)
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
