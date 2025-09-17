import { type ComponentProps, type MouseEventHandler, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

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

function XMarkIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
