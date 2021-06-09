import { classNames } from '../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export interface ContentPlaceholderProps
  extends ComponentPropsWithoutRef<'div'> {
  width: number | string;
  height: number | string;
}

export function ContentPlaceholder({
  width,
  height,
  style,
  className,
  ...props
}: ContentPlaceholderProps) {
  return (
    <div
      {...props}
      style={{ width, height, ...style }}
      className={classNames(className, 'dc-rsg-content-placeholder')}
    />
  );
}
