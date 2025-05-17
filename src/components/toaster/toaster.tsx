import { type ReactNode, useEffect, useRef, useState } from 'react';
import { assertIfNullable } from '../../lib/helpers.js';
import { classNames } from '../../lib/react-helpers.js';
import { Portal } from '../portal/index.js';
import { Toast, ToastButton } from '../toast/index.js';

type YPosition = 'top' | 'bottom';
type XPosition = 'left' | 'center' | 'right';
export type ToastPosition = `${YPosition}-${XPosition}`;

export type ToastID = number;

export type ToastAction = {
  content: ReactNode;
  onClick?: () => void;
  shouldHideAfterClick?: boolean;
};

export type ToastParams = {
  title: ReactNode;
  icon?: ReactNode;
  message?: ReactNode;
  actions?: ToastAction[];
  timeoutMs?: number;
};

export type ToastParamsWithID = { id: ToastID } & ToastParams;

export type ToastShowCallback = (toast: ToastParamsWithID) => void;

export type ToastHideCallback = (id: ToastID) => void;

type ToastShowEvent = CustomEvent<{
  toaster: Toaster;
  toast: ToastParamsWithID;
}>;
const TOAST_SHOW_EVENT = 'toast_show';
const isToastShowEvent = (event: Event): event is ToastShowEvent => (
  event instanceof CustomEvent && event.type === TOAST_SHOW_EVENT
);

type ToastHideEvent = CustomEvent<{
  toaster: Toaster;
  toastId: ToastID;
}>;
const TOAST_HIDE_EVENT = 'toast_hide';
const isToastHideEvent = (event: Event): event is ToastHideEvent => (
  event instanceof CustomEvent && event.type === TOAST_HIDE_EVENT
);

export class Toaster {
  protected _id: ToastID;
  readonly timeoutMs: number;
  readonly onShow?: ToastShowCallback;
  readonly onHide?: ToastHideCallback;

  constructor(params?: {
    timeoutMs?: number;
    onShowToast?: ToastShowCallback;
    onHideToast?: ToastHideCallback;
  }) {
    this._id = 0;
    this.timeoutMs = params?.timeoutMs || 10_000;
    this.onShow = params?.onShowToast;
    this.onHide = params?.onHideToast;
  }

  private _getNextId() {
    this._id += 1;
    return this._id;
  }

  showToast(toast: ToastParams): ToastID {
    const id = this._getNextId();
    const event: ToastShowEvent = new CustomEvent(TOAST_SHOW_EVENT, {
      detail: {
        toaster: this,
        toast: { ...toast, id },
      },
    });
    const timeoutMs = toast.timeoutMs || this.timeoutMs;

    this.onShow?.(event.detail.toast);
    window.dispatchEvent(event);
    window.setTimeout(() => this.hideToast(id), timeoutMs);

    return id;
  }

  hideToast(id: ToastID) {
    const event: ToastHideEvent = new CustomEvent(TOAST_HIDE_EVENT, {
      detail: {
        toaster: this,
        toastId: id,
      },
    });

    this.onHide?.(id);
    window.dispatchEvent(event);
  }

  render(options?: {
    toastGap?: number;
    toastPosition?: ToastPosition;
    toastCloseButtonAriaLabel?: string;
  }) {
    return (
      <ToastsList
        toaster={this}
        toastGap={options?.toastGap}
        toastPosition={options?.toastPosition}
        toastCloseButtonAriaLabel={options?.toastCloseButtonAriaLabel}
      />
    );
  }
}

type ToastsListProps = {
  toaster: Toaster;
  toastGap?: number;
  toastPosition?: ToastPosition;
  toastCloseButtonAriaLabel?: string;
};

function ToastsList({
  toaster,
  toastGap = 12,
  toastPosition = 'top-center',
  toastCloseButtonAriaLabel = 'Close',
}: ToastsListProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [toasts, setToasts] = useState<ToastParamsWithID[]>([]);

  useEffect(() => {
    function handleShowToast(event: Event) {
      if (isToastShowEvent(event)) {
        const detail = event.detail;
        if (detail.toaster === toaster) {
          setToasts((prevToasts) => [detail.toast, ...prevToasts]);
        }
      }
    }

    function handleCloseToast(event: Event) {
      if (isToastHideEvent(event)) {
        const detail = event.detail;
        if (detail.toaster === toaster) {
          setToasts((prevToasts) => prevToasts.filter(
            (toast) => toast.id !== detail.toastId,
          ));
        }
      }
    }

    window.addEventListener(TOAST_SHOW_EVENT, handleShowToast);
    window.addEventListener(TOAST_HIDE_EVENT, handleCloseToast);
    return () => {
      window.removeEventListener(TOAST_SHOW_EVENT, handleShowToast);
      window.removeEventListener(TOAST_HIDE_EVENT, handleCloseToast);
    };
  }, [toaster]);

  useEffect(() => {
    const listEl = ref.current;
    assertIfNullable(listEl, 'ToastsList ref was not set');

    let offset = 0;
    for (const item of listEl.children) {
      if (item instanceof HTMLLIElement) {
        item.style.transform = `translateY(${offset}px)`;

        const d = item.offsetHeight + toastGap;
        if (
          toastPosition === 'top-right'
          || toastPosition === 'top-center'
          || toastPosition === 'top-left'
        ) {
          offset += d;
        } else {
          offset -= d;
        }
      }
    }
  }, [toasts, toastGap, toastPosition]);

  return (
    <Portal>
      <ul
        ref={ref}
        className={classNames({
          'dc-toasts-list': true,
          [`dc-toasts-list_${toastPosition}`]: toastPosition,
        })}
      >
        {toasts.map((toast) => {
          const hideToast = () => toaster.hideToast(toast.id);
          const actions = toast.actions?.map((action, index) => (
            <ToastButton
              key={index}
              onClick={() => {
                action.onClick?.();
                if (action.shouldHideAfterClick ?? true) {
                  hideToast();
                }
              }}
            >
              {action.content}
            </ToastButton>
          ));
          return (
            <li key={toast.id}>
              <Toast
                className="dc-toasts-list__toast"
                role="alert"
                icon={toast.icon}
                message={toast.message}
                actions={actions}
                closeButtonAriaLabel={toastCloseButtonAriaLabel}
                onClickCloseButton={hideToast}
              >
                {toast.title}
              </Toast>
            </li>
          );
        })}
      </ul>
    </Portal>
  );
}
