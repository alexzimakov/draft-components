import {
  type ReactElement,
  type Ref,
  type RefCallback,
  type RefObject,
  isValidElement,
} from 'react';

export type ClassNamesObject = { [className: string]: unknown };
export type ClassName =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassNamesObject;

export function classNames(...classes: ClassName[]): string {
  let resultString = '';
  for (const className of classes) {
    if (!className) {
      continue;
    }

    if (typeof className === 'object') {
      for (const key of Object.keys(className)) {
        if (className[key]) {
          resultString += key + ' ';
        }
      }
    } else {
      resultString += className + ' ';
    }
  }

  return resultString.trimEnd();
}

export type RefParameter<T> =
  | RefObject<T>
  | Ref<T>
  | undefined;

export function mergeRefs<T>(...refs: RefParameter<T>[]): RefCallback<T> {
  return (instance) => {
    for (const ref of refs) {
      if (ref != null) {
        if (typeof ref === 'function') {
          ref(instance);
        } else {
          Object.assign(ref, { current: instance });
        }
      }
    }
  };
}

export type ReactElementWithRef = ReactElement & { ref: Ref<unknown> };

export function isReactElementWithRef(
  element: unknown,
): element is ReactElementWithRef {
  return isValidElement(element) && 'ref' in element;
}

export function focusElement(element: EventTarget | null | undefined): void {
  if (element != null && element instanceof HTMLElement) {
    element.focus();
  }
}

export function getRefElement<T extends HTMLElement>(
  ref: RefObject<T> | RefObject<T>,
  message = 'getElementFromRef: ref value is null.',
): NonNullable<T> {
  const value = ref.current;
  if (value == null) {
    throw new Error(message);
  }
  return value;
}
