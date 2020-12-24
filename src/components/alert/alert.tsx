import * as React from 'react';
import * as icons from './icons';
import { classNames } from '../../lib';

export type AlertHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
>;

export interface AlertProps extends AlertHtmlAttrs {
  appearance?: 'default' | 'warning' | 'error' | 'info' | 'success';
  shouldShowIcon?: boolean;
  title?: React.ReactNode;
}

export function Alert({
  appearance = 'default',
  shouldShowIcon,
  title,
  children,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      className={classNames(className, 'dc-alert', {
        [`dc-alert_appearance_${appearance}`]: appearance,
      })}
      role="alert"
    >
      {shouldShowIcon ? getAlertIcon(appearance) : null}
      <div className="dc-alert__body">
        {title ? <h3 className="dc-alert__title">{title}</h3> : null}
        {children ? (
          <div className="dc-alert__description">{children}</div>
        ) : null}
      </div>
    </div>
  );
}

function getAlertIcon(appearance: AlertProps['appearance']): JSX.Element {
  switch (appearance) {
    case 'error':
      return icons.xCircle;
    case 'warning':
      return icons.exclamation;
    case 'success':
      return icons.checkCircle;
    case 'default':
    case 'info':
    default:
      return icons.informationCircle;
  }
}
