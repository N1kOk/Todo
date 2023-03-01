<template>
	<div class="space-y-12">
		<AppButton
			class="translate-y-[-50%]"
			@click="modalCreate.isShowed = true"
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
					@edit="handleTodoItemEdit"
					@toggle="handleToggle"
					@remove="handleRemove"
				/>
			</div>
		</div>
	</div>

	<AppModal
		title="Создать задачу"
		button-text="Создать"
		:is-showed="modalCreate.isShowed"
		:is-processing="modalCreate.isProcessing"
		@submit="handleCreate"
		@close="modalCreate.isShowed = false"
	/>

	<AppModal
		title="Редактировать задачу"
		button-text="Редактировать"
		:is-showed="modalEdit.isShowed"
		:is-processing="modalEdit.isProcessing"
		:init-todo-title="modalEdit.todoTitle"
		:init-todo-text="modalEdit.todoText"
		:init-todo-end-date="modalEdit.todoEndDate"
		@submit="handleEdit"
		@close="modalEdit.isShowed = false"
	/>
</template>

<script setup lang="ts">
import { useTodosStore } from '~/store'
import { Todo } from '~/shared/todo'
import { formatDate } from '~/shared/date'

const store = useTodosStore()
await store.fetchTodos()

const modalCreate = reactive({
	isShowed: false,
	isProcessing: false
})

const modalEdit = reactive({
	todoId: '',
	todoTitle: '',
	todoText: '',
	todoEndDate: '',
	isShowed: false,
	isProcessing: false
})

function handleTodoItemEdit(id: string) {
	const currentTodo = store.todos.find(t => t.id === id)!

	modalEdit.todoId = currentTodo.id
	modalEdit.todoTitle = currentTodo.title
	modalEdit.todoText = currentTodo.text
	modalEdit.todoEndDate = formatDate(currentTodo.endDate)

	modalEdit.isShowed = true
}

function handleCreate(todo: Todo) {
	modalCreate.isProcessing = true

	store.createTodo(todo).finally(() =>
		modalCreate.isProcessing = modalCreate.isShowed = false)
}

function handleEdit(todo: Omit<Todo, 'id'>) {
	modalEdit.isProcessing = true

	store.updateTodo({ ...todo, id: modalEdit.todoId }).finally(() =>
		modalEdit.isProcessing = modalEdit.isShowed = false)
}

function handleToggle(id: string, isCompleted: boolean) {
	const todo = store.todos.find(t => t.id === id)!
	store.updateTodo({ ...todo, isCompleted })
}

function handleRemove(id: string) {
	store.removeTodo(id)
}
</script>
