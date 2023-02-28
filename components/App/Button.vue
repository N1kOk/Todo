<template>
	<button class="button">
		<slot/>
	</button>
</template>

<style scoped>
.button {
	@apply
	flex justify-center items-center space-x-2 w-full p-4
	text-sm bg-blue-dark rounded
	transition-colors hover:bg-blue;
}
</style>
