<template>
	<div class="space-y-12">
		<AppButton
			class="translate-y-[-50%]"
			@click="handleCreate"
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

			<div v-if="store.todos.length" class="space-y-3">
				<TodoItem
					v-for="todo in store.todos"
					v-bind="todo"
					:key="todo.id"
					@edit="handleEdit"
					@toggle="handleToggle"
					@remove="handleRemove"
				/>
			</div>
			<div v-else class="space-y-16">
				<hr class="opacity-10">
				<div class="flex flex-col items-center space-y-4">
					<IconClipboard/>
					<div class="text-center text-gray-300">
						<div class="font-bold">У Вас еще нет созданных задач</div>
						<div>Создавайте задачи и организуйте свои дела</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTodosStore } from '~~/store/todo'
import { formatDate, getCurrentDate, getDateFromString } from '~/shared/date'
import { useDialogStore } from '~~/store/dialog';

const store = useTodosStore()
const dialogStore = useDialogStore()

await useAsyncTodosData()

async function handleCreate() {
	const isProcessing = await dialogStore.showDialog({
		dialogTitle: 'Создание задачи',
		buttonText: 'Создать'
	})

	if (!isProcessing) return

	const { title, text, date } = dialogStore

	store.createTodo({
		title, text,
		startDate: getCurrentDate(),
		endDate: getDateFromString(date),
		isCompleted: false
	}).finally(() => {
		dialogStore.closeDialog()
	})
}

async function handleEdit(id: string) {
	const currentTodo = store.todos.find(t => t.id === id)!
	const { title, text } = currentTodo
	const date = formatDate(currentTodo.endDate)
	
	const isProcessing = await dialogStore.showDialog({
		title, text, date,
		dialogTitle: 'Редактирование задачи',
		buttonText: 'Редактировать'
	})

	if (!isProcessing) return

	store.updateTodo({
		id,
		title: dialogStore.title,
		text: dialogStore.text,
		startDate: currentTodo.startDate,
		endDate: getDateFromString(dialogStore.date),
		isCompleted: currentTodo.isCompleted
	}).finally(() => {
		dialogStore.closeDialog()
	})
}

function handleToggle(id: string, isCompleted: boolean) {
	const currentTodo = store.todos.find(t => t.id === id)!

	store.updateTodo({ ...currentTodo, isCompleted })
}

function handleRemove(id: string) {
	store.removeTodo(id)
}
</script>
