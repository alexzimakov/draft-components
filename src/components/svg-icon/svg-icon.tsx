import * as React from 'react';
import { uniqueId } from '../../lib';

export type SvgIconHtmlAttrs = React.ComponentPropsWithRef<'svg'>;

export interface Icon {
  name: string;
  path: string;
}

export interface SvgIconProps extends SvgIconHtmlAttrs {
  icon: Icon;
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | string
    | number;
  linearGradient?: [
    'to bottom' | 'to top' | 'to left' | 'to right',
    string,
    string
  ];
}

const svgIconSizes: Record<string, string> = {
  xs: '0.75em',
  sm: '0.875em',
  base: '1em',
  lg: '1.25em',
  xl: '1.5em',
  '2x': '2em',
  '3x': '3em',
  '4x': '4em',
  '5x': '5em',
};

export function SvgIcon({
  icon,
  size = 'base',
  linearGradient,
  ...props
}: SvgIconProps) {
  const iconSize = svgIconSizes[size] || size || 24;
  const gradientId = React.useRef(uniqueId('gradient-def-'));
  let fill = 'currentColor';
  let defs = null;

  if (linearGradient) {
    const [orientation, startColor, endColor] = linearGradient;
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;

    if (orientation === 'to bottom') {
      y2 = 1;
    } else if (orientation === 'to top') {
      y1 = 1;
    } else if (orientation === 'to left') {
      x1 = 1;
    } else if (orientation === 'to right') {
      x2 = 1;
    }

    fill = `url(#${gradientId.current})`;
    defs = (
      <defs>
        <linearGradient
          data-testid="linear-gradient-def"
          id={gradientId.current}
          x1={x1}
          x2={x2}
          y1={y1}
          y2={y2}
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
    );
  }

  return (
    <svg
      fill={fill}
      width={iconSize}
      height={iconSize}
      aria-hidden={true}
      focusable={false}
      data-testid={`svg-icon-${icon.name}`}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {defs}
      <path d={icon.path} />
    </svg>
  );
}
