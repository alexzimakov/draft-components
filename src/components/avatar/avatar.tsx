import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
  isRounded?: boolean;
  src?: string;
  altText?: string;
  initials?: string;
}

const avatarSize: Record<NonNullable<AvatarProps['size']>, number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 52,
  xl: 60,
};

export function Avatar({
  size = 'md',
  fillColor = 'gray',
  isRounded,
  src,
  altText,
  initials,
  className,
  ...props
}: AvatarProps) {
  const sizePx = avatarSize[size] || avatarSize.md;
  let content;
  let type;

  if (src) {
    type = 'image';
    content = (
      <img
        className="dc-avatar__image"
        src={src}
        alt={altText}
        width={sizePx}
        height={sizePx}
      />
    );
  } else if (initials) {
    type = 'initials';
    content = <span className="dc-avatar__initials">{initials}</span>;
  } else {
    type = 'placeholder';
    content = (
      <svg
        className="dc-avatar__placeholder"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="avatar-placeholder"
        aria-hidden={true}
        focusable={false}
        viewBox="0 0 448 512"
        role="img"
        width={sizePx}
        height={sizePx}
      >
        <path
          fill="currentColor"
          d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
        />
      </svg>
    );
  }

  return (
    <div
      {...props}
      className={classNames(className, 'dc-avatar', {
        'dc-avatar_rounded': isRounded,
        [`dc-avatar_fill-color_${fillColor}`]: fillColor,
        [`dc-avatar_size_${size}`]: size,
        [`dc-avatar_type_${type}`]: type,
      })}
    >
      {content}
    </div>
  );
}
