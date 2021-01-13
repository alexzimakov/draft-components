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

export function SvgIcon({
  icon,
  size = 'base',
  linearGradient,
  ...props
}: SvgIconProps) {
  const iconSize = getIconSize(size);
  const gradientId = React.useRef('');
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

    if (!gradientId.current) {
      gradientId.current = uniqueId('svg-icon-gradient-');
    }

    fill = `url(#${gradientId.current})`;
    defs = (
      <defs>
        <linearGradient
          data-testid="svg-icon-gradient"
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

function getIconSize(size: SvgIconProps['size']): string | number {
  switch (size) {
    case 'xs':
      return '0.75em';
    case 'sm':
      return '0.875em';
    case 'base':
      return '1em';
    case 'lg':
      return '1.25em';
    case 'xl':
      return '1.5em';
    case '2x':
      return '2em';
    case '3x':
      return '3em';
    case '4x':
      return '4em';
    case '5x':
      return '5em';
    default:
      return size || 24;
  }
}
