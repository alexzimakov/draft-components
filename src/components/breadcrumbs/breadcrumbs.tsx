import { classNames } from '../../lib/react-helpers';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export type BreadcrumbsHtmlAttrs = ComponentPropsWithoutRef<'nav'>;

export interface BreadcrumbsItem {
  href: string;
  label: ReactNode;
  icon?: JSX.Element;
}

export interface BreadcrumbsProps extends BreadcrumbsHtmlAttrs {
  items: BreadcrumbsItem[];
  separator?: ReactNode;
  renderLink?: (props: {
    className: string;
    children: JSX.Element;
    href: string;
    isCurrent?: boolean;
  }) => JSX.Element;
}

export function Breadcrumbs({
  items,
  renderLink,
  separator = '/',
  className,
  ...props
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      {...props}
      className={classNames(className, 'dc-breadcrumbs')}
    >
      <ol className="dc-breadcrumbs__list">
        {items.map((item, index) => {
          const key = index;
          const className = 'dc-breadcrumbs-item';
          const isCurrent = index === items.length - 1;
          const children = (
            <>
              <i className="dc-breadcrumbs-item__icon" aria-hidden={true}>
                {item.icon ? item.icon : null}
              </i>
              <span className="dc-breadcrumbs-item__label">{item.label}</span>
            </>
          );
          const content =
            typeof renderLink === 'function' ? (
              renderLink({
                href: item.href,
                className,
                children,
                isCurrent,
              })
            ) : (
              <a
                className={className}
                href={item.href}
                aria-current={isCurrent}
              >
                {children}
              </a>
            );

          return (
            <li key={key}>
              {index ? (
                <span className="dc-breadcrumbs__separator">{separator}</span>
              ) : null}
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
