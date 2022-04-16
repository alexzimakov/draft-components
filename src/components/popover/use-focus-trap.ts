import { RefObject, useEffect } from 'react';
import { KeyCode } from '../../lib/keyboard-helpers';

const modalList: RefObject<HTMLElement>[] = [];

export function useFocusTrap(
  modalRef: RefObject<HTMLElement>,
  isEnabled: boolean
): void {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handleBodyKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== KeyCode.tab) {
        return;
      }

      const currentModal = modalList[modalList.length - 1]?.current;
      if (currentModal == null) {
        return;
      }

      const focusableEls = getFocusableElements(currentModal);
      if (focusableEls.length === 0) {
        return;
      }

      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      if (!currentModal.contains(document.activeElement)) {
        event.preventDefault();
        firstFocusableEl.focus();
      } else if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          event.preventDefault();
          lastFocusableEl.focus();
        }
      } else if (document.activeElement === lastFocusableEl) {
        event.preventDefault();
        firstFocusableEl.focus();
      }
    };

    modalList.push(modalRef);

    if (modalList.length === 1) {
      document.body.addEventListener('keydown', handleBodyKeyDown);
    }

    return () => {
      const index = modalList.indexOf(modalRef);
      if (~index) {
        modalList.splice(index, 1);
      }

      if (modalList.length === 0) {
        document.body.removeEventListener('keydown', handleBodyKeyDown);
      }
    };
  }, [isEnabled, modalRef]);
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (container == null) {
    return [];
  }
  const focusableElementsSelector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    '[tabindex]',
    '[contentEditable=true]',
  ]
    .map((selector) => `${selector}:not([tabindex='-1'])`)
    .join(', ');
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableElementsSelector)
  );
}
