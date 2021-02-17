import * as React from 'react';
import { SvgIcon } from '../svg-icon';
import { warningIcon } from '../svg-icon/icons/warning';
import { errorIcon } from '../svg-icon/icons/error';
import { infoIcon } from '../svg-icon/icons/info';
import { successIcon } from '../svg-icon/icons/success';
import { classNames } from '../../lib';

export type NonIdealStateViewHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
>;

export interface NonIdealStateViewProps extends NonIdealStateViewHtmlAttrs {
  padY?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  icon?: 'info' | 'warning' | 'error' | 'success' | JSX.Element;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function NonIdealStateView({
  padY = '2xl',
  icon,
  title,
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
        `dc-non-ideal-state_pad-y_${padY}`
      )}
    >
      <div className="dc-non-ideal-state__body">
        {icon ? (
          <div className="dc-non-ideal-state__icon">{getIcon(icon)}</div>
        ) : null}
        <h2 className="dc-non-ideal-state__title">{title}</h2>
        {description ? (
          <div className="dc-non-ideal-state__description">{description}</div>
        ) : null}
        {actions ? (
          <div className="dc-non-ideal-state__actions">{actions}</div>
        ) : null}
        {children ? (
          <div className="dc-non-ideal-state__content">{children}</div>
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
