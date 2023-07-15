import { assertIfNullable, exhaustiveCheck, once } from './helpers';

describe('#once()', () => {
  it('creates function that invokes only once', () => {
    const fn = jest.fn();
    const fnOnce = once(fn);

    fnOnce();
    fnOnce();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('#assertIfNullable()', () => {
  it('throws an error when the given value is null or undefined', () => {
    const error = 'value is null or undefined';
    expect(() => assertIfNullable(null)).toThrow(error);
    expect(() => assertIfNullable(undefined)).toThrow(error);
    expect(() => assertIfNullable(1)).not.toThrow();
  });
});

describe('#exhaustiveCheck()', () => {
  it('throws an error', () => {
    const message = 'custom error';
    // @ts-expect-error Should throw error with custom message
    expect(() => exhaustiveCheck('', message)).toThrow(message);
  });
});
