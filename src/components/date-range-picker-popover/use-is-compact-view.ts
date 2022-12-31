import { useEffect, useMemo, useState } from 'react';

export function useIsCompactView(breakpoint: string): boolean {
  const compactViewMediaQuery = useMemo(() => {
    if (typeof document !== 'undefined') {
      return window.matchMedia(breakpoint);
    }
    return null;
  }, [breakpoint]);
  const [isCompactView, setIsCompactView] = useState(
    () => compactViewMediaQuery?.matches || false
  );

  useEffect(() => {
    if (compactViewMediaQuery) {
      const handleChange = () => {
        setIsCompactView(compactViewMediaQuery.matches);
      };

      compactViewMediaQuery.addEventListener('change', handleChange);
      return () => {
        compactViewMediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [compactViewMediaQuery]);

  return isCompactView;
}
