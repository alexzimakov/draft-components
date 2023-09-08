import { ComponentPropsWithRef, ReactNode, forwardRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type AvatarHTMLProps = ComponentPropsWithRef<'div'>;
export type AvatarSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';
export type AvatarFill =
  | 'gray'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'violet';
export type AvatarProps = {
  square?: boolean;
  size?: AvatarSize;
  fill?: AvatarFill;
  src?: string;
  altText?: string;
  initials?: ReactNode;
} & AvatarHTMLProps;

const sizesInPixels: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

export const Avatar = forwardRef<
  HTMLDivElement,
  AvatarProps
>(function Avatar({
  square,
  size = 'md',
  fill = 'gray',
  src,
  altText,
  initials,
  className,
  ...props
}, ref) {
  const sizePx = sizesInPixels[size] ?? sizesInPixels.md;
  const [type, setType] = useState(() => {
    let type: 'image' | 'initials' | 'silhouette';
    if (src) {
      type = 'image';
    } else if (initials) {
      type = 'initials';
    } else {
      type = 'silhouette';
    }
    return type;
  });

  let children: ReactNode;
  if (type === 'image') {
    children = (
      <img
        className="dc-avatar__image"
        src={src}
        alt={altText}
        width={sizePx}
        height={sizePx}
        onError={() => setType(initials ? 'initials' : 'silhouette')}
      />
    );
  } else if (type === 'initials') {
    children = (
      <span className="dc-avatar__initials" aria-label={altText}>
        {initials}
      </span>
    );
  } else {
    children = (
      <svg
        className="dc-avatar__silhouette"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 56"
        width={sizePx}
        height={sizePx}
        fill="none"
      >
        {altText ? <title>{altText}</title> : null}
        {square ? (
          <path
            fill="white"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.0001 29.5957C33.3078 29.5957 37.6106 24.9852 37.6106 19.2979C37.6106 13.6105 33.3078 9 28.0001 9C22.6923 9 18.3895 13.6105 18.3895 19.2979C18.3895 24.9852 22.6923 29.5957 28.0001 29.5957ZM7.03967 49.4839C6.71299 51.4741 8.45242 53 10.4693 53H45.5305C47.5474 53 49.2868 51.4741 48.9601 49.4839C47.6918 41.7571 39.6459 33.3404 27.9999 33.3404C16.3538 33.3404 8.30794 41.7571 7.03967 49.4839Z"
          />
        ) : (
          <path
            fill="white"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.28643 44.5776C12.6548 39.0053 19.3297 34.3404 27.9999 34.3404C36.6702 34.3404 43.3451 39.0054 46.7134 44.5777C42.1335 49.7439 35.447 53 28 53C20.5529 53 13.8664 49.7438 9.28643 44.5776ZM37.6106 20.2979C37.6106 25.9852 33.3078 30.5957 28.0001 30.5957C22.6923 30.5957 18.3895 25.9852 18.3895 20.2979C18.3895 14.6105 22.6923 10 28.0001 10C33.3078 10 37.6106 14.6105 37.6106 20.2979Z"
          />
        )}
      </svg>
    );
  }

  return (
    <div
      ref={ref}
      data-size={size}
      data-fill={size}
      className={classNames(className, 'dc-avatar', `dc-avatar_${type}`, {
        [`dc-avatar_size_${size}`]: size,
        [`dc-avatar_fill_${fill}`]: fill,
        'dc-avatar_square': square,
      })}
      {...props}
    >
      {children}
    </div>
  );
});
