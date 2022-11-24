import { MutableRefObject } from 'react';
import { classNames, mergeRefs } from './react-helpers';

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
