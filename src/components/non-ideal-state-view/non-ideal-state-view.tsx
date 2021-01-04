import * as React from 'react';
import { SvgIcon } from '../svg-icon';
import { classNames } from '../../lib';

export type NonIdealStateViewHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
>;

export interface NonIdealStateViewProps extends NonIdealStateViewHtmlAttrs {
  icon?: 'info' | 'warning' | 'error' | 'success' | JSX.Element;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function NonIdealStateView({
  icon,
  title,
  description,
  actions,
  className,
  children,
  ...props
}: NonIdealStateViewProps) {
  return (
    <section {...props} className={classNames(className, 'dc-non-ideal-state')}>
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
      return <SvgIcon size="4x" icon="error" />;
    case 'warning':
      return <SvgIcon size="4x" icon="warning" />;
    case 'info':
      return <SvgIcon size="4x" icon="info" />;
    case 'success':
      return <SvgIcon size="4x" icon="success" />;
    default:
      return icon;
  }
}
