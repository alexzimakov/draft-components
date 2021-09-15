import { ComponentPropsWithRef, forwardRef } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  fullWidth?: boolean;
  onChangeValue?(value: string): void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
      <textarea
        {...props}
        ref={ref}
        className={classNames(className, 'dc-field', 'dc-textarea', {
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
