import { PlainDate } from './plain-date';

it('creates a new `PlainDate` instance from ISO date string', () => {
  const d = PlainDate.fromISODate('2021-11-04');
  expect(d).toBeInstanceOf(PlainDate);
  expect(d.year).toBe(2021);
  expect(d.month).toBe(11);
  expect(d.day).toBe(4);
});

it('returns a new `PlainDate` instance representing current date', () => {
  const currentDate = new Date();
  const d = PlainDate.now();
  expect(d).toBeInstanceOf(PlainDate);
  expect(d.year).toBe(currentDate.getFullYear());
  expect(d.month).toBe(currentDate.getMonth() + 1);
  expect(d.day).toBe(currentDate.getDate());
});

describe('`lastDay` getter', () => {
  it('returns the last day of month', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.lastDay).toBe(30);
  });
});

describe('`weekday` getter', () => {
  it('returns the day of week, where 0 represents Monday', () => {
    expect(PlainDate.fromISODate('2021-01-04').weekday).toBe(0);
    expect(PlainDate.fromISODate('2021-01-05').weekday).toBe(1);
    expect(PlainDate.fromISODate('2021-01-06').weekday).toBe(2);
    expect(PlainDate.fromISODate('2021-01-07').weekday).toBe(3);
    expect(PlainDate.fromISODate('2021-01-08').weekday).toBe(4);
    expect(PlainDate.fromISODate('2021-01-09').weekday).toBe(5);
    expect(PlainDate.fromISODate('2021-01-10').weekday).toBe(6);
  });
});

describe('`startOfWeek` getter', () => {
  it('returns a `PlainDate` object that represents the start of week', () => {
    expect(
      PlainDate.fromISODate('2021-10-13').startOfWeek,
    ).toEqual(PlainDate.fromISODate('2021-10-11'));
  });
});

describe('`endOfWeek` getter', () => {
  it('returns a `PlainDate` object that represents the end of week', () => {
    expect(
      PlainDate.fromISODate('2021-10-13').endOfWeek,
    ).toEqual(PlainDate.fromISODate('2021-10-17'));
  });
});

describe('`startOfMonth` getter', () => {
  it('returns a `PlainDate` object that represents the start of month', () => {
    expect(
      PlainDate.fromISODate('2021-10-13').startOfMonth,
    ).toEqual(PlainDate.fromISODate('2021-10-01'));
  });
});

describe('`endOfMonth` getter', () => {
  it('returns a `PlainDate` object that represents the end of month', () => {
    expect(
      PlainDate.fromISODate('2021-10-13').endOfMonth,
    ).toEqual(PlainDate.fromISODate('2021-10-31'));
  });
});

describe('#isValid()', () => {
  it('returns true when `PlainDate` represents a valid date', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isValid()).toBe(true);
  });

  it('returns false when `PlainDate` represents an invalid date', () => {
    const d = PlainDate.fromISODate('2021-11-34');
    expect(d.isValid()).toBe(false);
  });
});

describe('#equals()', () => {
  it('returns true when `PlainDate` objects are equals', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.equals(PlainDate.fromISODate('2021-11-04'))).toBe(true);
  });

  it('returns true when `PlainDate` objects are not equals', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.equals(PlainDate.fromISODate('2021-11-05'))).toBe(false);
  });
});

describe('#isBefore()', () => {
  it('returns true when `PlainDate` object less than the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isBefore(PlainDate.fromISODate('2021-11-05'))).toBe(true);
  });

  it('returns false when `PlainDate` object greater than or equal to the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isBefore(PlainDate.fromISODate('2021-11-03'))).toBe(false);
    expect(d.isBefore(PlainDate.fromISODate('2021-11-04'))).toBe(false);
  });
});

describe('#isAfter()', () => {
  it('returns true when `PlainDate` object greater than the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isAfter(PlainDate.fromISODate('2021-11-03'))).toBe(true);
  });

  it('returns false when `PlainDate` object less than or equal to the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isAfter(PlainDate.fromISODate('2021-11-05'))).toBe(false);
    expect(d.isAfter(PlainDate.fromISODate('2021-11-04'))).toBe(false);
  });
});

