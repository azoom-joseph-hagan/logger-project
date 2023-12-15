export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const adjustDateByWeek = (
  dateString: string,
  direction: "forward" | "backward"
) => {
  // Parse the date string
  const parts: string[] = dateString.split("-");
  const year: number = parseInt(parts[0]);
  const month: number = parseInt(parts[1]) - 1; // Month is 0-indexed in JavaScript Date
  const day: number = parseInt(parts[2]);
  const date: Date = new Date(year, month, day);

  // Add or subtract 7 days based on direction
  const dayAdjustment = direction === "forward" ? 7 : -7;
  date.setDate(date.getDate() + dayAdjustment);

  // Format the new date in YYYY-MM-DD format
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
  const month: number = parseInt(parts[1]) - 1; // Month is 0-indexed in JavaScript Date
  const date: Date = new Date(year, month);

  if (direction === "forward") {
    // Set to first day of the next month
    date.setMonth(date.getMonth() + 1, 1);
  } else {
    // Set to the last day of the previous month
    date.setDate(0);
  }

  // Format the new date in YYYY-MM-DD format
  const newDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return newDate;
};

export function getWeekRange(date) {
  const currentDate = new Date(date);
  // Adjust for local time zone
  const dayOfWeek = currentDate.getDay();
  const first = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to start week on Monday
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

  const formatDateString = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return {
    firstDayOfWeek: formatDateString(firstDayOfWeek),
    lastDayOfWeek: formatDateString(lastDayOfWeek),
  };
}

export function getMonthRange(date) {
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

  const formatDateString = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  return {
    firstDayOfMonth: formatDateString(firstDayOfMonth),
    lastDayOfMonth: formatDateString(lastDayOfMonth),
  };
}

export function getWeeklyData(dailyData, inputDate) {
  const { firstDayOfWeek, lastDayOfWeek } = getWeekRange(inputDate);

  const filteredData = dailyData.filter((data) => {
    const dataDate = new Date(data.date);
    const firstDate = new Date(firstDayOfWeek);
    const lastDate = new Date(lastDayOfWeek);

    // Adjust lastDate to include the entire day
    lastDate.setHours(23, 59, 59, 999);

    return dataDate >= firstDate && dataDate <= lastDate;
  });
  return filteredData;
}

export function getMonthlyData(dailyData, date) {
  const { firstDayOfMonth, lastDayOfMonth } = getMonthRange(date);
  return dailyData.filter(
    (data) =>
      new Date(data.date) >= new Date(firstDayOfMonth) &&
      new Date(data.date) <= new Date(lastDayOfMonth)
  );
}
