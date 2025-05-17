import { ComponentProps, forwardRef } from 'react';

export const XMarkIcon = forwardRef<
  SVGSVGElement,
  ComponentProps<'svg'>
>(function XMarkIcon(props, ref) {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
});
