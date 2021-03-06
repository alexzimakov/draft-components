import { classNames } from '../../lib/react-helpers';
import { SvgIcon } from '../svg-icon';
import { xLg } from '../../icons/x-lg';
import type {
  ReactNode,
  MouseEventHandler,
  ComponentPropsWithoutRef,
} from 'react';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  isRounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fillColor?:
    | 'gray'
    | 'blue'
    | 'cyan'
    | 'red'
    | 'green'
    | 'lime'
    | 'indigo'
    | 'yellow'
    | 'orange';
  leadingIcon?: ReactNode;
  isRemovable?: boolean;
  isRemoveButtonDisabled?: boolean;
  removeButtonAriaLabel?: string;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
}

const removeButtonIconSize: Record<NonNullable<BadgeProps['size']>, number> = {
  sm: 10,
  md: 12,
  lg: 12,
};

export function Tag({
  isRounded,
  size = 'md',
  fillColor = 'gray',
  children: text,
  leadingIcon,
  isRemovable,
  isRemoveButtonDisabled,
  removeButtonAriaLabel,
  onRemove,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={classNames(className, 'dc-tag', {
        'dc-tag_rounded': isRounded,
        [`dc-tag_color_${fillColor}`]: fillColor,
        [`dc-tag_size_${size}`]: size,
      })}
    >
      {leadingIcon && <span className="dc-tag__icon">{leadingIcon}</span>}

      <span className="dc-tag__text">{text}</span>

      {isRemovable && (
        <button
          className="dc-tag__btn"
          disabled={isRemoveButtonDisabled}
          aria-label={removeButtonAriaLabel}
          onClick={onRemove}
        >
          <SvgIcon
            size={removeButtonIconSize[size] || removeButtonIconSize['md']}
            icon={xLg}
          />
        </button>
      )}
    </span>
  );
}
