import { type ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Button, type ButtonProps } from './button';

export type IconButtonProps = Omit<ButtonProps, 'children' | 'caption'> & {
  icon: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, ...props }, ref) {
    return <Button
      ref={ref}
      className={classNames('dc-button_icon-only', className)}
      {...props}
    />;
  }
);
