import { DateComponents } from './date-components';

it('should create instances from datetime ISO string', () => {
  expect(DateComponents.makeFormDatetimeISO('2021-05-27 18:19')).toEqual(
    new DateComponents({ year: 2021, month: 5, day: 27, hour: 18, minute: 19 })
  );
  expect(DateComponents.makeFormDatetimeISO('2021-05-27T18:19')).toEqual(
    new DateComponents({ year: 2021, month: 5, day: 27, hour: 18, minute: 19 })
  );
  expect(DateComponents.makeFormDatetimeISO('2021-05-27')).toEqual(
    new DateComponents({ year: 2021, month: 5, day: 27 })
  );
  expect(DateComponents.makeFormDatetimeISO('18:19')).toEqual(
    new DateComponents({ hour: 18, minute: 19 })
  );
  expect(DateComponents.makeFormDatetimeISO()).toEqual(new DateComponents());
});

it('returns formatted value for specific date component', () => {
  const dateComponents = new DateComponents({ year: 2021, month: 5, day: 27 });
  expect(dateComponents.getDisplayedValue('year')).toBe('2021');
  expect(dateComponents.getDisplayedValue('month')).toBe('05');
  expect(dateComponents.getDisplayedValue('hour')).toBe('');
});

it('returns datetime ISO or empty string if combination of components is not valid date', () => {
  expect(
    new DateComponents({
      year: 2021,
      month: 5,
      day: 27,
      hour: 18,
      minute: 35,
    }).toDatetimeISO()
  ).toBe('2021-05-27T18:35');
  expect(
    new DateComponents({
      year: 2021,
      month: 4,
      day: 31,
      hour: 18,
      minute: 35,
    }).toDatetimeISO()
  ).toBe('');
  expect(
    new DateComponents({ year: 2021, month: 5, day: 27 }).toDatetimeISO()
  ).toBe('');
});

it('returns date ISO or empty string if combination of components is not valid date', () => {
  expect(
    new DateComponents({ year: 2021, month: 5, day: 27 }).toDateISO()
  ).toBe('2021-05-27');
  expect(
    new DateComponents({ year: 2021, month: 4, day: 31 }).toDateISO()
  ).toBe('');
  expect(new DateComponents({ year: 2021, month: 5 }).toDateISO()).toBe('');
});

it('returns time ISO or empty string if combination of components is not valid date', () => {
  expect(new DateComponents({ hour: 18, minute: 50 }).toTimeISO()).toBe(
    '18:50'
  );
  expect(new DateComponents({ hour: 27, minute: 50 }).toTimeISO()).toBe('');
  expect(new DateComponents({ hour: 12 }).toTimeISO()).toBe('');
});
