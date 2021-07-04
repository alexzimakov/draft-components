import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export type SpinnerHtmlAttrs = ComponentPropsWithoutRef<'svg'>;

export interface SpinnerProps extends SpinnerHtmlAttrs {
  size?: number | string;
}

export function Spinner({
  style,
  className,
  size = '1.5em',
  ...props
}: SpinnerProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, fontSize: size }}
      className={classNames(className, 'dc-spinner')}
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1,12 A11,11 0 1 0 12,1"
      />
    </svg>
  );
}
