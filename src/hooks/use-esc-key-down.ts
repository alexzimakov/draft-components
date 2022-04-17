import { useEffect, useRef } from 'react';
import { KeyCode } from '../lib/keyboard-helpers';

type Handler = () => void;

const handlerList: Handler[] = [];

export function useEscKeyDown(handler: Handler, isEnabled: boolean): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handler = handlerRef.current;
    const handleBodyKeyDown = (event: KeyboardEvent) => {
      const currentHandler = handlerList[handlerList.length - 1];
      if (event.key === KeyCode.escape && currentHandler) {
        currentHandler();
      }
    };

    handlerList.push(handler);

    if (handlerList.length === 1) {
      document.body.addEventListener('keydown', handleBodyKeyDown);
    }

    return () => {
      const index = handlerList.indexOf(handler);
      if (~index) {
        handlerList.splice(index, 1);
      }

      if (handlerList.length === 0) {
        document.body.removeEventListener('keydown', handleBodyKeyDown);
      }
    };
  }, [isEnabled]);
}
