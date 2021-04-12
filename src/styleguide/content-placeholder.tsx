import * as React from 'react';
import { classNames } from '../lib';

export interface ContentPlaceholderProps
  extends React.ComponentPropsWithoutRef<'div'> {
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
