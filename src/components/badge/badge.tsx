import { ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type BadgeHTMLProps = ComponentProps<'span'>;

type BadgeBaseProps = {
  children: number | string;
};

export type BadgeProps =
  & BadgeBaseProps
  & Omit<BadgeHTMLProps, keyof BadgeBaseProps>;

export function Badge({
  className,
  children,
  ...props
}: BadgeProps) {
  let isCircle;
  if (typeof children === 'number' && children > 0 && children < 10) {
    isCircle = true;
  } else if (typeof children === 'string' && children.length === 1) {
    isCircle = true;
  } else {
    isCircle = !children;
  }

  return (
    <span
      {...props}
      className={classNames(className, {
        'dc-badge': true,
        'dc-badge_circle': isCircle,
      })}
    >
      {children}
    </span>
  );
}
