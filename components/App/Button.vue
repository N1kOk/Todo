<template>
	<button
		class="button"
		:class="{
			'!bg-gray-300 pointer-events-none': isDisabled
		}"
	>
		<slot/>
	</button>
</template>

<script setup lang="ts">
interface AppButtonProps {
	isDisabled?: boolean
}

const props = defineProps<AppButtonProps>()
const { isDisabled } = toRefs(props)
</script>

<style scoped>
.button {
	@apply
	flex justify-center items-center space-x-2 w-full p-4
	text-sm bg-blue-dark rounded
	transition-colors hover:bg-blue;
}
</style>
