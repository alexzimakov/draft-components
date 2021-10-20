import { useEffect, useState } from 'react';
import { uniqueId } from '../../lib/util';

const MAX_TOASTS = 8;

export type ToastId = string;

export type ToastRenderFn = (props: {
  toastId: ToastId;
  className: string;
  dismiss(): void;
}) => JSX.Element;

type Toast = {
  id: ToastId;
  render: ToastRenderFn;
};

type Action =
  | { type: 'CREATE_TOAST'; toast: Toast }
  | { type: 'DELETE_TOAST'; toastId: ToastId; }

function reducer(toasts: Toast[], action: Action): Toast[] {
  switch (action.type) {
    case 'CREATE_TOAST':
      return [action.toast, ...toasts].slice(0, MAX_TOASTS);
    case 'DELETE_TOAST':
      return toasts.filter(toast => toast.id !== action.toastId);
    default:
      return toasts;
  }
}

let listeners: Array<(toasterState: Toast[]) => void> = [];
let toasts: Toast[] = [];

export function dispatch(action: Action): void {
  toasts = reducer(toasts, action);
  listeners.forEach(listener => listener(toasts));
}

export function createToast(renderToast: ToastRenderFn): Toast {
  return { id: uniqueId('toast-'), render: renderToast };
}

export function useToasts(): Toast[] {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      const index = listeners.findIndex(listener => listener === setToasts);
      if (~index) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return toasts;
}
