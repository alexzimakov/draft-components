import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../shared/react-helpers';

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
