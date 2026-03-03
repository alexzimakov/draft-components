import { useRef, useMemo, type RefObject } from 'react';

const NO_REF_VALUE = Symbol.for('NO_REF_VALUE');

export function useSafeRef<T>(error: string) {
  const ref = useRef<T | typeof NO_REF_VALUE>(NO_REF_VALUE);
  return useMemo((): RefObject<T> => ({
    get current() {
      const value = ref.current;
      if (value === NO_REF_VALUE) {
        throw new Error(error);
      }
      return value;
    },

    set current(value: T) {
      ref.current = value;
    },
  }), [error]);
}
