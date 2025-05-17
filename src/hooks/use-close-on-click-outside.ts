import { RefObject, useEffect } from 'react';
import { useRefCallback } from './use-ref-callback.js';

export type CloseHandler = () => void;

export type ContainerRef = RefObject<HTMLElement | null>;

export type ShouldIgnoreClickPredicate = (node: Node) => boolean;

type Params = {
  ref: ContainerRef;
  shouldIgnoreClick: ShouldIgnoreClickPredicate;
};

const handlerStack: CloseHandler[] = [];
const callbackParams = new Map<CloseHandler, Params>();

export function useCloseOnClickOutside(handler: CloseHandler, opts: {
  ref: ContainerRef;
  disabled?: boolean;
  shouldIgnoreClick?: ShouldIgnoreClickPredicate;
}) {
  const ref = opts.ref;
  const disabled = opts.disabled || false;
  const onClose = useRefCallback(handler);
  const shouldIgnoreClick = useRefCallback<ShouldIgnoreClickPredicate>((node) => {
    if (typeof opts.shouldIgnoreClick === 'function') {
      return opts.shouldIgnoreClick(node);
    }
    return false;
  });

  useEffect(() => {
    if (disabled) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      const callback = handlerStack.at(-1);
      if (!callback) {
        return;
      }

      const params = callbackParams.get(callback);
      if (!params) {
        return;
      }

      const target = event.target;
      const container = params.ref.current;
      const shouldIgnoreClick = params.shouldIgnoreClick;
      if (
        callback
        && target instanceof Node
        && container instanceof Node
        && !container.contains(target)
        && !shouldIgnoreClick(target)
      ) {
        event.preventDefault();
        callback();
      }
    };

    handlerStack.push(onClose);
    callbackParams.set(onClose, { ref, shouldIgnoreClick });
    if (handlerStack.length === 1) {
      document.addEventListener('click', handleClick, { capture: true });
    }

    return () => {
      const index = handlerStack.indexOf(onClose);
      if (index >= 0) {
        handlerStack.splice(index, 1);
        callbackParams.delete(onClose);
      }
      if (handlerStack.length === 0) {
        document.removeEventListener('click', handleClick, { capture: true });
      }
    };
  }, [ref, disabled, onClose, shouldIgnoreClick]);
}
