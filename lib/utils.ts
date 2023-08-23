import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useFormattedTimeRange(
  startDateString: string,
  endDateString: string
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
