import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'
import { Todo } from '~/types'
import { useAppConfig } from '#imports'

export const useTodosStore = defineStore('todos', () => {
	const { baseURL } = useAppConfig()
	
	const apiFetch = $fetch.create({ baseURL })
	
	const todo = ref<Todo>()
	const todos = ref<Todo[]>([])
	
	const todosCount = computed(() => todos.value.length)
	const completedTodosCount = computed(() => todos.value.filter(todo => todo.isCompleted).length)
	
	async function fetchTodos() {
		try {
			todos.value = await apiFetch('/todos')
		} catch (error) {
			showError(error)
		}
	}
	
	async function fetchTodo(id: string) {
		try {
			todo.value = await apiFetch(`/todos/${id}`)
		} catch (error) {
			showError(error)
		}
	}
	
	async function createTodo(todo: Omit<Todo, 'id'>) {
		try {
			const newTodo = await apiFetch(`/todos`, {
				method: 'POST',
				body: todo,
			})
			
			todos.value.push(newTodo)
		} catch (error) {
			showError(error)
		}
	}
	
	async function updateTodo(todo: Todo) {
		const currentTodo = todos.value.find(t => t.id === todo.id)!
		
		try {
			currentTodo.isProcessing = true
			
			await apiFetch(`/todos/${todo.id}`, {
				method: 'PUT',
				body: todo
			})
			
			currentTodo.isCompleted = todo.isCompleted
		} catch (error) {
			showError(error)
		} finally {
			currentTodo.isProcessing = false
		}
	}
	
	async function removeTodo(id: string) {
		const currentTodo = todos.value.find(todo => todo.id === id)!
		
		try {
			currentTodo.isProcessing = true
			
			await apiFetch(`/todos/${id}`, {
				method: 'DELETE',
			})
			
			todos.value = todos.value.filter(todo => todo.id !== id)
		} catch (error) {
			showError(error)
		} finally {
			currentTodo.isProcessing = false
		}
	}
	
	return {
		todo,
		todos,
		todosCount,
		completedTodosCount,
		fetchTodos,
		fetchTodo,
		createTodo,
		updateTodo,
		removeTodo,
	}
})

function showError(error: unknown) {
	if (process.client) {
		let msg = error
		
		if (error instanceof Error)
			msg = error.message
		
		alert(`Что-то пошло не так: ${msg}`)
	}
}
