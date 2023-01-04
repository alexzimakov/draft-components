import { once, assertIfNullable } from './util';

describe('#once()', () => {
  it('creates function that invokes only once', () => {
    const fn = jest.fn();
    const fnOnce = once(fn);

    fnOnce();
    fnOnce();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

it('should throw an error when the given value is null or undefined', () => {
  const error = 'value is null or undefined';
  expect(() => assertIfNullable(null)).toThrow(error);
  expect(() => assertIfNullable(undefined)).toThrow(error);
  expect(() => assertIfNullable(1)).not.toThrow();
});
