import { RefObject, useEffect } from 'react';
import { focusElement } from '../lib/react-helpers.js';

type ModalRef = RefObject<HTMLElement | null>;

const modalStack: ModalRef[] = [];
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

export function useFocusTrap(modalRef: ModalRef, opts: {
  disabled?: boolean;
} = {}): void {
  const disabled = opts.disabled || false;

  useEffect(() => {
    if (disabled) {
      return;
    }

    const handleBodyKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') {
        return;
      }

      const topModalRef = modalStack.at(-1);
      if (topModalRef == null) {
        return;
      }

      const topModal = topModalRef.current;
      if (topModal == null) {
        return;
      }

      const focusableElementList = [...topModal.querySelectorAll(focusableElementsSelector)];
      if (focusableElementList.length === 0) {
        return;
      }

      const firstFocusableEl = focusableElementList.at(0);
      const lastFocusableEl = focusableElementList.at(-1);
      if (!topModal.contains(document.activeElement)) {
        event.preventDefault();
        focusElement(firstFocusableEl);
      } else if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          event.preventDefault();
          focusElement(lastFocusableEl);
        }
      } else if (document.activeElement === lastFocusableEl) {
        event.preventDefault();
        focusElement(firstFocusableEl);
      }
    };

    modalStack.push(modalRef);
    if (modalStack.length === 1) {
      document.body.addEventListener('keydown', handleBodyKeyDown, { capture: true });
    }

    return () => {
      const index = modalStack.indexOf(modalRef);
      if (index >= 0) {
        modalStack.splice(index, 1);
      }
      if (modalStack.length === 0) {
        document.body.removeEventListener('keydown', handleBodyKeyDown, { capture: true });
      }
    };
  }, [disabled, modalRef]);
}
