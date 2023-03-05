import { useAsyncData } from '#imports'
import { Todo } from '~/shared/todo'
import { useTodosStore } from '~~/store/todo'

export function useAsyncTodosData() {
	const store = useTodosStore()

	return useAsyncData('todos', () => store.fetchTodos())
}

export function useAsyncTodoData(id: Todo['id']) {
	const store = useTodosStore()

	return useAsyncData('todo', () => store.fetchTodo(id))
}
