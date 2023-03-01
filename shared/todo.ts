export interface Todo {
	id: string
	title: string
	text: string
	startDate: number
	endDate: number
	isCompleted: boolean
	isProcessing?: boolean
}