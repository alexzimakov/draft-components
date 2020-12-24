import * as React from 'react';
import * as icons from './icons';
import { classNames } from '../../lib/class-names';

export type AlertAppearance =
  | 'default'
  | 'warning'
  | 'error'
  | 'info'
  | 'success';

export type AlertHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
>;

export type AlertProps = {
  appearance?: AlertAppearance;
  shouldShowIcon?: boolean;
  title?: React.ReactNode;
} & AlertHtmlAttrs;

const appearanceIcons: Record<AlertAppearance, React.ReactElement> = {
  default: icons.informationCircle,
  warning: icons.exclamation,
  error: icons.xCircle,
  info: icons.informationCircle,
  success: icons.checkCircle,
};

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
      className={classNames(
        className,
        'dc-alert',
        `dc-alert_appearance_${appearance}`
      )}
      role="alert"
    >
      {shouldShowIcon ? appearanceIcons[appearance] : null}
      <div className="dc-alert__body">
        {title ? <h3 className="dc-alert__title">{title}</h3> : null}
        {children ? (
          <div className="dc-alert__description">{children}</div>
        ) : null}
      </div>
    </div>
  );
}
