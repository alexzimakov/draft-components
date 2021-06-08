import * as React from 'react';
import { Stack } from '../lib/stack';
import { noop } from '../lib/util';
import { isFunction } from '../lib/guards';
import { KeyCode } from '../lib/keyboard-helpers';

type CloseCallback = () => void;

const callbackStack = new Stack<React.MutableRefObject<CloseCallback>>();

export function useCloseOnEscPress(
  onClose: CloseCallback,
  isEnabled: boolean = true
) {
  const savedCloseCallback = React.useRef(noop);

  React.useEffect(() => {
    savedCloseCallback.current = () => {
      if (isFunction(onClose)) {
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
      if (event.code === KeyCode.escape && close) {
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
