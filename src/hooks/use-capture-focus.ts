import { RefObject, useEffect } from 'react';
import { Stack } from '../lib/stack';

export interface UseCaptureFocusParams {
  modalRef: RefObject<Element>;
  isEnabled?: boolean;
  shouldFocusFirstDescendant?: boolean;
  shouldRestoreFocusAfterRelease?: boolean;
  focusElementRefAfterCapture?: RefObject<Element>;
  focusElementRefAfterRelease?: RefObject<Element>;
}

export function useCaptureFocus({
  modalRef,
  isEnabled = true,
  shouldFocusFirstDescendant = true,
  shouldRestoreFocusAfterRelease = true,
  focusElementRefAfterCapture,
  focusElementRefAfterRelease,
}: UseCaptureFocusParams) {
  useEffect(() => {
    const modal = modalRef.current;

    if (isEnabled && modal) {
      const releaseFocus = captureFocus(modal, {
        shouldFocusFirstDescendant,
        shouldRestoreFocusAfterRelease,
        focusElementAfterCapture: focusElementRefAfterCapture?.current || null,
        focusElementAfterRelease: focusElementRefAfterRelease?.current || null,
      });

      return () => {
        releaseFocus();
      };
    }
  }, [
    modalRef,
    isEnabled,
    shouldFocusFirstDescendant,
    shouldRestoreFocusAfterRelease,
    focusElementRefAfterCapture,
    focusElementRefAfterRelease,
  ]);
}

interface CaptureFocusParams {
  shouldFocusFirstDescendant: boolean;
  shouldRestoreFocusAfterRelease: boolean;
  focusElementAfterCapture: Element | null;
  focusElementAfterRelease: Element | null;
}

let modalStack = new Stack<Element>();
let lastFocusedElement: Element | null = null;

function captureFocus(
  modal: Element,
  {
    shouldFocusFirstDescendant,
    shouldRestoreFocusAfterRelease,
    focusElementAfterCapture,
    focusElementAfterRelease,
  }: CaptureFocusParams,
) {
  const focusedElementBeforeCapture = (
    lastFocusedElement || document.activeElement
  );

  if (modalStack.isEmpty) {
    document.addEventListener('focus', handleFocus, true);
  }

  modalStack.push(modal);

  if (focusElementAfterCapture) {
    attemptFocus(focusElementAfterCapture);
  } else if (shouldFocusFirstDescendant) {
    attemptFocus(getFirstFocusableElement(modal));
  }

  return function releaseFocus() {
    modalStack.remove(modal);

    if (focusElementAfterRelease) {
      attemptFocus(focusElementAfterRelease);
    } else if (shouldRestoreFocusAfterRelease && (
      document.activeElement == null ||
      document.activeElement === document.body
    )) {
      attemptFocus(focusedElementBeforeCapture);
    }

    if (modalStack.isEmpty) {
      document.removeEventListener('focus', handleFocus, true);
      lastFocusedElement = null;
    }
  };
}

function handleFocus(event: FocusEvent) {
  const focusedElement = event.target;
  const modal = modalStack.last;

  if (modal && focusedElement instanceof Element) {
    if (modal.contains(focusedElement)) {
      lastFocusedElement = focusedElement;
    } else {
      const firstFocusableDescendant = getFirstFocusableElement(modal);
      const lastFocusableDescendant = getLastFocusableElement(modal);
      const nextFocusElement = lastFocusedElement === firstFocusableDescendant
        ? lastFocusableDescendant
        : firstFocusableDescendant;
      if (attemptFocus(nextFocusElement)) {
        lastFocusedElement = nextFocusElement;
      }
    }
  }
}

const FOCUS_ELEMENTS_SELECTOR = [
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
  .map((s) => `${s}:not([tabindex^="-"])`)
  .join(',');

function getFocusElements(parent: Element): Element[] {
  return Array.from(parent.querySelectorAll(FOCUS_ELEMENTS_SELECTOR));
}

function getFirstFocusableElement(parent: Element): Element {
  return getFocusElements(parent)[0] ?? parent;
}

function getLastFocusableElement(parent: Element): Element {
  const focusableElements = getFocusElements(parent);
  return focusableElements[focusableElements.length - 1] ?? parent;
}

function attemptFocus(element: Element | null): boolean {
  if (element instanceof HTMLElement) {
    element.focus();
    return element === document.activeElement;
  }
  return false;
}
