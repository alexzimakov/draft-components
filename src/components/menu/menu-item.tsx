import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
} from 'react';
import { classNames } from '../../lib/react-helpers';

type MenuItemHTMLProps = ComponentPropsWithRef<'button'>;
type MenuItemBaseProps = Omit<MenuItemHTMLProps, 'children'>;
export type MenuItemAppearance = 'default' | 'destructive';
export type MenuItemProps = {
  appearance?: MenuItemAppearance;
  icon?: ReactNode;
  children: ReactNode;
} & MenuItemBaseProps;

export const MenuItem = forwardRef<
  HTMLButtonElement,
  MenuItemProps
>(function MenuItem({
  icon = null,
  appearance = 'default',
  className,
  children,
  ...props
}, ref) {
  return (
    <li role="presentation">
      <button
        {...props}
        ref={ref}
        className={classNames(className, {
          'dc-menu-btn': true,
          [`dc-menu-btn_${appearance}`]: appearance,
        })}
        type="button"
        role="menuitem"
        tabIndex={-1}
      >
        {Boolean(icon) && <span className="dc-menu-btn__icon">{icon}</span>}
        <span className="dc-menu-btn__label">{children}</span>
      </button>
    </li>
  );
});
