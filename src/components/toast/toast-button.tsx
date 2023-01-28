import { type ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type ToastButtonProps = ComponentPropsWithRef<'button'>;

export const ToastButton = forwardRef<
  HTMLButtonElement,
  ToastButtonProps
>(function ToastButton({ className, ...props }, ref) {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(className, 'dc-toast__btn')}
    />
  );
});
