import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Headline, Paragraph, Subheadline } from '../formatted-content';
import { SvgIcon } from '../svg-icon';
import { exclamationTriangle } from '../../bootstrap-icons/exclamation-triangle';
import { exclamationCircle } from '../../bootstrap-icons/exclamation-circle';
import { infoCircle } from '../../bootstrap-icons/info-circle';
import { checkCircle } from '../../bootstrap-icons/check-circle';

export interface NonIdealStateViewProps
  extends ComponentPropsWithoutRef<'div'> {
  spacing?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  icon?: 'info' | 'warning' | 'error' | 'success' | JSX.Element;
  heading: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
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

        <Headline as="h2">{heading}</Headline>

        {description && (
          <Paragraph as="div" className="dc-non-ideal-state__description">
            {description}
          </Paragraph>
        )}

        {actions && (
          <div className="dc-non-ideal-state__actions">{actions}</div>
        )}

        {children && (
          <Subheadline as="div" className="dc-non-ideal-state__content">
            {children}
          </Subheadline>
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
      renderedIcon = <SvgIcon size="3x" icon={exclamationCircle} />;
      break;
    case 'warning':
      modifier = 'dc-non-ideal-state__icon_orange';
      renderedIcon = <SvgIcon size="3x" icon={exclamationTriangle} />;
      break;
    case 'info':
      modifier = 'dc-non-ideal-state__icon_blue';
      renderedIcon = <SvgIcon size="3x" icon={infoCircle} />;
      break;
    case 'success':
      modifier = 'dc-non-ideal-state__icon_green';
      renderedIcon = <SvgIcon size="3x" icon={checkCircle} />;
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
