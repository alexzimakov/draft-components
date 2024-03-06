export type DateISO = string;
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const MONTHS_IN_YEAR = 12;
export const DAYS_IN_WEEK = 7;
export const LAST_WEEKDAY: Weekday = 6;
export const DATE_ISO_REGEX = /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[0-1]|0[1-9]|[1-2][0-9])$/;

export function addYears(date: Date, amount: number): Date {
  // Use ISO date string to deal with years less than 100.
  return parseDateISO(formatDateISOComponents(
    date.getFullYear() + amount,
    date.getMonth(),
    date.getDate(),
  ));
}

export function setDateYear(date: Date, year: number): Date {
  // Use ISO date string to deal with years less than 100.
  return parseDateISO(formatDateISOComponents(
    year,
    date.getMonth(),
    date.getDate(),
  ));
}

export function addMonths(date: Date, amount: number): Date {
  date = new Date(date);
  date.setMonth(date.getMonth() + amount);
  return date;
}

export function setDateMonth(date: Date, month: number): Date {
  date = new Date(date);
  date.setMonth(month);
  return date;
}

export function addDays(date: Date, amount: number): Date {
  date = new Date(date);
  date.setDate(date.getDate() + amount);
  return date;
}

export function getStartOfMonth(date: Date): Date {
  date = new Date(date);
  date.setDate(1);
  return date;
}

export function getEndOfMonth(date: Date): Date {
  date = new Date(date);
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date;
}

export function getWeekday(date: Date, weekStartsOn = 0): number {
  let day = date.getDay() - weekStartsOn;
  if (day < 0) {
    day += DAYS_IN_WEEK;
  }
  return day;
}

export function getStartOfWeek(date: Date, weekStartsOn: Weekday = 0): Date {
  const weekday = getWeekday(date, weekStartsOn);
  return addDays(date, -weekday);
}

export function getEndOfWeek(date: Date, weekStartsOn: Weekday = 0): Date {
  const weekday = getWeekday(date, weekStartsOn);
  return addDays(date, LAST_WEEKDAY - weekday);
}

export function getStartOfDay(date: Date): Date {
  date = new Date(date);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function isValidDateISO(value: DateISO): boolean {
  return DATE_ISO_REGEX.test(value);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

export function isWeekend(date: Date): boolean {
  return date.getDay() === 6 || date.getDay() === 0;
}

export function parseDateISO(
  date: DateISO,
  error = 'The argument must be a date in the ISO format.',
): Date {
  if (!isValidDateISO(date)) {
    throw new RangeError(error);
  }
  return getStartOfDay(new Date(date));
}

export function toDateISO(date: Date): DateISO {
  return formatDateISOComponents(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
}

function formatDateISOComponents(
  year: number,
  month: number,
  day: number,
): DateISO {
  return [
    String(year).padStart(4, '0'),
    String(month + 1).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');
}
