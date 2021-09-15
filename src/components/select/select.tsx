import { ComponentPropsWithRef, forwardRef } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';

export interface SelectProps
  extends Omit<ComponentPropsWithRef<'select'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  fullWidth?: boolean;
  onChangeValue?(value: string): void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      size = 'md',
      invalid,
      fullWidth,
      className,
      onChange,
      onChangeValue,
      ...props
    },
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
        onChange={(event) => {
          isFunction(onChange) && onChange(event);
          isFunction(onChangeValue) && onChangeValue(event.target.value);
        }}
      />
    );
  }
);
