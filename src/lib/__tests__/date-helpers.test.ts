import {
  addDays,
  addMonths,
  addYears,
  createDateRange,
  formatISO,
  formatISORange,
  getDayOfWeek,
  getDaysInMonth,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  isRangeContain,
  isSameDay,
  parseISORange,
  toDate,
} from '../date-helpers';

describe('#toDate()', () => {
  it('returns `Date` instance when the given value can be cast to a valid date', () => {
    const date = new Date(2021, 9, 28, 0, 0, 0, 0);
    const isoDate = '2021-10-28';
    const time = date.getTime();

    expect(toDate(date)).toEqual(date);
    expect(toDate(isoDate)).toEqual(date);
    expect(toDate(time)).toEqual(date);
  });

  it('returns current date when the given value cannot be cast to a valid date', () => {
    const currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    expect(toDate(new Date(NaN))).toEqual(currentDate);
    expect(toDate('28 of october')).toEqual(currentDate);
    expect(toDate(Infinity)).toEqual(currentDate);
  });
});

describe('#formatISO()', () => {
  it('returns date string in ISO format', () => {
    expect(formatISO(new Date(2021, 9, 28))).toBe('2021-10-28');
    expect(formatISO(new Date(2021, 9, 3))).toBe('2021-10-03');
  });
});

describe('#isSameDay()', () => {
  it('returns true when the given dates is the same day', () => {
    expect(
      isSameDay(new Date(2021, 9, 28, 10), new Date(2021, 9, 28, 12)),
    ).toBe(true);
  });

  it('returns false when the given dates is not the same day', () => {
    expect(
      isSameDay(new Date(2021, 9, 27, 10), new Date(2021, 9, 28, 10)),
    ).toBe(false);
  });
});

describe('#getDayOfWeek()', () => {
  it('returns the day of the week for the specified date, where 0 represents Monday', () => {
    expect(getDayOfWeek(new Date('2021-01-04'))).toBe(0);
    expect(getDayOfWeek(new Date('2021-01-05'))).toBe(1);
    expect(getDayOfWeek(new Date('2021-01-06'))).toBe(2);
    expect(getDayOfWeek(new Date('2021-01-07'))).toBe(3);
    expect(getDayOfWeek(new Date('2021-01-08'))).toBe(4);
    expect(getDayOfWeek(new Date('2021-01-09'))).toBe(5);
    expect(getDayOfWeek(new Date('2021-01-10'))).toBe(6);
  });
});

describe('#getDaysInMonth()', () => {
  it('returns the number of days in the specified month', () => {
    expect(getDaysInMonth(new Date(2021, 9, 10))).toBe(31);
    expect(getDaysInMonth(new Date(2021, 1, 10))).toBe(28);
    expect(getDaysInMonth(new Date(2020, 1, 10))).toBe(29);
  });
});

describe('#getStartOfWeek()', () => {
  it('returns a date that represents the start of a week of the given date', () => {
    expect(
      getStartOfWeek(new Date(2021, 9, 13)),
    ).toEqual(new Date(2021, 9, 11));
  });
});

describe('#getEndOfWeek()', () => {
  it('returns a date that represents the end of a week of the given date', () => {
    expect(
      getEndOfWeek(new Date(2021, 9, 13)),
    ).toEqual(new Date(2021, 9, 17));
  });
});

describe('#getStartOfMonth()', () => {
  it('returns a date that represents the start of a month of the given date', () => {
    expect(
      getStartOfMonth(new Date(2021, 9, 13)),
    ).toEqual(new Date(2021, 9, 1));
  });
});

describe('#getEndOfMonth()', () => {
  it('returns a date that represents the end of a month of the given date', () => {
    expect(
      getEndOfMonth(new Date(2021, 9, 13)),
    ).toEqual(new Date(2021, 9, 31));
  });
});

describe('#addDays()', () => {
  it('returns date with an added positive number of days', () => {
    const date = new Date(2021, 9, 28);
    expect(addDays(date, 1)).toEqual(new Date(2021, 9, 29));
    expect(addDays(date, 4)).toEqual(new Date(2021, 10, 1));
  });

  it('returns date with an added negative number of days', () => {
    const date = new Date(2021, 9, 28);
    expect(addDays(date, -1)).toEqual(new Date(2021, 9, 27));
    expect(addDays(date, -28)).toEqual(new Date(2021, 8, 30));
  });
});

describe('#addMonths()', () => {
  it('returns date with an added number of months', () => {
    const date = new Date(2021, 9, 20);
    expect(addMonths(date, 1)).toEqual(new Date(2021, 10, 20));
    expect(addMonths(date, -1)).toEqual(new Date(2021, 8, 20));
  });

  it('returns end of month if day does not exist in new month', () => {
    const date = new Date(2021, 9, 31);
    expect(addMonths(date, 1)).toEqual(new Date(2021, 10, 30));
  });
});

describe('#addYears()', () => {
  it('returns date with an added number of years', () => {
    const date = new Date(2021, 9, 20);
    expect(addYears(date, 1)).toEqual(new Date(2022, 9, 20));
    expect(addYears(date, -1)).toEqual(new Date(2020, 9, 20));
  });
});

describe('#createDateRange()', () => {
  it('returns new date range', () => {
    const startDate = new Date(2021, 9, 5);
    const endDate = new Date(2021, 10, 20);
    expect(createDateRange(startDate, endDate)).toEqual({
      startDate,
      endDate,
    });
  });

  it('should swap start and end dates when end date less then start date', () => {
    const endDate = new Date(2021, 9, 5);
    const startDate = new Date(2021, 10, 20);
    expect(createDateRange(startDate, endDate)).toEqual({
      startDate: endDate,
      endDate: startDate,
    });
  });
});

describe('#parseISORange()', () => {
  it('returns parsed date range', () => {
    expect(parseISORange({
      startDate: '2021-10-05',
      endDate: '2021-11-20',
    })).toEqual({
      startDate: new Date(2021, 9, 5),
      endDate: new Date(2021, 10, 20),
    });
  });
});

describe('#formatISORange()', () => {
  it('returns formatted date range', () => {
    expect(formatISORange({
      startDate: new Date(2021, 9, 5),
      endDate: new Date(2021, 10, 20),
    })).toEqual({
      startDate: '2021-10-05',
      endDate: '2021-11-20',
    });
  });
});

describe('#isRangeContain()', () => {
  it('returns true when the given date is in a range', () => {
    const range = {
      startDate: new Date(2021, 9, 5),
      endDate: new Date(2021, 10, 20),
    };

    expect(isRangeContain(range, new Date(2021, 9, 15))).toBe(true);
    expect(isRangeContain(range, range.startDate)).toBe(true);
    expect(isRangeContain(range, range.endDate)).toBe(true);
  });

  it('returns false when the given date is not in a range', () => {
    const range = {
      startDate: new Date(2021, 9, 5),
      endDate: new Date(2021, 10, 20),
    };

    expect(isRangeContain(range, new Date(2021, 9, 4))).toBe(false);
    expect(isRangeContain(range, new Date(2021, 10, 21))).toBe(false);
  });
});
