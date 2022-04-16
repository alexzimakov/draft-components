import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent) => boolean | undefined;

const handlerList: Handler[] = [];

/**
 * Adds a passed handler function to list and run saved functions
 * on `body` click in reverse order.
 *
 * @param {Handler} handler - The event handler. If the return value is `false`,
 * the remaining event handlers in the stack will be skipped.
 * @param isEnabled - A Boolean value that determines whether to
 * run the passed handler or not.
 */
export function useBodyClick(handler: Handler, isEnabled: boolean): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handler = handlerRef.current;
    const handleBodyClickCapture = (event: MouseEvent): void => {
      for (let i = handlerList.length - 1; i >= 0; i -= 1) {
        const handler = handlerList[i];
        const result = handler(event);
        if (result === false) {
          break;
        }
      }
    };

    handlerList.push(handler);

    if (handlerList.length === 1) {
      document.addEventListener('click', handleBodyClickCapture, true);
    }

    return () => {
      const index = handlerList.indexOf(handler);
      if (~index) {
        handlerList.splice(index, 1);
      }

      if (handlerList.length === 0) {
        document.removeEventListener('click', handleBodyClickCapture, true);
      }
    };
  }, [isEnabled]);
}
