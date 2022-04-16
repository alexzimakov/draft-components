// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(fn: unknown): fn is (...args: any) => any {
  return typeof fn === 'function';
}

export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}
