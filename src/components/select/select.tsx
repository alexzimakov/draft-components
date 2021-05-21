import * as React from 'react';
import { classNames } from '../../lib';

export interface SelectProps
  extends Omit<React.ComponentPropsWithoutRef<'select'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { size = 'md', invalid, fullWidth, className, ...props },
    ref
  ) {
    return (
      <select
        {...props}
        ref={ref}
        className={classNames(className, 'dc-field', 'dc-select', {
          'dc-field_invalid': invalid,
          'dc-field_full_width': fullWidth,
          [`dc-field_size_${size}`]: size,
        })}
      />
    );
  }
);
