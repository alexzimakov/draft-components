import * as React from 'react';

export function noop() {}

export function once<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  let isCalled = false;
  let result: ReturnType<T>;

  return (...args) => {
    if (!isCalled) {
      isCalled = true;
      result = fn(...args);
    }
    return result;
  };
}

export function mergeRefs<T = any>(
  ...refs: (React.MutableRefObject<T> | React.LegacyRef<T>)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (
        typeof ref === 'object' &&
        ref &&
        ref.hasOwnProperty('current')
      ) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
