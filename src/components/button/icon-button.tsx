import { forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Button, ButtonProps } from './button';

export type IconButtonProps = Omit<ButtonProps,
  | 'caption'
  | 'iconLeft'
  | 'iconRight'>;

export const IconButton = forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(function IconButton({ className, children, ...props }, ref) {
  return <Button
    {...props}
    ref={ref}
    className={classNames('dc-button_icon-only', className)}
    iconLeft={children}
  />;
});
