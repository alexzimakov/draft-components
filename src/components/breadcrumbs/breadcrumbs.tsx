import * as React from 'react';
import { SvgIcon } from '../svg-icon';
import { chevronRightIcon } from '../svg-icon/icons';
import { classNames } from '../../lib';

export type BreadcrumbsHtmlAttrs = React.ComponentPropsWithoutRef<'nav'>;

export interface BreadcrumbsItem {
  href: string;
  label: React.ReactNode;
  icon?: JSX.Element;
}

export interface BreadcrumbsProps extends BreadcrumbsHtmlAttrs {
  items: BreadcrumbsItem[];
  separator?: React.ReactNode;
  itemRenderAs?: (props: {
    key: number;
    href: string;
    className: string;
    ariaCurrent?: string;
    children: JSX.Element;
  }) => JSX.Element;
}

export function Breadcrumbs({
  items,
  itemRenderAs,
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
          const ariaCurrent = index === items.length - 1 ? 'page' : undefined;
          const children = (
            <>
              <i className="dc-breadcrumbs-item__icon" aria-hidden={true}>
                {item.icon ? item.icon : null}
              </i>
              <span className="dc-breadcrumbs-item__label">{item.label}</span>
            </>
          );

          if (typeof itemRenderAs === 'function') {
            return itemRenderAs({
              key,
              href: item.href,
              className,
              ariaCurrent,
              children,
            });
          }

          return (
            <li key={key}>
              {index ? (
                <span className="dc-breadcrumbs__separator">{separator}</span>
              ) : null}
              <a
                href={item.href}
                className={className}
                aria-current={ariaCurrent}
              >
                {children}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
