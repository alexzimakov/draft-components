import { ComponentProps, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type NavListTitleHTMLProps = ComponentProps<'li'>;

type NavListTitleBaseProps = {
  children: ReactNode;
};

export type NavListTitleProps =
  & NavListTitleBaseProps
  & Omit<NavListTitleHTMLProps, keyof NavListTitleBaseProps>;

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
