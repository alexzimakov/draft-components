import { ComponentPropsWithoutRef } from 'react';

export function XMarkIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
