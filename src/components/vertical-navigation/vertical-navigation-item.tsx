import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

interface VerticalNavigationItemRendererProps {
  className: string;
  children: JSX.Element;
}

export interface VerticalNavigationItemProps
  extends ComponentPropsWithoutRef<'a'> {
  icon?: ReactNode;
  badge?: ReactNode;
  selected?: boolean;
  renderAs?(props: VerticalNavigationItemRendererProps): JSX.Element;
}

export function VerticalNavigationItem({
  className,
  selected,
  icon,
  badge,
  children,
  renderAs,
  ...props
}: VerticalNavigationItemProps) {
  className = classNames(className, 'dc-vertical-nav-item', {
    [VerticalNavigationItem.SELECTED_STATE_CSS_MODIFIER]: selected,
  });

  const content = (
    <>
      {icon && <div className="dc-vertical-nav-item__icon">{icon} </div>}
      <div className="dc-vertical-nav-item__content">{children}</div>
      {badge && <div className="dc-vertical-nav-item__badge"> {badge}</div>}
    </>
  );

  if (typeof renderAs === 'function') {
    return renderAs({ className, children: content });
  } else {
    return (
      <a {...props} className={className}>
        {content}
      </a>
    );
  }
}

VerticalNavigationItem.SELECTED_STATE_CSS_MODIFIER = (
  'dc-vertical-nav-item_selected'
);
