import * as React from 'react';
import { SvgIcon, SvgIconProps } from '../svg-icon';
import { warningIcon } from '../svg-icon/icons/warning';
import { errorIcon } from '../svg-icon/icons/error';
import { infoIcon } from '../svg-icon/icons/info';
import { successIcon } from '../svg-icon/icons/success';
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
      {shouldShowIcon ? (
        <SvgIcon
          className="dc-alert__icon"
          data-testid="alert-icon"
          icon={getIcon(appearance)}
          width={18}
          height={18}
        />
      ) : null}
      <div className="dc-alert__body">
        {title ? <h3 className="dc-alert__title">{title}</h3> : null}
        {children ? (
          <div className="dc-alert__description">{children}</div>
        ) : null}
      </div>
    </div>
  );
}

function getIcon(appearance: AlertProps['appearance']): SvgIconProps['icon'] {
  switch (appearance) {
    case 'error':
      return errorIcon;
    case 'warning':
      return warningIcon;
    case 'success':
      return successIcon;
    case 'default':
    case 'info':
    default:
      return infoIcon;
  }
}
