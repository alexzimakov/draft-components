import { PlainDateRange } from './plain-date-range';
import { PlainDate } from './plain-date';

it('creates a new `PlainDateRange` instance from ISO date range', () => {
  const isoDateRange = {
    start: '2021-10-05',
    end: '2021-10-21',
  };
  const r = PlainDateRange.fromISODateRange(isoDateRange);
  expect(r.start).toEqual(PlainDate.fromISODate(isoDateRange.start));
  expect(r.end).toEqual(PlainDate.fromISODate(isoDateRange.end));
});

it(
  'creates a new `PlainDateRange` instance from ISO date range ' +
  'when start greater when end',
  () => {
    const isoDateRange = { start: '2021-10-21', end: '2021-10-05' };
    const r = PlainDateRange.fromISODateRange(isoDateRange);
    expect(r.start).toEqual(PlainDate.fromISODate(isoDateRange.end));
    expect(r.end).toEqual(PlainDate.fromISODate(isoDateRange.start));
  }
);

it('creates a new `PlainDateRange` instance representing current date', () => {
  const d = PlainDate.now();
  const r = PlainDateRange.create();
  expect(r.start).toEqual(d);
  expect(r.end).toEqual(d);
});

describe('#equals()', () => {
  it('returns true when `PlainDateRange` objects are equals', () => {
    const isoDateRange = {
      start: '2021-10-05',
      end: '2021-10-21',
    };
    const r1 = PlainDateRange.fromISODateRange(isoDateRange);
    const r2 = PlainDateRange.fromISODateRange(isoDateRange);
    expect(r1.equals(r2)).toBe(true);
  });

  it('returns true when `PlainDateRange` objects are not equals', () => {
    const isoDateRange = {
      start: '2021-10-05',
      end: '2021-10-21',
    };
    const r1 = PlainDateRange.fromISODateRange(isoDateRange);
    const r2 = PlainDateRange.fromISODateRange({
      ...isoDateRange,
      end: '2021-10-20',
    });
    expect(r1.equals(r2)).toBe(false);
  });
});

describe('#contains()', () => {
  it('returns true when `PlainDateRange` range contains date', () => {
    const isoDateRange = {
      start: '2021-10-05',
      end: '2021-10-21',
    };
    const r = PlainDateRange.fromISODateRange(isoDateRange);
    expect(r.contains(PlainDate.fromISODate('2021-10-10'))).toBe(true);
    expect(r.contains(PlainDate.fromISODate(isoDateRange.start))).toBe(true);
    expect(r.contains(PlainDate.fromISODate(isoDateRange.end))).toBe(true);
  });

  it('returns true when `PlainDateRange` range does not contain date', () => {
    const isoDateRange = {
      start: '2021-10-05',
      end: '2021-10-21',
    };
    const r = PlainDateRange.fromISODateRange(isoDateRange);
    expect(r.contains(PlainDate.fromISODate('2021-10-04'))).toBe(false);
    expect(r.contains(PlainDate.fromISODate('2021-10-22'))).toBe(false);
  });
});
