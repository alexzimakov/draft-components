import { MutableRefObject } from 'react';
import { describe, expect, it } from 'vitest';
import { classNames, getRefElement, mergeRefs } from './react-helpers.js';

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

describe('#mergeRefs()', () => {
  it('creates RefCallback function', () => {
    const ref1: MutableRefObject<HTMLElement | null> = { current: null };
    const ref2: MutableRefObject<HTMLElement | null> = { current: null };
    const instance = document.createElement('div');
    const refCallback = mergeRefs(ref1, (ref) => (ref2.current = ref));

    refCallback(instance);

    expect(ref1.current).toBe(instance);
    expect(ref2.current).toBe(instance);
  });
});

describe('#getRefElement()', () => {
  it('returns stored HTML element', () => {
    const ref: MutableRefObject<HTMLElement | null> = {
      current: document.createElement('div'),
    };
    expect(getRefElement(ref)).toBe(ref.current);
  });

  it('throws an error when ref is not set', () => {
    const ref: MutableRefObject<HTMLElement | null> = {
      current: null,
    };
    const message = 'ref is not set';
    expect(() => getRefElement(ref, message)).toThrow(message);
  });
});
