import { RefObject, useEffect, useRef } from 'react';

export function useIsMounted(): RefObject<boolean> {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
