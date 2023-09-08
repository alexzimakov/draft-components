import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type NavListTitleHTMLProps = ComponentPropsWithoutRef<'li'>;
type NavListTitleBaseProps = Omit<NavListTitleHTMLProps, 'children'>;
export type NavListTitleProps = {
  children: ReactNode;
} & NavListTitleBaseProps;


export function NavListTitle({
  className,
  children,
  ...props
}: NavListTitleProps) {
  return (
    <li {...props} className={classNames('dc-nav-list__title', className)}>
      {children}
    </li>
  );
}
