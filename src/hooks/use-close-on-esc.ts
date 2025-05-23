import { KeyboardKey } from '../lib/keyboard-key.js';
import { useEffect } from 'react';
import { useRefCallback } from './use-ref-callback.js';

type CloseHandler = () => void;

const handlerStack: CloseHandler[] = [];

export function useCloseOnEsc(handler: CloseHandler, opts: {
  disabled?: boolean;
} = {}) {
  const disabled = opts.disabled || false;
  const onClose = useRefCallback(handler);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = handlerStack.at(-1);
      if (handler && event.key === KeyboardKey.ESCAPE) {
        event.preventDefault();
        handler();
      }
    };

    handlerStack.push(onClose);
    if (handlerStack.length === 1) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      const index = handlerStack.indexOf(onClose);
      if (index >= 0) {
        handlerStack.splice(index, 1);
      }
      if (handlerStack.length === 0) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [disabled, onClose]);
}
