import {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  ReactNodeArray,
} from 'react';
import { classNames } from '../../lib/react-helpers';
import { BreadcrumbsItem } from './breadcrumbs-item';

export interface BreadcrumbsProps extends ComponentPropsWithoutRef<'nav'> {
  children: ReactNodeArray;
  delimiter?: ReactNode;
}

export function Breadcrumbs({
  className,
  children,
  delimiter = '|',
  ...props
}: BreadcrumbsProps) {
  return (
    <nav {...props} className={classNames(className, 'dc-breadcrumbs')}>
      <ul className="dc-breadcrumbs__items">
        {Children.map(children, (child, index) => {
          return (
            <li key={`breadcrumbs-item-${index}`}>
              {index !== 0 ? (
                <span className="dc-breadcrumbs__delimiter">{delimiter}</span>
              ) : null}
              {child}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Breadcrumbs.Item = BreadcrumbsItem;
