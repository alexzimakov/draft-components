import { Children, ComponentPropsWithoutRef, ReactNode } from 'react';
import { VerticalNavigationItem } from './vertical-navigation-item';
import { classNames } from '../../lib/react-helpers';

export interface VerticalNavigationProps
  extends ComponentPropsWithoutRef<'div'> {
  header?: ReactNode;
  children: ReactNode;
}

export function VerticalNavigation({
  className,
  header,
  children,
  ...props
}: VerticalNavigationProps) {
  return (
    <div {...props} className={classNames(className, 'dc-vertical-nav')}>
      {header && <div className="dc-vertical-nav__header">{header}</div>}
      <ul className="dc-vertical-nav__items">
        {Children.map(children, (child, index) => {
          return <li key={`vertical-navigation-item-${index}`}>{child}</li>;
        })}
      </ul>
    </div>
  );
}

VerticalNavigation.Item = VerticalNavigationItem;
