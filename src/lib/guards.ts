export function isHTMLElement(element: any): element is HTMLElement {
  return element instanceof HTMLElement;
}

export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}
