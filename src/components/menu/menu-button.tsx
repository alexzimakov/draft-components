import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

export type MenuButtonProps = {
  className?: string;
  icon?: JSX.Element;
  children: ReactNode;
} & ComponentPropsWithRef<'button'>;

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton({ className, children, icon, ...props }, ref) {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames('dc-menu-button', className)}
        role="menuitem"
        tabIndex={-1}
      >
        {icon}
        <span>{children}</span>
      </button>
    );
  }
);
