import { describe, expect, it } from 'vitest';
import { assertNullOrUndefined, exhaustiveCheck } from './helpers.js';

describe('#assertNullOrUndefined()', () => {
  it('throws an error when the given value is null or undefined', () => {
    const error = 'value is null or undefined';
    expect(() => assertNullOrUndefined(null, error)).toThrow(error);
    expect(() => assertNullOrUndefined(undefined, error)).toThrow(error);
    expect(() => assertNullOrUndefined(1)).not.toThrow();
  });
});

describe('#exhaustiveCheck()', () => {
  it('throws an error', () => {
    const message = 'custom error';
    // @ts-expect-error Should throw error with custom message
    expect(() => exhaustiveCheck('', message)).toThrow(message);
  });
});
