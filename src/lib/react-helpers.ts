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

export function tryToFocusElement(element: EventTarget | null | undefined): void {
  if (element != null && element instanceof HTMLElement) {
    element.focus();
  }
}
