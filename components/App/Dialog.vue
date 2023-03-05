<template>
	<Teleport to="body">
		<div
			v-if="dialogStore.isShowed"
			class="fixed left-0 top-0 w-screen h-screen flex justify-center items-center z-[99999]"
		>
			<div class="absolute left-0 top-0 w-screen h-screen bg-black/50" @click="dialogStore.closeDialog"/>
			<div class="container relative">
				<AppCard class="w-[457px] max-w-full mx-auto space-y-5 !bg-gray-400 !border-gray-500">
					<div class="flex justify-between">
						<span class="text-xl font-bold">{{ dialogStore.dialogTitle }}</span>
						<IconClose class="cursor-pointer" @click="dialogStore.closeDialog"/>
					</div>
					<div class="space-y-3">
						<AppInput
							v-model="dialogStore.title"
							:error-message="v$.title.$errors[0]?.$message"
							@blur="v$.title.$touch"
							placeholder="Заголовок"
						/>
						<AppInput
							v-model="dialogStore.text"
							:error-message="v$.text.$errors[0]?.$message"
							@blur="v$.text.$touch"
							placeholder="Текст"
						/>
						<AppInput
							v-model="dialogStore.date"
							:error-message="v$.date.$errors[0]?.$message"
							@blur="v$.date.$touch"
							placeholder="Дата окончания"
						>
							<template #icon="iconProps">
								<AppDatePicker
									v-bind="iconProps"
									@change="(date) => dialogStore.date = date"
								/>
							</template>
						</AppInput>

						<AppButton
							@click="dialogStore.isProcessing = true"
							:is-disabled="v$.$invalid || dialogStore.isProcessing"
						>
							<span>{{ dialogStore.buttonText }}</span>
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
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import { useDialogStore } from "~/store/dialog";

const dialogStore = useDialogStore()

const rules = {
	title: {
		required: helpers.withMessage('Обязательное поле', required),
	},
	text: {
		required: helpers.withMessage('Обязательное поле', required),
		minLength: helpers.withMessage('Минимальная длина - 3 символа', minLength(3)),
	},
	date: {
		required: helpers.withMessage('Обязательное поле', required),
		date: helpers.withMessage('Формат даты: DD.MM.YYYY', validateDate),
		newDate: helpers.withMessage('Дата должна быть больше текущей даты', validateNewDate),
	},
}

const v$ = useVuelidate(rules, dialogStore)

function validateDate(date: string) {
	const dateTime = getDateFromString(date)

	return /^\d{2}\.\d{2}\.\d{4}$/.test(date) && !Number.isNaN(dateTime)
}

function validateNewDate(date: string) {
	const dateTime = getDateFromString(date)

	return getCurrentDate() <= dateTime
}
</script>
