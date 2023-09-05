import { ComponentPropsWithRef, MouseEventHandler, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { XMarkIcon } from '../icons/outline/x-mark-icon';

type AlertHTMLProps = ComponentPropsWithRef<'div'>;
type AlertBaseProps = Omit<AlertHTMLProps, 'title'>;
export type AlertStyle =
  | 'default'
  | 'full-width'
  | 'accent-left';
export type AlertTint =
  | 'gray'
  | 'orange'
  | 'red'
  | 'blue'
  | 'green';
export type AlertProps = {
  shouldShowDismissButton?: boolean;
  alertStyle?: AlertStyle;
  tint?: AlertTint;
  icon?: ReactNode;
  title?: ReactNode;
  onClickDismissButton?: MouseEventHandler<HTMLButtonElement>;
} & AlertBaseProps;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({
  shouldShowDismissButton,
  alertStyle = 'default',
  tint = 'gray',
  icon,
  title,
  children,
  className,
  onClickDismissButton,
  ...props
}, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(className, 'dc-alert', {
        [`dc-alert_style_${alertStyle}`]: alertStyle,
        [`dc-alert_tint_${tint}`]: tint,
        'dc-alert_has_icon': icon,
        'dc-alert_has_dismiss-button': shouldShowDismissButton,
      })}
    >
      {icon ? <div className="dc-alert__icon">{icon}</div> : null}
      <div className="dc-alert__body">
        {title ? <h2 className="dc-alert__title">{title}</h2> : null}
        {children}
      </div>
      {shouldShowDismissButton && (
        <button
          type="button"
          className="dc-alert__dismiss-button"
          onClick={onClickDismissButton}
        >
          <XMarkIcon width={18} height={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
});
