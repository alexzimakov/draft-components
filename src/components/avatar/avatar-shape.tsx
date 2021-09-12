import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { uniqueId } from '../../lib/util';

export interface AvatarShapeProps extends ComponentPropsWithoutRef<'svg'> {
  size: number;
  path: string;
  imageUrl?: string;
  initials?: ReactNode;
  subtract?: ReactNode;
}

export function AvatarShape({
  size,
  path,
  imageUrl,
  initials,
  subtract,
  children,
  ...props
}: AvatarShapeProps) {
  const ids = useMemo(() => {
    const id = uniqueId();
    return {
      mask: `avatar-shape-mask-${id}`,
      gradient: `avatar-gradient-${id}`,
    };
  }, []);

  const [isImageLoadFailed, setIsImageLoadFailed] = useState(false);
  useEffect(() => {
    if (imageUrl) {
      const imageElement = document.createElement('img');
      imageElement.onerror = () => setIsImageLoadFailed(true);
      imageElement.src = imageUrl;
    }
  }, [imageUrl]);

  return (
    <svg
      role="none"
      {...props}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <mask id={ids.mask}>
          <path d={path} fill="#fff" />
          {subtract}
        </mask>

        <linearGradient id={ids.gradient} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--dc-avatar-bg1-color, #a1a1aa)" offset="0%" />
          <stop stopColor="var(--dc-avatar-bg2-color, #71717a)" offset="100%" />
        </linearGradient>
      </defs>

      <g mask={`url(#${ids.mask})`} fill="var(--dc-avatar-color)">
        {(function () {
          if (imageUrl && !isImageLoadFailed) {
            return renderImage({ imageUrl });
          }

          if (initials) {
            return renderInitials({
              initials,
              fill: `url(#${ids.gradient})`,
              fontSize: size * 0.4,
            });
          }

          return renderImageFallback({
            path: path,
            fill: `url(#${ids.gradient})`,
          });
        })()}
        <path
          d={path}
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="3"
        />
      </g>

      {children}
    </svg>
  );
}

function renderImage(props: { imageUrl: string }): JSX.Element {
  return (
    <image
      x="0"
      y="0"
      width="100%"
      height="100%"
      href={props.imageUrl}
      preserveAspectRatio="xMidYMin slice"
    />
  );
}

function renderImageFallback(props: { path: string; fill: string }) {
  return (
    <>
      <rect x="0" y="0" width="100%" height="100%" fill={props.fill} />
      <ellipse cx="50%" cy="32%" rx="18%" ry="18%" />
      <ellipse cx="50%" cy="84%" rx="38%" ry="24%" />
      <path d={props.path} fill="none" stroke={props.fill} strokeWidth="20%" />
    </>
  );
}

function renderInitials(props: {
  initials: ReactNode;
  fill: string;
  fontSize: number;
}): JSX.Element {
  return (
    <>
      <rect x="0" y="0" width="100%" height="100%" fill={props.fill} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        letterSpacing="0.015em"
        fontFamily="var(--dc-font-base, sans-serif)"
        fontSize={props.fontSize}
        fontWeight={600}
      >
        {props.initials}
      </text>
    </>
  );
}
