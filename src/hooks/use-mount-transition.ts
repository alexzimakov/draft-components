import { useEffect, useMemo, useRef, useState } from 'react';
import { classNames } from '../lib/react-helpers';

export type TransitionParams = {
  animateFirstMount?: boolean;
  isShown: boolean;
  durationMs: number;
  /**
   * CSS class for the initial state of element.
   * This class defines the starting values of transition styles and
   * the transition duration and timing function.
   *
   * @example
   * .hidden {
   *   opacity: 0;
   *   transition: opacity 0.15s ease;
   * }
   */
  enterFrom: string;
  /**
   * CSS class for the target state of element.
   * This class defines the ending values of transition styles.
   *
   * @example
   * .visible {
   *   opacity: 1;
   * }
   */
  enterTo: string;
};

export type TransitionState = {
  isMounted: boolean;
  className: string;
};

export function useMountTransition({
  animateFirstMount = false,
  isShown,
  durationMs,
  enterFrom,
  enterTo,
}: TransitionParams): TransitionState {
  const [isMounted, setIsMounted] = useState(isShown);
  const [hasEnterToClass, setHasEnterToClass] = useState(false);
  const firstMount = useRef(true);
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)'),
    [],
  );

  const disableTransition = (
    prefersReducedMotion.matches ||
    (!animateFirstMount && firstMount.current)
  );
  if (disableTransition) {
    durationMs = 0;
  }

  useEffect(() => {
    if (!isShown) {
      firstMount.current = false;
    }
  }, [isShown]);

  useEffect(() => {
    let timeout: number | undefined;

    if (isShown) {
      setIsMounted(true);
      timeout = window.setTimeout(() => setHasEnterToClass(true));
    } else {
      setHasEnterToClass(false);
      timeout = window.setTimeout(() => setIsMounted(false), durationMs);
    }

    return () => window.clearTimeout(timeout);
  }, [isShown, durationMs]);

  return {
    isMounted,
    className: disableTransition
      ? ''
      : classNames(enterFrom, hasEnterToClass && enterTo),
  };
}
