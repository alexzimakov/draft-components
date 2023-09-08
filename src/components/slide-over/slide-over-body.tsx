import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/index.js';

export type SlideOverBodyProps = ComponentPropsWithoutRef<'div'>;

export function SlideOverBody({
  className,
  ...props
}: SlideOverBodyProps) {
  return (
    <div
      className={classNames('dc-slide-over-body', className)}
      {...props}
    />
  );
}
