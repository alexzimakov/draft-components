import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent) => void;
type Options = { isEnabled: boolean };

const handlers: Handler[] = [];

/**
 * Invokes a given handler when the user clicks on any place on the page.
 * When multiple handlers are registered, only the last one will be invoked.
 * This behavior is used to close only top-level popover.
 *
 * @param handler The click handler.
 * @param options An object with hook options.
 * @param options.isEnabled - A flag that determines whether to run
 * the passed handler or not.
 */
export function usePageClick(handler: Handler, options: Options): void {
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

    const handleBodyClick = (event: MouseEvent): void => {
      const handleEvent = handlers[handlers.length - 1];
      if (handleEvent) {
        handleEvent(event);
      }
    };

    // Add only one global `body` click handler.
    if (handlers.length === 1) {
      document.addEventListener('click', handleBodyClick, true);
    }

    return () => {
      const index = handlers.indexOf(handler);
      if (index >= 0) {
        handlers.splice(index, 1);
      }

      // Remove the global `body` click handler if there are no active handlers.
      if (handlers.length === 0) {
        document.removeEventListener('click', handleBodyClick, true);
      }
    };
  }, [isEnabled]);
}
