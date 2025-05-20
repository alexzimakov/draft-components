import { type ComponentProps, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type MenuItemHTMLProps = ComponentProps<'button'>;

type MenuItemBaseProps = {
  role?: 'menuitem' | 'menuitemradio';
  disabled?: boolean;
  destructive?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
};

export type MenuItemProps =
  & MenuItemBaseProps
  & Omit<MenuItemHTMLProps, keyof MenuItemBaseProps>;

export function MenuItem({
  role = 'menuitem',
  disabled,
  destructive,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: MenuItemProps) {
  return (
    <button
      {...props}
      className={classNames(className, {
        'dc-menu-btn': true,
        'dc-menu-btn_has-icon': iconLeft || iconRight,
        'dc-menu-btn_destructive': destructive,
      })}
      type="button"
      tabIndex={-1}
      role={role}
      disabled={disabled}
    >
      {iconLeft} <span>{children}</span> {iconRight}
    </button>
  );
}
