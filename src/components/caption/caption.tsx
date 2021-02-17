import * as React from 'react';
import { classNames } from '../../lib';

export interface CaptionProps extends React.ComponentPropsWithoutRef<'small'> {}

export function Caption({ className, children, ...props }: CaptionProps) {
  return (
    <small {...props} className={classNames(className, 'dc-caption')}>
      {children}
    </small>
  );
}
