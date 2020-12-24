import * as React from 'react';
import { classNames } from '../../lib';

export type TextareaHtmlAttrs = React.ComponentPropsWithoutRef<'textarea'>;

export interface TextareaProps extends TextareaHtmlAttrs {
  size?: 'sm' | 'md' | 'lg';
  isInvalid?: boolean;
  hasFullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { size = 'md', isInvalid, hasFullWidth, className, ...props },
    ref
  ) {
    return (
      <textarea
        {...props}
        ref={ref}
        className={classNames(className, 'dc-base-control', 'dc-textarea', {
          'dc-base-control_invalid': isInvalid,
          'dc-base-control_full_width': hasFullWidth,
          [`dc-base-control_size_${size}`]: size,
        })}
      />
    );
  }
);
