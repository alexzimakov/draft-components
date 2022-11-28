import { useRef } from 'react';
import { uniqueId } from '../lib/util';

export function useUniqueId(options?: {
  default?: string;
  prefix? : string;
}): string {
  const ref = useRef(options?.default);
  if (!ref.current) {
    ref.current = uniqueId(options?.prefix);
  }
  return ref.current;
}
