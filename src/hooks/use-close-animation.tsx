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
  const timeoutId = useRef<number>();
  const [shouldRender, setShouldRender] = useState(params.isOpen);
  const [shouldAddOpenClass, setShouldAddOpenClass] = useState(false);

  useEffect(() => {
    if (params.isOpen) {
      setShouldRender(true);
      window.requestAnimationFrame(() => {
        if (isMounted.current) {
          setShouldAddOpenClass(true);
        }
      });
    } else {
      setShouldAddOpenClass(false);
      timeoutId.current = window.setTimeout(() => {
        if (isMounted.current) {
          setShouldRender(false);
        }
      }, params.closeDurationMs);

      return () => {
        window.clearTimeout(timeoutId.current);
        timeoutId.current = undefined;
      };
    }
  }, [params.isOpen, params.closeDurationMs, isMounted]);

  return {
    shouldRender,
    animationClassName: classNames(
      params.className,
      shouldAddOpenClass && params.openClassName,
      timeoutId.current && params.closingClassName
    ),
  };
}
