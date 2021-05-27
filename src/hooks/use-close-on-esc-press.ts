import * as React from 'react';
import { guards, util, keyboardHelpers, Stack } from '../lib';

type CloseCallback = () => void;

const callbackStack = new Stack<React.MutableRefObject<CloseCallback>>();

export function useCloseOnEscPress(
  onClose: CloseCallback,
  isEnabled: boolean = true
) {
  const savedCloseCallback = React.useRef(util.noop);

  React.useEffect(() => {
    savedCloseCallback.current = () => {
      if (guards.isFunction(onClose)) {
        onClose();
      }
    };
  }, [onClose]);

  React.useEffect(() => {
    if (!isEnabled) {
      return;
    }

    function onEscPress(event: KeyboardEvent) {
      const close = callbackStack.last?.current;
      if (keyboardHelpers.isEscPressed(event) && close) {
        close();
      }
    }

    if (callbackStack.isEmpty) {
      document.addEventListener('keydown', onEscPress);
    }
    callbackStack.push(savedCloseCallback);

    return () => {
      callbackStack.remove(savedCloseCallback);
      if (callbackStack.isEmpty) {
        document.removeEventListener('keydown', onEscPress);
      }
    };
  }, [isEnabled]);
}
