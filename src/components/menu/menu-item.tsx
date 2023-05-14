import { type ComponentPropsWithRef, type ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type MenuItemHTMLProps = ComponentPropsWithRef<'button'>;
type MenuItemBaseProps = Omit<MenuItemHTMLProps, 'children' | 'role'>;
export type MenuItemAppearance = 'default' | 'destructive';
export type MenuItemRole = 'menuitem' | 'menuitemradio';
export type MenuItemProps = {
  role?: MenuItemRole;
  appearance?: MenuItemAppearance;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
} & MenuItemBaseProps;

export const MenuItem = forwardRef<
  HTMLButtonElement,
  MenuItemProps
>(function MenuItem({
  role = 'menuitem',
  appearance = 'default',
  leftIcon = null,
  rightIcon = null,
  className,
  children,
  ...props
}, ref) {
  let label = children;
  if (leftIcon || rightIcon) {
    const className = classNames('dc-menu-btn__label', {
      'dc-menu-btn__label_gap_left': leftIcon,
      'dc-menu-btn__label_gap_right': rightIcon,
    });
    label = <span className={className}>{label}</span>;
  }

  return (
    <li role="presentation">
      <button
        {...props}
        ref={ref}
        className={classNames(className, 'dc-menu-btn', {
          [`dc-menu-btn_${appearance}`]: appearance,
        })}
        type="button"
        role={role}
        tabIndex={-1}
      >
        {leftIcon}
        {label}
        {rightIcon}
      </button>
    </li>
  );
});
