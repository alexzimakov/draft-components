import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export interface ToastButtonProps extends ComponentPropsWithRef<'button'> {}

export const ToastButton = forwardRef<HTMLButtonElement, ToastButtonProps>(
  function ToastButton({ className, ...props }, ref) {
    return (
      <button {...props} className={classNames(className, 'dc-toast-btn')} />
    );
  }
);
