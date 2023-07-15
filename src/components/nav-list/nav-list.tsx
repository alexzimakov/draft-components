import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type NavListHTMLProps = ComponentPropsWithoutRef<'nav'>;
export type NavListProps = NavListHTMLProps;

export function NavList({
  className,
  children,
  ...props
}: NavListProps) {
  return (
    <nav {...props} className={classNames('dc-nav-list', className)}>
      <ul className="dc-nav-list__items">{children}</ul>
    </nav>
  );
}
