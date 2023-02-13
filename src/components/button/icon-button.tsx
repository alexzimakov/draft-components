import { type ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Button, type ButtonProps } from './button';

export type IconButtonBaseProps = Omit<ButtonProps,
  | 'children'
  | 'caption'
  | 'iconLeft'
  | 'iconRight'>;
export type IconButtonProps = {
  icon: ReactNode;
} & IconButtonBaseProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, icon, ...props }, ref) {
    return <Button
      {...props}
      ref={ref}
      iconLeft={icon}
      className={classNames('dc-button_icon-only', className)}
    />;
  },
);
