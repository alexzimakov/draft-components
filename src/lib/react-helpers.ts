import { LegacyRef, MutableRefObject, RefCallback } from 'react';

type ClassName =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassNameList
  | ClassNameMap;
type ClassNameList = ClassName[];
type ClassNameMap = { [className: string]: unknown };

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

export function mergeRefs<T>(
  ...refs: (MutableRefObject<T> | LegacyRef<T> | null | undefined)[]
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (typeof ref === 'object' && ref && 'current' in ref) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
