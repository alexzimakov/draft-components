import * as React from 'react';

type IconProps = React.SVGAttributes<SVGElement>;

export function CloseIcon(props: IconProps) {
  return (
    <svg
      data-testid="dc-close-icon"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg
      data-testid="dc-minus-icon"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
