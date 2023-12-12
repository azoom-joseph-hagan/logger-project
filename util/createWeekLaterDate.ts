export const createWeekLaterDate = (dateString: string) => {
  // Parse the date string
  const parts: string[] = dateString.split("-");
  const year: number = parseInt(parts[2]);
  const month: number = parseInt(parts[1]) - 1;
  const day: number = parseInt(parts[0]);
  const date: Date = new Date(year, month, day);

  // Add 7 days
  date.setDate(date.getDate() + 7);

  // Format the new date
  const newDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  return newDate;
};
