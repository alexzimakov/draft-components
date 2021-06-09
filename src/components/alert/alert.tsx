import * as React from 'react';
import { classNames } from '../../lib/react-helpers';
import { FormattedContent } from '../formatted-content';
import { Icon, SvgIcon } from '../svg-icon';
import { exclamationTriangle } from '../../icons/exclamation-triangle';
import { exclamationCircle } from '../../icons/exclamation-circle';
import { checkCircle } from '../../icons/check-circle';
import { infoCircle } from '../../icons/info-circle';

export interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
  heading?: React.ReactNode;
  appearance?: 'default' | 'warning' | 'error' | 'info' | 'success';
  shouldShowIcon?: boolean;
}

const alertIcons: Record<NonNullable<AlertProps['appearance']>, Icon> = {
  error: exclamationCircle,
  warning: exclamationTriangle,
  success: checkCircle,
  info: infoCircle,
  default: infoCircle,
};

export function Alert({
  appearance = 'default',
  shouldShowIcon,
  heading,
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
          data-testid="alert-icon"
          className="dc-alert__icon"
          icon={alertIcons[appearance] || alertIcons.default}
          width={18}
          height={18}
        />
      ) : null}
      <div className="dc-alert__body">
        {heading ? (
          <h3
            className={classNames(
              'dc-alert__heading',
              FormattedContent.CSSClasses.subheadline
            )}
          >
            {heading}
          </h3>
        ) : null}
        {children ? (
          <div
            className={classNames(
              'dc-alert__description',
              FormattedContent.CSSClasses.subheadline
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
