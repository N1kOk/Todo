<template>
	<div class="pt-8 space-y-4">
		<div class="text-sm text-gray-300">
			<NuxtLink to="/">Главная</NuxtLink>
			/ {{ store.todo.title }}
		</div>

		<AppCard class="space-y-2">
			<h2 class="text-xl font-bold">{{ store.todo.title }}</h2>
			<p class="text-sm">{{ store.todo.text }}</p>
		</AppCard>

		<AppDate :start="store.todo.startDate" :end="store.todo.endDate"/>
	</div>
</template>

<script setup lang="ts">
import { useTodosStore } from '~~/store/todo';

const route = useRoute()
const { id } = route.params as { id: string }

const store = useTodosStore()

await useAsyncTodoData(id)

useSeoMeta({
	title: () => store.todo.title || 'Default title',
	description: () => store.todo.text,
})
</script>
