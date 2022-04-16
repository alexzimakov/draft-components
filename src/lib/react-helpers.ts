import { MutableRefObject, RefCallback } from 'react';
import { isFunction } from './guards';

export type ClassName =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassNameList
  | ClassNameMap;
export type ClassNameList = ClassName[];
export type ClassNameMap = { [className: string]: unknown };

export function classNames(...classes: ClassName[]): string {
  let classString = '';
  for (const cn of classes) {
    if (cn !== 0 && !cn) {
      continue;
    }

    if (Array.isArray(cn)) {
      classString += classNames(...cn) + ' ';
    } else if (typeof cn === 'object') {
      for (const key of Object.keys(cn)) {
        if (cn[key]) {
          classString += key + ' ';
        }
      }
    } else {
      classString += cn + ' ';
    }
  }

  return classString.trimEnd();
}

export type MaybeRef<T> =
  | MutableRefObject<T>
  | RefCallback<T>
  | null
  | undefined;

export function mergeRefs<T>(...refs: MaybeRef<T>[]): RefCallback<T> {
  return (instance) => {
    for (const ref of refs) {
      if (ref) {
        if (isFunction(ref)) {
          ref(instance);
        } else {
          ref.current = instance as T;
        }
      }
    }
  };
}
