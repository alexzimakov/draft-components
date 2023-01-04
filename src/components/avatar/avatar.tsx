import {
  forwardRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { classNames } from '../../shared/react-helpers';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarFill =
  | 'gray'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'violet';
export type AvatarProps = ComponentPropsWithRef<'div'> & {
  isSquare?: boolean;
  hasInnerShadow?: boolean;
  size?: AvatarSize;
  fill?: AvatarFill;
  src?: string;
  alt?: string;
  placeholder?: ReactNode;
};

export const Avatar = forwardRef<
  HTMLDivElement,
  AvatarProps
>(function Avatar({
  isSquare = false,
  hasInnerShadow = false,
  size = 'md',
  fill = 'gray',
  src,
  alt,
  placeholder,
  className,
  ...props
}, ref) {
  let content;
  if (!src && placeholder) {
    content = (
      <div className="dc-avatar__placeholder" aria-label={alt}>
        {placeholder}
      </div>
    );
  } else {
    const sizePx = avatarSizesPx[size];
    content = (
      <img
        className="dc-avatar__image"
        src={src}
        alt={alt}
        width={sizePx}
        height={sizePx}
      />
    );
  }

  return (
    <div
      {...props}
      ref={ref}
      className={classNames(className, 'dc-avatar', {
        [`dc-avatar_size_${size}`]: size,
        [`dc-avatar_fill_${fill}`]: fill,
        'dc-avatar_square': isSquare,
        'dc-avatar_has_inner-shadow': hasInnerShadow,
      })}
    >
      {content}
    </div>
  );
});

const avatarSizesPx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};
