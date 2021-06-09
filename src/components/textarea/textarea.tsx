import { forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithRef } from 'react';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { size = 'md', invalid, fullWidth, className, ...props },
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
      />
    );
  }
);
