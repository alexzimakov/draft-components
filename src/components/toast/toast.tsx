import { type ComponentProps, type MouseEventHandler, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { XMarkIcon } from '../hero-icons/24/outline/x-mark-icon.js';

type ToastHTMLProps = ComponentProps<'section'>;

type ToastBaseProps = {
  icon?: ReactNode;
  message?: ReactNode;
  actions?: ReactNode;
  closeButtonAriaLabel?: string;
  onClickCloseButton?: MouseEventHandler<HTMLButtonElement>;
};

export type ToastProps =
  & ToastBaseProps
  & Omit<ToastHTMLProps, keyof ToastBaseProps>;

export function Toast({
  icon,
  message,
  actions,
  closeButtonAriaLabel = 'close',
  onClickCloseButton,
  children,
  className,
  ...props
}: ToastProps) {
  return (
    <section
      {...props}
      className={classNames('dc-toast', className)}
    >
      <button
        className="dc-toast__close-btn"
        aria-label={closeButtonAriaLabel}
        onClick={onClickCloseButton}
      >
        <XMarkIcon width={16} height={16} />
      </button>
      <div className="dc-toast__body">
        {icon && <div className="dc-toast__icon">{icon}</div>}
        <div className="dc-toast__content">
          <h1 className="dc-toast__title">{children}</h1>
          {message && <div className="dc-toast__message">{message}</div>}
        </div>
      </div>
      {actions && <div className="dc-toast__actions">{actions}</div>}
    </section>
  );
}
