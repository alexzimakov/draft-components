import * as React from 'react';
import { ComponentWithForwardRef } from '../../common-types';
import { classNames } from '../../lib';

export type TextareaSize = 'sm' | 'md' | 'lg';

export type TextareaHtmlAttrs = React.ComponentPropsWithoutRef<'textarea'>;

export type TextareaProps = {
  size?: TextareaSize;
  isInvalid?: boolean;
  hasFullWidth?: boolean;
} & TextareaHtmlAttrs;

export const Textarea: ComponentWithForwardRef<
  HTMLTextAreaElement,
  TextareaProps
> = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size = 'md', isInvalid, hasFullWidth, className, ...props },
  ref
) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={classNames(
        className,
        'dc-base-control',
        'dc-textarea',
        `dc-base-control_size_${size}`,
        {
          'dc-base-control_invalid': isInvalid,
          'dc-base-control_full_width': hasFullWidth,
        }
      )}
    />
  );
});
