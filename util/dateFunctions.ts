import type { WeekDataType } from "~/types";

export function formatDate(dateString: Date | string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const adjustDateByWeek = (
  dateString: string,
  direction: "forward" | "backward"
): string => {
  const parts: string[] = dateString.split("-");
  const year: number = parseInt(parts[0]);
  const month: number = parseInt(parts[1]) - 1;
  const day: number = parseInt(parts[2]);
  const date: Date = new Date(year, month, day);

  const dayAdjustment = direction === "forward" ? 7 : -7;
  date.setDate(date.getDate() + dayAdjustment);

  const newDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return newDate;
};

export const adjustToMonthBoundary = (
  dateString: string,
  direction: "forward" | "backward"
): string => {
  const parts: string[] = dateString.split("-");
  const year: number = parseInt(parts[0]);
  const month: number = parseInt(parts[1]) - 1;
  const date: Date = new Date(year, month);

  if (direction === "forward") {
    date.setMonth(date.getMonth() + 1, 1);
  } else {
    date.setDate(0);
  }

  const newDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return newDate;
};

export function getWeekRange(date: Date | string) {
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay();
  const first = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const last = first + 6;

  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    first
  );
  const lastDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    last
  );

  const formatDateString = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return {
    firstDayOfWeek: formatDateString(firstDayOfWeek),
    lastDayOfWeek: formatDateString(lastDayOfWeek),
  };
}

export function getMonthRange(date: Date | string) {
  const currentDate = new Date(date);
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const formatDateString = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return {
    firstDayOfMonth: formatDateString(firstDayOfMonth),
    lastDayOfMonth: formatDateString(lastDayOfMonth),
  };
}

export function getWeeklyData(dailyData: WeekDataType[], inputDate: string) {
  const { firstDayOfWeek, lastDayOfWeek } = getWeekRange(inputDate);

  const filteredData = dailyData.filter((data) => {
    const dataDate = new Date(data.date);
    const firstDate = new Date(firstDayOfWeek);
    const lastDate = new Date(lastDayOfWeek);

    lastDate.setHours(23, 59, 59, 999);

    return dataDate >= firstDate && dataDate <= lastDate;
  });
  return filteredData;
}

export function getMonthlyData(dailyData: WeekDataType[], date: string) {
  const { firstDayOfMonth, lastDayOfMonth } = getMonthRange(date);
  return dailyData.filter(
    (data) =>
      new Date(data.date) >= new Date(firstDayOfMonth) &&
      new Date(data.date) <= new Date(lastDayOfMonth)
  );
}
