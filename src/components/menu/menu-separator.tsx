import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type MenuSeparatorHTMLProps = ComponentPropsWithoutRef<'li'>;
type MenuSeparatorBaseProps = Omit<MenuSeparatorHTMLProps, 'children'>;
export type MenuSeparatorProps = MenuSeparatorBaseProps;

export function MenuSeparator({
  className,
  ...props
}: MenuSeparatorProps) {
  return (
    <li
      {...props}
      className={classNames('dc-menu__separator', className)}
      role="separator"
    />
  );
}
