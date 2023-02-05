import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
} from 'react';
import { classNames } from '../../lib/react-helpers';

type MenuItemHTMLProps = ComponentPropsWithRef<'button'>;
type MenuItemBaseProps = Omit<MenuItemHTMLProps, 'children' | 'role'>;
export type MenuItemAppearance = 'default' | 'destructive';
export type MenuItemRole = 'menuitem' | 'menuitemradio';
export type MenuItemProps = {
  role?: MenuItemRole;
  appearance?: MenuItemAppearance;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
} & MenuItemBaseProps;

export const MenuItem = forwardRef<
  HTMLButtonElement,
  MenuItemProps
>(function MenuItem({
  role = 'menuitem',
  appearance = 'default',
  iconLeft = null,
  iconRight = null,
  className,
  children,
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
          [`dc-menu-btn_${appearance}`]: appearance,
        })}
        type="button"
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
