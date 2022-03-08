import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

export type BreadcrumbLinkProps = ComponentPropsWithoutRef<'a'> & {
  selected?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  renderAs?(props: {
    className: string;
    href: string;
    children: JSX.Element;
  }): JSX.Element;
};

export function BreadcrumbLink({
  className,
  children,
  icon,
  selected,
  renderAs,
  ...props
}: BreadcrumbLinkProps) {
  const label = (
    <>
      {icon && <span className="dc-breadcrumb-link__icon">{icon}</span>}
      {children}
    </>
  );

  className = classNames(
    'dc-breadcrumb-link',
    selected && BreadcrumbLink.selectedStateModifier,
    className
  );

  if (typeof renderAs === 'function') {
    return renderAs({
      className,
      href: props.href || '',
      children: label,
    });
  } else {
    return (
      <a {...props} className={className}>
        {label}
      </a>
    );
  }
}

BreadcrumbLink.selectedStateModifier = 'dc-breadcrumb-link_selected';
