export default function formatDate(newDate: Date): string {
	const days: string[] = [
		"Воскресенье",
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
	];
	const months: string[] = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];

	const date = new Date(newDate);

	const day: string = days[date.getDay()];
	const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
	const month: string = months[date.getMonth()];
	const year: number = date.getFullYear();
	const hours: string = String(date.getHours()).padStart(2, "0");
	const minutes: string = String(date.getMinutes()).padStart(2, "0");
	const seconds: string = String(date.getSeconds()).padStart(2, "0");

	return `${day}, ${dayOfMonth} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

export function formatDateShort(newDate: Date): string {
	const days: string[] = [
		"Воскресенье",
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
	];
	const months: string[] = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];

	const date = new Date(newDate);

	const day: string = days[date.getDay()];
	const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
	const month: string = months[date.getMonth()];
	const year: number = date.getFullYear();

	return `${day}, ${dayOfMonth} ${month} ${year}`;
}

export function formatDateWithDotsDivider(newDate: Date): string {
	const date = new Date(newDate);

	const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
	const month: string = String(date.getMonth()).padStart(2, "0");
	const year: number = date.getFullYear();

	return `${dayOfMonth}.${month}.${year}`;
}

export function formatTime(date: Date | string): string {
	const parsedDate = typeof date === "string" ? new Date(date) : date;

	if (isNaN(parsedDate.getTime())) {
		throw new Error("Invalid date");
	}

	const hours = parsedDate.getUTCHours().toString().padStart(2, "0");
	const minutes = parsedDate.getUTCMinutes().toString().padStart(2, "0");

	return `${hours}:${minutes}`;
}
