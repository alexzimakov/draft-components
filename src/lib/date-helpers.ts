export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ISODateRange {
  startDate: string;
  endDate: string;
}

export interface DateRangeWithDatePreset extends DateRange {
  datePreset?: string;
}

export interface ISODateRangeWithDatePreset extends ISODateRange {
  datePreset?: string;
}

export const FIRST_DAY_OF_WEEK = 0;
export const LAST_DAY_OF_WEEK = 6;
export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;

export function toDate(dateLike: Date | string | number): Date {
  let date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) {
    date = new Date();
  }
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function formatISO(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    String(year).padStart(4, '0') + '-' +
    String(month).padStart(2, '0') + '-' +
    String(day).padStart(2, '0')
  );
}

export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getDate() === dateRight.getDate()
  );
}

export function getDayOfWeek(date: Date): number {
  const dayOfWeek = date.getDay() - 1;
  return dayOfWeek < FIRST_DAY_OF_WEEK ? LAST_DAY_OF_WEEK : dayOfWeek;
}

export function getDaysInMonth(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
}

export function getStartOfWeek(date: Date): Date {
  const dayOfWeek = getDayOfWeek(date);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - dayOfWeek,
  );
}

export function getEndOfWeek(date: Date): Date {
  const dayOfWeek = getDayOfWeek(date);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + (6 - dayOfWeek),
  );
}

export function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function addDays(date: Date, days: number): Date {
  date = new Date(date);
  date.setDate(date.getDate() + (days >> 0));
  return date;
}

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth() + (months >> 0),
    1,
  );
  const daysInMonth = getDaysInMonth(newDate);
  newDate.setDate(daysInMonth < date.getDate()
    ? daysInMonth
    : date.getDate(),
  );
  return newDate;
}

export function addYears(date: Date, years: number): Date {
  return addMonths(date, (years >> 0) * MONTHS_IN_YEAR);
}

export function createDateRange(startDate: Date, endDate: Date): DateRange {
  return startDate > endDate
    ? { startDate: endDate, endDate: startDate }
    : { startDate: startDate, endDate: endDate };
}

export function parseISORange(isoRange: ISODateRange): DateRange {
  return createDateRange(
    toDate(isoRange.startDate),
    toDate(isoRange.endDate),
  );
}

export function formatISORange(range: DateRange): ISODateRange {
  return {
    startDate: formatISO(range.startDate),
    endDate: formatISO(range.endDate),
  };
}

export function isRangeContain(range: DateRange, date: Date): boolean {
  return range.startDate <= date && date <= range.endDate;
}
