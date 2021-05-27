import * as React from 'react';

export const KEY_CODES = {
  escape: 27,
  tab: 9,
  capsLock: 20,
  shift: 16,
  control: 17,
  alt: 18,
  space: 32,
  enter: 13,
  backspace: 8,
  arrowLeft: 37,
  arrowUp: 38,
  arrowRight: 39,
  arrowDown: 40,
  delete: 46,
};

export function getEventKey(
  event: KeyboardEvent | React.KeyboardEvent
): number {
  return event.which || event.keyCode;
}

export function isTabPressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.tab;
}

export function isEscPressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.escape;
}

export function isEnterPressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.enter;
}

export function isSpacePressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.space;
}

export function isArrowUpPressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.arrowUp;
}

export function isArrowRightPressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.arrowRight;
}

export function isArrowDownPressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.arrowDown;
}

export function isArrowLeftPressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.arrowLeft;
}

export function isBackspacePressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.backspace;
}

export function isDeletePressed(
  event: KeyboardEvent | React.KeyboardEvent
): boolean {
  return getEventKey(event) === KEY_CODES.delete;
}
