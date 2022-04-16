import { ComponentPropsWithoutRef, useRef, forwardRef } from 'react';
import { uniqueId } from '../../lib/util';
import { classNames } from '../../lib/react-helpers';

export interface Icon {
  name: string;
  width: number;
  height: number;
  viewBox: string;
  children: JSX.Element;
}

export interface SvgIconProps extends ComponentPropsWithoutRef<'svg'> {
  icon: Icon;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '1x'
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

const svgIconSizes: Record<string, string | number> = {
  xs: '0.75em',
  sm: '0.875em',
  md: '1em',
  lg: '1.25em',
  xl: '1.5em',
  '1x': '1em',
  '2x': '2em',
  '3x': '3em',
  '4x': '4em',
  '5x': '5em',
};

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>(function SvgIcon(
  { icon, size = 'md', linearGradient, style, className, ...props },
  ref
) {
  const iconSize = svgIconSizes[size] || size || svgIconSizes.base;
  const gradientId = useRef(uniqueId('gradient-def-'));
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
      ref={ref}
      style={{ fontSize: iconSize, ...style }}
      className={classNames(className, 'dc-svg-icon', {
        [`dc-svg-icon_size_${size}`]: size in svgIconSizes,
      })}
      fill={fill}
      width={iconSize}
      height={iconSize}
      aria-hidden={true}
      focusable={false}
      data-testid={`svg-icon-${icon.name}`}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
    >
      {defs}
      {icon.children}
    </svg>
  );
});
