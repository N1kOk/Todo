<template>
	<div class="flex flex-col min-h-screen">
		<NuxtLoadingIndicator/>

		<TheHeader/>

		<main class="flex-1 bg-gray-600">
			<div class="container">
				<NuxtPage/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
</script>