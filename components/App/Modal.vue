<template>
	<Teleport to="body">
		<div
			v-if="isShowed"
			class="fixed left-0 top-0 w-screen h-screen flex justify-center items-center z-[99999]"
		>
			<div class="absolute left-0 top-0 w-screen h-screen bg-black/50" @click="emit('close')"/>
			<div class="container relative">
				<AppCard class="w-[457px] max-w-full mx-auto space-y-5 !bg-gray-400 !border-gray-500">
					<div class="flex justify-between">
						<span class="text-xl font-bold">{{ title }}</span>
						<IconClose class="cursor-pointer" @click="emit('close')"/>
					</div>
					<div class="space-y-3">
						<AppInput
							v-model="modal.todoTitle"
							:validate="validateTitle"
							placeholder="Заголовок"
						/>
						<AppInput
							v-model="modal.todoText"
							:validate="validateText"
							placeholder="Текст"
						/>
						<AppInput
							v-model="modal.todoEndDate"
							:validate="validateDate"
							placeholder="Дата окончания"
						>
							<template #icon="iconProps">
								<AppDatePicker
									v-bind="iconProps"
									@change="(date) => (modal.todoEndDate = date) && validateDate(date)"
								/>
							</template>
						</AppInput>

						<AppButton
							@click="submit"
							:is-disabled="isProcessing || modal.validations.size < 3"
						>
							<span>{{ buttonText }}</span>
							<IconPlus/>
						</AppButton>
					</div>
				</AppCard>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { getCurrentDate, getDateFromString } from '~/shared/date'
import { Todo } from '~/shared/todo'

interface AppModalProps {
	title: string
	buttonText: string
	initTodoTitle?: string
	initTodoText?: string
	initTodoEndDate?: string
	isShowed: boolean
	isProcessing: boolean
}

const props = withDefaults(defineProps<AppModalProps>(), {
	initTodoTitle: '',
	initTodoText: '',
	initTodoEndDate: '',
})

const {
	title,
	buttonText,
	isShowed,
	isProcessing,
	initTodoTitle,
	initTodoText,
	initTodoEndDate,
} = toRefs(props)

const emit = defineEmits<{
	(event: 'close'): void
	(event: 'submit', todo: Omit<Todo, 'id'>): void
}>()

const modal = reactive({
	todoTitle: initTodoTitle.value,
	todoText: initTodoText.value,
	todoEndDate: initTodoEndDate.value,
	validations: new Set<string>(),
})

watch([initTodoTitle, initTodoText, initTodoEndDate], () => {
	modal.todoTitle = initTodoTitle.value
	modal.todoText = initTodoText.value
	modal.todoEndDate = initTodoEndDate.value
	modal.validations = new Set(['1', '2', '3'])
})

watch(isProcessing, (value) => {
	if (value) return

	modal.todoTitle = ''
	modal.todoText = ''
	modal.todoEndDate = ''
	modal.validations.clear()
})

function submit() {
	const {
		todoTitle: title,
		todoText: text,
		todoEndDate,
	} = modal

	const startDate = getCurrentDate()
	const endDate = getDateFromString(todoEndDate)

	emit('submit', { title, text, startDate, endDate, isCompleted: false })
}

function validateTitle(title: string) {
	modal.validations.delete('title')

	if (!title)
		return 'Обязательное поле'

	modal.validations.add('title')

	return true
}

function validateText(text: string) {
	modal.validations.delete('text')

	if (!text)
		return 'Обязательное поле'

	if (text.length < 3)
		return 'Минимальная длина - 3 символа'

	modal.validations.add('text')

	return true
}

function validateDate(date: string) {
	modal.validations.delete('date')

	if (!date)
		return 'Обязательное поле'

	const dateTime = getDateFromString(date)

	if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date) || Number.isNaN(dateTime))
		return 'Формат даты: DD.MM.YYYY'

	if (getCurrentDate() > dateTime)
		return 'Дата должна быть больше текущей даты'

	modal.validations.add('date')

	return true
}
</script>

<style scoped>

</style>