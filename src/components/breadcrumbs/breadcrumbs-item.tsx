import { ComponentPropsWithoutRef, JSX, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useBreadcrumbsContext } from './breadcrumbs-context.js';

type BreadcrumbsItemHTMLProps = ComponentPropsWithoutRef<'a'>;
export type BreadcrumbsItemRenderFn = (props: {
  className: string;
  children: JSX.Element;
}) => ReactNode;
export type BreadcrumbsItemProps = {
  icon?: ReactNode;
  renderAs?: BreadcrumbsItemRenderFn;
} & BreadcrumbsItemHTMLProps;


export function BreadcrumbsItem({
  className,
  icon,
  children,
  renderAs,
  ...props
}: BreadcrumbsItemProps) {
  const { separator } = useBreadcrumbsContext();

  className = classNames('dc-breadcrumbs-item__link', className);
  children = (
    <>
      {icon != null && <div className="dc-breadcrumbs-item__icon">{icon}</div>}
      <div className="dc-breadcrumbs-item__text">{children}</div>
    </>
  );

  let content;
  if (typeof renderAs === 'function') {
    content = renderAs({ className, children });
  } else {
    content = <a {...props} className={className}>{children}</a>;
  }

  return (
    <li className="dc-breadcrumbs-item">
      {content}
      {separator != null && (
        <div aria-hidden={true} className="dc-breadcrumbs-item__separator">
          {separator}
        </div>
      )}
    </li>
  );
}
