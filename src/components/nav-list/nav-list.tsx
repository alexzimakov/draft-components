import { classNames } from '../../lib/react-helpers.js';
import { type ComponentProps } from 'react';
import { NavListItem } from './nav-list-item.js';
import { NavListTitle } from './nav-list-title.js';

type NavListHTMLProps = ComponentProps<'nav'>;

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

NavList.Title = NavListTitle;
NavList.Item = NavListItem;
