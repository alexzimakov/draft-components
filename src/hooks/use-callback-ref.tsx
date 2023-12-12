import { useEffect, useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => any;

export function useCallbackRef<T extends Callback>(callback: T): T {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  return useMemo(() => ((...args) => savedCallback.current(...args)) as T, []);
}
