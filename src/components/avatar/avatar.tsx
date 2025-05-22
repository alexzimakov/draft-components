import { type ComponentProps, type ReactNode, useId } from 'react';
import { classNames } from '../../lib/react-helpers.js';

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

type AvatarHTMLProps = ComponentProps<'svg'>;

type AvatarBaseProps = {
  square?: boolean;
  size?: AvatarSize;
  fill?: AvatarFill;
  src?: string;
  altText?: string;
  monogram?: string;
};

export type AvatarProps =
  & AvatarBaseProps
  & Omit<AvatarHTMLProps, keyof AvatarBaseProps>;

const sizesInPixels: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

export function Avatar({
  square,
  size = 'md',
  fill = 'gray',
  src,
  altText,
  monogram,
  className,
  ...props
}: AvatarProps) {
  const id = useId();
  const titleId = altText ? `${id}avatar-title` : undefined;
  const maskId = `${id}avatar-mask`;
  const gradientId = `${id}avatar-gradient`;
  const sizePx = sizesInPixels[size] ?? sizesInPixels.md;

  let children: ReactNode;
  let type: 'image' | 'monogram' | 'silhouette';
  if (src) {
    type = 'image';
    children = (
      <image
        href={src}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
    );
  } else if (monogram) {
    type = 'monogram';
    children = (
      <text
        className="dc-avatar__monogram"
        x="28"
        y="28"
        dy="5%"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {monogram.slice(0, 2)}
      </text>
    );
  } else {
    type = 'silhouette';
    children = square
      ? (
          <path
            className="dc-avatar__silhouette"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.0001 29.5957C33.3078 29.5957 37.6106 24.9852 37.6106 19.2979C37.6106 13.6105 33.3078 9 28.0001 9C22.6923 9 18.3895 13.6105 18.3895 19.2979C18.3895 24.9852 22.6923 29.5957 28.0001 29.5957ZM7.03967 49.4839C6.71299 51.4741 8.45242 53 10.4693 53H45.5305C47.5474 53 49.2868 51.4741 48.9601 49.4839C47.6918 41.7571 39.6459 33.3404 27.9999 33.3404C16.3538 33.3404 8.30794 41.7571 7.03967 49.4839Z"
          />
        )
      : (
          <path
            className="dc-avatar__silhouette"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.28643 44.5776C12.6548 39.0053 19.3297 34.3404 27.9999 34.3404C36.6702 34.3404 43.3451 39.0054 46.7134 44.5777C42.1335 49.7439 35.447 53 28 53C20.5529 53 13.8664 49.7438 9.28643 44.5776ZM37.6106 20.2979C37.6106 25.9852 33.3078 30.5957 28.0001 30.5957C22.6923 30.5957 18.3895 25.9852 18.3895 20.2979C18.3895 14.6105 22.6923 10 28.0001 10C33.3078 10 37.6106 14.6105 37.6106 20.2979Z"
          />
        );
  }

  const maskElement = square
    ? <rect width="56" height="56" rx="10" fill="#fff" />
    : <circle r="28" cx="28" cy="28" fill="#fff" />;

  return (
    <svg
      className={classNames(className, {
        'dc-avatar': true,
        [`dc-avatar_type_${type}`]: type,
        [`dc-avatar_fill_${fill}`]: fill,
      })}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      width={sizePx}
      height={sizePx}
      role="img"
      aria-labelledby={titleId}
      {...props}
    >
      {altText ? <title id={titleId}>{altText}</title> : null}
      <defs>
        <mask id={maskId}>
          {maskElement}
        </mask>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="var(--background-color-1)" offset="0%" />
          <stop stopColor="var(--background-color-2)" offset="100%" />
        </linearGradient>
      </defs>
      <g mask={`url(#${maskId})`}>
        <rect fill={`url(#${gradientId})`} width="56" height="56" />
        {children}
        <maskElement.type
          {...maskElement.props}
          className="dc-avatar__border"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}
