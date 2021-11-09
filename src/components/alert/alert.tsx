import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Subheadline } from '../formatted-content';
import { Icon, SvgIcon } from '../svg-icon';
import { exclamationTriangle } from '../../bootstrap-icons/exclamation-triangle';
import { exclamationCircle } from '../../bootstrap-icons/exclamation-circle';
import { checkCircle } from '../../bootstrap-icons/check-circle';
import { infoCircle } from '../../bootstrap-icons/info-circle';

export interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  heading?: ReactNode;
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
      {shouldShowIcon && (
        <SvgIcon
          data-testid="alert-icon"
          className="dc-alert__icon"
          icon={alertIcons[appearance] || alertIcons.default}
          width={18}
          height={18}
        />
      )}
      <div className="dc-alert__body">
        {heading && (
          <Subheadline as="h3" className="dc-alert__heading">
            {heading}
          </Subheadline>
        )}
        {children && (
          <Subheadline as="div" className="dc-alert__description">
            {children}
          </Subheadline>
        )}
      </div>
    </div>
  );
}
