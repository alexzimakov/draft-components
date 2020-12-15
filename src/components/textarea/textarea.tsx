import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type TextareaHtmlAttrs = React.TextareaHTMLAttributes<
  HTMLTextAreaElement
>;

export type TextareaProps = {
  size?: 'sm' | 'lg';
  isInvalid?: boolean;
  hasFullWidth?: boolean;
} & TextareaHtmlAttrs;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      size,
      isInvalid,
      hasFullWidth,

      // Standard HTML Attrs
      className,
      ...props
    },
    ref
  ) {
    return (
      <textarea
        {...props}
        ref={ref}
        className={classNames(className, 'dc-base-control', 'dc-textarea', {
          'dc-base-control_size_sm': size === 'sm',
          'dc-base-control_size_lg': size === 'lg',
          'dc-base-control_invalid': isInvalid,
          'dc-base-control_full_width': hasFullWidth,
        })}
      />
    );
  }
);
