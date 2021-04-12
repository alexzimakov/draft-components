import * as React from 'react';
import { Stack } from '../lib';

export interface CaptureFocusParams {
  modalRef: React.MutableRefObject<Element | null>;
  isEnabled?: boolean;
  focusAfterCaptureRef?: React.MutableRefObject<Element | null>;
  focusAfterReleaseRef?: React.MutableRefObject<Element | null>;
}

export function useCaptureFocus({
  modalRef,
  isEnabled = true,
  focusAfterCaptureRef,
  focusAfterReleaseRef,
}: CaptureFocusParams) {
  React.useEffect(() => {
    const modal = modalRef.current;

    if (isEnabled && modal) {
      const focusAfterCapture = focusAfterCaptureRef?.current;
      const focusAfterRelease = focusAfterReleaseRef?.current;
      const releaseFocus = captureFocus(modal, focusAfterCapture);

      return () => {
        releaseFocus(focusAfterRelease);
      };
    }
  }, [isEnabled, modalRef, focusAfterCaptureRef, focusAfterReleaseRef]);
}

const modalStack = new Stack<Element>();
let lastElement: Element | null = null;

function captureFocus(modal: Element, focusElement?: Element | null) {
  const focusBeforeCapture = lastElement || document.activeElement;

  if (modalStack.isEmpty) {
    document.addEventListener('focus', onFocus, true);
  }

  modalStack.push(modal);
  attemptFocus(focusElement || getFirstFocusElement(modal));

  return function releaseFocus(focusElement?: Element | null) {
    modalStack.remove(modal);
    attemptFocus(focusElement || focusBeforeCapture);

    if (modalStack.isEmpty) {
      document.removeEventListener('focus', onFocus, true);
      lastElement = null;
    }
  };
}

function onFocus(event: FocusEvent) {
  const target = event.target;
  const topModal = modalStack.last;

  if (topModal && target instanceof HTMLElement) {
    if (topModal.contains(target)) {
      lastElement = target;
    } else {
      let nextFocusElement = getFirstFocusElement(topModal);
      if (lastElement === nextFocusElement) {
        nextFocusElement = getLastFocusElement(topModal);
      }
      if (attemptFocus(nextFocusElement)) {
        lastElement = nextFocusElement;
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

function getFirstFocusElement(parent: Element): Element {
  return getFocusElements(parent)[0] ?? parent;
}

function getLastFocusElement(parent: Element): Element {
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
