import { useEffect, type RefObject } from 'react';
import { focusElement } from '../shared/react-helpers';
import { KeyboardKeys } from '../shared/keyboard-keys';

type ModalRef = RefObject<HTMLElement>;
type Options = { isEnabled: boolean };

const modals: ModalRef[] = [];
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

/**
 * Prevents focus move outside a modal element.
 *
 * @param {ModalRef} modalRef - The modal element ref object.
 * @param {Object} options - An object with hook options.
 * @param {boolean} options.isEnabled - A flag that determines whether
 * to trap focus or not.
 */
export function useFocusTrap(
  modalRef: ModalRef,
  options: Options
): void {
  const isEnabled = options.isEnabled;

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    modals.push(modalRef);

    const handleBodyKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== KeyboardKeys.Tab) {
        return;
      }

      const activeModalRef = modals[modals.length - 1];
      if (activeModalRef == null) {
        return;
      }

      const activeModal = activeModalRef.current;
      if (activeModal == null) {
        return;
      }

      const focusableEls = Array.from(
        activeModal.querySelectorAll(focusableElementsSelector)
      );
      if (focusableEls.length === 0) {
        return;
      }

      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      if (!activeModal.contains(document.activeElement)) {
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

    // Add only one global `body` key down handler.
    if (modals.length === 1) {
      document.body.addEventListener('keydown', handleBodyKeyDown);
    }

    return () => {
      const index = modals.indexOf(modalRef);
      if (index >= 0) {
        modals.splice(index, 1);
      }

      // Remove the global `body` key down handler
      // if there are no active modals.
      if (modals.length === 0) {
        document.body.removeEventListener('keydown', handleBodyKeyDown);
      }
    };
  }, [isEnabled, modalRef]);
}
