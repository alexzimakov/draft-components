import * as React from 'react';

const KEY_CODES = {
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
};

function getEventKey(event: KeyboardEvent | React.KeyboardEvent): number {
  return event.which || event.keyCode;
}

function isTabPressed(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return getEventKey(event) === KEY_CODES.tab;
}

function isEscPressed(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return getEventKey(event) === KEY_CODES.escape;
}

function isEnterPressed(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return getEventKey(event) === KEY_CODES.enter;
}

export const keyboardUtil = {
  KEY_CODES,
  getEventKey,
  isTabPressed,
  isEscPressed,
  isEnterPressed,
};
