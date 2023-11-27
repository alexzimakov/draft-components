import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type MenuItemHTMLProps = ComponentPropsWithRef<'button'>;
type MenuItemBaseProps = Omit<MenuItemHTMLProps, 'children' | 'role'>;
export type MenuItemProps = {
  role?: 'menuitem' | 'menuitemradio';
  disabled?: boolean;
  destructive?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
} & MenuItemBaseProps;

export const MenuItem = forwardRef<
  HTMLButtonElement,
  MenuItemProps
>(function MenuItem({
  role = 'menuitem',
  disabled,
  destructive,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}, ref) {
  let label = children;
  if (iconLeft || iconRight) {
    const className = classNames('dc-menu-btn__label', {
      'dc-menu-btn__label_gap_left': iconLeft,
      'dc-menu-btn__label_gap_right': iconRight,
    });
    label = <span className={className}>{label}</span>;
  }

  return (
    <li role="presentation">
      <button
        {...props}
        ref={ref}
        className={classNames(className, 'dc-menu-btn', {
          'dc-menu-btn_destructive': destructive,
        })}
        type="button"
        disabled={disabled}
        role={role}
        tabIndex={-1}
      >
        {iconLeft}
        {label}
        {iconRight}
      </button>
    </li>
  );
});
