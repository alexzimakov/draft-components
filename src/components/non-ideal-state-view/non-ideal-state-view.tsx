import * as React from 'react';
import { classNames } from '../../lib';
import { SvgIcon } from '../svg-icon';
import { FormattedContent } from '../formatted-content';
import { warningIcon } from '../svg-icon/icons/warning';
import { errorIcon } from '../svg-icon/icons/error';
import { infoIcon } from '../svg-icon/icons/info';
import { successIcon } from '../svg-icon/icons/success';

export interface NonIdealStateViewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  spacing?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  icon?: 'info' | 'warning' | 'error' | 'success' | JSX.Element;
  heading: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function NonIdealStateView({
  spacing = '2xl',
  icon,
  heading,
  description,
  actions,
  className,
  children,
  ...props
}: NonIdealStateViewProps) {
  return (
    <section
      {...props}
      className={classNames(
        className,
        'dc-non-ideal-state',
        `dc-non-ideal-state_spacing_${spacing}`
      )}
    >
      <div className="dc-non-ideal-state__body">
        {icon ? (
          <div className="dc-non-ideal-state__icon">{getIcon(icon)}</div>
        ) : null}

        <h2 className={FormattedContent.CSSClasses.title3}>{heading}</h2>

        {description ? (
          <div
            className={classNames(
              'dc-non-ideal-state__description',
              FormattedContent.CSSClasses.paragraph
            )}
          >
            {description}
          </div>
        ) : null}

        {actions ? (
          <div className="dc-non-ideal-state__actions">{actions}</div>
        ) : null}

        {children ? (
          <div
            className={classNames(
              'dc-non-ideal-state__content',
              FormattedContent.CSSClasses.subheadline
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function getIcon(
  icon: NonNullable<NonIdealStateViewProps['icon']>
): JSX.Element {
  switch (icon) {
    case 'error':
      return <SvgIcon size="4x" icon={errorIcon} />;
    case 'warning':
      return <SvgIcon size="4x" icon={warningIcon} />;
    case 'info':
      return <SvgIcon size="4x" icon={infoIcon} />;
    case 'success':
      return <SvgIcon size="4x" icon={successIcon} />;
    default:
      return icon;
  }
}
