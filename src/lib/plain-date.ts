export type ISODate = string;

export class PlainDate {
  private readonly _date: Date;

  static readonly FIRST_WEEKDAY = 0;
  static readonly LAST_WEEKDAY = 6;
  static readonly DAYS_IN_WEEK = 7;
  static readonly MONTHS_IN_YEAR = 12;

  static now(): PlainDate {
    const date = new Date();
    return new PlainDate(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static fromISODate(isoDate: ISODate): PlainDate {
    const date = new Date(isoDate);
    return new PlainDate(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private constructor(year: number, monthIndex: number, day: number) {
    this._date = new Date(year, monthIndex, day);
  }

  get year(): number {
    return this._date.getFullYear();
  }

  get month(): number {
    return this._date.getMonth() + 1;
  }

  get day(): number {
    return this._date.getDate();
  }

  get lastDay(): number {
    return new Date(
      this._date.getFullYear(),
      this._date.getMonth() + 1,
      0
    ).getDate();
  }

  get weekday(): number {
    let dayOfWeek = this._date.getDay() - 1;
    if (dayOfWeek < PlainDate.FIRST_WEEKDAY) {
      dayOfWeek = PlainDate.LAST_WEEKDAY;
    }
    return dayOfWeek;
  }

  get startOfWeek(): PlainDate {
    const weekday = this.weekday;
    return new PlainDate(
      this._date.getFullYear(),
      this._date.getMonth(),
      this._date.getDate() - weekday
    );
  }

  get endOfWeek(): PlainDate {
    const weekday = this.weekday;
    return new PlainDate(
      this._date.getFullYear(),
      this._date.getMonth(),
      this._date.getDate() + (PlainDate.LAST_WEEKDAY - weekday)
    );
  }

  get startOfMonth(): PlainDate {
    return new PlainDate(this._date.getFullYear(), this._date.getMonth(), 1);
  }

  get endOfMonth(): PlainDate {
    return new PlainDate(
      this._date.getFullYear(),
      this._date.getMonth() + 1,
      0
    );
  }

  isValid(): boolean {
    return !Number.isNaN(this._date.getTime());
  }

  equals(anotherDate: PlainDate): boolean {
    return (
      this.year === anotherDate.year &&
      this.month === anotherDate.month &&
      this.day === anotherDate.day
    );
  }

  isAfter(anotherDate: PlainDate): boolean {
    return this._date > anotherDate._date;
  }

  isBefore(anotherDate: PlainDate): boolean {
    return this._date < anotherDate._date;
  }

  isAfterOrEqual(anotherDate: PlainDate): boolean {
    return this.equals(anotherDate) || this._date > anotherDate._date;
  }

  isBeforeOrEqual(anotherDate: PlainDate): boolean {
    return this.equals(anotherDate) || this._date <= anotherDate._date;
  }

  addDays(days: number): PlainDate {
    return new PlainDate(
      this._date.getFullYear(),
      this._date.getMonth(),
      this._date.getDate() + days
    );
  }

  addWeeks(weeks: number): PlainDate {
    return this.addDays((weeks >> 0) * PlainDate.DAYS_IN_WEEK);
  }

  addMonths(months: number): PlainDate {
    const day = this.day;
    const date = new PlainDate(
      this._date.getFullYear(),
      this._date.getMonth() + (months >> 0),
      1
    );
    date._date.setDate(day > date.lastDay ? date.lastDay : day);
    return date;
  }

  addYears(years: number): PlainDate {
    return this.addMonths((years >> 0) * PlainDate.MONTHS_IN_YEAR);
  }

  toISOString(): ISODate {
    if (!this.isValid()) {
      return '';
    }
    return (
      String(this.year).padStart(4, '0') +
      '-' +
      String(this.month).padStart(2, '0') +
      '-' +
      String(this.day).padStart(2, '0')
    );
  }

  format(
    options: {
      weekday?: 'long' | 'short' | 'narrow';
      era?: 'long' | 'short' | 'narrow';
      year?: 'numeric' | '2-digit';
      month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
      day?: 'numeric' | '2-digit';
    },
    locale?: string
  ): string {
    const intl = new Intl.DateTimeFormat(locale, options);
    return intl.format(this._date);
  }
}
