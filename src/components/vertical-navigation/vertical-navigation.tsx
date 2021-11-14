import { Children, ComponentPropsWithoutRef, ReactNode } from 'react';
import { VerticalNavigationItem } from './vertical-navigation-item';
import { classNames } from '../../lib/react-helpers';

export interface VerticalNavigationProps
  extends ComponentPropsWithoutRef<'nav'> {
  children: ReactNode[];
}

export function VerticalNavigation({
  className,
  children,
  ...props
}: VerticalNavigationProps) {
  return (
    <nav {...props} className={classNames(className, 'dc-vertical-nav')}>
      <ul className="dc-vertical-nav__items">
        {Children.map(children, (child, index) => {
          return <li key={`vertical-navigation-item-${index}`}>{child}</li>;
        })}
      </ul>
    </nav>
  );
}

VerticalNavigation.Item = VerticalNavigationItem;
