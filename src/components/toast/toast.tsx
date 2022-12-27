import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

type ToastBaseProps = ComponentPropsWithoutRef<'section'>;
export type ToastProps = {
  icon?: ReactNode;
  message?: ReactNode;
  actions?: ReactNode;
} & ToastBaseProps;

export function Toast({
  icon,
  message,
  actions,
  children,
  className,
  ...props
}: ToastProps) {
  return (
    <section
      {...props}
      className={classNames('dc-toast', className)}
    >
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
