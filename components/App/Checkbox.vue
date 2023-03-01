<template>
	<div
		class="checkbox"
		:class="{
			'checkbox--checked': isChecked,
			'checkbox--unchecked': !isChecked,
		}"
	>
		<IconCheck class="relative top-[1px]" v-show="isChecked"/>
	</div>
</template>

<script setup lang="ts">
interface CheckboxProps {
	isChecked: boolean
}

const props = defineProps<CheckboxProps>()
const { isChecked } = toRefs(props)
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
