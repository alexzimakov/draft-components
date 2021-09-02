import { MutableRefObject, useEffect } from 'react';
import { isFunction, isHTMLElement } from '../lib/guards';

type MaybeHTMLElement = HTMLElement | null;

export function useCloseOnClickOutside(
  onClose: () => void,
  containerRef: MutableRefObject<MaybeHTMLElement>,
  params?: { isEnabled?: boolean; ignoreElements?: MaybeHTMLElement[] }
) {
  useEffect(() => {
    const isEnabled = params?.isEnabled ?? true;
    const ignoreElements = (params?.ignoreElements ?? []).filter(isHTMLElement);
    const container = containerRef.current;

    if (!isEnabled || !isFunction(onClose) || !isHTMLElement(container)) {
      return;
    }

    const onBodyClick = (event: MouseEvent) => {
      const target = event.target;
      const shouldIgnoreClick = ignoreElements.some((element) =>
        contains(element, target)
      );

      if (!shouldIgnoreClick && !contains(container, target)) {
        onClose();
      }
    };

    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [onClose, containerRef, params]);
}

function contains(parent: HTMLElement, other: EventTarget | null): boolean {
  return parent === other || parent.contains(other as Node);
}
