import { type ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Button, type ButtonProps } from './button';

export type IconButtonBaseProps = Omit<ButtonProps,
  | 'children'
  | 'caption'
  | 'leftIcon'
  | 'rightIcon'>;
export type IconButtonProps = {
  icon: ReactNode;
} & IconButtonBaseProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, icon, ...props }, ref) {
    return <Button
      {...props}
      ref={ref}
      leftIcon={icon}
      className={classNames('dc-button_icon-only', className)}
    />;
  },
);
