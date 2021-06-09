import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

export enum KeyCode {
  backspace = 'Backspace',
  tab = 'Tab',
  enter = 'Enter',
  capsLock = 'CapsLock',
  escape = 'Escape',
  space = 'Space',
  pageUp = 'PageUp',
  pageDown = 'PageDown',
  end = 'End',
  home = 'Home',
  arrowLeft = 'ArrowLeft',
  arrowUp = 'ArrowUp',
  arrowRight = 'ArrowRight',
  arrowDown = 'ArrowDown',
  insert = 'Insert',
  delete = 'Delete',
}

type UniversalKeyboardEvent = KeyboardEvent | ReactKeyboardEvent;

export function similarToClick(event: UniversalKeyboardEvent): boolean {
  return event.code === KeyCode.space || event.code === KeyCode.enter;
}
