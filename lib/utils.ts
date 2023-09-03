import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useFormattedTimeRange(
  startDateString: string,
  endDateString: string,
) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  return `${startHour}:${
    startMinute < 10 ? "0" : ""
  }${startMinute} - ${endHour}:${endMinute < 10 ? "0" : ""}${endMinute}`;
}

export function useDate(rawDate: string) {
  const date = new Date(rawDate);

  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1; 
  const year = `${date.getFullYear()}`.slice(-2)

  return `${day}.${month}.${year}`;
}
