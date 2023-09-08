import { useEffect, useRef } from 'react';
import { KeyboardKeys } from '../lib/keyboard-keys.js';

type Handler = () => void;
type Options = { isEnabled: boolean };

const handlers: Handler[] = [];

/**
 * Invokes a given handler when the `Esc` key was pressed.
 * When multiple handlers are registered, only the last one will be invoked.
 * For example, this behavior can be used to close only top-level popover
 * or dialog.
 *
 * @param handler The key down handler.
 * @param options An object with hook options.
 * @param options.isEnabled A flag that determines whether to run
 * the passed handler or not.
 */
export function useEscKeyDown(handler: Handler, options: Options = {
  isEnabled: true,
}): void {
  const handlerRef = useRef(handler);
  const isEnabled = options.isEnabled;

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handler = handlerRef.current;
    handlers.push(handler);

    const handleBodyKeyDown = (event: KeyboardEvent): void => {
      const eventHandler = handlers[handlers.length - 1];
      if (eventHandler && event.key === KeyboardKeys.Escape) {
        eventHandler();
      }
    };

    // Add only one global `body` key down handler.
    if (handlers.length === 1) {
      document.body.addEventListener('keydown', handleBodyKeyDown);
    }

    return () => {
      const index = handlers.indexOf(handler);
      if (index >= 0) {
        handlers.splice(index, 1);
      }

      // Remove the global `body` key down handler
      // if there are no active handlers.
      if (handlers.length === 0) {
        document.body.removeEventListener('keydown', handleBodyKeyDown);
      }
    };
  }, [isEnabled]);
}
