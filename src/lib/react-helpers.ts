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
type ClassNameMap = { [className: string]: any };

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

export function mergeRefs<T = any>(
  ...refs: (MutableRefObject<T> | LegacyRef<T> | null | undefined)[]
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (
        typeof ref === 'object' &&
        ref &&
        ref.hasOwnProperty('current')
      ) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
