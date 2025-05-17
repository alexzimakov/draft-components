import { type ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type ToastButtonHTMLProps = ComponentProps<'button'>;

export type ToastButtonProps = ToastButtonHTMLProps;

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