describe('#isBeforeOrEqual()', () => {
  it('returns true when `PlainDate` object less than or equal to the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isBeforeOrEqual(PlainDate.fromISODate('2021-11-05'))).toBe(true);
    expect(d.isBeforeOrEqual(PlainDate.fromISODate('2021-11-04'))).toBe(true);
  });

  it('returns false when `PlainDate` object greater than the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isBeforeOrEqual(PlainDate.fromISODate('2021-11-03'))).toBe(false);
  });
});

describe('#isAfterOrEqual()', () => {
  it('returns true when `PlainDate` object greater than or equal to the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isAfterOrEqual(PlainDate.fromISODate('2021-11-03'))).toBe(true);
    expect(d.isAfterOrEqual(PlainDate.fromISODate('2021-11-04'))).toBe(true);
  });

  it('returns false when `PlainDate` object less than or equal to the given', () => {
    const d = PlainDate.fromISODate('2021-11-04');
    expect(d.isAfterOrEqual(PlainDate.fromISODate('2021-11-05'))).toBe(false);
  });
});

describe('#addDays()', () => {
  it('returns a `PlainDate` object with added positive number of days', () => {
    const d = PlainDate.fromISODate('2021-10-28');
    expect(d.addDays(1)).toEqual(PlainDate.fromISODate('2021-10-29'));
    expect(d.addDays(4)).toEqual(PlainDate.fromISODate('2021-11-01'));
  });

  it('returns a `PlainDate` object with added negative number of days', () => {
    const d = PlainDate.fromISODate('2021-10-28');
    expect(d.addDays(-1)).toEqual(PlainDate.fromISODate('2021-10-27'));
    expect(d.addDays(-28)).toEqual(PlainDate.fromISODate('2021-09-30'));
  });
});

describe('#addWeeks()', () => {
  it('returns a `PlainDate` object with added positive number of days', () => {
    const d = PlainDate.fromISODate('2021-10-28');
    expect(d.addWeeks(1)).toEqual(PlainDate.fromISODate('2021-11-04'));
  });

  it('returns a `PlainDate` object with added negative number of days', () => {
    const d = PlainDate.fromISODate('2021-10-28');
    expect(d.addWeeks(-1)).toEqual(PlainDate.fromISODate('2021-10-21'));
  });
});

describe('#addMonths()', () => {
  it('returns a `PlainDate` object with added number of months', () => {
    const d = PlainDate.fromISODate('2021-10-20');
    expect(d.addMonths(1)).toEqual(PlainDate.fromISODate('2021-11-20'));
    expect(d.addMonths(-1)).toEqual(PlainDate.fromISODate('2021-09-20'));
  });

  it('returns a `PlainDate` object that represents end of month if day does not exist in new month', () => {
    const d = PlainDate.fromISODate('2021-10-31');
    expect(d.addMonths(1)).toEqual(PlainDate.fromISODate('2021-11-30'));
  });
});

describe('#addYears()', () => {
  it('returns a `PlainDate` object with an added number of years', () => {
    const d = PlainDate.fromISODate('2021-10-20');
    expect(d.addYears(1)).toEqual(PlainDate.fromISODate('2022-10-20'));
    expect(d.addYears(-1)).toEqual(PlainDate.fromISODate('2020-10-20'));
  });
});

describe('#toISOString()', () => {
  it('returns date string in ISO format', () => {
    const isoString = '2021-10-20';
    const d = PlainDate.fromISODate(isoString);
    expect(d.toISOString()).toBe(isoString);
  });
});

describe('#format()', () => {
  it('returns formatted date', () => {
    const d = PlainDate.fromISODate('2021-10-20');
    expect(d.format({ year: 'numeric', month: 'long' })).toBe('October 2021');
  });

  it('returns formatted date with non-default locale', () => {
    const d = PlainDate.fromISODate('2021-10-20');
    expect(d.format({ year: 'numeric', month: 'long' }, 'ru'))
      .toBe('октябрь 2021 г.');
  });
});
