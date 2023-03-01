import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'
import { Todo } from '~/shared/todo'

const baseURL = 'https://63fe2181571200b7b7c5c8d4.mockapi.io/api'
const apiFetch = $fetch.create({ baseURL })

export const useTodosStore = defineStore('todos', {
	state: () => ({
		todo: {} as Todo,
		todos: [] as Todo[],
	}),
	getters: {
		todosCount: (state) => state.todos.length,
		completedTodosCount: (state) => state.todos.filter(todo => todo.isCompleted).length,
	},
	actions: {
		async fetchTodos() {
			try {
				this.todos = await apiFetch('/todos')
			} catch (error) {
				showError(error)
			}
		},
		async fetchTodo(id: string) {
			try {
				this.todo = await apiFetch(`/todos/${id}`)
			} catch (error) {
				showError(error)
			}
		},
		async createTodo(todo: Omit<Todo, 'id'>) {
			try {
				const newTodo = await apiFetch(`/todos`, {
					method: 'POST',
					body: todo,
				})
				
				this.todos.push(newTodo)
			} catch (error) {
				showError(error)
			}
		},
		async updateTodo(todo: Todo) {
			const currentTodo = this.todos.find(t => t.id === todo.id)!
			
			try {
				currentTodo.isProcessing = true
				
				await apiFetch(`/todos/${todo.id}`, {
					method: 'PUT',
					body: todo,
				})
				
				const index = this.todos.findIndex(t => t.id === todo.id)
				this.todos[index] = todo
			} catch (error) {
				showError(error)
			} finally {
				currentTodo.isProcessing = false
			}
		},
		async removeTodo(id: string) {
			const currentTodo = this.todos.find(todo => todo.id === id)!
			
			try {
				currentTodo.isProcessing = true
				
				await apiFetch(`/todos/${id}`, {
					method: 'DELETE',
				})
				
				this.todos = this.todos.filter(todo => todo.id !== id)
			} catch (error) {
				showError(error)
			} finally {
				currentTodo.isProcessing = false
			}
		},
	},
})

function showError(error: unknown) {
	if (process.client) {
		let msg = error
		
		if (error instanceof Error)
			msg = error.message
		
		alert(`Что-то пошло не так: ${msg}`)
	}
}
