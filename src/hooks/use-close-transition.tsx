import { useEffect, useRef, useState } from 'react';
import { ClassName, classNames } from '../lib/react-helpers';

export type UsePresenceTransitionParams = {
  isOpen: boolean;
  closeDurationMs: number;
  className?: ClassName;
  openClassName?: ClassName;
  closingClassName?: ClassName;
};

export type UsePresenceTransitionResult = {
  isMounted: boolean;
  transitionClassName: string;
};

export function useCloseTransition({
  isOpen,
  className,
  openClassName,
  closingClassName,
  closeDurationMs,
}: UsePresenceTransitionParams): UsePresenceTransitionResult {
  const timeoutId = useRef<number>();
  const [isMounted, setIsMounted] = useState(isOpen);
  const [shouldAddOpenClass, setShouldAddOpenClass] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      window.requestAnimationFrame(() => {
        setShouldAddOpenClass(true);
      });
    } else {
      setShouldAddOpenClass(false);
      timeoutId.current = window.setTimeout(() => {
        setIsMounted(false);
      }, closeDurationMs);

      return () => {
        window.clearTimeout(timeoutId.current);
        timeoutId.current = undefined;
      };
    }
  }, [isOpen, closeDurationMs]);

  return {
    isMounted,
    transitionClassName: classNames(
      className,
      shouldAddOpenClass && openClassName,
      timeoutId.current && closingClassName
    ),
  };
}
