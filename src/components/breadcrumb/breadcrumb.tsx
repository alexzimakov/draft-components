import { Children, ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

export type BreadcrumbProps = ComponentPropsWithoutRef<'nav'> & {
  delimiter?: ReactNode;
  children: JSX.Element[];
};

export function Breadcrumb({
  className,
  children,
  delimiter = '|',
  ...props
}: BreadcrumbProps) {
  return (
    <nav {...props} className={classNames(className, 'dc-breadcrumb')}>
      <ul className="dc-breadcrumb__items">
        {Children.map(children, (child, index) => {
          return (
            <li key={`breadcrumb-item-${index}`}>
              {index !== 0 ? (
                <span className="dc-breadcrumb__delimiter">{delimiter}</span>
              ) : null}
              {child}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
