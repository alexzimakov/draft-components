import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type SpinnerProps = {
  className?: string;
  size?: number | string;
};

export function Spinner({ className, size = '1.5em' }: SpinnerProps) {
  return (
    <svg
      data-testid="dc-spinner"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontSize: size }}
      className={classNames(className, 'dc-spinner')}
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
    >
      <circle
        className="dc-spinner__circle"
        stroke="currentColor"
        strokeWidth={4}
        cx={12}
        cy={12}
        r={10}
      />
      <path
        className="dc-spinner__arc"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
