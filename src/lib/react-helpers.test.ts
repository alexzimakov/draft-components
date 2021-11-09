import { MutableRefObject } from 'react';
import { classNames, mergeRefs } from './react-helpers';

describe('#classNames()', () => {
  it('should return className string without falsy classes', () => {
    const classes = ['foo', 100, false, true, undefined, null];

    const className = classNames(...classes);

    expect(className).toBe('foo 100 true');
  });

  it('should return className string from nested class list', () => {
    const classes = ['foo', ['egg', 'spam'], 'bar'];

    const className = classNames(classes);

    expect(className).toBe('foo egg spam bar');
  });

  it('should return className string from class map', () => {
    const classes = [
      {
        foo: true,
        bar: false,
        egg: undefined,
        spam: null,
      },
    ];

    const className = classNames(...classes);

    expect(className).toBe('foo');
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
    const refCallback = mergeRefs(ref1, (ref) => (ref2.current = ref), 'ref3');

    refCallback(instance);

    expect(ref1.current).toBe(instance);
    expect(ref2.current).toBe(instance);
  });
});
