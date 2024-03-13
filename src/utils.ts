export function getDaysDifference(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

  // Convert both dates to milliseconds
  const firstDate = new Date(date1).getTime(); // ordate1.getTime();
  const secondDate = date2.getTime();

  // Calculate the difference in milliseconds
  const diffInMilliseconds = Math.abs(secondDate - firstDate);

  // Convert the difference back to days
  const diffInDays = Math.round(diffInMilliseconds / oneDay);

  return diffInDays;
}
