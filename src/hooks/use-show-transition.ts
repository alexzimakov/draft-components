import { useEffect, useRef, useState } from 'react';
import { useCallbackRef } from './index.js';
import { classNames, noop } from '../lib/index.js';
import { usePrefersReducedMotion } from './use-prefers-reduced-motion.js';

export function useShowTransition({
  isOpen,
  enterDurationMs,
  leaveDurationMs,
  enter = 'enter',
  enterFrom = 'enter-from',
  enterTo = 'enter-to',
  leave = 'leave',
  leaveFrom = 'leave-from',
  leaveTo = 'leave-to',
  onEnterTransitionEnd: _onEnterTransitionEnd = noop,
  onLeaveTransitionEnd: _onLeaveTransitionEnd = noop,
}: {
  isOpen: boolean;
  enterDurationMs: number;
  leaveDurationMs: number;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  onEnterTransitionEnd?: () => void;
  onLeaveTransitionEnd?: () => void;
}) {
  const onEnterTransitionEnd = useCallbackRef(_onEnterTransitionEnd);
  const onLeaveTransitionEnd = useCallbackRef(_onLeaveTransitionEnd);
  const enterTimeoutRef = useRef(-1);
  const leaveTimeoutRef = useRef(-1);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [transitionClasses, setTransitionClasses] = useState(isOpen
    ? [enter, enterTo]
    : [enter, enterFrom]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (isOpen) {
      window.clearTimeout(leaveTimeoutRef.current);
      setShouldRender(true);

      return () => {
        window.clearTimeout(enterTimeoutRef.current);
        setTransitionClasses([leave, leaveFrom]);
        window.setTimeout(() => {
          setTransitionClasses([leave, leaveTo]);
        });
        leaveTimeoutRef.current = window.setTimeout(() => {
          setShouldRender(false);
          setTransitionClasses([enter, enterFrom]);
          onLeaveTransitionEnd();
        }, leaveDurationMs);
      };
    }
  }, [
    prefersReducedMotion,
    isOpen,
    enter,
    enterFrom,
    leave,
    leaveFrom,
    leaveTo,
    leaveDurationMs,
    onLeaveTransitionEnd,
  ]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (shouldRender) {
      setTransitionClasses([enter, enterTo]);
      enterTimeoutRef.current = window.setTimeout(() => {
        setTransitionClasses([]);
        onEnterTransitionEnd();
      }, enterDurationMs);
    }
  }, [
    prefersReducedMotion,
    shouldRender,
    enter,
    enterTo,
    enterDurationMs,
    onEnterTransitionEnd,
  ]);

  return {
    shouldRender: isOpen || shouldRender,
    transitionClassName: prefersReducedMotion ? '' : classNames(...transitionClasses),
  };
}
