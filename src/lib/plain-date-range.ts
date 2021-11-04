import { ISODate, PlainDate } from './plain-date';

export interface ISODateRange {
  start: ISODate;
  end: ISODate;
}

export class PlainDateRange {
  start: PlainDate;
  end: PlainDate;

  static create(): PlainDateRange {
    return new PlainDateRange(
      PlainDate.now(),
      PlainDate.now(),
    );
  }

  static fromISODateRange(isoDateRange: ISODateRange): PlainDateRange {
    return new PlainDateRange(
      PlainDate.fromISODate(isoDateRange.start),
      PlainDate.fromISODate(isoDateRange.end),
    );
  }

  constructor(start: PlainDate, end: PlainDate) {
    if (start.isAfter(end)) {
      this.start = end;
      this.end = start;
    } else {
      this.start = start;
      this.end = end;
    }
  }

  contains(date: PlainDate): boolean {
    return this.start.isBeforeOrEqual(date) && this.end.isAfterOrEqual(date);
  }

  equals(range: PlainDateRange): boolean {
    return this.start.equals(range.start) && this.end.equals(range.end);
  }

  toISODateRange(): ISODateRange {
    return {
      start: this.start.toISOString(),
      end: this.end.toISOString(),
    };
  }
}
