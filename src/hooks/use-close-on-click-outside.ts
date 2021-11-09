import { RefObject, useEffect } from 'react';
import { isFunction, isHTMLElement } from '../lib/guards';

export interface UseCloseOnClickOutsideParams {
  isEnabled?: boolean;
  ignoreElements?: Array<Element | null>;
}

export function useCloseOnClickOutside(
  onClose: () => void,
  ref: RefObject<Element>,
  params?: UseCloseOnClickOutsideParams,
) {
  useEffect(() => {
    const isEnabled = params?.isEnabled ?? true;
    const ignoreElements = (params?.ignoreElements ?? []).filter(isHTMLElement);
    const container = ref.current;

    if (!isEnabled || !isFunction(onClose) || !isHTMLElement(container)) {
      return;
    }

    const onBodyClick = (event: MouseEvent) => {
      const target = event.target;
      const shouldIgnoreClick = ignoreElements.some((element) => {
        return contains(element, target);
      });

      if (!shouldIgnoreClick && !contains(container, target)) {
        onClose();
      }
    };

    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [onClose, ref, params]);
}

function contains(parent: Element, other: EventTarget | null): boolean {
  return other
    ? parent === other || parent.contains(other as Node)
    : false;
}
