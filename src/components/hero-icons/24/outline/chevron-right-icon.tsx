import { ComponentPropsWithRef, forwardRef } from 'react';

export const ChevronRightIcon = forwardRef<
  SVGSVGElement,
  ComponentPropsWithRef<'svg'>
>(function ChevronRightIcon(props, ref) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
});
