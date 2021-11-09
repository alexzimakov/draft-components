export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(fn: unknown): fn is Function {
  return typeof fn === 'function';
}
