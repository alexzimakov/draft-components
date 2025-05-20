import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type SpinnerHTMLProps = ComponentProps<'svg'>;

type SpinnerBaseProps = {
  size?: number | string;
};

export type SpinnerProps =
  & SpinnerBaseProps
  & Omit<SpinnerHTMLProps, keyof SpinnerBaseProps>;

export function Spinner({
  size = 24,
  width = size,
  height = size,
  className = '',
  ...props
}: SpinnerProps) {
  return (
    <svg
      {...props}
      className={classNames('dc-spinner', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
    >
      <circle
        cx={25}
        cy={25}
        r={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
      />
    </svg>
  );
}
