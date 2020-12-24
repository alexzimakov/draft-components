import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'select'>,
  'size'
>;

export type SelectProps = {
  size?: SelectSize;
  isInvalid?: boolean;
  hasFullWidth?: boolean;
} & SelectHtmlAttrs;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { size = 'md', isInvalid, hasFullWidth, className, ...props },
    ref
  ) {
    return (
      <select
        {...props}
        ref={ref}
        className={classNames(
          className,
          'dc-select',
          'dc-base-control',
          `dc-base-control_size_${size}`,
          {
            'dc-base-control_invalid': isInvalid,
            'dc-base-control_full_width': hasFullWidth,
          }
        )}
      />
    );
  }
);
