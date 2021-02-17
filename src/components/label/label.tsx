import * as React from 'react';
import { classNames } from '../../lib';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  isRequired?: boolean;
}

export function Label({
  isRequired,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      {...props}
      className={classNames(className, 'dc-label', {
        'dc-label_required': isRequired,
      })}
    >
      {children}
    </label>
  );
}
