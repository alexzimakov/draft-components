import * as React from 'react';
import { IconButton, IconButtonProps } from '../icon-button';
import { classNames } from '../../lib';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  size?: 'sm' | 'md' | 'lg';
  fillColor?:
    | 'gray'
    | 'blue'
    | 'cyan'
    | 'red'
    | 'green'
    | 'indigo'
    | 'yellow'
    | 'orange';
  isRounded?: boolean;
  isRemovable?: boolean;
  removeButtonA11yTitle?: string;
  onRemove?: IconButtonProps['onClick'];
}

const removeButtonSize: Record<
  NonNullable<BadgeProps['size']>,
  IconButtonProps['size']
> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export function Badge({
  size = 'md',
  fillColor = 'gray',
  isRounded,
  isRemovable,
  removeButtonA11yTitle,
  onRemove,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={classNames(className, 'dc-badge', {
        'dc-badge_rounded': isRounded,
        'dc-badge_removable': isRemovable,
        [`dc-badge_fill-color_${fillColor}`]: fillColor,
        [`dc-badge_size_${size}`]: size,
      })}
    >
      {children}
      {isRemovable ? (
        <IconButton
          className="dc-badge__remove-btn"
          data-testid="badge-remove-btn"
          aria-label={removeButtonA11yTitle}
          icon="remove"
          size={removeButtonSize[size] || removeButtonSize.md}
          isRounded={isRounded}
          onClick={onRemove}
        />
      ) : null}
    </span>
  );
}
