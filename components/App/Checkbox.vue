<template>
	<div
		class="checkbox"
		:class="classes"
		@click="isChecked = !isChecked"
	>
		<IconCheck class="relative top-[1px]" v-show="isChecked"/>
	</div>
</template>

<script setup lang="ts">
import { computed } from '#imports'

const isChecked = ref(false)

const classes = computed(() => ({
	'checkbox--checked': isChecked.value,
	'checkbox--unchecked': !isChecked.value,
}))
</script>

<style scoped>
.checkbox {
	@apply flex justify-center items-center w-4 h-4 border-2 cursor-pointer transition-colors rounded-full;
}

.checkbox--checked {
	@apply
	bg-purple-dark border-purple-dark
	hover:bg-purple hover:border-purple;
}

.checkbox--unchecked {
	@apply
	border-blue
	hover:bg-blue-dark/25 hover:border-blue-dark;
}
</style>
