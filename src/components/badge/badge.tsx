import * as React from 'react';
import { IconButton, IconButtonProps } from '../icon-button';
import { classNames } from '../../lib';

export type BadgeHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'span'>,
  'color'
>;

export interface BadgeProps extends BadgeHtmlAttrs {
  size?: 'sm' | 'md' | 'lg';
  color?:
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

export function Badge({
  size = 'md',
  color = 'gray',
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
        [`dc-badge_color_${color}`]: color,
        [`dc-badge_size_${size}`]: size,
      })}
    >
      {children}
      {isRemovable ? (
        <IconButton
          className="dc-badge__remove-btn"
          data-testid="badge-remove-btn"
          aria-label={removeButtonA11yTitle}
          icon="close"
          size={getRemoveButtonSize(size)}
          isRounded={isRounded}
          onClick={onRemove}
        />
      ) : null}
    </span>
  );
}

function getRemoveButtonSize(
  size: BadgeProps['size']
): IconButtonProps['size'] {
  switch (size) {
    case 'sm':
      return 'xs';
    case 'lg':
      return 'md';
    case 'md':
    default:
      return 'sm';
  }
}
