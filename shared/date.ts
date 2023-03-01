export function formatDate(date: number) {
	return new Date(date * 1000).toLocaleDateString('ru-RU')
}

export function getCurrentDate() {
	const dateTime = new Date(new Date().toLocaleDateString('en-US')).getTime()
	
	return Math.floor(dateTime / 1000)
}

export function getDateFromString(str: string) {
	const [d, m, y] = str.split('.')
	
	const date = new Date(`${m}.${d}.${y}`)
	
	return Math.floor(date.getTime() / 1000)
}