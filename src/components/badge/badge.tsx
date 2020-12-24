import * as React from 'react';
import { IconButton, IconButtonProps } from '../icon-button';
import { classNames } from '../../lib';
import { ButtonSize } from '../button';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeColor =
  | 'gray'
  | 'blue'
  | 'cyan'
  | 'red'
  | 'green'
  | 'indigo'
  | 'yellow'
  | 'orange';

export type BadgeHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'span'>,
  'color'
>;

export type BadgeProps = {
  size?: BadgeSize;
  color?: BadgeColor;
  isRounded?: boolean;
  isRemovable?: boolean;
  removeButtonA11yTitle?: string;
  onRemove?: IconButtonProps['onClick'];
} & BadgeHtmlAttrs;

const buttonSizes: Record<BadgeSize, ButtonSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

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
      className={classNames(
        className,
        'dc-badge',
        `dc-badge_color_${color}`,
        `dc-badge_size_${size}`,
        { 'dc-badge_rounded': isRounded, 'dc-badge_removable': isRemovable }
      )}
    >
      {children}
      {isRemovable ? (
        <IconButton
          className="dc-badge__remove-btn"
          data-testid="badge-remove-btn"
          aria-label={removeButtonA11yTitle}
          icon="close"
          size={buttonSizes[size]}
          isRounded={isRounded}
          onClick={onRemove}
        />
      ) : null}
    </span>
  );
}
