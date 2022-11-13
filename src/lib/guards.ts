import { isValidElement, ReactElement, Ref } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(fn: unknown): fn is (...args: any) => any {
  return typeof fn === 'function';
}

export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}

export type ReactElementWithRef = ReactElement & { ref: Ref<unknown> };
export function isReactElement(
  element: unknown
): element is ReactElementWithRef {
  return isValidElement(element) && 'ref' in element;
}
