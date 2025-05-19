import { describe, expect, it } from 'vitest';
import { classNames } from './react-helpers.js';

describe('#classNames()', () => {
  it('should return class string without falsy values', () => {
    const classes = ['foo', 100, false, true, undefined, null, 'bar', 0];
    const className = classNames(...classes);

    expect(className).toBe('foo 100 true bar');
  });

  it('should return class string from object keys', () => {
    const className = classNames({
      foo: true,
      bar: false,
      egg: undefined,
      spam: 1,
    });

    expect(className).toBe('foo spam');
  });

  it('should return empty string when all classes are falsy', () => {
    const classes = [false, undefined, null, ''];
    const className = classNames(...classes);

    expect(className).toBe('');
  });
});
