import * as React from 'react';
import { once, mergeRefs } from '../util';

describe('#once()', () => {
  it('creates function that invokes only once', () => {
    const fn = jest.fn();
    const fnOnce = once(fn);

    fnOnce();
    fnOnce();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('#mergeRefs()', () => {
  it('creates RefCallback function', () => {
    let ref1: React.MutableRefObject<HTMLElement | null> = { current: null };
    let ref2: React.MutableRefObject<HTMLElement | null> = { current: null };
    const instance = document.createElement('div');
    const refCallback = mergeRefs(ref1, (ref) => (ref2.current = ref), 'ref3');

    refCallback(instance);

    expect(ref1.current).toBe(instance);
    expect(ref2.current).toBe(instance);
  });
});
