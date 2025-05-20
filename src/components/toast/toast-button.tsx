import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type ToastButtonHTMLProps = ComponentProps<'button'>;

export type ToastButtonProps = ToastButtonHTMLProps;

export function ToastButton({ className, ...props }: ToastButtonProps) {
  return (
    <button
      {...props}
      className={classNames(className, 'dc-toast__btn')}
    />
  );
}
