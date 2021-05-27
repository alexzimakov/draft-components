// noinspection ES6PreferShortImport

import * as React from 'react';
import { classNames } from '../../lib/react-helpers';
import { SvgIcon } from '../svg-icon';
import { FormattedContent } from '../formatted-content';
import { exclamationTriangle } from '../../icons/exclamation-triangle';
import { exclamationCircle } from '../../icons/exclamation-circle';
import { infoCircle } from '../../icons/info-circle';
import { checkCircle } from '../../icons/check-circle';

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
        {icon && getIcon(icon)}

        <h2 className={FormattedContent.CSSClasses.title3}>{heading}</h2>

        {description && (
          <div
            className={classNames(
              'dc-non-ideal-state__description',
              FormattedContent.CSSClasses.paragraph
            )}
          >
            {description}
          </div>
        )}

        {actions && (
          <div className="dc-non-ideal-state__actions">{actions}</div>
        )}

        {children && (
          <div
            className={classNames(
              'dc-non-ideal-state__content',
              FormattedContent.CSSClasses.subheadline
            )}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

function getIcon(
  icon: NonNullable<NonIdealStateViewProps['icon']>
): JSX.Element {
  let modifier = '';
  let renderedIcon: JSX.Element;

  switch (icon) {
    case 'error':
      modifier = 'dc-non-ideal-state__icon_red';
      renderedIcon = <SvgIcon size="4x" icon={exclamationCircle} />;
      break;
    case 'warning':
      modifier = 'dc-non-ideal-state__icon_orange';
      renderedIcon = <SvgIcon size="4x" icon={exclamationTriangle} />;
      break;
    case 'info':
      modifier = 'dc-non-ideal-state__icon_blue';
      renderedIcon = <SvgIcon size="4x" icon={infoCircle} />;
      break;
    case 'success':
      modifier = 'dc-non-ideal-state__icon_green';
      renderedIcon = <SvgIcon size="4x" icon={checkCircle} />;
      break;
    default:
      renderedIcon = icon;
  }

  return (
    <div className={classNames('dc-non-ideal-state__icon', modifier)}>
      {renderedIcon}
    </div>
  );
}
