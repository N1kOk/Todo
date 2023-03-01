<template>
	<Teleport to="body">
		<div
			v-if="isShowed"
			class="fixed left-0 top-0 w-screen h-screen flex justify-center items-center z-[99999]"
		>
			<div class="absolute left-0 top-0 w-screen h-screen bg-black/50" @click="emit('close')"/>
			<div class="relative">
				<AppCard class="w-[457px] space-y-5 !bg-gray-400 !border-gray-500">
					<div class="flex justify-between">
						<span class="text-xl font-bold">Создать задачу</span>
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
						/>

						<AppButton
							@click="create"
							:is-disabled="isProcessing || modal.validations.size < 3"
						>
							<span v-if="!isProcessing">Создать</span>
							<IconPlus v-if="!isProcessing"/>

							<span v-else>Создание...</span>
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
	isShowed: boolean
	isProcessing: boolean
}

const props = defineProps<AppModalProps>()
const { isShowed, isProcessing } = toRefs(props)

const emit = defineEmits<{
	(event: 'close'): void
	(event: 'create', todo: Omit<Todo, 'id'>): void
}>()

const modal = reactive({
	todoTitle: '',
	todoText: '',
	todoEndDate: '',
	validations: new Set<string>(),
})

watch(isProcessing, (value) => {
	if (value) return

	modal.todoTitle = ''
	modal.todoText = ''
	modal.todoEndDate = ''
	modal.validations.clear()
})

function create() {
	const {
		todoTitle: title,
		todoText: text,
		todoEndDate,
	} = modal

	const startDate = getCurrentDate()
	const endDate = getDateFromString(todoEndDate)

	emit('create', { title, text, startDate, endDate, isCompleted: false })
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