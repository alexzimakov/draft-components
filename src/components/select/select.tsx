import * as React from 'react';
import { classNames } from '../../lib';

export type SelectHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'select'>,
  'size'
>;

export interface SelectProps extends SelectHtmlAttrs {
  size?: 'sm' | 'md' | 'lg';
  isInvalid?: boolean;
  hasFullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { size = 'md', isInvalid, hasFullWidth, className, ...props },
    ref
  ) {
    return (
      <select
        {...props}
        ref={ref}
        className={classNames(className, 'dc-select', 'dc-base-control', {
          'dc-base-control_invalid': isInvalid,
          'dc-base-control_full_width': hasFullWidth,
          [`dc-base-control_size_${size}`]: size,
        })}
      />
    );
  }
);
