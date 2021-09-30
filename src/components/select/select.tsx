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
        className={classNames(className, 'dc-input', 'dc-select', {
          'dc-input_invalid': invalid,
          'dc-input_full_width': fullWidth,
          [`dc-input_size_${size}`]: size,
        })}
        onChange={(event) => {
          isFunction(onChange) && onChange(event);
          isFunction(onChangeValue) && onChangeValue(event.target.value);
        }}
      />
    );
  }
);
