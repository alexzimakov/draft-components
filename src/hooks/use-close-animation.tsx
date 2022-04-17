import { useEffect, useRef, useState } from 'react';
import { ClassName, classNames } from '../lib/react-helpers';
import { useIsMounted } from './use-is-mounted';

export type UseCloseAnimationParams = {
  isOpen: boolean;
  closeDurationMs: number;
  className?: ClassName;
  openClassName?: ClassName;
  closingClassName?: ClassName;
};

export type UseCloseAnimationResult = {
  shouldRender: boolean;
  animationClassName: string;
};

export function useCloseAnimation(
  params: UseCloseAnimationParams
): UseCloseAnimationResult {
  const isMounted = useIsMounted();
  const openTimout = useRef<number>();
  const closeTimeout = useRef<number>();
  const [shouldRender, setShouldRender] = useState(params.isOpen);
  const [shouldAddOpenClass, setShouldAddOpenClass] = useState(false);

  useEffect(() => {
    if (params.isOpen) {
      setShouldRender(true);
      openTimout.current = window.setTimeout(() => {
        if (isMounted.current) {
          setShouldAddOpenClass(true);
        }
      }, 16);
    } else {
      setShouldAddOpenClass(false);
      closeTimeout.current = window.setTimeout(() => {
        if (isMounted.current) {
          setShouldRender(false);
        }
      }, params.closeDurationMs);

      return () => {
        window.clearTimeout(openTimout.current);
        openTimout.current = undefined;

        window.clearTimeout(closeTimeout.current);
        closeTimeout.current = undefined;
      };
    }
  }, [params.isOpen, params.closeDurationMs, isMounted]);

  return {
    shouldRender,
    animationClassName: classNames(
      params.className,
      shouldAddOpenClass && params.openClassName,
      closeTimeout.current && params.closingClassName
    ),
  };
}
