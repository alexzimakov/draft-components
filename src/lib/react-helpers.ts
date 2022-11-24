import { MutableRefObject, RefCallback, RefObject } from 'react';

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

export type Ref<T> =
  | RefObject<T>
  | MutableRefObject<T>
  | RefCallback<T>
  | null
  | undefined;

export function mergeRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
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
