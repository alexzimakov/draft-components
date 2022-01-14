import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import {
  createToast,
  dispatch,
  ToastId,
  ToastRenderFn,
  useToasts,
} from './use-toasts';
import { classNames } from '../../lib/react-helpers';

type ToasterVerticalPosition = 'top' | 'bottom';
type ToasterHorizontalPosition = 'left' | 'center' | 'right';
type ToasterPosition =
  `${ToasterVerticalPosition}-${ToasterHorizontalPosition}`;

export interface ToasterProps extends ComponentPropsWithoutRef<'ul'> {
  position?: ToasterPosition;
  toastGap?: number;
}

let isToasterRendered = false;
const toastTimeouts = new Map<ToastId, number>();

export function Toaster({
  className,
  position = 'top-center',
  toastGap = 16,
  ...props
}: ToasterProps) {
  const ref = useRef<HTMLUListElement>(null);
  const toasts = useToasts();

  useEffect(() => {
    const listElement = ref.current;
    if (!listElement) {
      return;
    }

    const toastAppearsOnBottom = position?.startsWith('bottom');
    const items = listElement.children;
    let offset = 0;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];

      if (item instanceof HTMLElement) {
        item.style.transform = `translateY(${offset}px)`;

        const d = item.clientHeight + toastGap;
        if (toastAppearsOnBottom) {
          offset -= d;
        } else {
          offset += d;
        }
      }
    }
  }, [toasts, toastGap, position]);

  useEffect(() => {
    isToasterRendered = true;

    return () => {
      isToasterRendered = false;
      for (const toastId of toastTimeouts.keys()) {
        dismissToast(toastId);
      }
    };
  }, []);

  return (
    <ul
      {...props}
      ref={ref}
      className={classNames(
        className,
        'toaster',
        `toaster_position_${position}`
      )}
    >
      {toasts.map((toast) => (
        <li key={toast.id}>
          {toast.render({
            toastId: toast.id,
            className: 'toaster__item',
            dismiss: () => dismissToast(toast.id),
          })}
        </li>
      ))}
    </ul>
  );
}

export function dismissToast(toastId: ToastId): void {
  const timeoutId = toastTimeouts.get(toastId);
  if (timeoutId) {
    window.clearTimeout(timeoutId);
  }
  toastTimeouts.delete(toastId);
  dispatch({ type: 'DELETE_TOAST', toastId });
}

export function showToast(
  renderToast: ToastRenderFn,
  durationMs = 1e4
): ToastId {
  if (!isToasterRendered) {
    throw new Error(
      'To show toast put <Toatser /> component somewhere on the page.'
    );
  }

  const toast = createToast(renderToast);
  const toastId = toast.id;

  if (durationMs) {
    const timeoutId = window.setTimeout(() => {
      dismissToast(toastId);
    }, durationMs);
    toastTimeouts.set(toastId, timeoutId);
  }

  dispatch({ type: 'CREATE_TOAST', toast });

  return toastId;
}

Toaster.dismiss = dismissToast;
Toaster.show = showToast;
