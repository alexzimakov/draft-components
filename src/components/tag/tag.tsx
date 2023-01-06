import { type ComponentPropsWithoutRef } from 'react';
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
export type TagVariant = 'tinted' | 'plain';
export type TagProps = {
  isRounded?: boolean;
  variant?: TagVariant;
  fill?: TagFill;
  size?: TagSize;
} & TagBaseProps;

export function Tag({
  isRounded = false,
  variant = 'tinted',
  fill = 'gray',
  size = 'md',
  className,
  children,
  ...props
}: TagProps) {
  return (
    <strong
      {...props}
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
}
