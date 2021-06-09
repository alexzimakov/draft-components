import { forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithRef } from 'react';

export interface SelectProps
  extends Omit<ComponentPropsWithRef<'select'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
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
