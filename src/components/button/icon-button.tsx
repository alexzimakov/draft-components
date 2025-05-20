import { classNames } from '../../lib/react-helpers.js';
import { Button, type ButtonProps } from './button.js';

export type IconButtonProps = Omit<ButtonProps,
  | 'caption'
  | 'iconLeft'
  | 'iconRight'>;

export function IconButton({
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      className={classNames('dc-button_icon-only', className)}
      iconLeft={children}
    />
  );
}
