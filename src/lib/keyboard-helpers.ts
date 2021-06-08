import * as React from 'react';

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

type UniversalKeyboardEvent = KeyboardEvent | React.KeyboardEvent;

export function similarToClick(event: UniversalKeyboardEvent): boolean {
  return event.code === KeyCode.space || event.code === KeyCode.enter;
}
