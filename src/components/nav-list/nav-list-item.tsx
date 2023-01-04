import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { classNames } from '../../shared/react-helpers';
import { Badge } from '../badge';

type NavListItemHTMLProps = ComponentPropsWithoutRef<'a'>;
export type NavListItemRenderFn = (props: {
  className: string;
  children: JSX.Element;
}) => ReactNode;
export type NavListItemProps = {
  icon?: ReactNode;
  badge?: string | number;
  renderAs?: NavListItemRenderFn;
} & NavListItemHTMLProps;


export function NavListItem({
  className,
  icon,
  badge,
  children,
  renderAs,
  ...props
}: NavListItemProps) {
  className = classNames(className, 'dc-nav-link');
  children = (
    <>
      {icon != null && <div className="dc-nav-link__icon">{icon} </div>}
      <div className="dc-nav-link__text">{children}</div>
      {badge != null && <>
        &nbsp;<Badge className="dc-nav-link__badge">{badge}</Badge>
      </>}
    </>
  );

  let content;
  if (typeof renderAs === 'function') {
    content = renderAs({ className, children });
  } else {
    content = <a {...props} className={className}>{children}</a>;
  }

  return <li className="dc-nav-list__item">{content}</li>;
}
