import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

interface BreadcrumbsItemRendererProps {
  className: string;
  children: JSX.Element;
}

export interface BreadcrumbsItemProps extends ComponentPropsWithoutRef<'a'> {
  icon?: ReactNode;
  selected?: boolean;
  children?: string;
  renderAs?(props: BreadcrumbsItemRendererProps): JSX.Element;
}

export function BreadcrumbsItem({
  className,
  children,
  icon,
  selected,
  renderAs,
  ...props
}: BreadcrumbsItemProps) {
  const child = (
    <>
      {icon && <span className="dc-breadcrumbs-item__icon">{icon}</span>}
      {children}
    </>
  );

  className = classNames(className, 'dc-breadcrumbs-item', {
    [BreadcrumbsItem.SELECTED_ITEM_CSS_MODIFIER]: selected,
  });

  if (typeof renderAs === 'function') {
    return renderAs({
      className,
      children: child,
    });
  } else {
    return (
      <a {...props} className={className}>
        {child}
      </a>
    );
  }
}
BreadcrumbsItem.SELECTED_ITEM_CSS_MODIFIER = 'dc-breadcrumbs-item_selected';
