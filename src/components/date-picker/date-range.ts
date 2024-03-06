import { DateISO, isSameDay, toDateISO } from './date-helpers.js';

export type DateISORange = {
  start: DateISO;
  end: DateISO;
};

export class DateRange {
  readonly start: Date;
  readonly end: Date;

  constructor(start: Date, end: Date) {
    if (start > end) {
      [start, end] = [end, start];
    }
    this.start = start;
    this.end = end;
  }

  static create(start: Date, end: Date): DateRange {
    return new DateRange(start, end);
  }

  contains(date: Date): boolean {
    return (
      (isSameDay(date, this.start) || date > this.start)
      && (isSameDay(date, this.end) || date < this.end)
    );
  }

  toDateISORange(): DateISORange {
    return {
      start: toDateISO(this.start),
      end: toDateISO(this.end),
    };
  }
}
