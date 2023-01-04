import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../shared/react-helpers';

export type SpinnerProps = ComponentPropsWithoutRef<'svg'> & {
  size?: number | string;
};

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  function Spinner({
    size = 24,
    width = size,
    height = size,
    className = '',
    ...props
  }, ref) {
    return <svg
      {...props}
      ref={ref}
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
    </svg>;
  }
);
