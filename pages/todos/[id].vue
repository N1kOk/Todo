<template>
	<div class="pt-8 space-y-4">
		<div class="text-sm text-gray-300">
			<NuxtLink to="/">Главная</NuxtLink>
			/ {{ todo?.title }}
		</div>

		<AppCard class="space-y-2">
			<h2 class="text-xl font-bold">{{ todo?.title }}</h2>
			<p class="text-sm">{{ todo?.text }}</p>
		</AppCard>

		<AppDate :start="todo?.startDate" :end="todo?.endDate"/>
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const { id } = route.params as { id: string }

const { data: todo } = await useAsyncTodoData(id)

useSeoMeta({
	title: () => todo.value?.title || 'Default title',
	description: () => todo.value?.text,
})
</script>
