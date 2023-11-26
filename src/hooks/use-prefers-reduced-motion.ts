import { useEffect, useMemo, useState } from 'react';

export function usePrefersReducedMotion() {
  const media = useMemo(() => window.matchMedia('(prefers-reduced-motion)'), []);
  const [reduced, setReduced] = useState(media.matches);
  useEffect(() => {
    const handleChange = () => {
      setReduced(media.matches);
    };
    media.addEventListener('change', handleChange);
    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [media]);
  return reduced;
}
