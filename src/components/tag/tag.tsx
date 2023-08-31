import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type TagBaseProps = ComponentPropsWithoutRef<'strong'>;
export type TagFill =
  | 'gray'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow';
export type TagSize = 'sm' | 'md' | 'lg';
export type TagVariant = 'default' | 'filled' | 'tinted';
export type TagProps = {
  isRounded?: boolean;
  variant?: TagVariant;
  fill?: TagFill;
  size?: TagSize;
} & TagBaseProps;

export const Tag = forwardRef<HTMLElement, TagProps>(function Tag({
  isRounded = false,
  variant = 'default',
  fill = 'gray',
  size = 'md',
  className,
  children,
  ...props
}, ref) {
  return (
    <strong
      {...props}
      ref={ref}
      className={classNames(className, 'dc-tag', {
        [`dc-tag_${variant}`]: variant,
        [`dc-tag_${fill}`]: fill,
        [`dc-tag_${size}`]: size,
        'dc-tag_rounded': isRounded,
      })}
    >
      {children}
    </strong>
  );
});
